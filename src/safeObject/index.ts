const nullOrUndefined = (val) => {
  return val === null || typeof val === 'undefined';
};

export function safeObject(origin) {
  return new Proxy(origin, {
    get: function(target, property, receiver) {
      if (property in target || typeof property === 'symbol') {
        return target[property];
      } else {
        origin[property] = safeObject({});
        return origin[property]
      }
    },
  });
}
