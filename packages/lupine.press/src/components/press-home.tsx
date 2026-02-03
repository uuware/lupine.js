import { CssProps } from 'lupine.components';
import { pressProcessUrl } from '../services';

export const LayoutHome = (props: { data: any }) => {
  const { hero, features } = props.data || {};
  const css: CssProps = {
    '.&-hero': {
      padding: '64px 32px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '.&-hero-name': {
      fontSize: '56px',
      lineHeight: '64px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, var(--press-brand-color) 30%, #4facfe 100%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
    '.&-hero-text': {
      fontSize: '56px',
      lineHeight: '64px',
      fontWeight: 'bold',
      marginTop: '8px',
    },
    '.&-hero-tagline': {
      fontSize: '24px',
      lineHeight: '36px',
      color: 'var(--secondary-color)',
      marginTop: '24px',
      maxWidth: '576px',
    },
    '.&-hero-actions': {
      display: 'flex',
      gap: '12px',
      marginTop: '48px',
    },
    '.&-button': {
      display: 'inline-block',
      padding: '0 20px',
      lineHeight: '38px',
      borderRadius: '20px',
      fontWeight: '600',
      textDecoration: 'none',
      fontSize: '14px',
    },
    '.&-button.brand': {
      backgroundColor: 'var(--press-brand-color)',
      color: '#fff',
    },
    '.&-button.alt': {
      backgroundColor: 'var(--secondary-bg-color)',
      color: 'var(--primary-color)',
      border: '1px solid var(--press-border-color)',
    },
    '.&-features': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
      gap: '24px',
      padding: '48px 32px',
      maxWidth: '1152px',
      margin: '0 auto',
    },
    '.&-feature-card': {
      backgroundColor: 'var(--secondary-bg-color)',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid var(--press-border-color)',
    },
    '.&-feature-title': {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    '.&-feature-details': {
      fontSize: '14px',
      color: 'var(--secondary-color)',
      lineHeight: '22px',
    },
  };

  return (
    <div css={css}>
      <section class='&-hero'>
        <h1 class='&-hero-name'>{hero.name}</h1>
        <p class='&-hero-text'>{hero.text}</p>
        <p class='&-hero-tagline'>{hero.tagline}</p>
        <div class='&-hero-actions'>
          {hero.actions?.map((action: any) => (
            <a href={pressProcessUrl(action.link)} class={`&-button ${action.theme}`}>
              {action.text}
            </a>
          ))}
        </div>
      </section>
      {features && (
        <section class='&-features'>
          {features.map((feature: any) => (
            <div class='&-feature-card'>
              <h2 class='&-feature-title'>{feature.title}</h2>
              <p class='&-feature-details'>{feature.details}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
