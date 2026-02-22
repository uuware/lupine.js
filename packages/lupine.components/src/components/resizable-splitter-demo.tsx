import { DemoStory } from '../demo/demo-types';
import { ResizableSplitter } from './resizable-splitter';

export const resizableSplitterDemo: DemoStory<any> = {
  id: 'resizable-splitter-demo',
  text: 'Resizable Splitter Demo',
  args: {
    isVertical: true,
  },
  argTypes: {
    isVertical: { control: 'boolean', description: 'If true, splits left/right. If false, splits top/bottom' },
  },
  render: (args) => {
    // The splitter hook targets a selector, so we create a unique container.
    const containerId = 'splitter-demo-box';

    // The logic expects to re-mount the splitter or reload the page for structural updates normally,
    // but we can hack it together for the demo by destroying and recreating the DOM.
    // For simplicity, we just use a fixed layout that reacts to the boolean toggle.

    if (args.isVertical) {
      return (
        <div style={{ display: 'flex', width: '600px', height: '400px', border: '1px solid #999', padding: '20px' }}>
          <div
            id={containerId}
            style={{
              width: '200px',
              height: '100%',
              backgroundColor: '#eee',
              position: 'relative',
            }}
          >
            <div style={{ padding: '10px' }}>Left Panel (Drag right edge)</div>
            {ResizableSplitter.getSplitter(`#${containerId}`, true, true)}
          </div>
          <div style={{ flex: 1, backgroundColor: '#ddd', padding: '10px' }}>Right Panel (Flex 1)</div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '600px',
            height: '400px',
            border: '1px solid #999',
            padding: '20px',
          }}
        >
          <div
            id={containerId}
            style={{
              height: '150px',
              width: '100%',
              backgroundColor: '#eee',
              position: 'relative',
            }}
          >
            <div style={{ padding: '10px' }}>Top Panel (Drag bottom edge)</div>
            {ResizableSplitter.getSplitter(`#${containerId}`, false, false)}
          </div>
          <div style={{ flex: 1, backgroundColor: '#ddd', padding: '10px' }}>Bottom Panel (Flex 1)</div>
        </div>
      );
    }
  },
};
