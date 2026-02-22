import { uniqueIdGenerator } from 'lupine.web';
import icons from './buttons_morden.gif';

export type HEditorPickupImageHookProps = {
  callback: (url: string) => void;
};
const HEDITOR_ICON_WH = 18;
const getHEditorIconStyle = (iconx: number, icony: number) => {
  return `background-position: ${(iconx + 1) * -HEDITOR_ICON_WH}px ${(icony + 1) * -HEDITOR_ICON_WH}px;`;
};
export type HEditorLangProps = { [key: string]: string };
export type HEditorLabelProps = { [key: string]: string };
export type HEditorPluginButonProps = {
  name: string;
  label: string;
  command?: string;
  width?: string;
  list?: { [key: string]: string };
  style?: string;
};

export type HEditorPluginProps = {
  name: string;
  buttons: {
    [key: string]: HEditorPluginButonProps;
  };
  onSelectedChanged?: (
    editor: any,
    plugin: HEditorPluginProps,
    btnid: string,
    selText: string,
    selValue: string
  ) => void;
  onButtonClick?: (editor: any, plugin: HEditorPluginProps, btnid: string) => void;
};
export const HEditorLangEn: HEditorLangProps = {
  name: 'EN',
  Size: 'Size',
  fontsize: 'Font Size',
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  left: 'Left Align',
  center: 'Center Align',
  right: 'Right Align',
  justify: 'Justify Align',
  ol: 'Insert Ordered List',
  ul: 'Insert Unordered List',
  strikethrough: 'Strike Through',
  indent: 'Indent Text',
  outdent: 'Remove Indent',
  removeformat: 'Remove Formatting',
  textColor: 'Text Color',
  backColor: 'Background Color',
  image: 'Image',
  undo: 'Undo',
  redo: 'Redo',
  Link: 'Edit Link',
  UnLink: 'Remove Link',

  OK: 'OK',
  Cancel: 'Cancel',
};
export const HEditorLangCn: HEditorLangProps = {
  name: 'CN',
  Size: '字号',
  fontsize: '字号',
  bold: '粗体',
  italic: '斜体',
  underline: '下划线',
  left: '左对齐',
  center: '居中对齐',
  right: '右对齐',
  justify: '两端对齐',
  ol: '插入有序列表',
  ul: '插入无序列表',
  strikethrough: '删除线',
  indent: '缩进',
  outdent: '取消缩进',
  removeformat: '清除格式',
  textColor: '文本颜色',
  backColor: '背景颜色',
  image: '图片',
  undo: '撤销',
  redo: '重做',
  Link: '编辑链接',
  UnLink: '移除链接',

  OK: '确定',
  Cancel: '取消',
};

const HEditorLabel: HEditorLabelProps = {};

export const hEditorUniqueId = uniqueIdGenerator('he-'); // he means heditor
export class HEditor {
  static _plugins: { [key: string]: HEditorPluginProps } = {};
  static _lang: HEditorLangProps = HEditorLangEn;
  static _label: HEditorLabelProps = HEditorLabel;
  static _iconPath: string = icons;
  static _PickupImageHook: (callback: (url: string) => void) => void;

  selector: string | HTMLDivElement;
  m_buttons?: string[] = [];
  constructor(selector: string | HTMLDivElement, html?: string, m_buttons?: string[], lang?: HEditorLangProps) {
    this.selector = selector;
    this.m_buttons = m_buttons;
    HEditor._lang = lang || HEditor._lang;
    this.init(html);

    (window as any).HEditor = HEditor;
  }
  static setLang(lang: HEditorLangProps) {
    HEditor._lang = lang;
  }
  static setLabel(label: HEditorLabelProps) {
    HEditor._label = label;
  }
  static setIconPath(iconPath: string) {
    HEditor._iconPath = iconPath;
  }
  static setPickupImageHook(hook: (callback: (url: string) => void) => void) {
    HEditor._PickupImageHook = hook;
  }
  static lang(key: string) {
    return HEditor._lang[key] || key;
  }
  static label(key: string) {
    return HEditor._label[key] || key;
  }
  static addPlugin(name: string, plugin: HEditorPluginProps) {
    HEditor._plugins[name.toUpperCase()] = plugin;
  }
  static getEditor(
    selector: string | HTMLDivElement,
    html?: string,
    m_buttons?: string[],
    lang?: HEditorLangProps
  ): HEditor | undefined {
    const dom = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!dom) {
      console.warn(`HEditor: ${selector} not found`);
      return;
    }

