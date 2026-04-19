import {
  ActionSheet,
  ActionSheetMessage,
  ActionSheetSelect,
  CssProps,
  getRenderPageProps,
  HtmlVar,
  InputWithTitle,
  NotificationColor,
  NotificationMessage,
  pathUtils,
  PopupMenu,
  Progress,
  ProgressHookProps,
  RefProps,
  uploadFile,
} from 'lupine.components';
export const isSafeFilename = (s: string): boolean => /^(?!\.)(?!.*\.\.)[A-Za-z0-9_\-#<>.]+$/.test(s);

const fetchImages = async (folder: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image-asset/list?p=' + encodeURIComponent(folder)
  );
  return result.json;
};
const createSubdir = async (currentDir: string, newDir: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image-asset/new-dir?p=' + encodeURIComponent(currentDir) + '&f=' + encodeURIComponent(newDir)
  );
  return result.json;
};
const delDir = async (currentDir: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image-asset/del-dir?p=' + encodeURIComponent(currentDir)
  );
  return result.json;
};
const renameFile = async (currentDir: string, filename: string, newName: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image-asset/rename?p=' +
      encodeURIComponent(currentDir) +
      '&f=' +
      encodeURIComponent(filename) +
      '&n=' +
      encodeURIComponent(newName)
  );
  return result.json;
};
const renameDir = async (currentDir: string, newName: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image-asset/rn-dir?p=' + encodeURIComponent(currentDir) + '&n=' + encodeURIComponent(newName)
  );
  return result.json;
};

