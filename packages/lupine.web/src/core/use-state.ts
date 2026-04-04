import { isFrontEnd } from '../lib/is-frontend';
import { RefProps } from '../jsx';
import { mountOuterComponent } from './mount-component';

// ─────────────────────────────────────────────
// ComponentStateStore
// ─────────────────────────────────────────────

export class ComponentStateStore<P = any> {
  states: any[] = [];
  hookIndex = 0;
  componentFn: (props: P) => any;
  componentProps: P;
  /** The internal ref that tracks the component's root DOM element */
  domRef: RefProps = {};
  /** Prevent concurrent rerenders from stacking */
  isDirty = false;
  /** True after the root element has been mounted for the first time */
  _mounted = false;
  /** User's original onLoad/onUnload — saved once so rerenders don't re-read the mutated ref */
  _userOnLoad?: ((el: Element) => Promise<void>) | null;
  _userOnUnload?: ((el: Element) => Promise<void>) | null;

  constructor(componentFn: (props: P) => any, componentProps: P) {
    this.componentFn = componentFn;
    this.componentProps = componentProps;
  }

  async rerender() {
    if (!this.domRef.current) return;
    const el = this.domRef.current as Element;

    const newVNode = await evaluateComponentWithStore(this);

    await mountOuterComponent(el, newVNode);
  }
}

// ─────────────────────────────────────────────
// Global current-store pointer
// Safe because:
//   • cleared BEFORE any `await` in renderComponentAsync
//   • Node.js is single-threaded: synchronous code never interleaves
// ─────────────────────────────────────────────

let _currentStore: ComponentStateStore | null = null;

export const setCurrentStore = (store: ComponentStateStore) => {
  _currentStore = store;
};

export const getCurrentStore = (): ComponentStateStore | null => _currentStore;

export const clearCurrentStore = () => {
  _currentStore = null;
};

// ─────────────────────────────────────────────
// useState — public API
// ─────────────────────────────────────────────

/**
 * React-compatible hook for local component state in lupine.web.
 *
 * Rules (same as React):
 *   - Call only at the top level of a component function
 *   - Call before any `await` inside the component
 *   - Must be called during renderComponentAsync (not in event handlers)
 *
 * Usage:
 *   const [count, setCount] = useState(0);
 *   const [label, setLabel] = useState('hello');
 */
export function useState<T>(initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const store = _currentStore;
  if (!store) {
    throw new Error('❌ useState must be called inside a component function.');
  }

  const idx = store.hookIndex++;

  // Only set the initial value once — preserve across rerenders
  if (idx >= store.states.length) {
    store.states.push(initial);
  }

  const setState = (newVal: T | ((prev: T) => T)) => {
    // SSR: no DOM to update
    if (!isFrontEnd()) return;
    // Batch: if a rerender is already scheduled, just update the value
    const resolved = typeof newVal === 'function' ? (newVal as (prev: T) => T)(store.states[idx]) : newVal;
    store.states[idx] = resolved;

    if (store.isDirty) return;
    store.isDirty = true;

    Promise.resolve().then(async () => {
      try {
        await store.rerender();
      } finally {
        store.isDirty = false;
      }
    });
  };

  return [store.states[idx], setState];
}

// ─────────────────────────────────────────────
// Internal: build the _stateRef for a store and merge with an existing user ref
// Called from renderComponentAsync after type.call()
// ─────────────────────────────────────────────

export const buildStateRef = (store: ComponentStateStore, existingRef?: RefProps): RefProps => {
  // Use the user's ref object as the target (or create a fresh one).
  // bindRef writes .current, .$, .$all, etc. directly onto the returned object —
  // so we must return the SAME object the user holds, otherwise ref.current /
  // ref.$ would never get updated.
  const target: RefProps = existingRef ?? {};

  // Save the user's ORIGINAL callbacks the first time only (before first mount).
  // On rerenders, target.onLoad is already our wrapper — don't re-read it.
  if (!store._mounted) {
    store._userOnLoad = existingRef?.onLoad ?? null;
    store._userOnUnload = existingRef?.onUnload ?? null;
  }

  if (existingRef?.globalCssId) {
    target.globalCssId = existingRef.globalCssId;
  }

  // Install a fresh wrapper every render so bindRef always calls OUR function.
  target.onLoad = async (el: Element) => {
    // Always keep the live element reference up to date.
    store.domRef.current = el;

    // Call the user's original onLoad ONLY on the initial mount.
    // On rerenders we skip it — this prevents infinite loops when onLoad
    // contains setState (which would trigger rerender → onLoad → setState → …).
    // This mirrors React's useEffect(() => fn, []) semantics.
    if (!store._mounted) {
      store._mounted = true; // set BEFORE await to block concurrent initial calls
      if (store._userOnLoad) {
        await store._userOnLoad(el);
      }
    }
  };

  if (store._userOnUnload) {
    target.onUnload = async (el: Element) => {
      await store._userOnUnload!(el);
    };
  }

  // Bind the programmatic functional component refresh trigger
  target.refresh = async () => {
    store.domRef.current = target.current; // ensure the store has the latest DOM node reference from the ref
    await store.rerender();
  };

  return target;
};

// ─────────────────────────────────────────────
// Unified Component Execution Engine
// Safely executes a component with its StateStore, resolving promises,
// and injecting lifecycle refs onto the returned VNode.
// ─────────────────────────────────────────────
export async function evaluateComponentWithStore(store: ComponentStateStore<any>): Promise<any> {
  // Reset hook index so hooks run in the same order (states[] values are preserved).
  store.hookIndex = 0;

  // ① Set _currentStore so that useState() calls inside componentFn read from THIS store.
  setCurrentStore(store);
  const resultMaybePromise = store.componentFn.call(null, store.componentProps);
  
  // ← Clear global pointer BEFORE any await (Node.js single-thread guarantee keeps this safe)
  clearCurrentStore(); 

  let dom: any = null;
  if (
    resultMaybePromise &&
    typeof resultMaybePromise === 'object' &&
    'then' in resultMaybePromise &&
    typeof (resultMaybePromise as any).then === 'function'
  ) {
    dom = await resultMaybePromise;
  } else {
    dom = resultMaybePromise;
  }

  // ② Re-inject stateRef onto the new root element so that after it mounts,
  //    store.domRef.current is updated to the NEW element via the new ref's onLoad.
  if (dom && typeof dom === 'object' && !Array.isArray(dom)) {
    if (!dom.props) dom.props = {};
    if (store.hookIndex > 0 || dom.props.ref) {
      dom.props.ref = buildStateRef(store, dom.props.ref);
    }
  }

  return dom;
}