    const domAny = dom as any;
    if (domAny._edt) {
      return domAny._edt;
    }
    const edt = new HEditor(selector, html, m_buttons, lang);
    domAny._edt = edt;
    return edt;
  }
  static getEditorById(eid: string): HEditor | undefined {
    const dom = document.querySelector(`[_eid="${eid}"]`) as any;
    if (!dom || !dom._edt) {
      console.warn(`HEditor: ${eid} not found`);
      return;
    }
    return dom._edt;
  }
  static processSelectedChanged(obj: HTMLSelectElement, edtId: string, pluginname: string, btnid: string) {
    const editor = HEditor.getEditorById(edtId);
    const plugin = HEditor._plugins[pluginname.toUpperCase()];
    plugin.onSelectedChanged!(editor, plugin, btnid, obj.options[obj.selectedIndex].text, obj.value);
    obj.selectedIndex = 0;
  }
  static processButtonClick(obj: HTMLSelectElement, edtId: string, pluginname: string, btnid: string) {
    const editor = HEditor.getEditorById(edtId);
    const plugin = HEditor._plugins[pluginname.toUpperCase()];
    plugin.onButtonClick!(editor, plugin, btnid);
  }

  m_id: string = '';
  m_doc: any;
  m_win: any;
  m_p: any;
  m_ifrm: any;
  m_focus = false;
  m_range: any;
  m_drag: any;
  onBlur() {
    this.m_focus = false;
  }
  onFocus() {
    this.m_focus = true;
    this.m_range = null;
  }
  onMDown(e: MouseEvent) {
    this.m_focus = true;
    const tg = e.target as HTMLElement;
    const tgname = tg.nodeName.toUpperCase();
    if (this.m_drag && this.m_drag.o) {
      // this.m_drag.o.style.opacity = this.m_drag.op;
      // this.m_drag.o.style.border = this.m_drag.b;
      this.m_drag.o.style.cursor = this.m_drag.c;
      this.m_drag = null;
    }
    if (tgname == 'IMG') {
      this.selObj(tg);
      this.m_drag = {
        ty: -1,
        o: tg,
        x: e.clientX,
        y: e.clientY,
        w: tg.offsetWidth,
        h: tg.offsetHeight,
        // op: tg.style.opacity,
        // b: tg.style.border,
        c: tg.style.cursor,
      };
      // tg.style.opacity = '0.4';
      // tg.style.border = '1px dotted red';
      const r = tg.getBoundingClientRect();
      if (e.clientX >= r.right - 10 || e.clientY >= r.bottom - 10) {
        e.preventDefault();
        this.m_drag.ty = 0;
      }
    }
  }
  onMMove(e: MouseEvent) {
    const tg = e.target as HTMLElement;
    const tgname = tg.nodeName.toUpperCase();
    const press = e.buttons == 1;

    if (this.m_drag && this.m_drag.o) {
      if (this.m_drag.ty >= 0) {
        if (!press) return this.onMUp(e);
      }
      window.getSelection()?.removeAllRanges();
      if (this.m_drag.ty == 0) {
        e.preventDefault();
        this.m_drag.ty = 1;
      } else if (this.m_drag.ty < 0 && press) {
        if (e.clientX != this.m_drag.x || e.clientY != this.m_drag.y) {
          // this.m_drag.o.style.opacity = this.m_drag.op;
          // this.m_drag.o.style.border = this.m_drag.b;
          this.m_drag.o.style.cursor = this.m_drag.c;
        }
      }

      if (this.m_drag.ty == 1) {
        let ww = this.m_drag.w + e.clientX - this.m_drag.x;
        let hh = this.m_drag.h + e.clientY - this.m_drag.y;
        if (ww < 5) ww = 5;
        if (hh < 5) hh = 5;
        this.m_drag.o.width = ww;
        this.m_drag.o.height = hh;
      }
    }

    if (tgname == 'IMG') {
      const r = tg.getBoundingClientRect();
      if (e.clientX >= r.right - 10 && e.clientY <= r.bottom - 20) {
        tg.style.cursor = 'w-resize';
      } else if (e.clientX <= r.right - 20 && e.clientY >= r.bottom - 10) {
        tg.style.cursor = 'ns-resize';
      } else if (e.clientX >= r.right - 20 && e.clientY >= r.bottom - 20) {
        tg.style.cursor = 'nw-resize';
      } else {
        tg.style.cursor = '';
      }
    }
  }
  onMUp(e: MouseEvent) {
    const tg = e.target as HTMLElement;
    const tgname = tg.nodeName.toUpperCase();

    if (this.m_drag && this.m_drag.o) {
      // if (tgname != 'IMG') {
      // this.m_drag.o.style.opacity = this.m_drag.op;
      // this.m_drag.o.style.border = this.m_drag.b;
      // }
      this.m_drag.o.style.cursor = this.m_drag.c;
      this.m_drag.ty = -1;
    }
    if (tgname == 'IMG') {
      this.selObj(tg);
    }
  }
  onDblClick() {}
  setFocus() {
    this.m_win.focus();
    this.onFocus();
  }
  onBeforedeactivate() {
    this.m_range = this.m_doc.selection.createRange();
    this.m_focus = false;
  }

  execCommand(cmd: string, args?: any) {
    this.setFocus();
    this.m_doc.execCommand(cmd, false, args);
  }
  pickupColor(callback: (color: string) => void) {
    const input = document.querySelector(`.${this.m_id}_color`) as HTMLInputElement;
    input.addEventListener(
      'change',
      () => {
        callback(input.value);
      },
      { once: true }
    );
    input.click();
  }
  pickupImage(callback: (url: string) => void) {
    if (!HEditor._PickupImageHook) {
      alert('HEditor: PickupImageHook not set');
      return;
    }
    HEditor._PickupImageHook(callback);
  }

  init(html?: string) {
    const dom = (
      typeof this.selector === 'string' ? document.querySelector(this.selector) : this.selector
    ) as HTMLDivElement;
    if (!dom) {
      console.warn(`HEditor: ${this.selector} not found`);
      return;
    }

    let _eid = dom.getAttribute('_eid');
    if (!_eid) {
      _eid = hEditorUniqueId();
      dom.setAttribute('_eid', _eid);
    }
    this.m_id = _eid;
    const s = `<div id="${_eid}_pp" style="display:flex;flex-direction:column;height:100%;width:100%;position:relative;">
<style>
.h_editor_icon {
  background-image:url(${HEditor._iconPath});background-repeat:no-repeat;display:inline-block;height:18px;width:18px;overflow:hidden;margin-top:1px;
}
</style>
<div id="${_eid}_p" style="flex: 0 0 auto;width:100%;border: 1px solid #ccc;display:flex;font-size:14px;"></div>
<input style='height:0;width:0;padding:0;margin:0;border:0;' class='${_eid}_color' type='color' />
<iframe id="${_eid}_ifrm" style="flex: 1 1 auto;min-height:0;width:100%;border: 1px solid #ccc;" allowTransparency="true" scrolling="auto" frameborder=0></iframe>
</div>`;
    dom.innerHTML = s;
    this.m_p = dom.querySelector(`#${_eid}_p`);
    this.m_ifrm = dom.querySelector(`#${_eid}_ifrm`);
    this.reset(html);
    this.setPanel();
    dom.style.resize = 'both';
    dom.style.overflow = 'auto';
  }

  reset(html?: string) {
    const fd = this.m_ifrm.contentDocument || this.m_ifrm.contentWindow.document;
    fd.designMode = 'On';
    fd.open();
    fd.write(
      `<html><head></head><body style="margin:0!important;background-color:transparent!important;width:100%;height:100%;">${
        html || '<br>'
      }</body></html>`
    );
    fd.close();
    this.m_doc = fd;
    this.m_win = this.m_ifrm.contentWindow;
    this.m_win.addEventListener('blur', this.onBlur.bind(this));
    this.m_win.addEventListener('focus', this.onFocus.bind(this));
    this.m_doc.addEventListener('mousedown', this.onMDown.bind(this));
    this.m_doc.addEventListener('mousemove', this.onMMove.bind(this));
    this.m_doc.addEventListener('mouseup', this.onMUp.bind(this));
    this.m_win.addEventListener('dblclick', this.onDblClick.bind(this));
  }
  setPanel() {
    let s = '';
    if (this.m_buttons && this.m_buttons.length > 0) {
      for (const btn of this.m_buttons) {
        for (const k in HEditor._plugins) {
          s += this.createPanel(k, HEditor._plugins[k].buttons, btn);
        }
      }
    } else {
      for (const k in HEditor._plugins) {
        s += this.createPanel(k, HEditor._plugins[k].buttons);
      }
    }
    this.m_p.innerHTML = s;
  }
  createPanel(pluginname: string, btns: { [key: string]: HEditorPluginButonProps }, onebutton?: string) {
    let s = '';
    for (const btnId in btns) {
      if (onebutton && btnId != onebutton) continue;

      const btn = btns[btnId];
      if (btnId == '-') {
        s += '<br style="clear:both;">';
      } else if (btn.list) {
        s +=
          `<div style="" title="${HEditor.lang(btn.name)}">` +
          `<select onchange="HEditor.processSelectedChanged(this,'${this.m_id}', '${pluginname}','${btnId}')" style="${
            btn.width ? 'width:' + btn.width + ';' : ''
          }">`;
        for (const k in btn.list) {
          s += `<option value="${k}">${HEditor.lang(btn.list[k])}</option>`;
        }
        s += '</select></div>';
      } else {
        const lab = HEditor.label(btn.label);
        s +=
          `<div style="display:flex;cursor:pointer;border: 1px solid #aaaaaa;background-color:#efefef;${btn.style||''}" onmouseover="this.style.backgroundColor='#cccccc';" onmouseout="this.style.backgroundColor='#efefef';">` +
          `<div title="${HEditor.lang(btn.name)}" style="margin:auto 0;" onclick="HEditor.processButtonClick(this,'${
            this.m_id
          }','${pluginname}','${btnId}')">` +
          `${lab}</div></div>`;
      }
    }
    return s;
  }

  getHtml() {
    return this.m_doc.body.innerHTML;
  }
  setHtml(html: string) {
    this.m_doc.body.innerHTML = html || '<br>';
  }
  pasteHTML(html: string) {
    this.setFocus();
    this.m_doc.execCommand('InsertHtml', false, html);
  }
  selObj(obj: HTMLElement) {
    window.setTimeout(() => {
      const selection = this.m_win.getSelection();
      const range = this.m_doc.createRange();
      range.selectNode(obj);
      selection.removeAllRanges();
      selection.addRange(range);
    }, 100);
  }
  getCurrentLink() {
    const sel = this.m_win.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const node = sel.anchorNode;
    if (!node) return null;

    const link = (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement)?.closest('a');
    return link;
  }

  showPanel(html: string) {
    if (!html) {
      this.m_p.parentNode!.querySelector(`#${this.m_id}_userpanel`)?.remove();
      return;
    }
    const panel = document.createElement('div');
    panel.innerHTML = html;
    panel.id = `${this.m_id}_userpanel`;
    panel.style.cssText =
      'position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;z-index:10000;background-color:#d3d1d1fc;';
    this.m_p.parentNode!.appendChild(panel);
    return panel;
  }
}

