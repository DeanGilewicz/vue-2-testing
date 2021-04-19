import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import sinon from 'sinon';

import { defaultTodo } from '../../../utils/mocks/todo';
import {
  completeTodoHeaderEl,
  confirmationModalEl,
  incompleteTodoHeaderEl,
  todoTextInputEl
} from '../../../utils/elements';
import Vuex from 'vuex';

import Todos from '@/components/organisms/Todos';

describe('Todos', () => {
  context('Data', () => {
    context('newTodo', () => {
      it('should have a default value of todo object return by setInitialNewTodo method', () => {
        const scope = {
          setInitialNewTodo: () => defaultTodo
        };
        expect(Todos.data.call(scope).newTodo).to.eql(defaultTodo);
      });
    });

    context('newTodoMessages', () => {
      it('should have a default value of empty object', () => {
        const scope = {
          setInitialNewTodo: () => {}
        };
        expect(Todos.data.call(scope).newTodoMessages).to.eql({});
      });
    });
  });

  context('Lifecycle', () => {
    context('created', () => {
      it('should not dispatch getTodos event when todos already exist', () => {
        const scope = {
          $store: {
            dispatch: sinon.spy(),
            state: {
              todos: [
                {
                  id: 1,
                  name: 'A Todo',
                  completed: false
                }
              ]
            }
          }
        };
        Todos.created.call(scope);
        sinon.assert.neverCalledWith(scope.$store.dispatch, 'getTodos');
        sinon.reset(scope.$store.dispatch);
      });

      it('should dispatch getTodos event when there are no todos', async() => {
        const scope = {
          $store: {
            dispatch: sinon.stub().resolves(),
            state: {
              todos: []
            }
          }
        };
        await Todos.created.call(scope);
        await flushPromises();
        sinon.assert.calledOnceWithExactly(scope.$store.dispatch, 'getTodos');
        sinon.reset(scope.$store.dispatch);
      });
    });
  });

  context('Computed', () => {
    context('newTodoName', () => {
      it('should return the name of the new todo', () => {
        const todo = { newTodo: defaultTodo };
        expect(Todos.computed.newTodoName.call(todo)).to.equal('a todo');
      });
    });
  });

  context('Methods', () => {
    context('generateRandomNumber', () => {
      it('should return a different number each time it is invoked', () => {
        const call1 = Todos.methods.generateRandomNumber();
        const call2 = Todos.methods.generateRandomNumber();
        expect(call1).not.equal(call2);
      });
    });

    context('handleAddTodo', () => {
      it('should set error message when name does not exist on provided todo', () => {
        const scope = {
          newTodo: {},
          newTodoMessages: {}
        };
        expect(Todos.methods.handleAddTodo.call(scope)).to.equal(undefined);
        expect(scope.newTodoMessages).to.eql({ error: 'Please Name Your Todo' });
      });

      it('should dispatch addTodo method when name exists on provided todo', () => {
        const scope = {
          addTodo: sinon.spy(),
          newTodo: { ...defaultTodo },
          newTodoMessages: {},
          setInitialNewTodo: () => ({})
        };
        Todos.methods.handleAddTodo.call(scope);
        sinon.assert.calledOnceWithExactly(scope.addTodo, { ...defaultTodo });
        expect(scope.newTodo).to.eql(scope.setInitialNewTodo());
        expect(scope.asyncMessage).to.equal('');
        sinon.reset(scope.addTodo);
      });
    });

    context('handleChangeTodoStatus', () => {
      it('should dispatch toggleTodoStatus event with todo payload when invoked', () => {
        const todo = { ...defaultTodo };
        const scope = {
          toggleTodoStatus: sinon.spy()
        };
        Todos.methods.handleChangeTodoStatus.call(scope, new Event('eventName'), todo);
        sinon.assert.calledOnceWithExactly(
          scope.toggleTodoStatus,
          todo
        );
        sinon.reset(scope.toggleTodoStatus);
      });
    });

    context('handleConfirmationModal', () => {
      it('should set active todo property to current todo and set property to show modal to true when invoked', () => {
        const todo = { ...defaultTodo };
        const scope = {
          activeTodo: null,
          showConfirmationModal: false
        };
        Todos.methods.handleConfirmationModal.call(scope, todo);
        expect(scope.activeTodo).to.eql(todo);
        expect(scope.showConfirmationModal).to.equal(true);
      });
    });

    context('handleDeleteTodo', () => {
      it('should dispatch deleteTodo event when invoked and reset activeTodo property', () => {
        const todo = { ...defaultTodo };
        const scope = {
          deleteTodo: sinon.spy(),
          activeTodo: todo
        };
        Todos.methods.handleDeleteTodo.call(scope, todo);
        sinon.assert.calledOnceWithExactly(
          scope.deleteTodo,
          defaultTodo
        );
        expect(scope.activeTodo).to.equal(null);
        sinon.reset(scope.deleteTodo);
      });
    });

    context('handleEditTodo', () => {
      it('should change route to edit specific todo when invoked', () => {
        const todo = { ...defaultTodo };
        const scope = {
          $router: {
            push: sinon.spy()
          }
        };
        Todos.methods.handleEditTodo.call(scope, todo);
        sinon.assert.calledOnceWithExactly(
          scope.$router.push,
          `/demo-app/${todo.id}/edit`
        );
        sinon.reset(scope.$router.push);
      });
    });

    context('handleGetAsyncMessage', () => {
      it('should dispatch a getMessage event when invoked and set asyncMessage once resolved', async() => {
        const scope = {
          asyncMessage: '',
          handleResetAsyncTimer: sinon.spy(),
          $store: {
            dispatch: sinon.stub().resolves({ text: 'my text' })
          }
        };
        await Todos.methods.handleGetAsyncMessage.call(scope);
        await flushPromises();
        sinon.assert.calledOnceWithExactly(scope.$store.dispatch, 'getMessage');
        expect(scope.asyncMessage).to.equal('my text');
        sinon.assert.calledOnce(scope.handleResetAsyncTimer);
        sinon.reset(scope.handleResetAsyncTimer);
        sinon.reset(scope.$store.dispatch);
      });

      it('should dispatch a getMessage event when invoked and set asyncMessage to error text when rejected', async() => {
        const scope = {
          asyncMessage: '',
          handleResetAsyncTimer: sinon.spy(),
          $store: {
            dispatch: sinon.stub().rejects()
          }
        };
        await Todos.methods.handleGetAsyncMessage.call(scope);
        await flushPromises();
        sinon.assert.calledOnceWithExactly(scope.$store.dispatch, 'getMessage');
        expect(scope.asyncMessage).to.equal('Server is down so you may as well create some todos!');
        sinon.assert.calledOnce(scope.handleResetAsyncTimer);
        sinon.reset(scope.handleResetAsyncTimer);
        sinon.reset(scope.$store.dispatch);
      });
    });

    context('handleKeyPressReturn', () => {
      it('should set error message when invoked with the enter keyboard event and name does not exist for newTodo', () => {
        const e = {
          key: 'Enter',
          keyCode: 13
        };
        const scope = {
          newTodo: {},
          newTodoMessages: null
        };
        Todos.methods.handleKeyPressReturn.call(scope, e);
        expect(scope.newTodoMessages).to.eql({ error: 'Please Name Your Todo' });
      });

      it('should dispatch addTodo event with new todo payload and reset new todo and asyncMessage properties when invoked with enter keyboard event and name exists for newTodo', () => {
        const newTodo = { ...defaultTodo, name: 'new todo' };
        const e = {
          key: 'Enter',
          keyCode: 13
        };
        const scope = {
          asyncMessage: 'message',
          addTodo: sinon.spy(),
          newTodo,
          newTodoMessages: null,
          setInitialNewTodo: () => ({})
        };
        Todos.methods.handleKeyPressReturn.call(scope, e);
        expect(scope.newTodoMessages).to.eql({});
        sinon.assert.calledOnceWithExactly(
          scope.addTodo,
          newTodo
        );
        expect(scope.newTodo).to.eql(scope.setInitialNewTodo());
        expect(scope.asyncMessage).to.equal('');
        sinon.reset(scope.addTodo);
      });
    });

    context('handleResetAsyncTimer', () => {
      it('should set asyncTimer to null when invoked and asyncTimer is falsy', () => {
        const scope = {
          asyncTimer: undefined
        };
        Todos.methods.handleResetAsyncTimer.call(scope);
        expect(scope.asyncTimer).to.equal(null);
      });

      it('should call myClearTimeout when invoked and asyncTimer is not falsy', () => {
        // eslint-disable-next-line no-underscore-dangle
        Todos.__Rewire__('myClearTimeout', sinon.spy());
        const asyncTimer = 1;
        const scope = {
          asyncTimer
        };
        Todos.methods.handleResetAsyncTimer.call(scope);
        // eslint-disable-next-line no-underscore-dangle
        sinon.assert.calledOnceWithExactly(Todos.__get__('myClearTimeout'), window, asyncTimer);
        // eslint-disable-next-line no-underscore-dangle
        Todos.__ResetDependency__('myClearTimeout');
      });
    });

    context('handleSetAsyncTimeout', () => {
      it('should call mySetTimeout helper fn when invoked', () => {
        // eslint-disable-next-line no-underscore-dangle
        Todos.__Rewire__('mySetTimeout', sinon.spy());
        const scope = {
          handleGetAsyncMessage: () => {}
        };
        Todos.methods.handleSetAsyncTimeout.call(scope);
        // eslint-disable-next-line no-underscore-dangle
        sinon.assert.calledOnceWithExactly(Todos.__get__('mySetTimeout'), window, 3000, scope.handleGetAsyncMessage);
        // eslint-disable-next-line no-underscore-dangle
        Todos.__ResetDependency__('mySetTimeout');
      });
    });

    context('setInitialNewTodo', () => {
      it('should return a Todo object by default when invoked', () => {
        const scope = {
          generateRandomNumber: () => 123
        };
        expect(Todos.methods.setInitialNewTodo.call(scope)).eql({
          id: 123,
          name: '',
          completed: false
        });
      });
    });
  });

  context('Watch', () => {
    context('newTodoName', () => {
      it('should call handleResetAsyncTimer when watched value is an empty string', () => {
        const scope = {
          handleResetAsyncTimer: sinon.spy()
        };
        Todos.watch.newTodoName.call(scope, '');
        sinon.assert.calledOnce(scope.handleResetAsyncTimer);
        sinon.reset(scope.handleResetAsyncTimer);
      });

      it('should call handleSetAsyncTimeout when watched value is a string value', () => {
        const scope = {
          asyncTimer: null,
          handleResetAsyncTimer: sinon.spy(),
          handleSetAsyncTimeout: sinon.stub()
        };
        Todos.watch.newTodoName.call(scope, 'not blank');
        sinon.assert.calledOnce(scope.handleResetAsyncTimer);
        expect(scope.asyncTimer).to.not.equal(null);
        sinon.assert.calledOnce(scope.handleSetAsyncTimeout);
        sinon.reset(scope.handleResetAsyncTimer);
        sinon.reset(scope.handleSetAsyncTimeout);
      });
    });
  });

  context('Template', () => {
    context('appearance', () => {
      const localVue = createLocalVue();
      localVue.use(Vuex);

      it('should render title Outstanding (0) when there are no todos', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find(incompleteTodoHeaderEl).text()).to.equal('Outstanding (0)');
      });

      it('should render title Outstanding (3) when there are 3 incomplete todos', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 3
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find(incompleteTodoHeaderEl).text()).to.equal('Outstanding (3)');
      });

      it('should render title Completed (0) when there are no completed todos', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find(completeTodoHeaderEl).text()).to.equal('Completed (0)');
      });

      it('should render title Completed (3) when there are 3 completed todos', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 3,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find(completeTodoHeaderEl).text()).to.equal('Completed (3)');
      });

      it('should not render confirmation modal by default', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find(confirmationModalEl).exists()).to.equal(false);
      });

      it('should render confirmation modal when showConfirmationModal and activeTodo are true', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          data() {
            return {
              activeTodo: {},
              showConfirmationModal: true
            };
          },
          store,
          localVue
        });
        expect(wrapper.find(confirmationModalEl).exists()).to.equal(true);
      });
    });

    context('attributes', () => {
      const localVue = createLocalVue();
      localVue.use(Vuex);

      it('should not disable text input by default', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find(todoTextInputEl).attributes('disabled')).to.equal(undefined);
      });

      it('should disable text input when stateMachine has a currentState of pending', () => {
        const state = {
          stateMachine: {
            currentState: 'pending'
          },
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find(todoTextInputEl).attributes('disabled')).to.equal('disabled');
      });
    });

    context('slots', () => {
      const localVue = createLocalVue();
      localVue.use(Vuex);

      it('should render default slot with the text My Todos by default', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          store,
          localVue
        });
        expect(wrapper.find('h2').text()).to.equal('Create Todo');
      });

      it('should not render footer slot by default', () => {
        const state = {
          stateMachine: {},
          todos: []
        };
        const getters = {
          completedTodoNumber: () => 0,
          incompleteTodoNumber: () => 0
        };
        const actions = {
          getTodos: () => {}
        };
        const store = new Vuex.Store({ state, getters, actions });
        const wrapper = shallowMount(Todos, {
          slots: {
            default: 'Default Slot Title'
          },
          store,
          localVue
        });
        expect(wrapper.find('h2').text()).to.equal('Default Slot Title');
      });
    });
  });
});
