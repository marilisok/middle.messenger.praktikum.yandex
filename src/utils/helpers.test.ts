import {expect} from 'chai';
import {Indexed, set} from './helpers';

describe('set helper', () => {
  let obj = {};
  const value = 3;
  const path = 'a.b';
  beforeEach(() => {
    obj = {};
  });
  it('should set a value by keypath', () => {
    const result = set(obj, path, value) as Indexed;
    expect(result.a.b).to.be.equal(3);
  });

  it('should return passed object if it is is not an object', () => {
    obj = 'string';
    const result = set(obj, path, value) as Indexed;
    expect(result).to.be.equal('string');
  });

  it('should throw an error if path is not a string', () => {
    const path = 1;
    const func = () => set(obj, path, value);
    expect(func).to.be.throw(Error);
  });

  it('should mutate passed object, not create new one', () => {
    const result = set(obj, path, value) as Indexed;
    expect(result).to.equal(obj);
  });
});
