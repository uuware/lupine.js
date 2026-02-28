export const PEDITOR_STYLES = `
  .pe-container { display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden;background:#333;color:#eee; }
  .pe-toolbar { display:flex;flex-wrap:wrap;gap:2px;padding:6px 8px;background:var(--secondary-bg-color,#2a2a2a);border-bottom:1px solid #444;user-select:none;flex-shrink:0;align-items:center; }
  .pe-grp { display:flex;gap:2px;align-items:center;padding:0 4px;border-right:1px solid #555; }
  .pe-grp:last-child { border-right:none; }
  .pe-btn { display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:4px;cursor:pointer;color:var(--primary-color,#ccc);transition:background .15s;flex-shrink:0; }
  .pe-btn:hover { background:var(--primary-accent-color,#0a74c9);color:#fff; }
  .pe-btn.active { background:var(--primary-accent-color,#0a74c9);color:#fff; }
  .pe-btn:disabled { opacity:0.5;cursor:not-allowed; }
  
  .pe-main { display:flex;flex:1;overflow:hidden; }
  
  .pe-sidebar { width:180px;background:#222;border-right:1px solid #444;overflow-y:auto;display:flex;flex-direction:column;padding:8px;gap:8px; }
  .pe-thumb-wrap { position:relative;background:#fff;border:2px solid transparent;cursor:pointer;transition:border-color 0.2s; }
  .pe-thumb-wrap.active { border-color:var(--primary-accent-color,#0a74c9); }
  .pe-thumb-wrap.drag-over { border-top: 2px solid #0f0; }
  .pe-thumb-canvas { width:100%;height:auto;display:block; }
  .pe-thumb-num { position:absolute;bottom:4px;right:4px;background:rgba(0,0,0,0.6);color:#fff;font-size:10px;padding:2px 4px;border-radius:4px; }
  .pe-thumb-del { position:absolute;top:4px;right:4px;background:rgba(255,0,0,0.8);color:#fff;font-size:12px;width:18px;height:18px;line-height:18px;text-align:center;border-radius:50%;cursor:pointer;display:none; }
  .pe-thumb-add-top, .pe-thumb-add-bottom { position:absolute;left:50%;transform:translateX(-50%);background:rgba(0,180,0,0.8);color:#fff;font-size:16px;width:20px;height:20px;line-height:20px;text-align:center;border-radius:50%;cursor:pointer;display:none;z-index:10; }
  .pe-thumb-add-top { top:-10px; }
  .pe-thumb-add-bottom { bottom:-10px; }
  .pe-thumb-wrap:hover .pe-thumb-del, 
  .pe-thumb-wrap:hover .pe-thumb-add-top, 
  .pe-thumb-wrap:hover .pe-thumb-add-bottom { display:block; }
  
  .pe-canvas-area { flex:1;overflow:auto;position:relative;background:repeating-conic-gradient(#444 0% 25%,#555 0% 50%) 0 0/20px 20px;display:flex;justify-content:center;align-items:flex-start;padding:20px; }
  .pe-canvas-wrap { position:relative;box-shadow:0 4px 12px rgba(0,0,0,0.5); }
  .pe-canvas-bg { position:absolute;top:0;left:0;z-index:1; } /* pdf rendering */
  .pe-canvas-fg { position:absolute;top:0;left:0;z-index:2;cursor:crosshair; } /* user drawings/text */
  
  .pe-opts { display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 10px;background:#eee;border-top:1px solid #ccc;font-size:12px;color:#333;flex-shrink:0;min-height:36px; }
  .pe-opts label { display:flex;align-items:center;gap:4px;color:#333; }
  .pe-opts input[type=color] { width:24px;height:24px;border:none;padding:0;cursor:pointer;background:none; }
  .pe-opts input[type=range] { width:80px;cursor:pointer; }
  .pe-opts button { display:inline-flex;align-items:center;justify-content:center;padding:2px 8px;border-radius:3px;border:1px solid #ccc;color:#333;cursor:pointer;font-size:12px;min-height:30px; }
  .pe-opts button:hover { background-color: var(--primary-accent-color, #0a74c9); color:#fff;}
  .pe-opts input[type=file] { display:none; }

  .pe-text-input { position:absolute;z-index:200;font-size:18px;border:2px dashed #0af;background:rgba(0,0,0,.7);color:#fff;padding:2px 8px;min-width:100px;border-radius:3px;outline:none; }
  .pe-handle { position:absolute;width:10px;height:10px;background:#fff;border:1px solid #333;border-radius:2px;z-index:10; }
  
  .pe-loading { position:absolute;inset:0;background:rgba(0,0,0,0.5);color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;z-index:999; }
`;
