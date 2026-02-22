import { DemoStory } from './demo-types';
import { buttonDemo } from '../components/button-demo';
import { buttonPushAnimationDemo } from '../components/button-push-animation-demo';
import { toggleSwitchDemo } from '../components/toggle-switch-demo';
import { spinnerDemo } from '../components/spinner-demo';
import { starsDemo } from '../components/stars-component-demo';
import { editableLabelDemo } from '../components/editable-label-demo';
import { progressDemo } from '../components/progress-demo';
import { radioLabelDemo } from '../components/radio-label-demo';
import { selectAngleDemo } from '../components/select-angle-demo';
import { switchOptionDemo } from '../components/switch-option-demo';
import { actionSheetDemo } from '../components/action-sheet-demo';
import { selectWithTitleDemo } from '../components/select-with-title-demo';
import { inputWithTitleDemo } from '../components/input-with-title-demo';
import { tabsDemo } from '../components/tabs-demo';
import { modalDemo } from '../components/modal-demo';
import { popupMenuDemo } from '../components/popup-menu-demo';
import { noticeMessageDemo } from '../components/notice-message-demo';
import { resizableSplitterDemo } from '../components/resizable-splitter-demo';
import { redirectDemo } from '../components/redirect-demo';
import { textWaveDemo } from '../components/text-wave-demo';
import { textScaleDemo } from '../components/text-scale-demo';
import { textGlowDemo } from '../components/text-glow-demo';
import { togglePlayButtonDemo } from '../components/toggle-play-button-demo';
import { toggleButtonDemo } from '../components/toggle-button-demo';
import { messageBoxDemo } from '../components/message-box-demo';

export const demoRegistry: Record<string, DemoStory<any>> = {
  [buttonDemo.id]: buttonDemo,
  [buttonPushAnimationDemo.id]: buttonPushAnimationDemo,
  [toggleSwitchDemo.id]: toggleSwitchDemo,
  [spinnerDemo.id]: spinnerDemo,
  [starsDemo.id]: starsDemo,
  [editableLabelDemo.id]: editableLabelDemo,
  [progressDemo.id]: progressDemo,
  [radioLabelDemo.id]: radioLabelDemo,
  [selectAngleDemo.id]: selectAngleDemo,
  [switchOptionDemo.id]: switchOptionDemo,
  [actionSheetDemo.id]: actionSheetDemo,
  [selectWithTitleDemo.id]: selectWithTitleDemo,
  [inputWithTitleDemo.id]: inputWithTitleDemo,
  [tabsDemo.id]: tabsDemo,
  [modalDemo.id]: modalDemo,
  [popupMenuDemo.id]: popupMenuDemo,
  [noticeMessageDemo.id]: noticeMessageDemo,
  [resizableSplitterDemo.id]: resizableSplitterDemo,
  [redirectDemo.id]: redirectDemo,
  [textWaveDemo.id]: textWaveDemo,
  [textScaleDemo.id]: textScaleDemo,
  [textGlowDemo.id]: textGlowDemo,
  [togglePlayButtonDemo.id]: togglePlayButtonDemo,
  [toggleButtonDemo.id]: toggleButtonDemo,
  [messageBoxDemo.id]: messageBoxDemo,
};
