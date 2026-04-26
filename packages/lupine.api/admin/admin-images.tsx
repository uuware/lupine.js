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
import { baseUrl } from './service';
export const isSafeFilename = (s: string): boolean => /^(?!\.)(?!.*\.\.)[A-Za-z0-9_\-#<>.]+$/.test(s);

const fetchImages = async (folder: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image/list?p=' + encodeURIComponent(folder)
  );
  return result.json;
};
const createSubdir = async (currentDir: string, newDir: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image/new-dir?p=' + encodeURIComponent(currentDir) + '&f=' + encodeURIComponent(newDir)
  );
  return result.json;
};
const delDir = async (currentDir: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image/del-dir?p=' + encodeURIComponent(currentDir)
  );
  return result.json;
};
const delImg = async (file_id: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image/delete?f=' + encodeURIComponent(file_id)
  );
  return result.json;
};
const renameFile = async (file_id: string, newName: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image/rename?f=' + encodeURIComponent(file_id) + '&n=' + encodeURIComponent(newName)
  );
  return result.json;
};
const renameDir = async (currentDir: string, newName: string) => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData(
    '/api/admin/image/rn-dir?p=' + encodeURIComponent(currentDir) + '&n=' + encodeURIComponent(newName)
  );
  return result.json;
};

