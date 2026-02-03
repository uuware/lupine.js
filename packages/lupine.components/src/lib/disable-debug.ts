export const disableDebug = (skipFlagKey = 'skip_debug_protection', debugInterval = 2000) => {
  try {
    if (localStorage.getItem(skipFlagKey) === '1') return;
    setInterval(() => {
      debugger;
    }, debugInterval);
  } catch (e) {}
};
