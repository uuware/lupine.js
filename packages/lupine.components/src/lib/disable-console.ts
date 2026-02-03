export const disableConsole = (skipFlagKey = 'skip_console_protection') => {
  try {
    if (localStorage.getItem(skipFlagKey) === '1') return;
    var c = window.console as any;
    if (!c) return;
    var voidFn = function () {};
    ['log', 'warn', 'info', 'error', 'debug', 'table', 'trace'].forEach((k: string) => {
      c[k] = voidFn;
    });
  } catch (e) {}
};
