import { $Function } from '../@types/index';

type Position = 'after' | 'before';
export const wrapper = (originFn: $Function, wrapperFn: $Function, position: Position = 'after', argsWrapper?: $Function) => {
  const temp = argsWrapper ? wrapArgs(originFn, argsWrapper) : originFn;
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

export const wrapArgs = (originFn: $Function, argsWrapper: $Function) => {
  return function(...args) {
    const newArgs = argsWrapper.apply(this, args);
    return originFn.apply(this, newArgs);
  };
};

export const wrapErrors = (originFn: any, errorHandler: $Function, argsWrapper?: $Function) => {
  const temp = argsWrapper ? wrapArgs(originFn, argsWrapper) : originFn;
  if (!originFn.__wrapped__) {
    originFn.__wrapped__ = function() {
      try {
        return temp.apply(this, arguments);
      } catch (e) {
        errorHandler(e); // report the error
        throw e; // re-throw the error
      }
    };
  }

  return originFn.__wrapped__;
};
