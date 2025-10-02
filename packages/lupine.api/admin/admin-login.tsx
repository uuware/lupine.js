import {
  CssProps,
  PageProps,
  webEnv,
  NotificationColor,
  NotificationMessage,
  setCookie,
  RefProps,
} from 'lupine.components';
import { adminCss } from './admin-css';
import { adminFrameHelper } from './admin-frame-helper';

const fetchLogin = async (props: PageProps, username: string, password: string) => {
  const data = await props.renderPageFunctions.fetchData('/api/admin/auth', {
    u: username,
    p: password,
  });
  return data.json;
};

export const AdminLoginPage = async (props: PageProps) => {
  const css: CssProps = {
    ...adminCss,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    overflowY: 'auto',
    '.&header': {
      padding: '50px 0',
      margin: 'auto',
      fontSize: '200%',
    },
    '.&content': {
      flex: '1',
      padding: '8px 16px',
      margin: 'auto',
      '.&button, .&tip': {
        justifyContent: 'center',
      },
      '.&button button': {
        width: '80%',
        fontSize: '150%',
        height: '40px',
      },
      '.&tip': {
        color: 'gray',
        fontSize: '90%',
      },
      '.&label': {
        width: '100px',
      },
      '.row-box': {
        marginBottom: '8px',
      },
    },
    '.&footer': {
      padding: '16px 16px 4px 16px',
      margin: 'auto',
    },
  };

  const onLogin = async () => {
    const auth = await fetchLogin(props, ref.$('.&name')!.value, ref.$('.&pass')!.value);
    console.log('====auth', auth);
    if (!auth || auth.status !== 'ok') {
      NotificationMessage.sendMessage((auth && auth.message) || 'Login failed', NotificationColor.Error);
    }
    if (auth.devLogin) {
      setCookie('_token_dev', auth.devLogin, 30, '/');
      window.location.href = '/admin_dev';
    }
    const appAdminHookCheckLogin = adminFrameHelper.getAppAdminHookCheckLogin();
    if (appAdminHookCheckLogin) {
      if (await appAdminHookCheckLogin(auth)) {
        window.location.href = '/admin_dev';
      }
    }
  };
  const ref: RefProps = {};
  return (
    <div ref={ref} css={css} class='admin-login'>
      <div class='&header'>
        <div class='&title'>Site Management (Lupine.JS 1.0)</div>
      </div>
      <div class='&content'>
        <div class='row-box'>
          <div class='&label'>Username:</div>
          <input class='input-base &name' type='text' />
        </div>
        <div class='row-box'>
          <div class='&label'>Password:</div>
          <input class='input-base &pass' type='password' />
        </div>
        <div class='row-box &button'>
          <button onClick={() => onLogin()} class='button-base'>
            Login
          </button>
        </div>
        <div class='row-box &tip'>* Login after using the system.</div>
      </div>
      <div class='&footer'>
        Copyright© 2023-2025 Lupine.JS{' '}
        <a href={`http://localhost:${webEnv('API_PORT', 11080)}/`} target='_blank'>
          http://localhost:{webEnv('API_PORT', 11080)}/
        </a>
        . All Rights Reserved.
      </div>
    </div>
  );
};
