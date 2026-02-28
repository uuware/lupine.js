import { CssProps } from 'lupine.web';
import { HtmlVar } from '../../components/html-var';
import { Card } from '../card';
import { PullToRefresh, PullToRefreshCloseProps } from './pull-to-refresh';

export const pullToRefreshDemo = {
  id: 'pull-to-refresh-demo',
  text: 'PullToRefresh',
  title: 'Display/PullToRefresh',
  args: {},
  argTypes: {},
  render: (args: any) => {
    const css: CssProps = {
      display: 'flex',
      flexDirection: 'column',
      height: '400px',
      border: '1px solid var(--secondary-border-color)',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'var(--secondary-bg-color)',

      '.scroll-container': {
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      },
    };

    const listDom = new HtmlVar('');

    const generateItems = () => {
      return Array.from({ length: 10 }, (_, i) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: `Item ${i + 1}`,
        description: `This is the description for item ${
          i + 1
        }. On mobile devices, pull down to refresh and see new items!`,
      }));
    };

    let items = generateItems();

    const updateList = () => {
      listDom.value = (
        <>
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              style={{ backgroundColor: 'var(--primary-bg-color)' }}
            />
          ))}
        </>
      );
    };

    const onDragRefresh = async (close: PullToRefreshCloseProps) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      items = [
        {
          id: 'new-' + Date.now(),
          title: 'Directly Refreshed!',
          description: 'This item was added after a pull-to-refresh action.',
        },
        ...generateItems().slice(0, 9),
      ];
      updateList();
      close();
    };

    updateList();

    return (
      <div css={css}>
        <div class='scroll-container'>
          <PullToRefresh container='.scroll-container' onDragRefresh={onDragRefresh} />
          {listDom.node}
        </div>
      </div>
    );
  },
  code: `
<div class='container' style={{ height: '400px', overflowY: 'auto' }}>
  <PullToRefresh 
    container='.container' 
    onDragRefresh={async (close) => {
      await fetchData();
      close();
    }} 
  />
  {/* List content here */}
</div>
`,
};
