import { Carousel } from './carousel';
import { Card } from '../card';
import { Avatar } from '../avatar';
import { DemoStory } from '../../demo/demo-types';

export const carouselDemo: DemoStory<any> = {
  id: 'carouselDemo',
  text: 'Carousel',
  args: {
    showDots: true,
    showArrows: true,
    autoplay: false,
    interval: 4000,
  },
  argTypes: {
    showDots: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    autoplay: { control: 'boolean' },
    interval: { control: 'number' },
  },
  render: (args: any) => {
    const css = {
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
      padding: '24px',
      '.section-title': {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: 'var(--primary-color)',
        borderBottom: '2px solid var(--secondary-border-color)',
        paddingBottom: '10px',
      },
      '.carousel-container': {
        maxWidth: '800px',
        margin: '0 auto',
        // backgroundColor: '#fff',
      },
    };

    const productCards = [
      <Card
        cover={<img src='https://picsum.photos/seed/c1/800/400' style={{ height: '300px', objectFit: 'cover' }} />}
        title='Professional Violin'
        description='Handcrafted in Italy using aged spruce and maple. Exceptional tone quality for soloists.'
        footer={
          <button
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'var(--secondary-bg-color)',
              color: 'var(--secondary-color)',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            View Detail
          </button>
        }
      />,
      <Card
        cover={<img src='https://picsum.photos/seed/c2/800/400' style={{ height: '300px', objectFit: 'cover' }} />}
        title='Modern Cello'
        description='Deep, resonant sound with excellent projection. Perfect for advanced students and conservatory levels.'
        footer={
          <button
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'var(--secondary-bg-color)',
              color: 'var(--secondary-color)',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            View Detail
          </button>
        }
      />,
      <Card
        cover={<img src='https://picsum.photos/seed/c3/800/400' style={{ height: '300px', objectFit: 'cover' }} />}
        title='Premium Bow Collection'
        description='Graphite and Pernambuco sticks carefully balanced for professional requirements.'
        footer={
          <button
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'var(--secondary-bg-color)',
              color: 'var(--secondary-color)',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            View Detail
          </button>
        }
      />,
    ];

    const profileCards = [
      <Card
        horizontal
        avatar={<Avatar src='https://picsum.photos/seed/p1/200' size='xl' online />}
        title='Master Wang'
        description='Famous violinist with 40 years of teaching experience. Specialized in Paganini Caprices.'
      />,
      <Card
        horizontal
        avatar={<Avatar src='https://picsum.photos/seed/p2/200' size='xl' status='busy' />}
        title='Dr. Emily Chen'
        description='Orchestral director and chamber music expert. PhD from Juilliard School.'
      />,
      <Card
        horizontal
        avatar={<Avatar src='https://picsum.photos/seed/p3/200' size='xl' online />}
        title='Sarkis Baghdassarian'
        description='Concertmaster of the Lupine Symphony. Renowned for rich vibrato and technical precision.'
      />,
    ];

    return (
      <div css={css}>
        <section>
          <div class='section-title'>Product Showreel (Arrows + Dots)</div>
          <div class='carousel-container'>
            <Carousel {...args}>{productCards}</Carousel>
          </div>
        </section>

        <section>
          <div class='section-title'>Instructor Highlights (Dots Only)</div>
          <div class='carousel-container'>
            <Carousel showDots={true} showArrows={false} autoplay={args.autoplay}>
              {profileCards}
            </Carousel>
          </div>
        </section>

        <section>
          <div class='section-title'>Mixed Content Carousel</div>
          <div class='carousel-container'>
            <Carousel showDots={false} showArrows={true} autoplay={args.autoplay}>
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f0f4f8',
                  color: '#2c3e50',
                  fontSize: '24px',
                }}
              >
                Custom HTML Slide 1
              </div>
              <Card
                title='Integrated Card Slide'
                description='This card is directly integrated as a slide in the carousel.'
                cover={
                  <img src='https://picsum.photos/seed/m1/800/400' style={{ height: '200px', objectFit: 'cover' }} />
                }
              />
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#e8f5e9',
                  color: '#2e7d32',
                  fontSize: '24px',
                }}
              >
                Custom HTML Slide 3
              </div>
            </Carousel>
          </div>
        </section>
      </div>
    );
  },
  code: `import { Carousel } from 'lupine.components/component-pool';

<Carousel showDots={true} showArrows={true} autoplay={true} interval={4000}>
  <div class="slide">Slide 1</div>
  <div class="slide">Slide 2</div>
</Carousel>
`,
};
