## State Management & UI Update Hierarchy

### 1. 🥇 Most Recommended (Default Choice): Precise DOM Manipulation with `ref.$()` / `ref.$all()`

This is the most advocated and highest-performance pattern in Lupine.js. In event callbacks or on data changes, directly update DOM attributes and styles using `ref.$`, avoiding any component-level full re-renders.

- **`ref.$('.&-xxx')`**: Queries the first matching element (supports component namespace replacement for `&`).
- **`ref.$all('.&-xxx')`**: Returns a list of all matching elements.
- **Example**:
  ```tsx
  export const MyComponent = () => {
    let score = 0;

    const ref: RefProps = {
      onLoad: async () => {
        // Initialize DOM
        const scoreEl = ref.$('.&-score');
        if (scoreEl) scoreEl.innerHTML = `Score: ${score}`;
      },
    };

    const onClickAdd = () => {
      score += 1;
      // 1. Directly query a single element via ref.$ and update it
      const scoreEl = ref.$('.&-score');
      if (scoreEl) scoreEl.innerHTML = `Score: ${score}`;

      // 2. Batch update a list of descendants via ref.$all
      ref.$all('.&-action-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === score % 2);
      });
    };

    const css: CssProps = {
      '.&-score': { fontSize: '18px', fontWeight: 'bold' },
      '.&-action-btn.active': { color: 'var(--primary-accent-color)' },
    };

    return (
      <div ref={ref} css={css}>
        <div class='&-score'></div>
        <button class='&-action-btn' onClick={onClickAdd}>Add</button>
        <button class='&-action-btn'>Other</button>
      </div>
    );
  };
  ```

---

### 2. 🥈 Secondary Choice: `HtmlVar` — Targeted Localized Updates (For dynamic large blocks / lists)

- Used to wrap dynamically updating regions (lists, async content, high-frequency updates, upload progress).
- **Pattern**:
  ```tsx
  const dom = new HtmlVar(initialContent); // 1. Create container
  // 2. Embed node in JSX
  return <div>{dom.node}</div>;
  // 3. Assign new value on update (updates only this local DOM, without re-rendering outer component)
  dom.value = updatedContent;
  ```

---

## Direct DOM Access & `RefProps`

- **RefProps Interface**:
  ```typescript
  const ref: RefProps = {
    onLoad: async (el: Element) => {
      // After mounting: initialize data, timers, event listeners
      await loadData();
    },
    onUnload: async (el: Element) => {
      // On unmounting: cleanup (timers, event unbinding)
    },
  };
  ```
- **DOM Query & Value Retrieval**:
  - `ref.$(selector)`: Queries the first matching element.
  - `ref.$all(selector)`: Queries all matching elements.
  - Getting input value: `const val = ref.$('input.my-class').value;`
  - ❌ **Strictly Prohibit Controlled Input Patterns**: Never write `value={state}`. Read form values directly from the DOM (`ref.$('input').value`) on submission.

---

## Common Pattern: List / Search Page (No Component Re-render)

```typescript
const MyPage = () => {
  let pageIndex = 0; // Logic variable, no need to declare as state
  const listDom = new HtmlVar(<div>Loading...</div>);

  const makeList = async () => {
    const data = await fetchData(pageIndex);
    return (
      <div>
        {data.map((item) => (
          <Item item={item} />
        ))}
      </div>
    );
  };

  const onSearch = async () => {
    const query = ref.$('input.&-search').value;
    pageIndex = 0;
    listDom.value = await makeList(); // Localized refresh
  };

  const ref: RefProps = {
    onLoad: async () => {
      listDom.value = await makeList();
    },
  };

  return (
    <div ref={ref}>
      <input class='&-search' />
      <button onClick={onSearch}>Go</button>
      {listDom.node}
    </div>
  );
};
```