// const findOrCreateWrap = (win: Window, doc: Document): HTMLSpanElement | null => {
//   const sel = win.getSelection();
//   if (!sel || sel.rangeCount === 0) return null;
//   const range = sel.getRangeAt(0);

//   const startContainer = range.startContainer;
//   const endContainer = range.endContainer;
//   const span = startContainer.parentNode as HTMLSpanElement;
//   if (startContainer === endContainer && ((startContainer as any).tagName === 'SPAN' || span.tagName === 'SPAN')) {
//     if (span.tagName === 'SPAN') {
//       return span;
//     }
//     return startContainer as HTMLSpanElement;
//   }

//   const span2 = document.createElement('span');
//   const frag = range.extractContents();
//   span2.appendChild(frag);

//   range.insertNode(span2);
//   const newRange = document.createRange();
//   newRange.selectNodeContents(span2);
//   sel.removeAllRanges();
//   sel.addRange(newRange);

//   return span2;
// };
// const editorApplyStyle = (win: Window, doc: Document, style: string, value: string) => {
//   win.focus();
//   const span = findOrCreateWrap(win, doc);
//   if (!span) return;

//   const domStyle = span.style as any;
//   if (domStyle[style] === value) {
//     value='';
//   }
//   domStyle[style] = value;
// };
// const editorApplySize = (win: Window, doc: Document, delta: number) => {
//   win.focus();
//   const span = findOrCreateWrap(win, doc);
//   if (!span) return;

