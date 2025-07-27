/*
  const moveFn = createDragUtil();
  moveFn.setOnMoveCallback((clientX: number, clientY: number, movedX: number, movedY: number) => {
    const dragDom = moveFn.getDraggingDom();
    if (dragDom?.classList.contains('xxx')) {
      updateRangeMMove(clientX, true, dragDom, _saved.stopDoms);
    } else if (dragDom?.classList.contains('yyy')) {
      updatePicMMove(clientX);
    }
  });
    <div
      onMouseMove={moveFn.onMouseMove}
      onMouseUp={moveFn.onMouseUp}
      onTouchMove={moveFn.onTouchMove}
      onTouchEnd={moveFn.onTouchEnd}
    >
      <div onMouseDown={moveFn.onMouseDown} onTouchStart={moveFn.onTouchStart}></div>
    </div>

    // when zooming an image, the way to scale slowly
    const slowDelta = 1 + (scale - 1) * 0.2;
    tempScale = lastScale * slowDelta;
*/
export const createDragUtil = () => {
  let isDragging = false;
  let initialX = 0;
  let initialY = 0;
  let draggingDom: HTMLDivElement | null = null;
  let onMoveCallback: (clientX: number, clientY: number, movedX: number, movedY: number) => void = () => {};
  let onScaleCallback: (scale: number) => void = () => {};

  let isZooming = false;
  let initialDistance = 0;

  const getDistance = (t1: Touch, t2: Touch) => {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  return {
    setOnMoveCallback: (callback: (clientX: number, clientY: number, movedX: number, movedY: number) => void) => {
      onMoveCallback = callback;
    },
    setOnScaleCallback: (callback: (scale: number) => void) => {
      onScaleCallback = callback;
    },
    getDistance,
    getDraggingDom: () => draggingDom,
    onMouseDown: (event: MouseEvent) => {
      event.preventDefault();
      if (event.buttons !== 1) {
        isDragging = false;
        draggingDom = null;
        return;
      }
      isDragging = true;
      draggingDom = event.currentTarget as HTMLDivElement;
      initialX = event.clientX;
      initialY = event.clientY;
    },
    onMouseMove: (event: MouseEvent) => {
      if (event.buttons === 0 || !draggingDom) {
        isDragging = false;
        draggingDom = null;
        return;
      }
      onMoveCallback(event.clientX, event.clientY, event.clientX - initialX, event.clientY - initialY);
    },
    onMouseUp: () => {
      isDragging = false;
      isZooming = false;
      draggingDom = null;
    },

    onTouchStart: (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging = true;
        draggingDom = event.currentTarget as HTMLDivElement;
        initialX = event.touches[0].clientX;
        initialY = event.touches[0].clientY;
      } else if (event.touches.length === 2) {
        initialDistance = getDistance(event.touches[0], event.touches[1]);
        isZooming = true;
      } else {
        isDragging = false;
        draggingDom = null;
      }
    },
    onTouchMove: (event: TouchEvent) => {
      if (isZooming) {
        if (event.touches.length === 2) {
          event.preventDefault(); // 防止页面滚动
          const newDistance = getDistance(event.touches[0], event.touches[1]);
          const delta = newDistance / initialDistance;
          //   const newScale = Math.min(Math.max(1, scale * delta), 4); // 限制缩放范围
          onScaleCallback(delta);
          return;
        }
      }
      if (!isDragging || event.touches.length === 0 || !draggingDom) {
        isDragging = false;
        draggingDom = null;
        return;
      }
      onMoveCallback(
        event.touches[0].clientX,
        event.touches[0].clientY,
        event.touches[0].clientX - initialX,
        event.touches[0].clientY - initialY
      );
    },
    onTouchEnd: () => {
      isDragging = false;
      isZooming = false;
      draggingDom = null;
    },
  };
};
