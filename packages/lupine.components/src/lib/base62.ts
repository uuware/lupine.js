export class Base62 {
  private static ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  private static BASE = 62;
  static toString(num: number) {
    if (num === 0) return Base62.ALPHABET[0];

    let result = '';
    while (num > 0) {
      const rem = num % Base62.BASE;
      result = Base62.ALPHABET[rem] + result;
      num = Math.floor(num / Base62.BASE);
    }
    return result;
  }

  static fromString(str: string) {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      result = result * Base62.BASE + Base62.ALPHABET.indexOf(str[i]);
    }
    return result;
  }
}