interface RecordFolderType {
  id: number;
  folder_id: string;
  display_name: string;
  parent_full_path: string;
}
interface RecordImageType {
  id: number;
  file_id: string;
  display_name: string;
  parent_full_path: string;
  version: number;
}
export type AdminImagesPageProps = {
  isEdit?: boolean;
  handleSelectedUrl?: (url: string) => void;
  css?: CssProps;
};
export const AdminImagesPage = (props: AdminImagesPageProps) => {
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
      color: 'red',
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
    localStorage.setItem('img.path', path);
    let result = await fetchImages(path);
    if (!result.result || result.status !== 'ok') {
      NotificationMessage.sendMessage(result.message, NotificationColor.Error);
      result = await fetchImages('/');
    }

    const dirs = result.result.path.split('/').filter(Boolean);
    const subDirs = ref.$('.a-img-sub-dirs') as HTMLSelectElement;
    subDirs.options.length = 0;
    subDirs.options.add(new Option('', ''));
    subDirs.options.add(new Option('/', '/'));
    let dir = '/';
    let dirDisplay = '/';
    for (let one of dirs) {
      dir = pathUtils.join(dir, one);
      dirDisplay = pathUtils.join(dirDisplay, result.result.folderIdMap[one]);
      subDirs.options.add(new Option(dirDisplay, dir));
    }

    currentPath = result.result.path;
    currentDirDom.value = dirDisplay;
    let upDirDisplay = dirDisplay.slice(0, dirDisplay.lastIndexOf('/'));
    if (!upDirDisplay) {
      upDirDisplay = '/';
    }
    let upCurrentPath = currentPath.slice(0, currentPath.lastIndexOf('/'));
    if (!upCurrentPath) {
      upCurrentPath = '/';
    }
    for (let one of result.result.upFolders) {
      const oneDisplay = pathUtils.join(upDirDisplay, one.display_name);
      if (oneDisplay !== dirDisplay) {
        subDirs.options.add(new Option(oneDisplay, pathUtils.join(upCurrentPath, one.folder_id)));
      }
    }

    for (let one of result.result.folders) {
      subDirs.options.add(
        new Option('-> ' + pathUtils.join(dirDisplay, one.display_name), pathUtils.join(currentPath, one.folder_id))
      );
    }

    imageList = result.result.images;
    showImageList(imageList);
  };
  const onClickImg = (file_id: string, version?: number) => {
    if (props.handleSelectedUrl) {
      props.handleSelectedUrl(`${file_id}?v=${version}`);
    } else {
      window.open(baseUrl(`/api/image/${file_id}?v=${version}`));
    }
  };
  const onDelImg = async (display_name: string, file_id: string) => {
    ActionSheetSelect.show({
      title: `Delete Image ${display_name}?`,
      options: ['OK'],
      cancelButtonText: 'Cancel',
      handleClicked: async (index: number, close) => {
        close();
        if (index === 0) {
          const result = await delImg(file_id);
          const ok = result.status === 'ok';
          NotificationMessage.sendMessage(result.message, ok ? NotificationColor.Success : NotificationColor.Error);
          ok && (await showList(currentPath));
        }
      },
    });
  };
  const onRenameImg = async (display_name: string, file_id: string) => {
    let inputValue = '';
    const content = InputWithTitle(`New file name (without extension)`, '', async (value: string) => {
      inputValue = value;
    });

    ActionSheetMessage.show({
      title: `Rename File?`,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      message: content,
      handleConfirmClicked: async (close) => {
        close();
        if (inputValue) {
          if (!isSafeFilename(inputValue)) {
            NotificationMessage.sendMessage('Invalid file name', NotificationColor.Error);
            return;
          }
          const result = await renameFile(file_id, inputValue);
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
    if (currentPath.split('/').length > 4) {
      NotificationMessage.sendMessage('Directory too deep to create subdirectories', NotificationColor.Error);
      return;
    }

    const content = InputWithTitle(
      `Create subdirectory under [${currentDirDom.value}]?<br \>Enter Subdirectory Name:`,
      '',
      async (value: string) => {
        inputDir = value;
      }
    );

    ActionSheetMessage.show({
      title: `Create Subdirectory in ${currentDirDom.value}?`,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      message: content,
      handleConfirmClicked: async (close) => {
        close();
        if (inputDir) {
          if (!isSafeFilename(inputDir)) {
            NotificationMessage.sendMessage('Directory name cannot contain / or \\', NotificationColor.Error);
            return;
          }
          if (inputDir.length > 40 || currentPath.length + inputDir.length > 250) {
            NotificationMessage.sendMessage('Name limit is 40, total path limit is 250', NotificationColor.Error);
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
      NotificationMessage.sendMessage('Current directory contains files', NotificationColor.Error);
      return;
    }

    ActionSheet.show({
      title: `Delete directory ${currentDirDom.value}?<br />Cannot delete if directory contains non-image files.`,
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
          result.status === 'ok' && (await showList(currentPath));
        }
      },
    });
  };
  const onUploadFile = async () => {
    if (!currentPath || currentPath === '/') {
      NotificationMessage.sendMessage('Cannot upload to root directory', NotificationColor.Error);
      return;
    }
    const fileDom = ref.$('.a-img-file') as HTMLInputElement;
    if (!fileDom || !fileDom.files || fileDom.files.length !== 1) {
      NotificationMessage.sendMessage('Select an image file first', NotificationColor.Error);
      return;
    }
    const ext = fileDom.files[0].name.toLowerCase().split('.').pop();
    if (!ext || !['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'].includes(ext)) {
      NotificationMessage.sendMessage('Select a valid image file type.', NotificationColor.Error);
      return;
    }
    if (fileDom.files[0].size > 1024 * 1024 * 10) {
      NotificationMessage.sendMessage('Image size should be less than 10MB', NotificationColor.Error);
      return;
    }

    const newName = (ref.$('.a-img-name') as HTMLInputElement).value;
    if (!newName && !isSafeFilename(fileDom.files[0].name.replace(/\s+/g, '_'))) {
      NotificationMessage.sendMessage('Filename cannot contain / or \\', NotificationColor.Error);
      return;
    }
    if (newName && !isSafeFilename(newName)) {
      NotificationMessage.sendMessage('New filename cannot contain / or \\', NotificationColor.Error);
      return;
    }
    const finalName = newName || fileDom.files[0].name.replace(/\s+/g, '_');
    if (finalName.length > 40 || currentPath.length + finalName.length > 250) {
      NotificationMessage.sendMessage('Name limit is 40, total path limit is 250', NotificationColor.Error);
      return;
    }

    ActionSheet.show({
      title: `Upload Image to ${currentDirDom.value}?`,
      children: '',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      handleConfirmClicked: async (close) => {
        close();

        progressUpdate.onShow?.(true, 'Uploading...');
        progressUpdate.onProgress?.(0, 0, 100);
        const resultImg = await uploadFile(
          fileDom.files![0],
          '/api/admin/image/upload?p=' +
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

  const showImageList = (files: RecordImageType[]) => {
    if (showType === 'files') {
      imageListDom.value = (
        <table class='main-data-list a-img-list file'>
          {files.map((one) => {
            return (
              <tr>
                <td>
                  <div class='row-box'>
                    <div class='a-img-txt pr-m' onClick={() => onClickImg(one.file_id, one.version)}>
                      {one.display_name}
                    </div>
                    <div class='a-img-rename' onClick={() => onRenameImg(one.display_name, one.file_id)}>
                      🖉
                    </div>
                    <div class='a-img-del' onClick={() => onDelImg(one.display_name, one.file_id)}>
                      ❌
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
    const renderOne = (one: RecordImageType) => {
      return !one ? (
        <></>
      ) : (
        <div class='a-img-cell'>
          <img
            class='a-img-pic'
            onClick={() => onClickImg(one.file_id, one.version)}
            src={baseUrl(`/api/image/${one.file_id}?v=${one.version}`)}
          />
          <div class='a-img-txt' onClick={() => onClickImg(one.file_id, one.version)}>
            {one.display_name}
          </div>
          <div class='a-img-rename img' onClick={() => onRenameImg(one.display_name, one.file_id)}>
            🖉
          </div>
          <div class='a-img-del img' onClick={() => onDelImg(one.display_name, one.file_id)}>
            ❌
          </div>
        </div>
      );
    };
    imageListDom.value = (
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
  let currentPath = '/';
  let showType: 'files' | 'images' = 'images';
  let imageList: RecordImageType[] = [];
  const currentDirDom = new HtmlVar(currentPath);
  const imageListDom = new HtmlVar('');
  const ref: RefProps = {
    onLoad: async () => {
      const lastPath = localStorage.getItem('img.path') || currentPath;
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
              <input class='input-base input-s a-img-name mr-l' type='text' placeholder='(No extension needed)' />
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
            <div class='current-dir'>{currentDirDom.node}</div>
          </div>
          <PopupMenu
            list={['Image List', 'File List']}
            defaultValue={'Image List'}
            handleSelected={onLayout}
          ></PopupMenu>
        </div>
      </div>

      <div class='a-img-show-box pt-m'>{imageListDom.node}</div>
    </div>
  );
};

export interface AdminSelectImageProps {
  handleSelectedUrl: (url: string) => void;
}
export const AdminSelectImage = async (props: AdminSelectImageProps) => {
  const handleSelectedUrl = async (url: string) => {
    closeFn();
    props.handleSelectedUrl(url);
  };
  const content = (
    <AdminImagesPage isEdit={true} handleSelectedUrl={handleSelectedUrl} css={{ padding: '0 8px 8px 8px' }} />
  );

  const closeFn = await ActionSheet.show({
    title: 'Select Virtual Album Image',
    children: content,
    cancelButtonText: 'Cancel',
    contentMaxHeight: '90%',
  });
};
