export type PropEditorType = 'text' | 'number' | 'color' | 'checkbox' | 'select' | 'textarea' | 'html' | 'css';

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
    defaultProps: {},
    propEditors: []
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
      { key: 'backgroundColor', label: 'Background Color', type: 'text' },
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
      { key: 'gap', label: 'Gap Size', type: 'text', responsive: true },
      { key: 'padding', label: 'Internal Padding', type: 'text', responsive: true },
      { key: 'backgroundColor', label: 'Background Color', type: 'text' },
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
      { key: 'color', label: 'Color', type: 'text' },
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
    },
    propEditors: [
      { key: 'src', label: 'Image URL', type: 'text' },
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
      ...SpatialPropEditors,
      { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
    ],
  },
};