export type AdminImagesAssetPageProps = {
  isEdit?: boolean;
  handleSelectedUrl?: (url: string) => void;
  css?: CssProps;
};
export const AdminImagesAssetPage = (props: AdminImagesAssetPageProps) => {
  const css: CssProps = {
    '.a-img-upload-box, .a-img-ctl-box': {
      border: '1px solid var(--primary-border-color)',
      borderRadius: '8px',
      padding: '8px',
    },
    '.a-img-cell': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    '.a-img-pic': {
      width: '50%',
      height: '100px',
      objectFit: 'contain',
      cursor: 'pointer',
    },
    '.a-img-txt': {
      fontSize: '11px',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    '.a-img-list.img td': {
      width: '33%',
    },
    '.current-dir': {
      color: 'blue',
    },
    '.a-img-rename': {
      width: '16px',
      cursor: 'pointer',
    },
    '.a-img-rename.img': {
      position: 'absolute',
      right: '18px',
    },
    '.a-img-del': {
      width: '16px',
      cursor: 'pointer',
    },
    '.a-img-del.img': {
      position: 'absolute',
      right: 0,
    },
    '.a-img-sub-dirs': {
      maxWidth: '300px',
    },
    ...props.css,
  };

  const showList = async (path: string) => {
    localStorage.setItem('img-a.path', path);
    const result = await fetchImages(path);
    if (!result.result.files || !result.result.subDirs) {
      return;
    }

    currentPath = result.result.path;
    currentDir.value = result.result.path;
    imageList = result.result.files;
    showImageList(imageList);

    const dirs = result.result.path.split('/').filter(Boolean);
    const subDirs = ref.$('.a-img-sub-dirs') as HTMLSelectElement;
    subDirs.options.length = 0;
    subDirs.options.add(new Option('-', ''));
    subDirs.options.add(new Option('/', '/'));
    let dir = '/';
    for (let one of dirs) {
      dir = pathUtils.join(dir, one);
      subDirs.options.add(new Option(dir, dir));
    }

    let upCurrentPath = currentPath.slice(0, currentPath.lastIndexOf('/'));
    if (!upCurrentPath) {
      upCurrentPath = '/';
    }
    for (let one of result.result.upFolders) {
      if (one !== dir) {
        subDirs.options.add(new Option(one, one));
      }
    }

    for (let one of result.result.subDirs) {
      subDirs.options.add(new Option('-> ' + one, one));
    }
  };
  const onClickImg = (url: string) => {
    if (props.handleSelectedUrl) {
      props.handleSelectedUrl(url);
    } else {
      window.open(url);
    }
  };
  const onDelImg = async (filename: string) => {
    ActionSheetSelect.show({
      title: `Delete Image ${filename}?`,
      options: ['OK'],
      cancelButtonText: 'Cancel',
      handleClicked: async (index: number, close) => {
        close();
        if (index === 0) {
          const result = await getRenderPageProps().renderPageFunctions.fetchData(
            '/api/admin/image-asset/delete?p=' + encodeURIComponent(currentPath) + '&f=' + encodeURIComponent(filename)
          );
          const ok = result.json.status === 'ok';
          NotificationMessage.sendMessage(
            result.json.message,
            ok ? NotificationColor.Success : NotificationColor.Error
          );
          ok && (await showList(currentPath));
        }
      },
    });
  };
  const onRenameImg = async (filename: string) => {
    let inputValue = '';
    const content = InputWithTitle(
      `New file name (letters, numbers and [-,_] only. no extension)`,
      '',
      async (value: string) => {
        inputValue = value;
      }
    );

    ActionSheetMessage.show({
      title: `Rename File?`,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      message: content,
      handleConfirmClicked: async (close) => {
        close();
        if (inputValue) {
          if (!isSafeFilename(inputValue)) {
            NotificationMessage.sendMessage('Invalid filename', NotificationColor.Error);
            return;
          }
          const result = await renameFile(currentPath, filename, inputValue);
          NotificationMessage.sendMessage(
            result.message,
            result.status === 'ok' ? NotificationColor.Success : NotificationColor.Error
          );
          result.status === 'ok' && (await showList(currentPath));
        }
      },
    });
  };

  const onSelSubDirs = async () => {
    const subDirs = ref.$('.a-img-sub-dirs') as HTMLSelectElement;
    const path = subDirs.value;
    if (!path) {
      return;
    }
    await showList(path);
  };
  const onLayout = (layout: 'Image List' | 'File List') => {
    showType = layout === 'File List' ? 'files' : 'images';
    showImageList(imageList);
  };
  const onOverwrite = (overwriteValue: 'Prompt' | 'Overwrite') => {
    overwrite = overwriteValue === 'Prompt' ? '0' : '1';
  };
  const onCreateDir = () => {
    let inputDir = '';
    const content = InputWithTitle(
      `Create subdirectory in [${currentPath}]?<br \>Enter Directory Name (letters, numbers, underscores, dashes):`,
      '',
      async (value: string) => {
        inputDir = value;
      }
    );

    ActionSheetMessage.show({
      title: `Create Subdirectory in ${currentPath}?`,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      message: content,
      handleConfirmClicked: async (close) => {
        close();
        if (inputDir) {
          if (!isSafeFilename(inputDir)) {
            NotificationMessage.sendMessage('Invalid directory name', NotificationColor.Error);
            return;
          }
          const result = await createSubdir(currentPath, inputDir);
          NotificationMessage.sendMessage(
            result.message,
            result.status === 'ok' ? NotificationColor.Success : NotificationColor.Error
          );
          result.status === 'ok' && (await showList(currentPath));
        }
      },
    });

    // FloatWindow.show({
    //   title: 'Create Subdirectory',
    //   buttons: ['OK', 'Cancel'],
    //   contentMinWidth: '300px',
    //   handleClicked: (index: number, close) => {
    //     close();
    //   },
    //   children: content,
    // });
  };
  const onRemoveDir = () => {
    if (!currentPath || currentPath === '/') {
      NotificationMessage.sendMessage('Cannot remove root directory', NotificationColor.Error);
      return;
    }
    if (imageList.length > 0) {
      NotificationMessage.sendMessage('Directory is not empty', NotificationColor.Error);
      return;
    }

    ActionSheet.show({
      title: `Delete directory ${currentPath}?<br />Cannot delete if directory contains files.`,
      children: '',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      handleConfirmClicked: async (close) => {
        close();
        const result = await delDir(currentPath);
        const ok = result.status === 'ok';
        NotificationMessage.sendMessage(result.message, ok ? NotificationColor.Success : NotificationColor.Error);

        if (result.status === 'ok') {
          const upDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
          await showList(upDir);
        }
      },
    });
  };
  const onRenameDir = async () => {
    let inputValue = '';
    const content = InputWithTitle(`New directory name:`, '', async (value: string) => {
      inputValue = value;
    });

    ActionSheetMessage.show({
      title: `Rename Directory?`,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      message: content,
      handleConfirmClicked: async (close) => {
        close();
        if (inputValue) {
          if (!isSafeFilename(inputValue)) {
            NotificationMessage.sendMessage('Invalid directory name', NotificationColor.Error);
            return;
          }
          const result = await renameDir(currentPath, inputValue);
          NotificationMessage.sendMessage(
            result.message,
            result.status === 'ok' ? NotificationColor.Success : NotificationColor.Error
          );
          if (result.status === 'ok') {
            const upDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
            await showList(upDir);
          }
        }
      },
    });
  };
  const onUploadFile = async () => {
    const fileDom = ref.$('.a-img-file') as HTMLInputElement;
    if (!fileDom || !fileDom.files || fileDom.files.length !== 1) {
      NotificationMessage.sendMessage('Please select an image file first', NotificationColor.Error);
      return;
    }
    const ext = fileDom.files[0].name.split('.').pop();
    if (!ext || !['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'].includes(ext)) {
      NotificationMessage.sendMessage('Please select a valid image type', NotificationColor.Error);
      return;
    }
    if (fileDom.files[0].size > 1024 * 1024 * 10) {
      NotificationMessage.sendMessage('Image size should be < 10MB', NotificationColor.Error);
      return;
    }

    const newName = (ref.$('.a-img-name') as HTMLInputElement).value;
    if (!newName && !isSafeFilename(fileDom.files[0].name)) {
      NotificationMessage.sendMessage('Filename invalid', NotificationColor.Error);
      return;
    }
    if (newName && !isSafeFilename(newName)) {
      NotificationMessage.sendMessage('New filename invalid', NotificationColor.Error);
      return;
    }

    ActionSheet.show({
      title: `Upload Image to ${currentPath}?`,
      children: '',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      handleConfirmClicked: async (close) => {
        close();

        progressUpdate.onShow?.(true, 'Uploading...');
        progressUpdate.onProgress?.(0, 0, 100);
        const resultImg = await uploadFile(
          fileDom.files![0],
          '/api/admin/image-asset/upload?p=' +
            encodeURIComponent(currentPath) +
            '&f=' +
            encodeURIComponent(fileDom.files![0].name) +
            '&n=' +
            encodeURIComponent(newName) +
            '&force=' +
            overwrite,
          onUploadProgress
        );
        progressUpdate.onShow?.(false);
        if (resultImg !== true) {
          NotificationMessage.sendMessage(resultImg.message || 'Error uploading file.', NotificationColor.Error);
          return;
        }
        NotificationMessage.sendMessage('Upload complete.', NotificationColor.Success);
        await showList(currentPath);
      },
    });
  };

  const progressUpdate: ProgressHookProps = {};
  const onUploadProgress = (percentage: number, chunkNumber: number, totalChunks: number) => {
    // log(`Upload progress: ${percentage}% (chunk ${chunkNumber} of ${totalChunks})`);
    progressUpdate.onProgress?.(percentage, chunkNumber, totalChunks);
  };

  const showImageList = (files: string[]) => {
    if (showType === 'files') {
      domImageList.value = (
        <table class='main-data-list a-img-list file'>
          {files.map((one) => {
            return (
              <tr>
                <td>
                  <div class='row-box'>
                    <div class='a-img-txt pr-m' onClick={() => onClickImg(currentPath + '/' + one)}>
                      {one}
                    </div>
                    <div class='a-img-rename' onClick={() => onRenameImg(one)}>
                      &#128393
                    </div>
                    <div class='a-img-del' onClick={() => onDelImg(one)}>
                      &#x274C
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      );
      return;
    }

    // Three columns per row
    const rows = [];
    for (let i = 0; i < files.length; i += 3) {
      rows.push(files.slice(i, i + 3));
    }
    const renderOne = (one: string) => {
      return !one ? (
        <></>
      ) : (
        <div class='a-img-cell'>
          <img class='a-img-pic' onClick={() => onClickImg(currentPath + '/' + one)} src={currentPath + '/' + one} />
          <div class='a-img-txt' onClick={() => onClickImg(currentPath + '/' + one)}>
            {one}
          </div>
          <div class='a-img-rename img' onClick={() => onRenameImg(one)}>
            &#128393
          </div>
          <div class='a-img-del img' onClick={() => onDelImg(one)}>
            &#x274C
          </div>
        </div>
      );
    };
    domImageList.value = (
      <table class='main-data-list a-img-list img'>
        {rows.map((one) => {
          return (
            <tr>
              <td>{renderOne(one[0])}</td>
              <td>{renderOne(one[1])}</td>
              <td>{renderOne(one[2])}</td>
            </tr>
          );
        })}
      </table>
    );
  };

  let overwrite = '0';
  let currentPath = '/assets';
  let showType: 'files' | 'images' = 'images';
  let imageList: string[] = [];
  const currentDir = new HtmlVar('/');
  const domImageList = new HtmlVar('');
  const ref: RefProps = {
    onLoad: async () => {
      const lastPath = localStorage.getItem('img-a.path') || '/assets';
      await showList(lastPath);
    },
  };
  return (
    <div ref={ref} css={css} class='admin-about-top'>
      <Progress hook={progressUpdate} />
      {props.isEdit && (
        <div class='a-img-upload-box mb-m'>
          <div class='row-box pb-m'>
            <label class='a-img-label'>Upload:</label>
            <input class='a-img-file' type='file' accept='.jpg, .jpeg, .png, .webp, .gif, .avif' />
          </div>
          <div class='row-box pb-m'>
            <div class='row-box flex-1'>
              <label class='a-img-label'>Rename:</label>
              <input class='input-base input-s a-img-name mr-l' type='text' placeholder='Letters and digits' />
              <PopupMenu
                list={['Prompt', 'Overwrite']}
                defaultValue={'Prompt'}
                handleSelected={onOverwrite}
              ></PopupMenu>
            </div>
            <div class='row-box'>
              <button class='base-button button-m' onClick={onUploadFile}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      <div class='a-img-ctl-box mb-m'>
        <div class='row-box pb-m'>
          <div class='row-box mr-ll flex-1'>
            <label class='a-img-label'>Select Dir:</label>
            <select class='a-img-sub-dirs' onChange={onSelSubDirs}></select>
          </div>

          {props.isEdit && (
            <div class='row-box'>
              <button class='base-button button-m mr-m' onClick={onCreateDir}>
                New Dir
              </button>
              <button class='base-button button-m mr-m' onClick={onRenameDir}>
                Rename
              </button>
              <button class='base-button button-m color-red' onClick={onRemoveDir}>
                Delete
              </button>
            </div>
          )}
        </div>

        <div class='row-box pb-m'>
          <div class='row-box flex-1'>
            <label class='a-img-label'>Current Dir:</label>
            <div class='current-dir'>{currentDir.node}</div>
          </div>
          <PopupMenu list={['Image List', 'File List']} defaultValue={'Image List'} handleSelected={onLayout}></PopupMenu>
        </div>
      </div>

      <div class='a-img-show-box pt-m'>{domImageList.node}</div>
    </div>
  );
};

export interface AdminSelectImageAssetProps {
  handleSelectedUrl: (url: string) => void;
}
export const AdminSelectImageAsset = async (props: AdminSelectImageAssetProps) => {
  const handleSelectedUrl = async (url: string) => {
    closeFn();
    props.handleSelectedUrl(url);
  };
  const content = (
    <AdminImagesAssetPage isEdit={true} handleSelectedUrl={handleSelectedUrl} css={{ padding: '0 8px 8px 8px' }} />
  );

  const closeFn = await ActionSheet.show({
    title: 'Select Public Asset',
    children: content,
    cancelButtonText: 'Cancel',
    contentMaxHeight: '90%',
  });
};
