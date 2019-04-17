export function safeObject(origin) {
  return new Proxy(origin, {
    get: function(target, property) {
      if (property in target || typeof property === 'symbol') {
        return target[property];
      } else {
        origin[property] = safeObject({});
        return origin[property]
      }
    },
  });
}
