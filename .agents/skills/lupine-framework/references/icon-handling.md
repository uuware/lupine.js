# Icon Handling in Lupine.api and Target Apps

`lupine.api` UI code commonly uses icon classes such as:

```tsx
<i class='ifc-icon ma-pencil-outline mr-m' onClick={onEditLocal} title='Edit'></i>
```

The package expects the final app to provide the actual icon implementation. There are two supported patterns.

---

## Pattern A: Generated Icon Font

The demo app uses `apps/demo.app/web/icons-font.config.js` to generate a font icon bundle. This config defines icon names and source SVG files, then the generated CSS/font makes classes such as `ifc-icon ma-pencil-outline` render correctly.

When using this pattern:

- Prefer existing icon names already provided by the target app.
- If a new icon is required, add it to the app-level icon font config, not to `lupine.api` package code.
- Keep using the existing markup contract: `<i class='ifc-icon icon-name'></i>`.
- Remember that `lupine.api` is a package; it should not assume a specific app's generated font file exists unless the target app includes it.

---

## Pattern B: Embedded SVG Mask Icons

Some target apps do not generate an icon font. For convenience, they can provide CSS mask-based embedded SVG icons instead. The CMS app uses `apps/cms/web/src/styles/app-icons.ts` for this.

The pattern is:

```typescript
export const appIconsCss: CssProps = {
  '.ifc-icon': {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: 'contain',
    '-webkit-mask-repeat': 'no-repeat',
    '-webkit-mask-position': 'center',
    '-webkit-mask-size': 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    WebkitMaskSize: 'contain',
    backgroundColor: 'currentColor',
  },
  ...Object.entries(appIcons).reduce((acc: any, [key, svg]) => {
    acc['.ifc-icon.' + key] = {
      '-webkit-mask-image': 'url("' + svg + '")',
      maskImage: 'url("' + svg + '")',
    };
    return acc;
  }, {} as any),
};
```

With this approach, the same `ifc-icon` markup works even without a font file because each icon class points to an embedded SVG data URL.

---

## Agent Rules for Adding Icons

- First try to reuse an existing icon class. Search app icon config files before inventing a new name.
- If adding package UI in `lupine.api`, keep the markup generic: `<i class='ifc-icon existing-icon-name'></i>`.
- If the target app uses generated fonts, add the source SVG to its `icons-font.config.js` and regenerate icons according to that app's process.
- If the target app uses embedded SVG masks, find its `app-icons.ts` file and add the new SVG entry to the `appIcons` map.
- Do not hardcode raw inline SVG in every package component unless there is a strong reason. Prefer the app-level icon provider so theming via `currentColor`, sizing, and consistency keep working.
- Do not assume all apps use the same icon backend. The contract is the CSS class interface (`ifc-icon` plus icon name), while the app decides whether that class is backed by a font or SVG masks.
- When reviewing missing icons, check whether the icon CSS was loaded by the target app before changing package code.
