import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';

import { defaultTodo } from '../../utils/mocks/todo';
import {
  editTodoPageInputEl,
  editTodoPageSaveButtonEl
} from '../../utils/elements';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import TodosModule from '@/store/modules/todos';

import DemoAppEditTodo from '@/views/DemoAppEditTodo';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('DemoAppEditTodo', () => {
  context('Set Todo Name', () => {
    it('should dispatch an event to update the todo\'s name and redirect to home page when name provided for input and save button is pressed', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.state.push(defaultTodo);
      modifiedTodosModule.actions.setTodoName = sinon.spy();
      router.push = sinon.spy();
      const wrapper = mount(DemoAppEditTodo, {
        localVue,
        propsData: {
          id: modifiedTodosModule.state[0].id.toString()
        },
        router,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      const updatedTodoName = 'My Updated Todo';
      // find input and set value
      const input = wrapper.find(editTodoPageInputEl);
      input.setValue(updatedTodoName);
      // find save button and press
      await wrapper.find(editTodoPageSaveButtonEl).trigger('click');
      sinon.assert.calledOnce(modifiedTodosModule.actions.setTodoName);
      expect(modifiedTodosModule.actions.setTodoName.args[0][1].todo).to.eql(modifiedTodosModule.state[0]);
      expect(modifiedTodosModule.actions.setTodoName.args[0][1].name).to.equal(updatedTodoName);
      sinon.assert.calledWithExactly(router.push, '/demo-app');
      sinon.reset(modifiedTodosModule.actions.setTodoName);
      sinon.reset(router.push);
    });
  });
});