//   const currentSize = parseFloat(win.getComputedStyle(span).fontSize) || 16;
//   const domStyle = span.style as any;
//   const newSize = Math.max(6, Math.min(100, currentSize + delta));
//   domStyle.fontSize = newSize + 'px';
// };

const HEditorPluginFont: HEditorPluginProps = {
  name: 'font',
  buttons: {
    fontsize: {
      name: 'fontsize',
      label: 'Size',
      command: 'fontsize',
      width: '50px',
      list: {
        '0': 'Size',
        // '32px': '32px (H1)',
        // '24px': '24px (H2)',
        // '18.7px': '18.7px (H3)',
        // '16px': '16px (H4, P)',
        // '13.2px': '13.2px (H5)',
        // '10.7px': '10.7px (H6)',
        1: '1&nbsp;(10px)',
        2: '2&nbsp;(13px)',
        3: '3&nbsp;(16px)',
        4: '4&nbsp;(18px)',
        5: '5&nbsp;(24px)',
        6: '6&nbsp;(32px)',
      },
    },
    // fontplus: {
    //   name: 'fontplus',
    //   label: 'A+',
    // },
    // fontminus: {
    //   name: 'fontminus',
    //   label: 'A-',
    // },
  },
  onSelectedChanged: (
    editor: HEditor,
    plugin: HEditorPluginProps,
    btnid: string,
    selText: string,
    selValue: string
  ) => {
    if (btnid == 'fontsize') {
      if (selValue) {
        editor.execCommand('fontsize', selValue);
        // editorApplyStyle(editor.m_win, editor.m_doc, 'font-size', selValue);
      }
    }
  },
  // onButtonClick: (editor: HEditor, plugin: HEditorPluginProps, btnid: string) => {
  //   if (btnid == 'fontplus') {
  //     editor.setFocus();
  //     editorApplySize(editor.m_win, editor.m_doc, +1);
  //   } else if (btnid == 'fontminus') {
  //     editor.setFocus();
  //     editorApplySize(editor.m_win, editor.m_doc, -1);
  //   }
  // },
};
HEditor.addPlugin(HEditorPluginFont.name, HEditorPluginFont);

