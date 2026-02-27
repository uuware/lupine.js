import { DemoStory } from '../../demo/demo-types';
import { SearchInput, SearchInputHookProps } from './search-input';
import { NotificationMessage, NotificationColor } from '../../components/notice-message';

export const searchInputDemo: DemoStory<any> = {
  id: 'search-input-demo',
  text: 'Search Input',
  args: {
    placeholder: 'Search here...',
  },
  argTypes: {
    placeholder: { control: 'text' },
  },
  render: (args: any) => {
    const hook: SearchInputHookProps = {};

    const handleSearch = (val: string) => {
      if (!val) {
        NotificationMessage.sendMessage('Please enter a keyword', NotificationColor.Warning);
        return;
      }
      NotificationMessage.sendMessage(`Searching for: ${val}`, NotificationColor.Success);
    };

    const handleClear = () => {
      NotificationMessage.sendMessage('Input cleared', NotificationColor.Info);
    };

    const handleSetValue = () => {
      if (hook.setValue) {
        hook.setValue('Lupine.js');
      }
    };

    return (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <h3>Search Input Demo</h3>
        <p>A simple search input component with clear button functionality.</p>

        <div style={{ marginBottom: '20px' }}>
          <SearchInput placeholder={args.placeholder} onSearch={handleSearch} onClear={handleClear} hook={hook} />
        </div>

        <button class='button-base' onClick={handleSetValue}>
          Set Value via Hook
        </button>
      </div>
    );
  },
};
