import { strOrNum } from './@types';

const nullOrUndefined = (val) => {
  return val === null || typeof val === 'undefined';
};

export class SafeObject {
  constructor(private origin: Object) {

  }

  get(...args: strOrNum[]) {
    return args.reduce((val, key) => {
      if (nullOrUndefined(val)) {
        return undefined;
      }
      return val[key];
    }, this.origin);
  }

  set(value: any, ...args: strOrNum[]) {
    return args.reduce((val, key, index) => {
      if (index === args.length - 1) {
        val[key] = value;
      } else if (nullOrUndefined(val[key])) {
        val[key] = {};
      }
      return val[key];
    }, this.origin);
  }
}