const HEditorPluginBasic: HEditorPluginProps = {
  name: 'basic',
  buttons: {
    bold: {
      name: 'bold',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(3, 2)}"></span>`,
    },
    italic: {
      name: 'italic',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(2, 2)}"></span>`,
    },
    underline: {
      name: 'underline',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(2, 0)}"></span>`,
    },
    strikethrough: {
      name: 'strikethrough',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(3, 0)}"></span>`,
    },

    left: {
      name: 'left',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(0, 0)}"></span>`,
      style: 'margin-left: 3px',
    },
    center: {
      name: 'center',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(1, 1)}"></span>`,
    },
    right: {
      name: 'right',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(1, 0)}"></span>`,
    },
    justify: {
      name: 'justify',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(0, 1)}"></span>`,
    },
    ol: {
      name: 'ol',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(0, 3)}"></span>`,
      style: 'margin-left: 3px',
    },
    ul: {
      name: 'ul',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(1, 3)}"></span>`,
    },
    indent: {
      name: 'indent',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(0, 2)}"></span>`,
    },
    outdent: {
      name: 'outdent',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(1, 2)}"></span>`,
    },
    removeformat: {
      name: 'removeformat',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(0, 5)}"></span>`,
      style: 'margin-left: 3px;margin-right: 3px;',
    },
  },
  onButtonClick: (editor: HEditor, plugin: HEditorPluginProps, btnid: string) => {
    if (btnid == 'bold') {
      // editorApplyStyle(editor.m_win, editor.m_doc, 'font-weight', 'bold');
      editor.execCommand('bold');
    } else if (btnid == 'italic') {
      // editorApplyStyle(editor.m_win, editor.m_doc, 'font-style', 'italic');
      editor.execCommand('italic');
    } else if (btnid == 'underline') {
      // editorApplyStyle(editor.m_win, editor.m_doc, 'text-decoration', 'underline');
      editor.execCommand('underline');
    } else if (btnid == 'left') {
      editor.execCommand('justifyleft');
    } else if (btnid == 'center') {
      editor.execCommand('justifycenter');
    } else if (btnid == 'right') {
      editor.execCommand('justifyright');
    } else if (btnid == 'justify') {
      editor.execCommand('justifyfull');
    } else if (btnid == 'ol') {
      editor.execCommand('insertorderedlist', 'OL');
    } else if (btnid == 'ul') {
      editor.execCommand('insertunorderedlist', 'UL');
    } else if (btnid == 'strikethrough') {
      // editorApplyStyle(editor.m_win, editor.m_doc, 'text-decoration', 'line-through');
      editor.execCommand('strikeThrough');
    } else if (btnid == 'removeformat') {
      editor.execCommand('removeformat');
    } else if (btnid == 'indent') {
      editor.execCommand('indent');
    } else if (btnid == 'outdent') {
      editor.execCommand('outdent');
    }
  },
};
HEditor.addPlugin(HEditorPluginBasic.name, HEditorPluginBasic);

