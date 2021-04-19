import { expect } from 'chai';
import { mount } from '@vue/test-utils';

import { defaultTodo } from '../../utils/mocks/todo';
import { todoInputCheckboxEl } from '../../utils/elements';

import Todo from '@/components/molecules/Todo';

describe('Todo', () => {
  context('change-todo-status custom event', () => {
    it('should emit a custom change-todo-status event when checkbox clicked', async() => {
      const wrapper = mount(Todo, {
        computed: {
          doesTodoExist: () => true
        },
        propsData: {
          todo: { ...defaultTodo }
        }
      });
      wrapper.find(todoInputCheckboxEl).trigger('click');
      expect(wrapper.emitted()['change-todo-status'].length).to.equal(1);
      expect(wrapper.emitted()['change-todo-status'][0][1]).to.eql(defaultTodo);
    });
  });
});
