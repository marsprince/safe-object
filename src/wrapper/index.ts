import { strOrNum } from '../@types';

type Position = 'after' | 'before';

export const wrapper = (prototype: any, key: strOrNum, wrapperFn, position: Position = 'after') => {
  const temp = prototype[key];
  prototype[key] = function(...args) {
    if (position === 'before') {
      wrapperFn.call(this);
    }
    const result = temp.apply(this, args);
    if (position === 'after') {
      wrapperFn.call(this, result);
    }
    return result;
  };
};
