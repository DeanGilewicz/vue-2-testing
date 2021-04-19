export function capitalizeFirstLetter(str) {
  if (typeof str !== 'string') return;
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function doesObjPropertyExist(obj, key) {
  if (!obj || typeof obj !== 'object') return;
  const exists = obj[key];
  if (typeof exists === 'undefined') return false;
  return true;
}

export function isEmptyObj(obj) {
  if (!obj || typeof obj !== 'object') return;
  return Object.keys(obj).length === 0;
}

export function myClearTimeout(global, timer) {
  return global.clearTimeout(timer);
}

export function mySetTimeout(global, delay, cb) {
  return global.setTimeout(() => {
    cb();
  }, delay);
}