const HEditorPluginColor: HEditorPluginProps = {
  name: 'color',
  buttons: {
    textColor: {
      name: 'textColor',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(3, 3)}"></span>`,
    },
    backColor: {
      name: 'backColor',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(2, 3)}"></span>`,
    },
  },
  onButtonClick: (editor: HEditor, plugin: HEditorPluginProps, btnid: string) => {
    if (btnid == 'textColor') {
      editor.pickupColor((color) => {
        editor.execCommand('forecolor', color);
      });
    } else if (btnid == 'backColor') {
      editor.pickupColor((color) => {
        editor.execCommand('hilitecolor', color);
      });
      // editorApplyStyle(editor.m_win, editor.m_doc, 'background-color', '#ffffff');
    }
  },
};
HEditor.addPlugin(HEditorPluginColor.name, HEditorPluginColor);

const HEditorPluginImage: HEditorPluginProps = {
  name: 'image',
  buttons: {
    image: {
      name: 'image',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(6, 3)}"></span>`,
      style: 'margin-left: 3px;',
    },
  },
  onButtonClick: (editor: HEditor, plugin: HEditorPluginProps, btnid: string) => {
    if (btnid == 'image') {
      editor.pickupImage(async (url) => {
        editor.execCommand('insertImage', [url]);
        // const img = new Image();
        // img.onload = () => {
        //   const w = img.width;
        //   const h = img.height;
        //   editor.pasteHTML(
        //     `<div style="display:inline-block;resize:both;overflow:hidden;vertical-align:top;width:${w}px;height:${h}px;"><img style="width:100%;height:100%;" src="${url}" /></div>`
        //   );
        // };
        // img.src = url;
      });
    }
  },
};
HEditor.addPlugin(HEditorPluginImage.name, HEditorPluginImage);

