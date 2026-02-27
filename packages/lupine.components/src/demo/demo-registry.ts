import { DemoStory } from './demo-types';
import { buttonDemo } from '../components/button-demo';
import { buttonPushAnimationDemo } from '../components/button-push-animation-demo';
import { inputNumberDemo } from '../components/input-number-demo';
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
import { mobileSideMenuDemo } from '../components/mobile-components/mobile-side-menu-demo';
import { responsiveFrameDemo } from '../frames/responsive-frame-demo';
import { sliderFrameDemo } from '../components/slider-frame-demo';
import { carouselDemo } from '../component-pool/carousel';
import { rangeDemo, gaugeDemo } from '../component-pool/range';
import { cascaderDemo } from '../component-pool/cascader';
import { badgeDemo } from '../component-pool/badge';
import { timelineDemo } from '../component-pool/timeline';
import { tooltipDemo } from '../component-pool/tooltip';
import { radialProgressDemo } from '../component-pool/radial-progress';
import { breadcrumbsDemo } from '../component-pool/breadcrumbs';
import { skeletonDemo } from '../component-pool/skeleton';
import { copyButtonDemo } from '../component-pool/copy-button';
import { aspectRatioDemo } from '../component-pool/aspect-ratio';
import { mapWrapperDemo } from '../component-pool/map-wrapper';
import { avatarDemo } from '../component-pool/avatar';
import { cardDemo } from '../component-pool/card';
import { timePickerDemo } from '../component-pool/time-picker';
import { datePickerDemo } from '../component-pool/date-picker';
import { pullToRefreshDemo } from '../component-pool/pull-to-refresh/pull-to-refresh-demo';
import { tagInputDemo } from '../component-pool/tag-input/tag-input-demo';
import { floatingIconMenuDemo } from '../component-pool/floating-icon-menu';
import { tourDemo } from '../component-pool/tour';
import { searchInputDemo } from '../component-pool/search-input';
import { pagingLinkDemo } from '../components/paging-link-demo';
import { hEditorDemo } from '../component-pool/h-editor';
import { slideTabDemo } from '../components/slide-tab-component-demo';
import { qrcodeDemo } from '../component-pool/qrcode';
import { iEditorDemo } from '../component-pool/i-editor';
import { youtubePlayerDemo } from '../component-pool/youtube-player';
import { pEditorDemo } from '../component-pool/p-editor';
import { pdfViewerDemo } from '../component-pool/pdf-viewer';

export const demoRegistry: Record<string, DemoStory<any>> = {
  [buttonDemo.id]: buttonDemo,
  [buttonPushAnimationDemo.id]: buttonPushAnimationDemo,
  [inputNumberDemo.id]: inputNumberDemo,
  [toggleSwitchDemo.id]: toggleSwitchDemo,
  [spinnerDemo.id]: spinnerDemo,
  [starsDemo.id]: starsDemo,
  [editableLabelDemo.id]: editableLabelDemo,
  [progressDemo.id]: progressDemo,
  [radioLabelDemo.id]: radioLabelDemo,
  [selectAngleDemo.id]: selectAngleDemo,
  [switchOptionDemo.id]: switchOptionDemo,
  [actionSheetDemo.id]: actionSheetDemo,
  [mobileSideMenuDemo.id]: mobileSideMenuDemo,
  [responsiveFrameDemo.id]: responsiveFrameDemo,
  [tagInputDemo.id]: tagInputDemo,
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
  [sliderFrameDemo.id]: sliderFrameDemo,
  [rangeDemo.id]: rangeDemo,
  [gaugeDemo.id]: gaugeDemo,
  [badgeDemo.id]: badgeDemo,
  [timelineDemo.id]: timelineDemo,
  [radialProgressDemo.id]: radialProgressDemo,
  [breadcrumbsDemo.id]: breadcrumbsDemo,
  [skeletonDemo.id]: skeletonDemo,
  [copyButtonDemo.id]: copyButtonDemo,
  [aspectRatioDemo.id]: aspectRatioDemo,
  [mapWrapperDemo.id]: mapWrapperDemo,
  [avatarDemo.id]: avatarDemo,
  [cardDemo.id]: cardDemo,
  [cascaderDemo.id]: cascaderDemo,
  [carouselDemo.id]: carouselDemo,
  [tooltipDemo.id]: tooltipDemo,
  [timePickerDemo.id]: timePickerDemo,
  [datePickerDemo.id]: datePickerDemo,
  [pullToRefreshDemo.id]: pullToRefreshDemo,
  [floatingIconMenuDemo.id]: floatingIconMenuDemo,
  [tourDemo.id]: tourDemo,
  [searchInputDemo.id]: searchInputDemo,
  [pagingLinkDemo.id]: pagingLinkDemo,
  [hEditorDemo.id]: hEditorDemo,
  [slideTabDemo.id]: slideTabDemo,
  [qrcodeDemo.id]: qrcodeDemo,
  [iEditorDemo.id]: iEditorDemo,
  [youtubePlayerDemo.id]: youtubePlayerDemo,
  [pEditorDemo.id]: pEditorDemo,
  [pdfViewerDemo.id]: pdfViewerDemo,
};
