import {
  CssProps,
  HtmlVar,
  PageProps,
  RefProps,
  SliderFrame,
  SliderFrameHookProps,
  MobileHeaderCenter,
  MobileHeaderEmptyIcon,
  MobileHeaderTitleIcon,
  MobileTopSysIcon,
} from 'lupine.components';
import { MineService, MineStats } from '../services/mine-service';
import { MineSettingsPage } from '../components/mine-settings-page';
import { MinePremiumPage } from '../components/mine-premium-page';

export const MinePage = async (props: PageProps) => {
  const dom = new HtmlVar('');
  const sliderFrameHook: SliderFrameHookProps = {};

  const renderDashboard = () => {
    const stats: MineStats = MineService.getStats();

    return (
      <div class='mine-dashboard'>
        <div class='dashboard-title'>Data Overview</div>

        <div class='stat-grid'>
          <div class='stat-card' style={{ borderTopColor: 'var(--primary-accent-color)' }}>
            <div class='stat-icon'>
              <i class='ifc-icon ma-text-box-outline' style={{ color: 'var(--primary-accent-color)' }} />
            </div>
            <div class='stat-value'>{stats.noteCount}</div>
            <div class='stat-label'>Notes</div>
          </div>
        </div>
      </div>
    );
  };

  const refreshRender = () => {
    dom.value = (
      <div class='mine-page-container'>
        <SliderFrame hook={sliderFrameHook} />

        {/* Profile Header Block */}
        <div class='profile-header'>
          <div class='profile-info'>
            <div class='avatar'>
              <i class='ifc-icon ma-account' />
            </div>
            <div class='user-details'>
              <div class='user-name'>Demo User</div>
              <div class='user-tagline'>Local Workspace Offline</div>
            </div>
          </div>
          <div class='profile-nav'>
            <div class='flex-1'></div>
            <div
              class='settings-btn'
              onClick={() => {
                sliderFrameHook.load!(
                  <MineSettingsPage sliderFrameHook={sliderFrameHook} onDataChanged={refreshRender} />
                );
              }}
            >
              <i class='ifc-icon ma-cog-outline' />
            </div>
          </div>
        </div>

        <div class='mine-scroll-content'>
          {/* Dashboard Blocks */}
          {renderDashboard()}

          {/* Premium Banner Mock */}
          <div class='premium-banner'>
            <div class='banner-content'>
              <div class='banner-title'>
                <i class='ifc-icon ma-star' /> Upgrade to Premium
              </div>
              <div class='banner-desc'>Unlock cloud sync, custom themes, and unlimited media storage.</div>
            </div>
            <button
              class='banner-btn'
              onClick={() => {
                sliderFrameHook.load!(<MinePremiumPage sliderFrameHook={sliderFrameHook} />);
              }}
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    );
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',

    '.mine-page-container': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },

    // 1. Profile Header
    '.profile-header': {
      padding: '16px 20px 24px 20px',
      borderBottomLeftRadius: '24px',
      borderBottomRightRadius: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      zIndex: 10,
    },
    '.profile-nav': {
      display: 'flex',
      marginBottom: '16px',
    },
    '.settings-btn': {
      width: '36px',
      height: '36px',
      borderRadius: '18px',
      backgroundColor: 'var(--secondary-bg-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'var(--primary-color)',
      transition: 'background-color 0.2s',
      '&:active': {
        backgroundColor: 'rgba(0,0,0,0.05)',
      },
    },
    '.profile-info': {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    '.avatar': {
      width: '64px',
      height: '64px',
      borderRadius: '32px',
      backgroundColor: 'var(--primary-accent-color)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
    },
    '.user-name': {
      fontSize: '22px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      marginBottom: '4px',
    },
    '.user-tagline': {
      fontSize: '14px',
      color: 'var(--secondary-color)',
      opacity: 0.8,
    },

    // Scrollable Rest of the Page
    '.mine-scroll-content': {
      flex: 1,
      overflowY: 'auto',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },

    // 2. Dashboard
    '.mine-dashboard': {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    '.dashboard-title': {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
    },
    '.stat-grid': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
    },
    '.stat-card': {
      backgroundColor: 'var(--primary-bg-color)',
      borderRadius: '12px',
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      borderTop: '4px solid transparent',
    },
    '.stat-icon': {
      fontSize: '24px',
      marginBottom: '8px',
    },
    '.stat-value': {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      marginBottom: '4px',
    },
    '.stat-label': {
      fontSize: '12px',
      color: 'var(--secondary-color)',
    },

    '.usage-bar-container': {
      backgroundColor: 'var(--primary-bg-color)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    '.usage-bar-labels': {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      color: 'var(--secondary-color)',
      marginBottom: '12px',
      fontWeight: '500',
    },
    '.usage-bar': {
      height: '12px',
      borderRadius: '6px',
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0.05)',
      gap: '2px', // tiny visual gap between segments
    },
    '.usage-bar-segment': {
      height: '100%',
      transition: 'width 0.5s ease',
    },
    '.usage-bar-segment.empty': { backgroundColor: 'transparent' },
    '.usage-bar-segment.note': { backgroundColor: 'var(--primary-accent-color)' },
    '.usage-bar-segment.diary': { backgroundColor: '#eb2f96' },
    '.usage-bar-segment.finance': { backgroundColor: '#52c41a' },

    // 3. Premium Banner
    '.premium-banner': {
      background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      color: '#333',
      boxShadow: '0 8px 16px rgba(255, 154, 158, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    '.banner-content': {
      position: 'relative',
      zIndex: 2,
    },
    '.banner-title': {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    '.banner-title i': {
      color: '#FFD700',
    },
    '.banner-desc': {
      fontSize: '14px',
      opacity: 0.9,
      lineHeight: '1.4',
    },
    '.banner-btn': {
      alignSelf: 'flex-start',
      backgroundColor: '#fff',
      color: '#FF9A9E',
      border: 'none',
      padding: '8px 20px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '14px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 2,
    },
    '.mine-page-content-wrapper': {
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const ref: RefProps = {
    onLoad: async () => {
      refreshRender();
    },
  };

  return (
    <div css={css} ref={ref}>
      <MobileHeaderCenter>
        <MobileHeaderTitleIcon
          title='Mine'
          left={<MobileHeaderEmptyIcon />}
          right={
            <div class='flex-center-gap-12'>
              <MobileTopSysIcon />
            </div>
          }
        />
      </MobileHeaderCenter>
      <div class='mine-page-content-wrapper no-scrollbar-container'>{dom.node}</div>
    </div>
  );
};
