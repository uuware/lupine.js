import { describe, it, mock, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { renderComponentAsync } from './render-component';
import { domUniqueId } from './render-attribute';

describe('renderComponentAsync', () => {
  beforeEach(() => {
    mock.method(Date, 'now', () => 1775190809080);
    domUniqueId(true); // reset global module state for each test
  });

  afterEach(() => {
    mock.restoreAll();
  });

  // Helper to easily extract the rendered HTML string
  const getHtml = (props: any) => props._html.join('');

  describe('Basic HTML Elements Rendering', () => {
    it('should render standard HTML tags without attributes', async () => {
      const props = { _html: [] };
      await renderComponentAsync('div', props);
      assert.equal(getHtml(props), '<div></div>');
    });

    it('should render self-closing tags correctly', async () => {
      const props = { _html: [], src: 'image.png', alt: 'logo' };
      await renderComponentAsync('img', props);
      assert.equal(getHtml(props), '<img src="image.png" alt="logo" />');
    });
  });

  describe('Attributes Processing', () => {
    it('should correctly render basic attributes', async () => {
      const props = { _html: [], id: 'main', 'data-test': 'value', role: 'button' };
      await renderComponentAsync('section', props);
      assert.equal(getHtml(props), '<section id="main" data-test="value" role="button"></section>');
    });

    it('should convert object style property to inline CSS string', async () => {
      const props = { _html: [], style: { backgroundColor: 'red', fontSize: '12px' } };
      await renderComponentAsync('div', props);
      assert.equal(getHtml(props), '<div style="background-color:red;font-size:12px;"></div>');
    });

    it('should process default boolean attributes (disabled, readonly, selected, checked)', async () => {
      const props = { _html: [], disabled: true, readonly: 'true', checked: false, selected: 'selected' };
      await renderComponentAsync('input', props);
      // 'checked' is false, so it should be omitted entirely.
      assert.equal(getHtml(props), '<input disabled="true" readonly="true" selected="selected" />');
    });

    it('should handle defaultChecked converting it to checked="true"', async () => {
      const props = { _html: [], defaultChecked: true };
      await renderComponentAsync('input', props);
      assert.equal(getHtml(props), '<input checked="true" />');
    });
  });

  describe('Children Content Rendering', () => {
    it('should successfully render string and number children', async () => {
      const props = { _html: [], children: ['Balance: ', 100] };
      await renderComponentAsync('div', props);
      assert.equal(getHtml(props), '<div>Balance: 100</div>');
    });

    it('should gracefully ignore false, null, and undefined in children array', async () => {
      const props = { _html: [], children: [false, null, undefined, 'visible text'] };
      await renderComponentAsync('span', props);
      assert.equal(getHtml(props), '<span>visible text</span>');
    });

    it('should recursively render nested component children tree', async () => {
      const nestedChild = { type: 'strong', props: { _html: [], children: ['bold content'] } };
      const props = { _html: [], children: ['A ', nestedChild, ' end.'] };
      
      await renderComponentAsync('p', props);
      assert.equal(getHtml(props), '<p>A <strong>bold content</strong> end.</p>');
    });
  });

  describe('DangerouslySetInnerHTML Logic', () => {
    it('should render raw HTML correctly', async () => {
      const props = { _html: [], dangerouslySetInnerHTML: '<span>raw injected string</span>' };
      await renderComponentAsync('div', props);
      assert.equal(getHtml(props), '<div><span>raw injected string</span></div>');
    });
  });

  describe('Functional Components Resolution', () => {
    it('should execute synchronous functional components', async () => {
      const MockComponent = (p: any) => {
        return {
          type: 'h1',
          props: { children: [p.title] }
        };
      };
      
      const props = { _html: [], title: 'Lupine Test' };
      await renderComponentAsync(MockComponent as any, props);
      assert.equal(getHtml(props), '<h1>Lupine Test</h1>');
    });

    it('should await and execute asynchronous functional components', async () => {
      const AsyncMockComponent = async (p: any) => {
        // mock some async logic
        await new Promise((r) => setTimeout(r, 5));
        return {
          type: 'span',
          props: { children: ['Data Loaded'] }
        };
      };
      
      const props = { _html: [] };
      await renderComponentAsync(AsyncMockComponent as any, props);
      assert.equal(getHtml(props), '<span>Data Loaded</span>');
    });
  });

  describe('Fragment and Virtual Wrapper Handling', () => {
    it('should omit wrappers when using string type Fragment', async () => {
      const props = { _html: [], children: ['fragment inner text'] };
      await renderComponentAsync('Fragment', props);
      assert.equal(getHtml(props), 'fragment inner text');
    });

    it('should omit wrapper when using named Fragment function', async () => {
      const FragmentFunc = () => {};
      Object.defineProperty(FragmentFunc, 'name', { value: 'Fragment' });

      const props = { _html: [], children: ['named function wrapper'] };
      await renderComponentAsync(FragmentFunc as any, props);
      assert.equal(getHtml(props), 'named function wrapper');
    });
  });

  describe('CSS Mapping and Unique ID Implementations', () => {
    it('should inject global and unique IDs into the class attribute matching ampersand symbol', async () => {
      const props = { _html: [], class: 'base-cls &-item' };
      // Passing defined uniqueClassName and globalCssId
      await renderComponentAsync('div', props, 'u-id', 'g-id');
      
      // Based on renderAttribute logic, it replaces "&" with both global and unique IDs 
      assert.equal(getHtml(props), '<div class="base-cls g-id-item u-id-item"></div>');
    });

    it('should automatically prepend unique generated ID to class list when local CSS is present', async () => {
      // css must be an object, not a plain string, for processStyle to parse it correctly
      const props = { _html: [], css: { '.&-item': { color: 'block' } } };
      await renderComponentAsync('div', props);
      
      const output = getHtml(props);
      // Because Date.now() is mocked and baseTime is lazily initialized, 
      // the generated ID will always predictably be "l00"
      assert.equal(output, '<div class="l00" l00><style id="sty-l00">.l00 .l00-item{color:block;}</style></div>');
    });
  });
});
