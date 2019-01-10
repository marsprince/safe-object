import { $Function } from '../@types/index';

type Position = 'after' | 'before';
export const wrapper = (originFn: $Function, wrapperFn: $Function, position: Position = 'after', argsWrapper?: $Function) => {
  const temp = argsWrapper ? wrapperArgs(originFn, argsWrapper) : originFn;
  return function(...args) {
    if (position === 'before') {
      const wrapperResult = wrapperFn.apply(this, args);
      if (wrapperResult === false) {
        return;
      }
    }
    const result = temp.apply(this, args);
    if (position === 'after') {
      wrapperFn.apply(this, [result].concat(args));
    }
    return result;
  };
};

export const wrapperArgs = (originFn: $Function, argsWrapper: $Function) => {
  return function(...args) {
    const newArgs = argsWrapper.apply(this, args);
    return originFn.apply(this, newArgs);
  };
};
