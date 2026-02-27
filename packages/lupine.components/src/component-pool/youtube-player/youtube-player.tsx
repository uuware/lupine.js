import { CssProps } from 'lupine.web';

export type YouTubePlayerProps = {
  class?: string;
  style?: CssProps;
  videoId: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  allowFullScreen?: boolean;
};

export const YouTubePlayer = (props: YouTubePlayerProps) => {
  const {
    videoId,
    width = '100%',
    height = '100%',
    autoplay = false,
    allowFullScreen = true,
    style,
    class: className,
  } = props;

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}`;

  return (
    <div class={className} css={{ position: 'relative', width, height, ...style }}>
      <iframe
        width='100%'
        height='100%'
        src={src}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen={allowFullScreen}
        style={{ border: 'none', display: 'block' }}
      ></iframe>
    </div>
  );
};
