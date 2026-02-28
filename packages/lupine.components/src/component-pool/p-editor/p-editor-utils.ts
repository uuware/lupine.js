export const loadPdfScripts = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    const depsToLoad = [];

    if (!(window as any).pdfjsLib) {
      depsToLoad.push('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
    }
    if (!(window as any).PDFLib) {
      depsToLoad.push('https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js');
    }

    if (depsToLoad.length === 0) {
      resolve();
      return;
    }

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === depsToLoad.length) {
        // Init pdf.js worker
        if ((window as any).pdfjsLib) {
          (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        resolve();
      }
    };

    depsToLoad.forEach((url) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = checkDone;
      script.onerror = () => reject(new Error(`Failed to load ${url}`));
      document.head.appendChild(script);
    });
  });
};
