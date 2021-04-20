import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';

import { defaultTodo } from '../../utils/mocks/todo';
import {
  appTitleEl,
  incompleteTodoHeaderEl,
  incompleteTodosEl
} from '../../utils/elements';
import Vuex from 'vuex';
import TodosModule from '@/store/modules/todos';
import constantsPlugin from '@/plugins/Constants';

import DemoApp from '@/views/DemoApp';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(constantsPlugin);

describe('DemoApp', () => {
  context('Initial app load', () => {
    it('should request todos from server when there are no todos in state', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.actions.getTodos = sinon.spy();
      const wrapper = mount(DemoApp, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      expect(wrapper.find(appTitleEl).text()).to.equal('My Todos');
      sinon.assert.calledOnce(modifiedTodosModule.actions.getTodos);
      sinon.reset(modifiedTodosModule.actions.getTodos);
    });

    it('should render a complete todo when a todo exists in state', async() => {
      const modifiedTodosModule = cloneDeep(TodosModule);
      modifiedTodosModule.state.push(defaultTodo);
      modifiedTodosModule.actions.getTodos = () => {};
      const wrapper = mount(DemoApp, {
        localVue,
        store: new Vuex.Store({
          modules: {
            todos: modifiedTodosModule,
            stateMachine: {}
          }
        })
      });
      expect(wrapper.find(incompleteTodoHeaderEl).text()).to.equal('Outstanding (1)');
      expect(wrapper.findAll(incompleteTodosEl).length).to.equal(1);
    });
  });
});
