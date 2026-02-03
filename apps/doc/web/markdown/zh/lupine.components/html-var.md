---
title: HtmlVar
---

# HtmlVar

`HtmlVar` 是 Lupine.js 响应式系统的核心原语。与试图自动检测状态变化的现代框架不同，`HtmlVar` 提供了一个手动的“句柄 (Handle)”，让你可以随时更新特定的 DOM 插槽。

## 1. 正确用法

`HtmlVar` 并不是一个像 `<HtmlVar />` 那样去渲染的组件，而是一个你需要实例化的 **类 (Class)**。

1.  创建一个实例：`const dom = new HtmlVar(initialValue)`。
2.  将其节点嵌入到 JSX 中：`{dom.node}`。
3.  显式地更新它：`dom.value = newValue`。

### 示例

```tsx
import { HtmlVar, RefProps } from 'lupine.components';

const TestButton = () => {
  // 1. 创建响应式变量
  const dom = new HtmlVar('');

  // 2. 定义更新它的操作
  const onClick = async () => {
    // 这会对下方的 DOM 元素触发“点对点更新 (Spot Update)”
    dom.value = '你点击了按钮。';
  };

  const ref: RefProps = {
    onLoad: async () => {
      dom.value = '这个值是在 onLoad 事件中设置的。';
    },
  };

  return (
    <div ref={ref} class='row-box pt-m'>
      <button onClick={onClick} class='button-base'>
        点我！
      </button>
      {/* 3. 在这里放置 "锚点" */}
      <div class='pl-m'>{dom.node}</div>
    </div>
  );
};
```

## 2. 与现代框架的对比

如果你来自 React、Vue 或 SolidJS 背景，这看起来可能稍微繁琐一些。

| 框架          | 机制                                       | 代码语法                                     |
| :------------ | :----------------------------------------- | :------------------------------------------- |
| **React**     | 虚拟 DOM Diff (Virtual DOM Diffing)        | `const [val, setVal] = useState(0);`         |
| **SolidJS**   | 细粒度信号 (Fine-Grained Signals)          | `const [val, setVal] = createSignal(0);`     |
| **Lupine.js** | **手动定点替换 (Manual Spot Replacement)** | `const val = new HtmlVar(0); val.value = 1;` |

**权衡 (The Trade-off):**

- **现代框架**：专注于“开发者体验 (DX)”。你改变状态，魔法自动发生。
- **Lupine.js**：专注于“显式性能”。你明确告诉浏览器 _哪一个_ `<div>` 需要更新。没有猜测，也不会有意外的重渲染。

## 3. 推荐的辅助函数：`val<T>`

如果你更喜欢“信号 (Signals)”的现代语法，你可以使用 `val` 辅助函数。它在功能上与 `HtmlVar` 完全相同，但提供了一种让人感觉像“自动更新”的语法糖。

```tsx
// 1. 定义辅助函数（或从 lib 中导入）
export function val<T>(initial: T) {
  const internal = new HtmlVar(initial);
  // Getter
  const signal = () => internal.value;
  // Setter
  signal.set = (v: T) => {
    internal.value = v;
  };
  // Renderable Node
  signal.jsx = () => internal.node;
  return signal;
}

// 2. 用法
const Counter = () => {
  const count = val(0);

  return (
    <div>
      <button onclick={() => count.set(count() + 1)}>增加</button>

      {/* 看起来像现代框架！ */}
      <span>{count.jsx()}</span>
    </div>
  );
};
```

事实上，无论你直接使用 `HtmlVar` 类还是 `val()` 包装器，其底层机制都是一样的：**对外科手术般精准的 DOM 片段进行更新，而无需 Diff。**
