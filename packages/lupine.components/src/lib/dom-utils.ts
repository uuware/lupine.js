// todo: tree-shaking
export class DomUtils {
  public static getValue(cssSelector: string) {
    return (document.querySelector(cssSelector) as HTMLInputElement)?.value;
  }

  public static setValue(cssSelector: string, value: string) {
    const dom = document.querySelector(cssSelector) as HTMLInputElement;
    if (dom) dom.value = value;
  }

  public static getChecked(cssSelector: string) {
    return (document.querySelector(cssSelector) as HTMLInputElement)?.checked;
  }

  public static setChecked(cssSelector: string, checked: boolean) {
    const dom = document.querySelector(cssSelector) as HTMLInputElement;
    if (dom) dom.checked = checked;
  }

  public static joinValues(values: (string | undefined)[], joinChar = ' ') {
    return values.filter(Boolean).join(joinChar);
  }

  public static byId(id: string) {
    return document.querySelector(`#${id}`);
  }

  public static bySelector(selector: string) {
    return document.querySelector(selector);
  }
}
