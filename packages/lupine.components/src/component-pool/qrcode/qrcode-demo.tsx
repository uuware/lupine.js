import { DemoStory } from '../../demo/demo-types';
import { QRCode, QRCodeProps } from './qrcode';

interface QRCodeDemoArgs {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  logoSrc: string;
  logoSize: number;
}

export const qrcodeDemo: DemoStory<QRCodeDemoArgs> = {
  id: 'qrcode-demo',
  text: 'QR Code',
  args: {
    value: 'https://lupine.js.org/',
    size: 180,
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    level: 'H',
    logoSrc: '',
    logoSize: 36,
  },
  argTypes: {
    value: { control: 'text', description: 'URL or text to encode into the QR code' },
    size: { control: 'number', description: 'Width and height of the QR code (px)' },
    fgColor: { control: 'color', description: 'Foreground (module) color' },
    bgColor: { control: 'color', description: 'Background color' },
    level: {
      control: 'select',
      options: ['L', 'M', 'Q', 'H'],
      description: 'Error correction level (L=7%, M=15%, Q=25%, H=30%)',
    },
    logoSrc: { control: 'file', description: 'Logo image to embed in center (upload an image file)' },
    logoSize: { control: 'number', description: 'Logo image width & height (px)' },
  },
  render: (args: QRCodeDemoArgs) => {
    const imageSettings: QRCodeProps['imageSettings'] = args.logoSrc
      ? { src: args.logoSrc, width: args.logoSize, height: args.logoSize, excavate: true }
      : undefined;

    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Interactive QR Code</h3>
          <p style={{ color: '#666', fontSize: '12px', marginBottom: '16px' }}>
            Customise the settings in the controls panel on the right.
          </p>
          <QRCode
            value={args.value || 'https://lupine.js.org/'}
            size={args.size}
            fgColor={args.fgColor}
            bgColor={args.bgColor}
            level={args.level}
            imageSettings={imageSettings}
          />
        </div>

        <div>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Colored — High Error Correction</h3>
          <QRCode
            value='https://en.wikipedia.org/wiki/QR_code'
            size={150}
            fgColor='#004488'
            bgColor='#EEF4FF'
            level='H'
          />
        </div>

        <div>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>With Excavated Logo</h3>
          <QRCode
            value='https://github.com/'
            size={120}
            level='H'
            imageSettings={{
              src: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
              height: 30,
              width: 30,
              excavate: true,
            }}
          />
        </div>
      </div>
    );
  },
  code: `import { QRCode } from 'lupine.components/component-pool/qrcode';

// Basic usage
<QRCode value="https://example.com" size={180} />

// With logo excavation
<QRCode
  value="https://example.com"
  size={200}
  level="H"
  imageSettings={{ src: '/logo.png', width: 40, height: 40, excavate: true }}
/>
`,
};
