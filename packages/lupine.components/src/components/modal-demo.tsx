import { DemoStory } from '../demo/demo-types';
import { ModalWindow } from './modal';
import { Button, ButtonSize } from './button';

export const modalDemo: DemoStory<any> = {
  id: 'modal-demo',
  text: 'Modal Window Demo',
  args: {
    title: 'Example Modal',
    noMoving: true,
    noModal: false,
    contentMinWidth: '300px',
  },
  argTypes: {
    title: { control: 'text', description: 'Title of the modal' },
    noMoving: { control: 'boolean', description: 'Disable dragging?' },
    noModal: { control: 'boolean', description: "If true, it won't block background interaction" },
    contentMinWidth: { control: 'text', description: 'Minimum width of modal' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        <Button
          text='Open Modal'
          size={ButtonSize.Medium}
          onClick={() => {
            ModalWindow.show({
              title: args.title,
              children: <div style={{ padding: '20px' }}>This is the modal content!</div>,
              noMoving: args.noMoving,
              noModal: args.noModal,
              contentMinWidth: args.contentMinWidth,
              buttons: ['Cancel', 'Confirm'],
              handleClicked: (ind, close) => {
                console.log('Clicked button:', ind);
                close();
              },
            });
          }}
        />
      </div>
    );
  },
};
