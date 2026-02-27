import { DemoStory } from '../../demo/demo-types';
import { MapWrapper, MapWrapperProps } from './map-wrapper';

export const mapWrapperDemo: DemoStory<MapWrapperProps> = {
  id: 'map-wrapper',
  text: 'MapWrapper',
  args: {
    lat: 35.6762,
    lng: 139.6503,
    zoom: 13,
    height: '350px',
  },
  argTypes: {
    lat: { control: 'number', description: 'Center latitude' },
    lng: { control: 'number', description: 'Center longitude' },
    zoom: { control: 'number', description: 'Zoom level (1-19)' },
    height: { control: 'text', description: 'Map height' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h3 style={{ marginBottom: '8px' }}>Interactive Map (OpenStreetMap)</h3>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>
            Adjust lat/lng/zoom in the controls panel. Powered by OpenStreetMap — no API key required.
          </p>
          <MapWrapper {...args} />
        </div>

        <div>
          <h3 style={{ marginBottom: '8px' }}>New York City</h3>
          <MapWrapper lat={40.7128} lng={-74.006} zoom={12} height='250px' />
        </div>

        <div>
          <h3 style={{ marginBottom: '8px' }}>London</h3>
          <MapWrapper lat={51.5074} lng={-0.1278} zoom={12} height='250px' />
        </div>
      </div>
    );
  },
  code: `import { MapWrapper } from 'lupine.components/component-pool';

// Basic usage — centers on Tokyo by default
<MapWrapper />

// Custom location
<MapWrapper lat={40.7128} lng={-74.0060} zoom={12} height="400px" />

// With hook for programmatic reload
const hook: MapWrapperHookProps = {};
<MapWrapper lat={35.6762} lng={139.6503} hook={hook} />
// Later: hook.reload?.();
`,
};
