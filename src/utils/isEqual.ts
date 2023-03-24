import {Indexed} from './helpers';

const isObject = (value: unknown): boolean => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

const isArrayOrObject = (value: unknown) : boolean =>{
  return isObject(value) || Array.isArray(value);
};

export const isEqual = (lhs: Indexed, rhs: Indexed): boolean => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(rightValue) && isArrayOrObject(value)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }
    if (value !== rightValue) {
      return false;
    }
  }
  return true;
};
