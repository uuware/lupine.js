/*
  const onLogout = async () => {
    logout('/');
  };
  const userCookie = getCookieUser();
  const listMenu = [
    userCookie && (userCookie.email || userCookie.phone || userCookie.wx) ? '退出登录' : '登录',
    '',
    '浅色模式',
    '深色模式',
    '系统模式',
    '',
    '帮助',
    '关于',
  ];
  if (userCookie && userCookie.admin === '1') {
    listMenu.splice(0, 0, '管理员');
  }

  const handleSelected = (value: string) => {
    if (value === '浅色模式') {
      updateTheme('light');
    } else if (value === '深色模式') {
      updateTheme('dark');
    } else if (value === '系统模式') {
      const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
      if (themeMedia.matches) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } else if (value === '退出登录') {
      onLogout();
    } else if (value === '登录') {
      window.location.href = '/login';
    } else if (value === '管理员') {
      window.open('/admin');
    } else {
      NotificationMessage.sendMessage('Selected: ' + value, NotificationColor.Success);
    }
  }
*/
import { PopupMenuWithIcon } from 'lupine.components';

export const MobileTopSysMenu = (props: { menuItems: string[]; handleSelected: (value: string) => void }) => {
  return (
    <PopupMenuWithIcon
      list={props.menuItems}
      defaultValue=''
      tips=''
      minWidth='auto'
      maxWidth='200px'
      maxHeight='300px'
      align='right'
      noTriangleIcon={true}
      handleSelected={props.handleSelected}
      noUpdateLabel={true}
    ></PopupMenuWithIcon>
  );
};
