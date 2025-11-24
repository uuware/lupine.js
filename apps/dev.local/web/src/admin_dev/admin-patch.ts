import { adminFrameHelper } from "lupine.api/admin";
import { AdminAboutPage } from "./admin-about";
import { clearCookie } from "lupine.components";
import { userCookieName } from "../models";

export const patchAdminFrame = () => {
  const aboutItem = adminFrameHelper.getSubMenuItem('help', 'about');
  if (aboutItem) {
    aboutItem.js = () => adminFrameHelper.addPanel('About', AdminAboutPage());
  }

  adminFrameHelper.setAppAdminHookCheckLogin(async (authResponse: any) => {
    if (authResponse && authResponse.user && authResponse.user.admin === '1') {
      return true;
    }
    return false;
  });
  adminFrameHelper.setAppAdminHookLogout(async () => {
    clearCookie(userCookieName, '/');
    clearCookie('_token', '/');
  });
};