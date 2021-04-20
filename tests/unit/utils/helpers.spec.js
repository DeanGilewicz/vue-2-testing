import { expect } from 'chai';
import sinon from 'sinon';

import { capitalizeFirstLetter, doesObjPropertyExist, isEmptyObj, myClearTimeout, mySetTimeout } from '@/utils/helpers';

describe('Helpers', () => {
  context('Named Exports', () => {
    context('capitalizeFirstLetter', () => {
      it('should return undefined when a string is not provided', () => {
        expect(capitalizeFirstLetter({})).to.equal(undefined);
      });

      it('should return capitalized letter for each word of provided string', () => {
        expect(capitalizeFirstLetter('all the words')).to.equal('All The Words');
      });
    });

    context('doesObjPropertyExist', () => {
      it('should return undefined when an object is not provided', () => {
        expect(doesObjPropertyExist('')).to.equal(undefined);
      });

      it('should return false when an object is provided but has no keys', () => {
        expect(doesObjPropertyExist({})).to.equal(false);
      });

      it('should return false when an object is provided with a key that does not exist on the provided object', () => {
        expect(doesObjPropertyExist({ sound: 'loud' }, 'noise')).to.equal(false);
      });

      it('should return true when an object is provided with a key that does exist on the provided object', () => {
        expect(doesObjPropertyExist({ sound: '' }, 'sound')).to.equal(true);
      });
    });

    context('isEmptyObj', () => {
      it('should return undefined when an object is not provided', () => {
        expect(isEmptyObj('')).to.equal(undefined);
      });

      it('should return true when an object is provided but has no keys', () => {
        expect(isEmptyObj({})).to.equal(true);
      });

      it('should return false when an object is provided with at least one key', () => {
        expect(isEmptyObj({ key: 'value' })).to.equal(false);
      });
    });

    context('myClearTimeout', () => {
      it('should call clearTimeout method on global object when invoked', () => {
        const global = {
          clearTimeout: sinon.spy()
        };
        const timer = 2000;
        myClearTimeout(global, timer);
        sinon.assert.calledOnceWithExactly(global.clearTimeout, timer);
        sinon.reset(global.clearTimeout);
      });
    });

    context('mySetTimeout', () => {
      it('should call setTimeout method on global object when invoked', () => {
        const global = {
          setTimeout: sinon.spy()
        };
        const delay = 1000;
        const cb = () => {};
        mySetTimeout(global, delay, cb);
        sinon.assert.calledOnce(global.setTimeout);
        sinon.reset(global.setTimeout);
      });
    });
  });
});
