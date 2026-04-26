export type PropEditorType = 'text' | 'number' | 'color' | 'checkbox' | 'select' | 'textarea' | 'html' | 'css' | 'menu-select' | 'image-select' | 'carousel-cards' | 'chart-data';

export interface PropEditorDef {
  key: string;
  label: string;
  type: PropEditorType;
  options?: { label: string; value: string }[];
  defaultValue?: any;
  responsive?: boolean;
  showIf?: (props: Record<string, any>) => boolean;
}

export interface DesignComponentDef {
  type: string;
  label: string;
  icon?: string;
  defaultProps: Record<string, any>;
  propEditors: PropEditorDef[];
  // If true, this component can accept children (like a grid)
  isContainer?: boolean;
}

export const SpatialPropEditors: PropEditorDef[] = [
  {
    key: 'hidden',
    label: 'Hide Component',
    type: 'checkbox',
    responsive: true
  },
  {
    key: 'flex',
    label: 'Flex Grow Strategy',
    type: 'select',
    options: [{ label: 'Fill Remaining Space (flex: 1)', value: '1' }, { label: 'Fit Content (none)', value: 'none' }],
  }
];

export const ComponentRegistry: Record<string, DesignComponentDef> = {
  'block-page': {
    type: 'block-page',
    label: 'Page Layout',
    isContainer: true,
    defaultProps: {
      siteTitle: 'My Website',
      description: '',
      keywords: '',
      backgroundColor: '#ffffff',
      padding: '0px',
      overflowY: 'auto',
      layoutDirection: 'vertical',
      gridTemplate: 'auto 1fr auto',
    },
    propEditors: [
      { key: 'siteTitle', label: 'Site Title', type: 'text' },
      { key: 'description', label: 'SEO Description', type: 'textarea' },
      { key: 'keywords', label: 'SEO Keywords', type: 'text' },
      { key: 'backgroundColor', label: 'Base Theme Color', type: 'color' },
      { key: 'padding', label: 'Global Margin (Padding)', type: 'text', responsive: true },
      {
        key: 'overflowY',
        label: 'Overflow Y',
        type: 'select',
        options: [
          { label: 'Auto (Scroll if needed)', value: 'auto' },
          { label: 'Hidden (No scroll)', value: 'hidden' },
          { label: 'Scroll (Always scroll)', value: 'scroll' },
        ],
      },
      { 
        key: 'layoutDirection', 
        label: 'Layout Direction', 
        type: 'select', 
        options: [{ label: 'Vertical (Column)', value: 'vertical' }, { label: 'Horizontal (Row)', value: 'horizontal' }],
        responsive: true
      },
      { 
        key: 'gridTemplate', 
        label: 'Grid Distribution (auto, 1fr, 300px, etc.)', 
        type: 'text', 
        responsive: true,
      },
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-placeholder': {
    type: 'block-placeholder',
    label: 'Content Placeholder',
    isContainer: false,
    defaultProps: {
      flex: '1',
      overflowY: 'auto',
    },
    propEditors: [
      {
        key: 'overflowY',
        label: 'Overflow Y',
        type: 'select',
        options: [
          { label: 'Auto (Scroll if needed)', value: 'auto' },
          { label: 'Hidden (No scroll)', value: 'hidden' },
          { label: 'Scroll (Always scroll)', value: 'scroll' },
        ],
      },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ]
  },
  'block-grid': {
    type: 'block-grid',
    label: 'Grid Layout',
    isContainer: true,
    defaultProps: {
      flex: '1',
      layoutDirection: 'horizontal',
      gridTemplate: '1fr 1fr',
      gap: '16px',
      padding: '0px',
    },
    propEditors: [
      { 
        key: 'layoutDirection', 
        label: 'Layout Direction', 
        type: 'select', 
        options: [{ label: 'Vertical (Column)', value: 'vertical' }, { label: 'Horizontal (Row)', value: 'horizontal' }],
        responsive: true
      },
      { 
        key: 'gridTemplate', 
        label: 'Grid Distribution (auto, 1fr, 300px, etc.)', 
        type: 'text', 
        responsive: true
      },
      { key: 'gap', label: 'Gap Size', type: 'text', responsive: true },
      { key: 'padding', label: 'Internal Padding', type: 'text', responsive: true },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-flex': {
    type: 'block-flex',
    label: 'Flex Container',
    isContainer: true,
    defaultProps: {
      flexDirection: 'column',
      flex: '1',
      gap: '16px',
      padding: '0px',
    },
    propEditors: [
      {
        key: 'flexDirection',
        label: 'Direction',
        type: 'select',
        options: [{ label: 'Vertical (Column)', value: 'column' }, { label: 'Horizontal (Row)', value: 'row' }],
        responsive: true
      },
      {
        key: 'flexWrap',
        label: 'Wrap Elements',
        type: 'select',
        options: [{ label: 'No Wrap', value: 'nowrap' }, { label: 'Wrap', value: 'wrap' }],
        responsive: true
      },
      {
        key: 'alignItems',
        label: 'Align Items (Cross Axis)',
        type: 'select',
        options: [
          { label: 'Stretch', value: 'stretch' },
          { label: 'Start', value: 'flex-start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'flex-end' },
        ],
        responsive: true
      },
      {
        key: 'justifyContent',
        label: 'Justify Content (Main Axis)',
        type: 'select',
        options: [
          { label: 'Start', value: 'flex-start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'flex-end' },
          { label: 'Space Between', value: 'space-between' },
          { label: 'Space Around', value: 'space-around' }
        ],
        responsive: true
      },
      { key: 'gap', label: 'Gap Size', type: 'text', responsive: true },
      { key: 'padding', label: 'Internal Padding', type: 'text', responsive: true },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-title': {
    type: 'block-title',
    label: 'Title',
    defaultProps: {
      flex: '1',
      text: 'New Title',
      level: 'h2',
      textAlign: 'left',
      color: '',
    },
    propEditors: [
      { key: 'text', label: 'Text', type: 'html' },
      {
        key: 'level',
        label: 'Heading Level',
        type: 'select',
        options: [
          { label: 'H1', value: 'h1' },
          { label: 'H2', value: 'h2' },
          { label: 'H3', value: 'h3' },
          { label: 'H4', value: 'h4' },
          { label: 'H5', value: 'h5' },
          { label: 'H6', value: 'h6' },
        ],
      },
      {
        key: 'textAlign',
        label: 'Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
      { key: 'color', label: 'Color', type: 'color' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-paragraph': {
    type: 'block-paragraph',
    label: 'Paragraph',
    defaultProps: {
      flex: '1',
      text: 'Enter paragraph text here...',
      showTitle: false,
      titleText: 'Paragraph Title',
    },
    propEditors: [
      { key: 'text', label: 'Content', type: 'html' },
      { key: 'showTitle', label: 'Show Title', type: 'checkbox' },
      { key: 'titleText', label: 'Title Text', type: 'html', showIf: (p) => p.showTitle === true },
      {
        key: 'textAlign',
        label: 'Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-image': {
    type: 'block-image',
    label: 'Image',
    defaultProps: {
      flex: '1',
      src: 'https://via.placeholder.com/150',
      alt: 'Placeholder Image',
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      showTitle: false,
      titleText: 'Image Title',
      titleAlign: 'left',
      backgroundColor: '',
      showShadow: false,
      showDescription: false,
      descriptionText: 'Enter image description here...',
      descriptionAlign: 'left',
      href: '',
      target: '_self',
    },
    propEditors: [
      { key: 'src', label: 'Image URL', type: 'image-select' },
      { key: 'alt', label: 'Alt Text', type: 'text' },
      { key: 'width', label: 'Width', type: 'text' },
      { key: 'height', label: 'Height', type: 'text' },
      {
        key: 'objectFit',
        label: 'Object Fit',
        type: 'select',
        options: [
          { label: 'Cover', value: 'cover' },
          { label: 'Contain', value: 'contain' },
          { label: 'Fill', value: 'fill' },
          { label: 'None', value: 'none' },
        ],
      },
      { key: 'showTitle', label: 'Show Title', type: 'checkbox' },
      { key: 'titleText', label: 'Title Text', type: 'html', showIf: (p) => p.showTitle === true },
      { key: 'titleAlign', label: 'Title Align', type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }], showIf: (p) => p.showTitle === true },
      { key: 'showDescription', label: 'Show Description', type: 'checkbox' },
      { key: 'descriptionText', label: 'Description Text', type: 'html', showIf: (p) => p.showDescription === true },
      { key: 'descriptionAlign', label: 'Description Align', type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }], showIf: (p) => p.showDescription === true },
      { key: 'href', label: 'Link URL', type: 'text' },
      { key: 'target', label: 'Link Target', type: 'select', options: [{ label: 'Same Window', value: '_self' }, { label: 'New Window', value: '_blank' }] },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'showShadow', label: 'Show Shadow', type: 'checkbox' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-carousel': {
    type: 'block-carousel',
    label: 'Carousel',
    defaultProps: {
      flex: '1',
      showDots: true,
      showArrows: true,
      autoplay: false,
      interval: 3000,
      cardShadow: false,
      cards: [],
    },
    propEditors: [
      { key: 'showDots', label: 'Show Dots', type: 'checkbox' },
      { key: 'showArrows', label: 'Show Arrows', type: 'checkbox' },
      { key: 'autoplay', label: 'Autoplay', type: 'checkbox' },
      { key: 'interval', label: 'Autoplay Interval (ms)', type: 'text' },
      { key: 'cardShadow', label: 'Apply Shadow to Cards', type: 'checkbox' },
      { key: 'cards', label: 'Carousel Cards', type: 'carousel-cards' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-youtube': {
    type: 'block-youtube',
    label: 'YouTube Player',
    defaultProps: {
      flex: '1',
      width: '100%',
      height: 'auto',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      autoplay: false,
      allowFullScreen: true,
      controls: true,
      loop: false,
      muted: false,
      rel: false,
      modestbranding: true,
    },
    propEditors: [
      { key: 'url', label: 'YouTube URL or Video ID', type: 'text' },
      { key: 'width', label: 'Width', type: 'text' },
      { key: 'height', label: 'Height', type: 'text' },
      { key: 'autoplay', label: 'Autoplay', type: 'checkbox' },
      { key: 'allowFullScreen', label: 'Allow FullScreen', type: 'checkbox' },
      { key: 'controls', label: 'Show Player Controls', type: 'checkbox' },
      { key: 'loop', label: 'Loop Video', type: 'checkbox' },
      { key: 'muted', label: 'Muted', type: 'checkbox' },
      { key: 'rel', label: 'Show Related Videos', type: 'checkbox' },
      { key: 'modestbranding', label: 'Modest Branding', type: 'checkbox' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-chart': {
    type: 'block-chart',
    label: 'Data Chart',
    defaultProps: {
      flex: '1',
      width: '100%',
      height: '350px',
      chartType: 'pie',
      chartTitle: 'My Chart',
      showLegend: true,
      gaugeColor: 'var(--primary-accent-color)',
      chartData: JSON.stringify({
        labels: ['Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries'],
        series: [{ name: 'Sales', data: [44, 55, 13, 43, 22] }]
      }, null, 2),
    },
    propEditors: [
      {
        key: 'chartType',
        label: 'Chart Type',
        type: 'select',
        options: [
          { label: 'Pie Chart', value: 'pie' },
          { label: 'Donut Chart', value: 'donut' },
          { label: 'Column Chart', value: 'column' },
          { label: 'Bar Chart', value: 'bar' },
          { label: 'Line Chart', value: 'line' },
          { label: 'Area Chart', value: 'area' },
          { label: 'Scatter Chart', value: 'scatter' },
          { label: 'Radar Chart', value: 'radar' },
          { label: 'Gauge Chart', value: 'gauge' },
        ],
      },
      { key: 'chartTitle', label: 'Chart Title', type: 'text' },
      { key: 'showLegend', label: 'Show Legend', type: 'checkbox', showIf: (p) => p.chartType !== 'gauge' },
      { key: 'gaugeColor', label: 'Gauge Color', type: 'color', showIf: (p) => p.chartType === 'gauge' },
      { key: 'width', label: 'Width', type: 'text' },
      { key: 'height', label: 'Height', type: 'text' },
      { key: 'chartData', label: 'Chart Data', type: 'chart-data' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-menu-bar': {
    type: 'block-menu-bar',
    label: 'Menu Bar',
    defaultProps: {
      menuId: '',
      textColor: '',
      hoverColor: '',
      hoverBgColor: '',
      backgroundColor: '',
      maxWidth: '100%',
    },
    propEditors: [
      { key: 'menuId', label: 'Menu ID', type: 'menu-select' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'hoverColor', label: 'Hover Text Color', type: 'color' },
      { key: 'hoverBgColor', label: 'Hover Background', type: 'color' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'maxWidth', label: 'Max Width', type: 'text' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
  'block-menu-list': {
    type: 'block-menu-list',
    label: 'Menu Sidebar',
    defaultProps: {
      menuId: '',
      mobileMenu: false,
      desktopMenu: true,
      defaultOpenAll: false,
      color: '',
      backgroundColor: '',
    },
    propEditors: [
      { key: 'menuId', label: 'Menu ID', type: 'menu-select' },
      { key: 'mobileMenu', label: 'Mobile Menu Mode', type: 'checkbox' },
      { key: 'desktopMenu', label: 'Desktop Menu', type: 'checkbox' },
      { key: 'defaultOpenAll', label: 'Default Open All', type: 'checkbox' },
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
};
