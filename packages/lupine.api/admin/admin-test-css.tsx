import { HtmlVar } from "lupine.components";
import { bindGlobalStyle, CssProps, domUniqueId, getGlobalStylesId, RefProps, VNode } from "lupine.web";

export const TestCssSimpleCase = () => {
  const ref: RefProps = {
    onLoad: async () => {
      // 3. Querying namespaced elements
      const btn = ref.$('.&-btn');
      btn.innerHTML = 'Ready';
    },
  };

  const css: CssProps = {
    // Top-level rules apply to the root component container itself
    width: '100%',
    padding: '1rem',

    // 1. Defining namespaced sub-classes in CSS:
    '.&-title': { fontWeight: 'bold', color: 'red' },
    '.&-btn': {
      // Nesting pseudo-classes and combination modifiers (no space after &)
      '&:hover': { background: '#f0f0f0' },
      '&.active': { color: 'var(--primary-accent-color)' },
    },
    '&-sub-content': {
      border: '1px solid blue',
      whiteSpace: 'pre-wrap',
    },
  };

  return (
    // Setting css={css} safely bounds this style scope
    <aside css={css} ref={ref}>
      {/* 2. Applying namespaced classes in JSX */}
      <div class='&-title'>This is a simple CSS test case.</div>
      <button class='&-btn active' onClick={() => {
        const btn = ref.$('.&-btn');
        btn.classList.toggle('active');
      }}>Loading</button>

      <div class='&-sub-content'>{`
Sampe Code:
  1, define const cssInner: CssProps = {...};
  2, assign the css to a tag: <div css={cssInner}>...</div>
  All "&" in CSS Selectors or tag's classnames will be replaced with a dynamic unique id (l01 in this case).
        `}</div> {/* classname='g00-sub-content l01-sub-content' */}
    </aside>
  );
};

export const TestCssShareInside = () => {
  const cssInner: CssProps = {
    display: 'flex',
    margin: '16px',
    flexDirection: 'column',
    '.&-content': { // -> .l01 .l01-content
      color: 'red', // this will overwrite .g00 .g00-content
      fontWeight: 'bold',
    },
    '&-sub-top': {
      border: '1px solid red',
    },
    '&-sub-title': {
      border: '1px solid green',
    },
    '&-sub': {
      border: '1px solid blue',
    },
    '&-sub-content': {
      border: '1px solid blue',
      whiteSpace: 'pre-wrap',
    },
    '&-list-item': {
      color: 'blue',
    },
  };

  // if we want to share cssInner for all sub components, then add this:
  const ref: RefProps = {
    id: domUniqueId(), // = 'l01'
  }

  const listDom = new HtmlVar('');
  const renderList = () => {
    // Explicitly bind the inner detached DOM to the parent's id using referToCssId
    listDom.value = (
      <div class='&-list'>
        <div class='&-list-item'>HtmlVar List Item</div>
      </div>
    );
  };

  const SubContent1 = () => {
    const ref2: RefProps = {
      onLoad: async (el) => {
        // dooing something
      },
    };
    return (
      <div ref={ref2} class='&-sub-top'>
        Sub component without css.
      </div>
    );
  };

  const SubContent2 = (props: { children: VNode<any> }) => {
    // you only need referToCssId if the sub-component has its own css properties.
    const css2: CssProps = {
      color: 'blue',
    };
    const ref2: RefProps = {
      referToCssId: ref.id,
      onLoad: async (el) => {
        renderList();
      },
    };
    return (
      <div ref={ref2} css={css2} class='&-sub-top'> {/* classname='g00-sub-top' */}
        <div class='&-sub-title'>Sub component with its own css.</div> {/* classname='g00-sub-title' */}
        {listDom.node}
        {props.children}
      </div>
    );
  };

  return (
    <div ref={ref} css={cssInner}>
      <div class='&-content'>Highly recommend this approach which sutes for most cases:<br />When a component has a few sub components in one method, we can put all styles in one CSS variable, and assign the css and the cssId to the top element. Sub components will automatically inherit it in most cases!</div>
      <SubContent1 />
      <SubContent2>
        <div class='&-sub'>
          <div class='&-sub-content'>This is content passed to a component as a paramenter.</div>
          <div class='&-sub-content'>{`
Sampe Code:
  1, define const cssInner: CssProps = {...};
  2, create a ref to share the cssId:
    const ref: RefProps = {
      id: domUniqueId(),
    }
  3, assign the css and ref to the top node. In most cases you DO NOT need to pass the referToCssId to sub-components!
  When a componet has it's own css (with a new css id), then sub-components from this level start to use this new css id.
  If you want some sub-components to use the top parent's css id instead of its own, then you need to pass the referToCssId and it will be used to replace sub componet's "&" in classnames!
    <div ref={ref} css={cssInner}>
      <div css={cssInnerNew}>
        <div class='&-sub1'>...</div>
        ... in some sub components
        <div ref={{referToCssId: ref.id}} class='&-sub2'>...</div>
        ...
      </div>
    </div>
  In above sample, "&-sub1" will be replace with the new css id (cssInnerNew), "&-sub2" will be replaced with ref.id (cssInner).
          `}</div>
        </div>
      </SubContent2>
    </div>
  );
};

