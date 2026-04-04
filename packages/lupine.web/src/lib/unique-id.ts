/**
 * Sample:
 *   const domUniqueId = uniqueIdGenerator('lj');
 *   const id1 = domUniqueId();
 *   const id2 = domUniqueId();
 * @param preKey
 * @returns A function to generate Unique Ids
 */
// export function uniqueIdGenerator2(preKey: string) {
//   let count = 0;
//   let diff = '';
//   return function (reset = false): string {
//     if (reset) {
//       count = 0;
//       diff = '';
//     }
//     if (count > 9999999999999999) {
//       count = 0;
//       diff = Math.round(new Date().getTime() / 1000).toString(36) + '-';
//     }
//     count++;
//     return `${preKey}${diff}${count.toString(36)}`;
//   };
// }

export function uniqueIdGenerator(preKey: string) {
  let count = 0;
  let baseTime = 0;
  let lastKey = '';
  return function (reset = false): string {
    if (reset) {
      count = 0;
      baseTime = 0;
      lastKey = '';
      return '';
    }
    // for test to mock Date.now()
    if (baseTime === 0) {
      baseTime = Math.round(Date.now() / 1000);
    }
    const key = Math.round(Date.now() / 1000 - baseTime).toString(36);
    if (key !== lastKey) {
      count = 0;
      lastKey = key;
    } else {
      count++;
    }
    return `${preKey}${lastKey}${count.toString(36)}`;
  };
}
