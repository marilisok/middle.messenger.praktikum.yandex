import {Indexed} from './helpers';

export function deepCopy(input: Indexed) {
  if (input === null || typeof input !== 'object') {
    return input;
  }

  const initialOutput = Array.isArray(input) ? [] : {};

  return Object.keys(input).reduce((acc: any, key: any) => {
    acc[key] = deepCopy(input[key]);
    return acc;
  }, initialOutput);
}

