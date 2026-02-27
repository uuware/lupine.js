import { Card } from './card';
import { Avatar } from '../avatar';
import { DemoStory } from '../../demo/demo-types';
import { MediaQueryRange } from 'lupine.components';

export const cardDemo: DemoStory<any> = {
  id: 'cardDemo',
  text: 'Card',
  args: {
    hoverable: true,
  },
  argTypes: {
    hoverable: {
      control: 'boolean',
      description: 'Whether the card shows a hover effect',
    },
  },
  render: (args: any) => {
    const css = {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      padding: '24px',
      '.section-title': {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: 'var(--primary-color)',
        borderBottom: '2px solid var(--secondary-border-color)',
        paddingBottom: '8px',
      },
      '.card-grid': {
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(4, 1fr)',
        [MediaQueryRange.DesktopBelow]: {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        [MediaQueryRange.MobileBelow]: {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [MediaQueryRange.ExtraSmallBelow]: {
          gridTemplateColumns: '1fr',
        },
      },
      '.demo-row': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
      },
    };

    const productItems = [
      { id: 1, title: 'Premium Violin Stand', price: '$49.99', img: 'https://picsum.photos/seed/v1/400/300' },
      { id: 2, title: 'Professional Bow', price: '$129.00', img: 'https://picsum.photos/seed/v2/400/500' },
      { id: 3, title: 'Silk String Set', price: '$25.00', img: 'https://picsum.photos/seed/v3/400/300' },
      { id: 4, title: 'Rosin High Grade', price: '$12.50', img: 'https://picsum.photos/seed/v4/400/300' },
      { id: 5, title: 'Violin Case Carbon', price: '$299.00', img: 'https://picsum.photos/seed/v5/400/200' },
      { id: 6, title: 'Shoulder Rest', price: '$35.00', img: 'https://picsum.photos/seed/v6/400/300' },
    ];

    return (
      <div css={css}>
        {/* Responsive Grid Section */}
        <section>
          <div class='section-title'>Responsive Product Grid (4 &rarr; 3 &rarr; 2 &rarr; 1)</div>
          <div class='card-grid'>
            {productItems.map((item) => (
              <Card
                hoverable={args.hoverable}
                cover={<img src={item.img} alt={item.title} />}
                title={item.title}
                description='High-quality accessory for professional musicians.'
                footer={
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                  >
                    <span style={{ fontWeight: 'bold', color: 'var(--success-color, #2ecc71)' }}>{item.price}</span>
                    <button
                      style={{
                        padding: '4px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: 'var(--primary-color)',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Buy
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        </section>

        {/* Profile Layouts */}
        <section>
          <div class='section-title'>Profile Layouts</div>
          <div class='demo-row'>
            <Card
              style={{ width: '300px' }}
              hoverable={args.hoverable}
              avatar={<Avatar src='https://picsum.photos/seed/p1/150' size='lg' online />}
              title='John Doe'
              description='Senior Violin Instructor at Lupine Academy. 15+ years of experience in classical music.'
              extra={
                <button
                  style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}
                >
                  Follow
                </button>
              }
            />

            <Card
              style={{ width: '300px' }}
              hoverable={args.hoverable}
              horizontal
              avatar={<Avatar src='https://picsum.photos/seed/p2/150' size='md' status='away' />}
              title='Jane Smith'
              description='Orchestra Conductor'
            />
          </div>
        </section>

        {/* Horizontal Card */}
        <section>
          <div class='section-title'>Horizontal Product (Responsive)</div>
          <Card
            hoverable={args.hoverable}
            horizontal
            cover={<img src='https://picsum.photos/seed/b1/400/300' />}
            title='Lupine Master Collection Book'
            description='The ultimate guide to mastering Lupine.js framework. Includes deep dives into reactive state, SSR, and component design patterns. Essential for modern web developers.'
            footer={
              <div style={{ gap: '12px', display: 'flex' }}>
                <button
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid var(--primary-color)',
                    background: 'none',
                  }}
                >
                  Preview
                </button>
                <button
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--primary-color)',
                    color: '#fff',
                  }}
                >
                  Add to Cart
                </button>
              </div>
            }
          />
        </section>
      </div>
    );
  },
  code: `import { Card } from 'lupine.components/component-pool';

<Card 
  title="Card Title" 
  description="Card description goes here."
  cover={<img src="..." />}
  footer={<button>Action</button>}
/>

<Card horizontal title="Row Item" avatar={<Avatar src="..." />} />
`,
};