// if we want to share css cross components, we can use global style
const cssGlobal: CssProps = {
  '.&-top-container': {
    display: 'flex',
    margin: '16px',
    flexDirection: 'column',
    '&.test': {
      color: 'orange',
    }
  },
  '.&-content': { // -> .l01 .l01-content
    color: 'red', // this will overwrite .g00 .g00-content
    fontWeight: 'bold',
  },
  '.&-sub-top': {
    border: '1px solid red',
  },
  '.&-sub-title': {
    border: '1px solid green',
  },
  '.&-sub': {
    border: '1px solid blue',
  },
  '.&-sub-content': {
    border: '1px solid blue',
    whiteSpace: 'pre-wrap',
  },
};
export const TestGlobalCss = () => {
  // getGlobalStylesId can only be called in a componet, and it will be only added once to header
  const globalCssId = getGlobalStylesId(cssGlobal); // = 'g00'
  bindGlobalStyle(globalCssId, cssGlobal, false, true);

  const SubContent = (props: { children: VNode<any> }) => {
    return (
      <div class='&-sub-top'> {/* classname='g00-sub-top' */}
        <div class='&-sub-title'>This is a sub component.</div> {/* classname='g00-sub-title' */}
        {props.children}
      </div>
    );
  };

  return (
    <div ref={{ referToCssId: globalCssId }} class='&-top-container test'>
      <div class='&-content'>Share CSS cross components</div>
      <SubContent>
        <div class='&-sub'> {/* classname='g00-sub l01-sub' */}
          <div class='&-sub-content'>This is content passed to a component as a paramenter.</div> {/* classname='g00-sub-content l01-sub-content' */}
          <div class='&-sub-content'>{`
There are to ways to share CSS cross components:
Option 1, Application level: We can define a global application level CSS, and add it to header, then in all componets, we can use the same CSS Selectors to share the styles.
Sample code:
// define the shared CSS in a separete file
export const appSharedCss = {
  '.app-header-title': {
  },
  ...
  '.app-warning-color': {
    color: 'red',
  },
};
// add this in index.tsx
bindAppGlobalStyle('app-shared-css', appSharedCss, false, true); // the forth parameter noTopClassName = true means do not add any prefix to top level selectors.

So now, you can use app-header-title and app-warning-color in any componens.
In this case, all top level CSS Selectors have to be absolute selectors (can't have "&").

Option 2: Share CSS cross some components.
If you only want to share CSS between some components, and those components are defined in the same method, you can use the following approach.
Sample Code:
  1, define the CSS out of the component method, like:
     const cssShared: CssProps = {...};
  2, in top-level component, do this once:
     // getGlobalStylesId can only be called in a componet, and it will be only added once to header
     const globalCssId = getGlobalStylesId(cssShared);
     bindGlobalStyle(globalCssId, cssShared); // the forth parameter noTopClassName = false means globalCssId will be added to top level selectors.
  3, assign the css and ref to the top node (as globalCssId is added to top level selectors, so you MUST add it to the tag as class name).
    <div ref={{ referToCssId: globalCssId }} class={globalCssId}>
      ... in sub components
      <div>...</div>
      ...
    </div>

    All "&" in CSS Selectors or tag's classnames will be replaced with the same dynamic unique id (globalCssId in the example).
    
    What's the difference between noTopClassName = true or false?
const sampleCss = {
  '.selector-1': {},
};
    By default noTopClassName is false, and bindGlobalStyle(globalCssId, cssShared) will render as (suppose globalCssId=g00):
  '.g00 .selector-1': {} // that's the reason you need to add g00 to the top tag's classnmae
    In this case, sampleCss can have top level styles that will be applied to the top tag (e.g. color: 'red').

    If noTopClassName=true, bindGlobalStyle(globalCssId, cssShared, false, true) will render as (suppose globalCssId=g00):
  '.selector-1': {}
    In this case, you can't define top level styles in sampleCss! And you don't need to add globalCssId to the top tag's classnmae.

    Can I use both cssInner and referToCssId on one node (tag)?
    Not suggested but yes, you can. The cssInner will overwrite the referToCssId's styles if there is any conflict ( selector conflict or style conflict).
    `}</div>
        </div>
      </SubContent>
    </div>
  );
};

export const TestCssComponent = () => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    height: '100%',
    overflowY: 'auto',
  }
  return (
    <div css={css}>
      <TestCssSimpleCase />

      <TestCssShareInside />

      <TestGlobalCss />
    </div>
  );
};
