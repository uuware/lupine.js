import {
  CssProps,
  MobileHeaderCenter,
  MobileHeaderEmptyIcon,
  MobileHeaderTitleIcon,
  MobileTopSysIcon,
  PageProps,
  RefProps,
} from 'lupine.components';

export const FinancePage = async (props: PageProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    '.finance-list-container': {
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };

  const ref: RefProps = {
    onLoad: async () => {},
  };

  return (
    <div css={css} ref={ref}>
      <MobileHeaderCenter>
        <MobileHeaderTitleIcon
          title='Finance'
          left={<MobileHeaderEmptyIcon />}
          right={
            <div class='flex-center-gap-12'>
              <MobileTopSysIcon />
            </div>
          }
        />
      </MobileHeaderCenter>

      <div class='finance-list-container no-scrollbar-container'>This is a finance demo page.</div>
    </div>
  );
};
