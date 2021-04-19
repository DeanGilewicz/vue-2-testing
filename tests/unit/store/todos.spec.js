import { expect } from 'chai';
import sinon from 'sinon';
import flushPromises from 'flush-promises';

import mockApi from '../../clientMockInstance';
import { completedTodo, defaultTodo } from '../../utils/mocks/todo';

import Todos from '@/store/modules/todos';

describe('Vuex Store - Todos', () => {
  context('State', () => {
    context('main', () => {
      it('should be an empty Array by default', () => {
        expect(Todos.state).to.eql([]);
      });
    });
  });

  context('Getters', () => {
    context('completedTodoNumber', () => {
      it('should return 0 by default', () => {
        const state = [];
        expect(Todos.getters.completedTodoNumber(state)).to.equal(0);
      });

      it('should return 0 when there are no completed todos', () => {
        const state = [{ completed: false }];
        expect(Todos.getters.completedTodoNumber(state)).to.equal(0);
      });

      it('should return 2 when there are 2 completed todos', () => {
        const state = [
          { completed: true },
          { completed: true }
        ];
        expect(Todos.getters.completedTodoNumber(state)).to.equal(2);
      });
    });

    context('doesTodoExist', () => {
      it('should return false when todo does not exist', () => {
        const theTodo = { ...defaultTodo };
        const state = [];
        expect(Todos.getters.doesTodoExist(state)(theTodo)).to.equal(false);
      });

      it('should return true when todo does not exist', () => {
        const theTodo = { ...defaultTodo };
        const state = [theTodo];
        expect(Todos.getters.doesTodoExist(state)(theTodo)).to.equal(true);
      });
    });

    context('incompleteTodoNumber', () => {
      it('should return 0 by default', () => {
        const state = [];
        expect(Todos.getters.incompleteTodoNumber(state)).to.equal(0);
      });

      it('should return 0 when there are no incomplete todos', () => {
        const state = [{ completed: true }];
        expect(Todos.getters.incompleteTodoNumber(state)).to.equal(0);
      });

      it('should return 2 when there are 2 incomplete todos', () => {
        const state = [
          { completed: false },
          { completed: false }
        ];
        expect(Todos.getters.incompleteTodoNumber(state)).to.equal(2);
      });
    });
  });

  context('Mutations', () => {
    context('addTodo', () => {
      it('should not add a todo to state when a todo is not provided', () => {
        const state = [];
        Todos.mutations.addTodo(state, null);
        expect(state.length).to.equal(0);
        expect(state).to.eql([]);
      });

      it('should add a todo to state when provided with a todo', () => {
        const state = [];
        const theTodo = { ...defaultTodo };
        Todos.mutations.addTodo(state, theTodo);
        expect(state.length).to.equal(1);
        expect(state[0]).to.eql(defaultTodo);
      });
    });

    context('deleteTodo', () => {
      it('should not delete todo from state when todo is not provided', () => {
        const state = [];
        Todos.mutations.deleteTodo(state, null);
        expect(state.length).to.equal(0);
        expect(state).to.eql(state);
      });

      it('should not delete todo from state when todo is provided but has no id', () => {
        const theTodo = {
          name: 'no completed property',
          completed: false
        };
        const state = [theTodo];
        Todos.mutations.deleteTodo(state, theTodo);
        expect(state.length).to.equal(1);
        expect(state).to.eql(state);
      });

      it('should not delete todo from state when todo is provided but does not exist in state', () => {
        const anotherTodo = {
          id: 456,
          name: 'does not exist',
          completed: false
        };
        const theTodo = { ...defaultTodo };
        const state = [theTodo];
        Todos.mutations.deleteTodo(state, anotherTodo);
        expect(state.length).to.equal(1);
        expect(state).to.eql(state);
      });

      it('should delete todo when provided todo exists with an id', () => {
        const theTodo = { ...defaultTodo };
        const state = [theTodo];
        Todos.mutations.deleteTodo(state, theTodo);
        expect(state.length).to.equal(0);
      });
    });

    context('setTodoName', () => {
      it('should not set name of todo when todo is not provided', () => {
        const state = [];
        Todos.mutations.setTodoName(state, {});
        expect(state.length).to.equal(0);
        expect(state).to.eql([]);
      });

      it('should not set name of todo when provided todo has no name', () => {
        const theTodo = {
          id: 123,
          completed: false
        };
        const state = [theTodo];
        Todos.mutations.setTodoName(state, { todo: theTodo });
        expect(state.length).to.equal(1);
        expect(state).to.eql([theTodo]);
      });

      it('should not set name of todo when provided todo but does not exist in state', () => {
        const theTodo = { ...defaultTodo };
        const state = [];
        Todos.mutations.setTodoName(state, { todo: theTodo, name: 'new name' });
        expect(state.length).to.equal(0);
        expect(state).to.eql([]);
      });

      it('should set name of todo when provided todo exists and contains a name', () => {
        const theTodo = { ...defaultTodo };
        const state = [theTodo];
        Todos.mutations.setTodoName(state, { todo: theTodo, name: 'new name' });
        expect(state.length).to.equal(1);
        expect(state).to.eql([
          {
            completed: false,
            id: 123,
            name: 'new name'
          }
        ]);
      });
    });

    context('setTodos', () => {
      it('should add all provided todos to state', () => {
        const state = [];
        const todos = [{ ...defaultTodo }, { ...defaultTodo, id: 456 }];
        Todos.mutations.setTodos(state, todos);
        expect(state.length).to.equal(2);
        expect(state).to.eql(todos);
      });
    });

    context('toggleTodoStatus', () => {
      it('should not toggle todo completed property when a todo is not provided', () => {
        const state = [];
        Todos.mutations.toggleTodoStatus(state, null);
        expect(state.length).to.equal(0);
        expect(state).to.eql([]);
      });

      it('should not toggle todo completed property when todo is provided but has no completed property', () => {
        const theTodo = {
          id: 123,
          name: 'no completed property'
        };
        const state = [theTodo];
        Todos.mutations.toggleTodoStatus(state, theTodo);
        expect(state.length).to.equal(1);
        expect(state).to.eql([theTodo]);
      });

      it('should not toggle todo completed property when a todo is provided but does not exist in state', () => {
        const anotherTodo = {
          id: 456,
          name: 'does not exist',
          completed: false
        };
        const theTodo = { ...defaultTodo };
        const state = [theTodo];
        Todos.mutations.toggleTodoStatus(state, anotherTodo);
        expect(state.length).to.equal(1);
        expect(state).to.eql([theTodo]);
      });

      it('should toggle todo completed property when provided todo exists with a completed property', () => {
        const theTodo = { ...defaultTodo };
        const state = [theTodo];
        Todos.mutations.toggleTodoStatus(state, theTodo);
        expect(state[0]).to.eql(completedTodo);
      });
    });
  });

  context('Actions', () => {
    context('addTodo', () => {
      it('should not call addTodo mutation with todo payload when todo already exists in state', () => {
        const getters = {
          doesTodoExist: () => true
        };
        const commit = sinon.spy();
        const theTodo = { ...defaultTodo };
        Todos.actions.addTodo(
          {
            commit,
            getters
          },
          theTodo
        );
        sinon.assert.notCalled(commit);
        sinon.reset(commit);
      });

      it('should call addTodo mutation with todo payload when todo does not exist in state', () => {
        const getters = {
          doesTodoExist: () => false
        };
        const commit = sinon.spy();
        const theTodo = { ...defaultTodo };
        Todos.actions.addTodo(
          {
            commit,
            getters
          },
          theTodo
        );
        sinon.assert.calledOnceWithExactly(commit, 'addTodo', theTodo);
        sinon.reset(commit);
      });
    });

    context('deleteTodo', () => {
      it('should call mutation with todo payload when todo exists', () => {
        const getters = {
          doesTodoExist: () => true
        };
        const commit = sinon.spy();
        const theTodo = { ...defaultTodo };
        Todos.actions.deleteTodo(
          {
            commit,
            getters
          },
          theTodo
        );
        sinon.assert.calledOnceWithExactly(commit, 'deleteTodo', theTodo);
        sinon.reset(commit);
      });
    });

    context('getMessage', () => {
      it('should call /message endpoint and return the first message from response', async() => {
        const mockResponse = [
          {
            id: 1,
            text: 'Go on, add it to the list!'
          }
        ];
        mockApi.onGet('http://localhost:4000/message').reply(200, mockResponse);
        expect(await Todos.actions.getMessage()).to.eql(mockResponse[0]);
        // await Todos.actions.getMessage();
        // axios request should be invoked once
        expect(mockApi.history.get.length).to.equal(1);
        // check axios request url
        expect(mockApi.history.get[0].url).to.equal(
          'http://localhost:4000/message'
        );
        mockApi.reset();
      });

      it('should throw an error when unable to call /message endpoint', async() => {
        mockApi.onGet('http://localhost:4000/message').reply(404, 'error body');
        await Todos.actions.getMessage().catch((err) => {
          // catching the error thrown inside of catch
          expect(err.status).to.equal(404);
          expect(err.data).to.equal('error body');
        });
        // axios request should be invoked once
        expect(mockApi.history.get.length).to.equal(1);
        // check axios request url
        expect(mockApi.history.get[0].url).to.equal(
          'http://localhost:4000/message'
        );
        mockApi.reset();
      });
    });

    context('getTodos', () => {
      it('should call /todos endpoint and update Vuex todos with response', async() => {
        const commit = sinon.spy();
        const mockResponse = [
          {
            id: 1,
            name: 'A Todo',
            completed: false
          },
          {
            id: 2,
            name: 'Another Todo',
            completed: false
          }
        ];
        mockApi.onGet('http://localhost:4000/todos').reply(200, mockResponse);
        await Todos.actions.getTodos(
          {
            commit
          }
        );
        // axios request should be invoked once
        expect(mockApi.history.get.length).to.equal(1);
        // check axios request url
        expect(mockApi.history.get[0].url).to.equal(
          'http://localhost:4000/todos'
        );
        await flushPromises();
        sinon.assert.calledOnceWithExactly(commit, 'setTodos', mockResponse);
        sinon.reset(commit);
        mockApi.reset();
      });

      it('should throw an error and not update Vuex todos when unable to call /todos endpoint', async() => {
        const commit = sinon.spy();
        mockApi.onGet('http://localhost:4000/todos').reply(404, 'error body');
        await Todos.actions.getTodos(
          {
            commit
          }
        ).catch((err) => {
          // catching the error thrown inside of catch
          expect(err.status).to.equal(404);
          expect(err.data).to.equal('error body');
        });
        // axios request should be invoked once
        expect(mockApi.history.get.length).to.equal(1);
        // check axios request url
        expect(mockApi.history.get[0].url).to.equal(
          'http://localhost:4000/todos'
        );
        sinon.assert.neverCalledWith(commit, 'setTodos');
        sinon.reset(commit);
        mockApi.reset();
      });
    });

    context('setTodoName', () => {
      it('should call mutation with todo and name payload when todo exists', () => {
        const getters = {
          doesTodoExist: () => true
        };
        const commit = sinon.spy();
        const theTodo = { ...defaultTodo };
        const newName = 'new name';
        Todos.actions.setTodoName(
          {
            commit,
            getters
          },
          {
            todo: theTodo,
            name: newName
          }
        );
        sinon.assert.calledOnceWithExactly(commit, 'setTodoName', { todo: theTodo, name: newName });
        sinon.reset(commit);
      });
    });

    context('toggleTodoStatus', () => {
      it('should call mutation with todo payload when todo exists', () => {
        const getters = {
          doesTodoExist: () => true
        };
        const commit = sinon.spy();
        const theTodo = { ...defaultTodo };
        Todos.actions.toggleTodoStatus(
          {
            commit,
            getters
          },
          theTodo
        );
        sinon.assert.calledOnceWithExactly(commit, 'toggleTodoStatus', theTodo);
        sinon.reset(commit);
      });
    });
  });
});
