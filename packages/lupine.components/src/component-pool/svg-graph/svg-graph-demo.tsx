import { RefProps } from 'lupine.web';
import { SvgGraph } from './svg-graph';
import { DemoStory } from '../../demo/demo-types';

const SvgGraphDemo = () => {
  const ref: RefProps = {
    onLoad: async (el) => {
      const graph = new SvgGraph(el as HTMLElement);

      // Draw a line
      graph.drawLine('red', '2px', 50, 50, 250, 50, 'line1');

      // Draw a rect
      graph.draw('rect', '#e0f7fa', '#00acc1', '2px', 50, 100, 100, 50, 'rect1');

      // Draw an ellipse
      graph.draw('ellipse', '#fce4ec', '#d81b60', '2px', 200, 100, 100, 50, 'ellipse1');

      // Draw a rounded rect
      graph.draw('roundrect', '#e8f5e9', '#43a047', '2px', 50, 200, 150, 60, 'roundrect1');

      // Test resize after 1s
      setTimeout(() => {
        graph.resize('line1', 50, 50, 300, 100);
      }, 1000);
    },
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3>SvgGraph Component Demo</h3>
      <p>This demonstrates the imperative SVG Graph API modernized from legacy JGraph.</p>

      <div
        ref={ref}
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          border: '1px solid #ccc',
          marginTop: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        {/* SVG will be injected here */}
      </div>
    </div>
  );
};

export const svgGraphDemo: DemoStory<any> = {
  id: 'svg-graph-demo',
  text: 'Svg Graph',
  args: {},
  render: (args: any) => {
    return <SvgGraphDemo />;
  },
  code: 'import { SvgGraph } from "lupine.components/src/component-pool/svg-graph";\n// Check source code for usage.',
};
