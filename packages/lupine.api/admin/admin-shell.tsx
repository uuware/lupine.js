import { CssProps, getRenderPageProps, NotificationColor, NotificationMessage, RefProps } from 'lupine.components';

export const AdminShellPage = () => {
  let socket: WebSocket | undefined;
  const getSocket = () => {
    if (!socket) {
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      socket = new WebSocket(`${protocol}//${location.host}/debug/client`);

      socket.onopen = () => {
        printMsg('Connection opened', true);
      };
      socket.onmessage = (message) => {
        printMsg(message.data.toString());
      };
      socket.onclose = () => {
        printMsg('Connection closed', true);
      };
      socket.onerror = (error) => {
        printMsg('Connection error: ' + error, true);
        socket?.close();
        socket = undefined;
      };
    }
    return socket;
  };
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '.admin-shell-box': {},
    '.a-shell-out': {
      maxHeight: '100%',
    },
  };
  const onSend = async () => {
    if (socket?.readyState !== WebSocket.OPEN) {
      printMsg('Connection is not open', true);
      return;
    }
    const cmd = ref.$('.a-shell-input').value;
    socket.send(JSON.stringify({ message: 'shell', cmd }));
    ref.$('.a-shell-input').value = '';
  };
  const onConnect = async () => {
    getSocket();
  };
  const ref: RefProps = {
    onUnload: async (el: Element) => {
      socket?.close();
    },
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };
  const printMsg = (msg: string, clear: boolean = false) => {
    const outDom = ref.$('.a-shell-out');
    if (clear) {
      outDom.value = '';
    }
    outDom.value += msg + '\n';
    outDom.scrollTop = outDom.scrollHeight;
  };
  return (
    <div css={css} class='admin-shell-box' ref={ref}>
      <div class='row-box pb-m'>
        <div class='row-box flex-1 pr-m'>
          <input class='input-base a-shell-input w-100p' onKeyDown={onKeyDown} />
        </div>
        <button onClick={onSend} class='button-base mr-m'>
          Send
        </button>
      </div>
      <div class='row-box pb-m'>
        <button onClick={onConnect} class='button-base button-ss mr-s'>
          Connect
        </button>
        <button onClick={() => printMsg('', true)} class='button-base button-ss'>
          Clear Log
        </button>
      </div>
      <div class='row-box flex-1'>
        <textarea class='input-base a-shell-out w-100p h-100p' readOnly={true}></textarea>
      </div>
    </div>
  );
};