const HEditorPluginLink: HEditorPluginProps = {
  name: 'link',
  buttons: {
    link: {
      name: 'Link',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(6, 1)}"></span>`,
    },
    unlink: {
      name: 'Unlink',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(2, 5)}"></span>`,
    },
  },
  onButtonClick: (editor: HEditor, plugin: HEditorPluginProps, btnid: string) => {
    if (btnid == 'link') {
      const link = editor.getCurrentLink();
      const linkValue = link?.getAttribute('href') || '';

      const panel = editor.showPanel(
        `<div><button onclick="HEditor.processButtonClick(this,'${editor.m_id}','link','ok')">${HEditor.lang(
          'OK'
        )}</button><button onclick="HEditor.processButtonClick(this,'${editor.m_id}','link','cancel')">${HEditor.lang(
          'Cancel'
        )}</button></div>
        <input style='width:100%;' value='${linkValue}' />`
      );
      (plugin as any).panel = panel;
    } else if (btnid == 'unlink') {
      editor.execCommand('unlink');
    } else if (btnid == 'ok') {
      const value = (plugin as any).panel?.querySelector('input')?.value;
      if (!value) {
        editor.execCommand('unlink');
        return;
      }

      editor.showPanel('');
      const link = editor.getCurrentLink();
      if (link) {
        link.setAttribute('href', value);
        return;
      }
      editor.execCommand('createLink', value);
    } else if (btnid == 'cancel') {
      editor.showPanel('');
    }
  },
};
HEditor.addPlugin(HEditorPluginLink.name, HEditorPluginLink);

const HEditorPluginHtml: HEditorPluginProps = {
  name: 'html',
  buttons: {
    html: {
      name: 'html',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(7, 0)}"></span>`,
      style: 'margin-left: 3px;',
    },
  },
  onButtonClick: (editor: HEditor, plugin: HEditorPluginProps, btnid: string) => {
    if (btnid == 'html') {
      const panel = editor.showPanel(
        `<div><button onclick="HEditor.processButtonClick(this,'${editor.m_id}','html','ok')">${HEditor.lang(
          'OK'
        )}</button><button onclick="HEditor.processButtonClick(this,'${editor.m_id}','html','cancel')">${HEditor.lang(
          'Cancel'
        )}</button></div>
        <textarea style='flex:1;'>${editor.getHtml()}</textarea>`
      );
      (plugin as any).panel = panel;
    } else if (btnid == 'ok') {
      editor.showPanel('');
      editor.setHtml((plugin as any).panel?.querySelector('textarea')?.value || '');
    } else if (btnid == 'cancel') {
      editor.showPanel('');
    }
  },
};
HEditor.addPlugin(HEditorPluginHtml.name, HEditorPluginHtml);

const HEditorPluginUndo: HEditorPluginProps = {
  name: 'undo',
  buttons: {
    undo: {
      name: 'undo',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(4, 2)}"></span>`,
      style: 'margin-left: 3px',
    },
    redo: {
      name: 'redo',
      label: `<span class="h_editor_icon" style="${getHEditorIconStyle(5, 2)}"></span>`,
    },
  },
  onButtonClick: (editor: HEditor, plugin: HEditorPluginProps, btnid: string) => {
    if (btnid == 'undo') {
      editor.execCommand('undo');
    } else if (btnid == 'redo') {
      editor.execCommand('redo');
    }
  },
};
HEditor.addPlugin(HEditorPluginUndo.name, HEditorPluginUndo);
