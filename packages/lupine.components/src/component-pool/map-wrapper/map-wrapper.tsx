import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';

export type MapWrapperHookProps = {
  reload?: () => void;
};

export type MapWrapperProps = {
  class?: string;
  style?: CssProps;
  /** Latitude of the map center */
  lat?: number;
  /** Longitude of the map center */
  lng?: number;
  /** Zoom level (1-19). Default: 13 */
  zoom?: number;
  /** Width of the map. Default: 100% */
  width?: string;
  /** Height of the map. Default: 300px */
  height?: string;
  /** Optional hook for parent to control the map */
  hook?: MapWrapperHookProps;
};

export const MapWrapper = (props: MapWrapperProps) => {
  const css: CssProps = {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 'var(--border-radius-m, 8px)',
    backgroundColor: 'var(--secondary-bg-color, #e5e7eb)',

    '.&-iframe': {
      display: 'block',
      width: '100%',
      height: '100%',
      border: 'none',
    },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const lat = props.lat ?? 35.6762; // Default: Tokyo
  const lng = props.lng ?? 139.6503;
  const zoom = props.zoom ?? 13;

  const buildSrc = (lat: number, lng: number, zoom: number) =>
    `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${
      lat + 0.05
    }&layer=mapnik&marker=${lat},${lng}`;

  const ref: RefProps = {
    globalCssId,
    onLoad: async () => {
      const iframe = ref.$('.&-iframe') as HTMLIFrameElement;
      if (!iframe) return;

      if (props.hook) {
        props.hook.reload = () => {
          if (iframe) {
            iframe.src = iframe.src;
          }
        };
      }
    },
  };

  const width = props.width || '100%';
  const height = props.height || '300px';

  return (
    <div class={['&-container', props.class].join(' ').trim()} ref={ref} css={{ width, height, ...props.style }}>
      <iframe
        class='&-iframe'
        src={buildSrc(lat, lng, zoom)}
        allowFullScreen={true}
        loading='lazy'
        referrerpolicy='no-referrer-when-downgrade'
        title='Map'
      />
    </div>
  );
};
