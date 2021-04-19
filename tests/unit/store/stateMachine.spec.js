import { expect } from 'chai';
import sinon from 'sinon';

import StateMachine from '@/store/modules/stateMachine';

describe('Vuex Store - Todos', () => {
  context('State', () => {
    context('main', () => {
      it('should be an object with states and currentState by default', () => {
        expect(StateMachine.state).to.eql({
          currentState: 'idle',
          states: ['idle', 'pending', 'fulfilled', 'rejected']
        });
      });
    });
  });

  context('Mutations', () => {
    context('setCurrentState', () => {
      it('should set currentState to provided value', () => {
        const states = ['idle', 'pending', 'fulfilled', 'rejected'];
        const state = {
          currentState: 'idle',
          states: [...states]
        };
        StateMachine.mutations.setCurrentState(state, 'pending');
        expect(state).to.eql({
          currentState: 'pending',
          states: [...states]
        });
      });
    });

    context('setTransformedStates', () => {
      it('should set setTransformedStates to provided value', () => {
        const states = ['idle', 'pending', 'fulfilled', 'rejected'];
        const state = {
          currentState: 'idle',
          states: [...states]
        };
        const transformedStates = ['transformed-idle', 'transformed-pending', 'transformed-fulfilled', 'transformed-rejected'];
        StateMachine.mutations.setTransformedStates(state, transformedStates);
        expect(state).to.eql({
          currentState: 'idle',
          states: [...states],
          transformedStates
        });
      });
    });
  });

  context('Actions', () => {
    context('setCurrentState', () => {
      it('should not call mutation when provided value does not exist in states array', () => {
        const commit = sinon.spy();
        const states = ['idle', 'pending', 'fulfilled', 'rejected'];
        const state = {
          currentState: 'idle',
          states: [...states]
        };
        StateMachine.actions.setCurrentState(
          {
            commit,
            state
          },
          'doesNotExist'
        );
        sinon.assert.notCalled(commit);
        sinon.reset(commit);
      });

      it('should call mutation when provided value exists in states array', () => {
        const commit = sinon.spy();
        const states = ['idle', 'pending', 'fulfilled', 'rejected'];
        const state = {
          currentState: 'idle',
          states: [...states]
        };
        StateMachine.actions.setCurrentState(
          {
            commit,
            state
          },
          'pending'
        );
        sinon.assert.calledOnceWithExactly(commit, 'setCurrentState', 'pending');
        sinon.reset(commit);
      });
    });

    context('arbitraryActionToUseTransformedData', () => {
      it('should call mutation with transformed states', () => {
        const commit = sinon.spy();
        const states = ['idle', 'pending', 'fulfilled', 'rejected'];
        const transformedStates = ['transformed-idle', 'transformed-pending', 'transformed-fulfilled', 'transformed-rejected'];
        StateMachine.actions.arbitraryActionToUseTransformedData(
          {
            commit
          },
          states
        );
        sinon.assert.calledOnceWithExactly(commit, 'setTransformedStates', transformedStates);
        sinon.reset(commit);
      });
    });
  });

  context('Non-exported fns', () => {
    context('transformStates', () => {
      // eslint-disable-next-line no-underscore-dangle
      const nonExportedTransformStatesFn = StateMachine.__get__('transformStates');

      it('should return undefined by default with called without an array', () => {
        expect(nonExportedTransformStatesFn()).to.equal(undefined);
      });

      it('should return undefined by default with called without an array', () => {
        const states = ['idle', 'pending', 'fulfilled', 'rejected'];
        expect(nonExportedTransformStatesFn(states)).to.eql([
          'transformed-idle',
          'transformed-pending',
          'transformed-fulfilled',
          'transformed-rejected'
        ]);
      });
    });
  });
});
