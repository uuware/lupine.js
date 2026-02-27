import { PdfViewer, PdfViewerProps } from './pdf-viewer';
import { DemoStory } from '../../demo/demo-types';

export const pdfViewerDemo: DemoStory<PdfViewerProps> = {
  id: 'pdfViewerDemo',
  text: 'PDF Viewer',
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // fallback dummy remote url for testing
    width: '100%',
    height: '600px',
  },
  argTypes: {
    src: { control: 'text', description: 'PDF URL or File object' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  render: (args: any) => {
    const handleFileUpload = (e: any) => {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        const mount = document.getElementById('pdf-viewer-mount');
        if (mount) {
          mount.innerHTML = '';
          const ViewerNode = <PdfViewer src={file} width='100%' height='600px' />;
          // Assuming basic JSX rendering or we can manually construct it if needed, but since it's a demo render function returning VNode:
          // We will assign it via component pool rendering or direct iframe insertion to avoid framework binding issues here.
          mount.style.display = 'block';
          mount.innerHTML = `<iframe src="${URL.createObjectURL(
            file
          )}" width="100%" height="100%" style="border: none; display: block;" title="PDF Viewer"></iframe>`;
        }
      } else {
        alert('Please upload a valid PDF file.');
      }
    };

    return (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <section>
          <div class='section-title'>Local File Viewer</div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Select a PDF file from your computer to view it using the browser's built-in PDF capabilities.
          </p>
          <div style={{ marginBottom: '16px' }}>
            <input
              type='file'
              accept='application/pdf'
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id='pdf-upload-input'
            />
            <label
              for='pdf-upload-input'
              style={{
                padding: '8px 16px',
                background: 'var(--primary-accent-color, #0a74c9)',
                color: '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'inline-block',
              }}
            >
              Upload Local PDF
            </label>
          </div>
          <div
            id='pdf-viewer-mount-container'
            style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}
          >
            <div
              id='pdf-viewer-mount'
              style={{
                width: '100%',
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fafafa',
                color: '#999',
              }}
            >
              No local file selected. Click the button above to upload.
            </div>
          </div>
        </section>

        <section>
          <div class='section-title'>Remote URL Viewer</div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            This viewer loads a PDF remotely using the provided URL source.
          </p>
          <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
            <PdfViewer {...args} />
          </div>
        </section>
      </div>
    );
  },
  code: `import { PdfViewer } from "lupine.components/component-pool";

// Load from URL
const el1 = <PdfViewer src="https://example.com/sample.pdf" height="600px" />;

// Or load from a File object
const el2 = <PdfViewer src={myPdfFile} width="100%" height="600px" />;
`,
};
