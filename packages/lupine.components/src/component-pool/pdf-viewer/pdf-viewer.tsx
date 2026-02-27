import { CssProps } from 'lupine.web';

export type PdfViewerProps = {
  class?: string;
  style?: CssProps;
  src?: string | File;
  width?: string | number;
  height?: string | number;
};

export const PdfViewer = (props: PdfViewerProps) => {
  const { src, width = '100%', height = '600px', style, class: className = 'pdf-viewer' } = props;

  // Resolve the URL
  let resolvedSrc = '';
  if (typeof src === 'string') {
    resolvedSrc = src;
  } else if (src instanceof File) {
    resolvedSrc = URL.createObjectURL(src);
  }

  // Cleanup object URL on unmount (approximate via closure/render cycle, true cleanup needs effect hooks which depend on framework specifics, for this stateless representation we rely on browser lifecycle/GC or manual revoke if passed from outside)

  if (!resolvedSrc) {
    return (
      <div
        class={className}
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          color: '#666',
          border: '1px dashed #ccc',
          ...(style as any),
        }}
      >
        <span>No PDF Source Provided</span>
      </div>
    );
  }

  return (
    <div class={className} style={{ width, height, ...(style as any) }}>
      <iframe
        src={resolvedSrc}
        width='100%'
        height='100%'
        style={{ border: 'none', display: 'block' }}
        title='PDF Viewer'
      />
    </div>
  );
};
