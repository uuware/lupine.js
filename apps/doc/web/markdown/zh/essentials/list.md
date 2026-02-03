---
title: List (高性能列表渲染与编辑)
---

# 高性能列表渲染与编辑

Lupine.js 采用了一种独特的 **"组件级渲染 (Component-Level Rendering)"** 策略，这与 React 或 Vue 等传统的虚拟 DOM 框架有显著不同。这种方法在处理大型列表和复杂数据表格（例如管理后台 Admin Panel）时特别强大。

## 1. ⚡ 为什么它很快？

在传统框架（如 React）中，当你更新列表中的某一项时：

1.  你调用 `setState`。
2.  框架重新渲染 **整个列表组件 (List Component)**。
3.  它运行“Diff 算法”，将包含 100 多个项目的新虚拟树与旧树进行对比。
4.  最后，它更新那一个发生变化的 DOM 元素。

**在 Lupine.js 中，我们完全跳过了第 2 步和第 3 步。**

因为 Lupine 使用 **手动响应式 (HtmlVar[🔗](../lupine.components/html-var))**，你可以直接通过 `dom.value = <>...</>` 来更新特定的 DOM 元素，而无需触发自上而下的重渲染。这类似于在 React 中使用极其优化的 `React.memo` 组件，但在 Lupine.js 中，这是 **默认行为**，而非一种可选的优化手段。

## 2. 🎯 "点对点更新 (Spot-Update)" 策略

列表中的每一行都充当一个孤岛。它拥有自己的 `HtmlVar` 和 `ref`。当数据发生变化时，你只需在该特定行的变量上调用 `.value = ...`。页面的其余部分保持为静态的 HTML 字符串，维护成本为 **零**。

### 优势

- **零 Diff 成本**：改变一行的开销是 `O(1)`，而不是 `O(N)`（N 为列表大小）。
- **可预测的性能**：没有“浪费的渲染 (wasted renders)”。
- **低内存占用**：我们不需要为列表的静态部分在内存中维护一棵沉重的虚拟 DOM 树。

---

## 3. 💻 代码示例：可编辑列表

下面展示了如何实现一个高性能的可编辑列表。

### 📦 第一步：列表容器（父组件）

父组件负责初始化渲染列表，但当子项发生变化时，**不需要**重新渲染。

```tsx
// BookList.tsx
export const BookList = () => {
  // 1. 初始数据加载
  let items = getSampleData();

  // 2. 渲染静态列表
  // 注意：如果我们只是编辑项目，我们不需要为整个列表维护 State！
  return (
    <div class='list'>
      {items.map((item) => (
        <BookShowItem key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### ⚡ 第二步：优化后的行（子组件）

子组件将内容包裹在 `HtmlVar` 中。这允许它独立地“重绘”自己。

```tsx
// BookShowItem.tsx
import { HtmlVar, RefProps } from 'lupine.components';

export const BookShowItem = (props: { item: SampleDataProps }) => {
  const ref: RefProps = { id: '' };

  // 1. 定义内部渲染逻辑
  const makeDom = (item: SampleDataProps) => (
    <div class='row-box'>
      <div>Name: {item.name}</div>
      <button onClick={onEdit}>编辑</button>
    </div>
  );

  // 2. 为这一行创建一个 "响应式盒子 (Reactive Box)"
  const dom = new HtmlVar(makeDom(props.item));

  // 3. 更新逻辑：只更新这一个 DOM！
  const update = (newItem: SampleDataProps) => {
    // 手动触发仅针对此行的更新
    dom.value = makeDom(newItem);
  };

  const onEdit = () => {
    // 显示模态框，获取新数据，然后调用 update(newItem)
    showEditModal(props.item, (newItem) => {
      update(newItem);
    });
  };

  return (
    <div ref={ref} class='sample-data-row'>
      {dom.node} {/* 使用 dom.node 嵌入响应式插槽 */}
    </div>
  );
};
```

### ✏️ 第三步：行内编辑（进阶）

你甚至可以完全为单行切换“查看模式”与“编辑模式”，而不影响其他行。

```tsx
// BookShowItem 内部
const onToggleEdit = () => {
  if (isEditing) {
    dom.value = makeViewMode(item);
  } else {
    dom.value = makeEditMode(item);
  }
  isEditing = !isEditing;
};
```

## 总结

虽然这种方法需要编写稍微多一点的“显式”代码（定义 `HtmlVar` 和 `makeDom`），但它为你提供了在重数据应用中难以匹敌的 **控制力** 和 **高性能**。实际上，你就像是自己的“编译器”，精确地告诉浏览器在何时更新什么内容。
