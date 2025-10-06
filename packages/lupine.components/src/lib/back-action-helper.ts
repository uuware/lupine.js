import { uniqueIdGenerator } from 'lupine.web';

type BackFn = () => void | Promise<void>;

export const backActionUniqueId = uniqueIdGenerator('bb-'); // bb means back button
class BackActionHelper {
  private backFn?: BackFn;

  genBackActionId() {
    return backActionUniqueId();
  }

  getAllBackActionButtons() {
    const nodes = document.querySelectorAll('[data-back-action^="bb-"]');
    const buttons = Array.from(nodes)
      .map((el) => {
        const act = el.getAttribute('data-back-action') || '';
        return { el, ind: act.substring(3) };
      })
      .filter(Boolean)
      .sort((a, b) => b.ind.localeCompare(a.ind)) // desc
      .map((item) => item.el);
    return buttons;
  }

  clear() {
    this.backFn = undefined;
  }
  attach(back: BackFn) {
    this.backFn = back;
  }
  async processBackAction(): Promise<boolean> {
    if (this.backFn) {
      try {
        await this.backFn();
        this.clear();
        return true;
      } catch (e) {
        console.error('back button back failed', e);
      }
      return false;
    }

    const buttons = this.getAllBackActionButtons();
    if (buttons.length) {
      const button = buttons[0];
      button.dispatchEvent(new Event('click'));
      return true;
    }
    return false;
  }
}

export const backActionHelper = /* @__PURE__ */ new BackActionHelper();
