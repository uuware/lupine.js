import { adminFrameHelper } from "lupine.api/admin";
import { AdminAboutPage } from "./admin-about";

export const fixAdminAboutPage = () => {
  const aboutItem = adminFrameHelper.getSubMenuItem('help', 'about');
  if (aboutItem) {
    aboutItem.js = () => adminFrameHelper.addPanel('About', AdminAboutPage());
  }
};