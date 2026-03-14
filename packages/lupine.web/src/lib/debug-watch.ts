export const debugWatch = (port: number) => {
  let flag = 0;
  const connect = () => {
    console.log('Creating debug-watch socket');
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${location.host}/debug/client`);
    window.addEventListener('beforeunload', () => {
      socket.close();
    });
    socket.onopen = () => {
      socket.send(JSON.stringify({ message: 'get-flag' }));
    };
    socket.onmessage = (message) => {
      try {
        const jsonData = JSON.parse(message.data);
        console.log('Debug socket message:', jsonData);
        if (jsonData && jsonData.flag) {
          if (!flag) {
            flag = jsonData.flag;
          } else if (flag !== jsonData.flag) {
            document.location.reload();
          }
        }
      } catch {}
    };
    socket.onclose = () => {
      console.log('Debug socket close.');
      setTimeout(connect, 3000);
    };
  };
  connect();
};
