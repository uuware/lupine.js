import { CssProps } from 'lupine.web';

export type YouTubePlayerProps = {
  class?: string;
  style?: CssProps;
  srcOrVideoId: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  allowFullScreen?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  rel?: boolean;
  modestbranding?: boolean;
};

function parseYouTubeUrl(urlOrId: string) {
  if (!urlOrId) return { videoId: '' };
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return { videoId: urlOrId };
  
  let videoId = '';
  let list = '';
  let start = '';

  try {
    const urlObj = new URL(urlOrId);
    if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname === '/watch') {
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.startsWith('/embed/')) {
        videoId = urlObj.pathname.split('/')[2] || '';
      } else if (urlObj.pathname.startsWith('/v/')) {
        videoId = urlObj.pathname.split('/')[2] || '';
      }
      list = urlObj.searchParams.get('list') || '';
      start = urlObj.searchParams.get('t') || urlObj.searchParams.get('start') || '';
    } else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
      list = urlObj.searchParams.get('list') || '';
      start = urlObj.searchParams.get('t') || urlObj.searchParams.get('start') || '';
    }
  } catch (e) {
    const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match) videoId = match[1];
  }
  
  if (start && isNaN(Number(start))) {
    const timeMatch = start.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
    if (timeMatch && timeMatch[0]) {
      let seconds = 0;
      if (timeMatch[1]) seconds += parseInt(timeMatch[1]) * 3600;
      if (timeMatch[2]) seconds += parseInt(timeMatch[2]) * 60;
      if (timeMatch[3]) seconds += parseInt(timeMatch[3]);
      if (seconds > 0) start = seconds.toString();
    }
  }

  return { videoId, list, start };
}

export const YouTubePlayer = (props: YouTubePlayerProps) => {
  const {
    srcOrVideoId,
    width = '100%',
    height = '100%',
    autoplay = false,
    allowFullScreen = true,
    controls = true,
    loop = false,
    muted = false,
    rel = false,
    modestbranding = true,
    style,
    class: className,
  } = props;

  const { videoId, list, start } = parseYouTubeUrl(srcOrVideoId);
  
  let src = '';
  if (videoId || list) {
    src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}`;
    if (!controls) src += '&controls=0';
    if (loop) src += `&loop=1&playlist=${videoId}`; // YouTube requires playlist=VIDEO_ID for loop to work
    if (muted) src += '&mute=1';
    if (!rel) src += '&rel=0';
    if (modestbranding) src += '&modestbranding=1';
    if (list) src += `&list=${list}`;
    if (start) src += `&start=${start}`;
  }

  return (
    <div class={className} css={{ position: 'relative', width, height, ...style }}>
      {src ? (
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
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', color: '#999', border: '1px solid #ddd' }}>
          Invalid YouTube URL
        </div>
      )}
    </div>
  );
};
