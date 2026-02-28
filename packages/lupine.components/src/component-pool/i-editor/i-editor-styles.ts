export const EDITOR_STYLES = `
  .ie-toolbar { display:flex;flex-wrap:wrap;gap:2px;padding:6px 8px;background:var(--secondary-bg-color,#2a2a2a);border-bottom:1px solid #444;user-select:none;flex-shrink:0; }
  .ie-grp { display:flex;gap:2px;align-items:center;padding:0 4px;border-right:1px solid #555; }
  .ie-grp:last-child { border-right:none; }
  .ie-btn { display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:4px;cursor:pointer;color:var(--primary-color,#ccc);transition:background .15s;flex-shrink:0; }
  .ie-btn:hover { background:var(--primary-accent-color,#0a74c9);color:#fff; }
  .ie-btn.active { background:var(--primary-accent-color,#0a74c9);color:#fff; }
  
  .ie-canvas-wrap { flex:1;overflow:hidden;position:relative;background:repeating-conic-gradient(#888 0% 25%,#aaa 0% 50%) 0 0/20px 20px;cursor:crosshair; }
  .ie-canvas { position:absolute;top:0;left:0; }
  .ie-opts { display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 10px;background:#eee;border-top:1px solid #ccc;font-size:12px;color:#333;flex-shrink:0;min-height:36px; }
  .ie-sub-opts { display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 10px;background:#ddd;border-top:1px solid #ccc;font-size:12px;color:#333;flex-shrink:0;min-height:36px; }
  .ie-opts label { display:flex;align-items:center;gap:4px;color:#333; }
  .ie-opts input[type=color] { width:24px;height:24px;border:none;padding:0;cursor:pointer;background:none; }
  .ie-opts input[type=range] { width:80px;cursor:pointer; }
  .ie-opts button { display:inline-flex;align-items:center;justify-content:center;padding:2px 8px;border-radius:3px;border:1px solid #ccc;color:#333;cursor:pointer;font-size:12px;min-height:30px;mask-size: 19px 19px; }
  .ie-opts button:hover { background-color: var(--primary-accent-color, #0a74c9); }
  .ie-text-input { position:absolute;z-index:200;font-size:18px;border:2px dashed #0af;background:rgba(0,0,0,.7);color:#fff;padding:2px 8px;min-width:100px;border-radius:3px;outline:none; }
  .ie-crop-overlay { position:absolute;inset:0;z-index:100;cursor:default; }
  .ie-crop-frame { position:absolute;box-shadow:0 0 0 9999px rgba(0,0,0,.55);border:2px solid #fff;cursor:move;box-sizing:border-box; }
  .ie-handle { position:absolute;width:10px;height:10px;background:#fff;border:1px solid #333;border-radius:2px; }
`;
