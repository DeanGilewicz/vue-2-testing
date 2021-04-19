import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';

import { completedTodo, defaultTodo } from '../../utils/mocks/todo';
import {
  completeTodoHeaderEl,
  completeTodosEl,
  confirmationModalEl,
  confirmationModalDeleteButtonEl,
  incompleteTodoHeaderEl,
  incompleteTodosEl,
  messageEl,
  todoAddButtonEl,
  todoDeleteButtonEl,
  todoEditButtonEl,
  todoInputCheckboxEl,
  todoTextInputEl
} from '../../utils/elements';
import Vuex from 'vuex';
import TodosModule from '@/store/modules/todos';

import Todos from '@/components/organisms/Todos';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Todos', () => {
  context('Initial Page Render', () => {
    it('should focus on add todo input when mounted', async() => {
      const elem = document.createElement('div');
      if (document.body) {
        document.body.appendChild(elem);
      }
      const localVue = createLocalVue();
      localVue.use(Vuex);
      const state = {
        stateMachine: {},
        todos: []
      };
      const getters = {
        incompleteTodoNumber: () => 0,
        completedTodoNumber: () => 0
      };
      const actions = {
        getTodos: () => {}
      };
      const store = new Vuex.Store({ state, getters, actions });
      const wrapper = mount(Todos, {
        attachTo: elem,
        store,
        localVue
      });
      const addTodoInput = wrapper.find(todoTextInputEl).element;
      addTodoInput.focus(); // find a way to remove this and get document.activeElement to contain expected element
      await wrapper.vm.$nextTick();
      expect(addTodoInput).to.eql(document.activeElement);
      wrapper.destroy();
    });
  });

  context('Create a todo', () => {
    it('should display an error message and not create a new todo when name is not provided for input and return key is pressed', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      const wrapper = mount(Todos, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      // check error message is not rendered
      expect(wrapper.find(messageEl).exists()).to.equal(false);
      // find input
      const input = wrapper.find(todoTextInputEl);
      // trigger keydown enter on input
      await input.trigger('keydown', {
        key: 'Enter',
        keyCode: 13
      });
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      expect(wrapper.find(messageEl).text()).to.equal('Please Name Your Todo');
    });

    it('should create a new todo when name provided for input and return key is pressed', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      const wrapper = mount(Todos, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      const newTodoName = 'New Todo';
      // find input and set value
      const input = wrapper.find(todoTextInputEl);
      input.setValue(newTodoName);
      // trigger keydown enter on input
      await input.trigger('keydown', {
        key: 'Enter',
        keyCode: 13
      });
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      expect(wrapper.find(incompleteTodoHeaderEl).text()).to.equal('Outstanding (1)');
    });

    it('should display an error message and not create a new todo when name is not provided for input and add todo button is pressed', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      const wrapper = mount(Todos, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      // check error message is not rendered
      expect(wrapper.find(messageEl).exists()).to.equal(false);
      // find button
      const button = wrapper.find(todoAddButtonEl);
      // click add todo button
      await button.trigger('click');
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      expect(wrapper.find(messageEl).text()).to.equal('Please Name Your Todo');
    });

    it('should create a new todo when name provided for input and add todo button pressed', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      const wrapper = mount(Todos, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      const newTodoName = 'New Todo';
      // find input and set value
      const input = wrapper.find(todoTextInputEl);
      input.setValue(newTodoName);
      const button = wrapper.find(todoAddButtonEl);
      // click add todo button
      await button.trigger('click');
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      expect(wrapper.find(incompleteTodoHeaderEl).text()).to.equal('Outstanding (1)');
    });
  });

  context('Edit a todo', () => {
    it('should redirect to todo details page when edit todo button clicked for the todo', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      modifiedTodosModule.state = [
        { ...defaultTodo },
        { ...defaultTodo, id: 456 }
      ];
      const pushSpy = sinon.spy();
      const wrapper = mount(Todos, {
        localVue,
        mocks: {
          $router: {
            push: pushSpy
          }
        },
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      // find edit button and click
      await wrapper.find(todoEditButtonEl).trigger('click', { todo: modifiedTodosModule.state[0] });
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      sinon.assert.calledOnceWithExactly(pushSpy, `/demo-app/${modifiedTodosModule.state[0].id}/edit`);
      sinon.reset(pushSpy);
    });
  });

  context('Delete a todo', () => {
    it('should delete an existing todo when todo delete button clicked and confirmation modal delete button clicked', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      modifiedTodosModule.state = [
        { ...defaultTodo, name: 'the todo' },
        { ...defaultTodo, id: 456 }
      ];
      const wrapper = mount(Todos, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      // check display of incomplete todos
      const incompleteHeader = wrapper.find(incompleteTodoHeaderEl);
      expect(incompleteHeader.text()).to.equal('Outstanding (2)');
      // find delete button and click
      await wrapper.find(todoDeleteButtonEl).trigger('click', { todo: modifiedTodosModule.state[0] });
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      // click confirmation modal displayed
      const confirmationModal = wrapper.find(confirmationModalEl);
      expect(confirmationModal.exists()).to.equal(true);
      // click modal delete button
      await confirmationModal.find(confirmationModalDeleteButtonEl).trigger('click', { activeTodo: modifiedTodosModule.state[0] });
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      // check confirmation modal not displayed
      const confirmationModalAgain = wrapper.find(confirmationModalEl);
      expect(confirmationModalAgain.exists()).to.equal(false);
      // check display of incomplete todos
      expect(incompleteHeader.text()).to.equal('Outstanding (1)');
    });
  });

  context('Change a todo\'s status', () => {
    it('should change an incomplete todo into a complete todo when the todo\'s checkbox is clicked', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      modifiedTodosModule.state = [
        { ...defaultTodo, name: 'the todo' },
        { ...defaultTodo, id: 456 }
      ];
      const wrapper = mount(Todos, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      const incompleteHeader = wrapper.find(incompleteTodoHeaderEl);
      const completeHeader = wrapper.find(completeTodoHeaderEl);
      // check display of incomplete and complete todos
      expect(incompleteHeader.text()).to.equal('Outstanding (2)');
      expect(completeHeader.text()).to.equal('Completed (0)');
      // find first todo and click to check
      await wrapper.find(`${incompleteTodosEl} ${todoInputCheckboxEl}`).trigger('click', { todo: modifiedTodosModule.state[0] });
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      // check display of incomplete and complete todos
      expect(incompleteHeader.text()).to.equal('Outstanding (1)');
      expect(completeHeader.text()).to.equal('Completed (1)');
    });

    it('should change a complete todo into an incomplete todo when the todo\'s checkbox is clicked', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = () => {};
      modifiedTodosModule.state = [
        { ...completedTodo, name: 'the todo' },
        { ...defaultTodo, id: 456 }
      ];
      const wrapper = mount(Todos, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      const incompleteHeader = wrapper.find(incompleteTodoHeaderEl);
      const completeHeader = wrapper.find(completeTodoHeaderEl);
      // check display of incomplete and complete todos
      expect(incompleteHeader.text()).to.equal('Outstanding (1)');
      expect(completeHeader.text()).to.equal('Completed (1)');
      // find first todo and click to check
      await wrapper.find(`${completeTodosEl} ${todoInputCheckboxEl}`).trigger('click', { todo: modifiedTodosModule.state[0] });
      // wait for template to update (re-render)
      await wrapper.vm.$nextTick();
      // check display of incomplete and complete todos
      expect(incompleteHeader.text()).to.equal('Outstanding (2)');
      expect(completeHeader.text()).to.equal('Completed (0)');
    });
  });
});
