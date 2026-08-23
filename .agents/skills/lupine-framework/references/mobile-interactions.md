# Mobile Layout & Interactions

## 1. Mobile Drill-Down Navigation (`SliderFrame`)

Lupine.js uses a slide-over model for multi-level navigation drill-down. **Important: Every child page capable of opening a deeper level must define its own independent `childSliderHook` and mount `<SliderFrame hook={childSliderHook} />` in JSX**. Do not reuse the parent hook, as doing so will replace the current view and destroy the back navigation stack.

```typescript
import { SliderFrame, SliderFrameHookProps, HeaderWithBackFrame } from 'lupine.components';

// 1. Parent Component (Level 1, e.g., Home page)
const Parent = () => {
  const sliderHook: SliderFrameHookProps = {};

  const openDetail = (id: number) => {
    sliderHook.load!(<DetailComponent id={id} parentSliderFrameHook={sliderHook} />);
  };

  return (
    <div>
      <SliderFrame hook={sliderHook} />
      <button onClick={() => openDetail(1)}>Open Details (Level 2)</button>
    </div>
  );
};

// 2. Child Component (Level 2, e.g., Settings page)
const DetailComponent = (props: { id: number; parentSliderFrameHook: SliderFrameHookProps }) => {
  // ⭐️ Must define a brand new independent drill-down hook for this component:
  const childSliderHook: SliderFrameHookProps = {};

  const openDeeper = (id: number) => {
    // ⭐️ Must use childSliderHook to load level 3 pages:
    childSliderHook.load!(<SubDetailComponent id={id} parentSliderFrameHook={childSliderHook} />);
  };

  return (
    <HeaderWithBackFrame title='Detail Page' onBack={(e) => props.parentSliderFrameHook.close!(e)}>
      {/* ⭐️ Must mount a new SliderFrame placeholder for level 3 display */}
      <SliderFrame hook={childSliderHook} />
      <button onClick={() => openDeeper(props.id)}>Go to Next Level (Level 3)</button>
    </HeaderWithBackFrame>
  );
};
```

---

## 2. Mobile Dialogs & Interactive Prompts (Replacing Native Alert/Confirm)

**Strictly avoid browser-native `alert()`, `confirm()`, and `prompt()`**. Always use the Promise-based API from `lupine.components`:

1. **Option Selection / Confirmation (`ActionSheetSelectPromise`)**:
   ```typescript
   import { ActionSheetSelectPromise } from 'lupine.components';

   const index = await ActionSheetSelectPromise({
     title: 'Are you sure you want to delete this record?',
     options: ['Delete', 'Edit'],
     cancelButtonText: 'Cancel',
   });
   if (index === 0) { /* User clicked Delete */ }
   ```

2. **Informational Message (`ActionSheetMessagePromise`)**:
   ```typescript
   import { ActionSheetMessagePromise } from 'lupine.components';

   await ActionSheetMessagePromise({
     title: 'Notification',
     message: 'Saved successfully!',
     closeButtonText: 'OK',
   });
   ```

3. **User Text Input (`ActionSheetInputPromise`)**:
   ```typescript
   import { ActionSheetInputPromise } from 'lupine.components';

   const value = await ActionSheetInputPromise({
     title: 'Enter nickname',
     confirmButtonText: 'OK',
     cancelButtonText: 'Cancel',
   });
   ```

---

## 3. Hardware Back Button & Close Gestures (`data-back-action`)

All close buttons, back chevrons, and overlay backdrop dismissals must bind:
```typescript
import { backActionHelper } from 'lupine.components';

<i
  class='ifc-icon ma-close'
  data-back-action={backActionHelper.genBackActionId()}
  onClick={onClose}
></i>
```
The framework automatically triggers a click event on the top-most active element when the user presses the hardware back button or performs an edge-swipe back gesture.
