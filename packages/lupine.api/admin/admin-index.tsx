import { PageProps, PageRouter, DomUtils, Redirect } from 'lupine.components';
import { adminFrameHelper } from './admin-frame-helper';
import { AdminLoginPage } from './admin-login';
import { AdminMenuSinglePage } from './admin-menu-list';
import { AdminDesignPage } from './design/admin-design';
import { AdminFrame } from './admin-frame';

const fetchAuth = async (props: PageProps) => {
  const data = await props.renderPageFunctions.fetchData('/api/admin/auth');
  return data.json;
};

export const checkAuth = async (props: PageProps) => {
  if (typeof document === 'undefined') {
    // no ssr for admin pages
    return <div></div>;
  }

  const json = await fetchAuth(props);
  console.log('======auth', json);
  if ((typeof json === 'undefined' || !json.result) && props.url !== '/admin_dev/login') {
    return Redirect({ url: '/admin_dev/login' });
  }
  adminFrameHelper.setIsDevAdmin(true);
  return null;
};

// export const bindAdmin = async (props: PageProps) => {
//   MetaData({ name: 'robots', content: 'noindex, nofollow' });

//   if (typeof document === 'undefined') {
//     // no ssr for admin pages
//     return <div></div>;
//   }

//   const json = await fetchAuth(props);
//   console.log('======auth', json);
//   if ((typeof json === 'undefined' || !json.result) && props.url !== '/admin_dev/login') {
//     return Redirect({ url: '/admin_dev/login' });
//   }

//   if (props.urlSections[1] === 'login') {
//     if (json && json.result) {
//       return Redirect({ url: '/admin_dev' });
//     }
//     return await AdminLoginPage(props);
//   }

//   return await AdminIndexPage(props);
// };

export const AdminIndexPage = async (props: PageProps) => {
  return <AdminFrame title='Welcome...' />;
};

const devAdminPageRouter = new PageRouter();
// need to be override for app and dev admins
devAdminPageRouter.setFilter(checkAuth);

devAdminPageRouter.use('/menu', AdminMenuSinglePage);
devAdminPageRouter.use('/design', AdminDesignPage);
devAdminPageRouter.use('/login', AdminLoginPage);
devAdminPageRouter.use('/*', AdminIndexPage);

export { devAdminPageRouter };
