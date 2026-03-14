import { isFrontEnd } from '../lib/is-frontend';
import { RefProps, VNode } from '../jsx';
import { mountOuterComponent } from './mount-component';

// ─────────────────────────────────────────────
// ComponentStateStore
// ─────────────────────────────────────────────

export class ComponentStateStore {
  states: any[] = [];
  hookIndex = 0;
  componentFn: Function;
  componentProps: any;
  /** The internal ref that tracks the component's root DOM element */
  domRef: RefProps = {};
  /** Prevent concurrent rerenders from stacking */
  isDirty = false;
  /** True after the root element has been mounted for the first time */
  _mounted = false;
  /** User's original onLoad/onUnload — saved once so rerenders don't re-read the mutated ref */
  _userOnLoad?: ((el: Element) => Promise<void>) | null;
  _userOnUnload?: ((el: Element) => Promise<void>) | null;

  constructor(componentFn: Function, componentProps: any) {
    this.componentFn = componentFn;
    this.componentProps = componentProps;
  }

  async rerender() {
    if (!this.domRef.current) return;
    const el = this.domRef.current as Element;

    // Reset hook index so hooks run in the same order (states[] values are preserved).
    this.hookIndex = 0;

    // ① Set _currentStore so that useState() calls inside componentFn read
    //    from THIS store (not a new one). Cleared before any await — same
    //    single-thread guarantee as in renderComponentAsync.
    setCurrentStore(this);
    const resultMaybePromise = this.componentFn.call(null, this.componentProps);
    clearCurrentStore(); // ← BEFORE await

    const newVNode: VNode<any> = resultMaybePromise?.then ? await resultMaybePromise : resultMaybePromise;

    // ② Re-inject stateRef onto the new root element so that after
    //    mountOuterComponent replaces the old DOM node, store.domRef.current
    //    is updated to the NEW element via the new ref's onLoad.
    if (newVNode && newVNode.props) {
      const existingRef = newVNode.props.ref;
      newVNode.props.ref = buildStateRef(this, existingRef);
    }

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

  return target;
};
