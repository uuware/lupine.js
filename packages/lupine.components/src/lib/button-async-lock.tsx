// async button lock (protected against double click during async processing)
/*
const onToggle = buttonAsyncLock(
  async (checked: boolean) => {
    ... async code ...
  },
  hook,
  500,
  (checked) => hook.setChecked?.(!checked)
);
*/
export function buttonAsyncLock<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  hook?: { setEnabled?: (enabled: boolean) => void },
  minDelayMs: number = 500,
  onDrop?: (...args: Parameters<T>) => void
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  let isLocked = false;
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    if (isLocked) {
      if (onDrop) onDrop(...args);
      return undefined;
    }
    isLocked = true;
    if (hook && hook.setEnabled) {
      hook.setEnabled(false);
    }
    const startTime = Date.now();
    try {
      return await fn(...args);
    } finally {
      const elapsed = Date.now() - startTime;
      const remainingDelay = minDelayMs - elapsed;
      if (remainingDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingDelay));
      }
      isLocked = false;
      if (hook && hook.setEnabled) {
        hook.setEnabled(true);
      }
    }
  };
}
