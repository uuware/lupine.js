import {
  CssProps,
  MobileHeaderCenter,
  MobileHeaderEmptyIcon,
  MobileHeaderTitleIcon,
  MobileTopSysIcon,
  PageProps,
  RefProps,
} from 'lupine.components';
import { MineAboutContent } from '../components/mine-about-page';

export const AboutPage = async (props: PageProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  };

  const ref: RefProps = {
    onLoad: async () => {},
  };

  return (
    <div css={css} ref={ref}>
      <MobileHeaderCenter>
        <MobileHeaderTitleIcon
          title='About'
          left={<MobileHeaderEmptyIcon />}
          right={
            <div class='flex-center-gap-12'>
              <MobileTopSysIcon />
            </div>
          }
        />
      </MobileHeaderCenter>

      <div class='tools-scroll tools-list-container no-scrollbar-container'>
        <MineAboutContent />
      </div>
    </div>
  );
};
