import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import {
  todoDeleteButtonEl,
  todoEditButtonEl,
  todoInputCheckboxEl,
  todoInputCheckboxLabelEl
} from '../../../utils/elements';

import Todo from '@/components/molecules/Todo';

describe('Todo', () => {
  context('Props', () => {
    context('edit', () => {
      it('should be a Boolean with a default value of false', () => {
        const todoProp = Todo.props.edit;
        expect(todoProp.type).to.equal(Boolean);
        expect(todoProp.default).to.equal(false);
      });
    });

    context('todo', () => {
      it('should be an Object with a default value of empty object', () => {
        const todoProp = Todo.props.todo;
        expect(todoProp.type).to.equal(Object);
        expect(todoProp.default()).to.eql({});
      });
    });
  });

  context('Computed', () => {
    context('doesTodoExist', () => {
      it('should return false by default', () => {
        const state = {};
        expect(Todo.computed.doesTodoExist.call(state)).to.equal(false);
      });

      it('should return false when todo is an empty object', () => {
        const state = { todo: {} };
        expect(Todo.computed.doesTodoExist.call(state)).to.equal(false);
      });

      it('should return true when todo exists and is not an empty object', () => {
        const state = { todo: { id: 1 } };
        expect(Todo.computed.doesTodoExist.call(state)).to.equal(true);
      });
    });

    context('isImportantTodoStyles', () => {
      it('should return an empty object by default', () => {
        const state = {};
        expect(Todo.computed.isImportantTodoStyles.call(state)).to.eql({});
      });

      it('should return an object with background color property of lightgray and padding when todo name includes an asterix', () => {
        const state = { todo: { name: '* special todo' } };
        expect(Todo.computed.isImportantTodoStyles.call(state)).to.eql({
          backgroundColor: 'lightgray',
          padding: '2px 4px'
        });
      });
    });
  });

  context('Events', () => {
    context('change-todo-status', () => {
      it('should emit custom event with event and payload when todo input checkbox exists and is clicked', async() => {
        const todo = { id: 1 };
        const wrapper = shallowMount(Todo, {
          propsData: {
            todo
          }
        });
        const checkbox = wrapper.find(todoInputCheckboxEl);
        await checkbox.trigger('change');
        expect(wrapper.emitted()['change-todo-status'].length).to.equal(1);
        expect(wrapper.emitted()['change-todo-status'][0][1]).to.eql(todo);
      });
    });

    context('delete-todo', () => {
      it('should emit custom event with payload when delete todo button exists and is clicked', () => {
        const wrapper = shallowMount(Todo, {
          propsData: {
            todo: {
              id: 1
            }
          }
        });
        wrapper.find(todoDeleteButtonEl).trigger('click');
        expect(wrapper.emitted()['delete-todo'].length).to.equal(1);
        expect(wrapper.emitted()['delete-todo'][0][0]).to.eql({ id: 1 });
      });
    });

    context('edit-todo', () => {
      it('should emit custom event with payload when edit todo button exists and is clicked', () => {
        const wrapper = shallowMount(Todo, {
          propsData: {
            edit: true,
            todo: {
              id: 1
            }
          }
        });
        wrapper.find(todoEditButtonEl).trigger('click');
        expect(wrapper.emitted()['edit-todo'].length).to.equal(1);
        expect(wrapper.emitted()['edit-todo'][0][0]).to.eql({ id: 1 });
      });
    });
  });

  context('Template', () => {
    context('appearance', () => {
      it('should not render an "input-checkbox" component by default', () => {
        const wrapper = shallowMount(Todo);
        expect(wrapper.find(todoInputCheckboxEl).exists()).to.equal(false);
      });

      it('should not render a "delete todo" trigger element by default', () => {
        const wrapper = shallowMount(Todo);
        expect(wrapper.find(todoDeleteButtonEl).exists()).to.equal(false);
      });

      it('should render an "input-checkbox" component when a todo exists', () => {
        const wrapper = shallowMount(Todo, {
          propsData: {
            todo: {
              id: 1
            }
          }
        });
        expect(wrapper.find(todoInputCheckboxEl).exists()).to.equal(true);
      });

      it('should render a "delete todo" trigger element when a todo exists', () => {
        const wrapper = shallowMount(Todo, {
          propsData: {
            todo: {
              id: 1
            }
          }
        });
        expect(wrapper.find(todoDeleteButtonEl).exists()).to.equal(true);
      });
    });

    context('slots', () => {
      it('should not render footer slot by default', () => {
        const wrapper = shallowMount(Todo);
        expect(wrapper.text()).to.equal('');
      });

      it('should render footer slot when content provided', () => {
        const wrapper = shallowMount(Todo, {
          slots: {
            footer: 'Footer Slot Content'
          }
        });
        expect(wrapper.text()).to.equal('Footer Slot Content');
      });
    });

    context('styles', () => {
      it('should not render a background color inline style for checkbox label by default', () => {
        const wrapper = shallowMount(Todo, {
          computed: {
            doesTodoExist: () => true
          }
        });
        expect(wrapper.find(todoInputCheckboxLabelEl).attributes('style')).to.equal(undefined);
      });

      it('should render background color and padding inline styles for checkbox label when isImportantTodoStyles returns a background color and padding', () => {
        const wrapper = shallowMount(Todo, {
          computed: {
            doesTodoExist: () => true,
            isImportantTodoStyles: () => ({
              backgroundColor: 'lightgray',
              padding: '2px 4px'
            })
          }
        });
        expect(wrapper.find(todoInputCheckboxLabelEl).attributes('style')).to.equal('background-color: lightgray; padding: 2px 4px;');
      });

      it('should render a complete class name for delete button when todo is complete', () => {
        const wrapper = shallowMount(Todo, {
          propsData: {
            todo: {
              id: 1,
              completed: true
            }
          }
        });
        expect(wrapper.find(todoDeleteButtonEl).classes()).to.include('complete');
      });

      it('should not render a complete class name for delete button when todo is incomplete', () => {
        const wrapper = shallowMount(Todo, {
          propsData: {
            todo: {
              id: 1,
              completed: false
            }
          }
        });
        expect(wrapper.find(todoDeleteButtonEl).classes()).to.not.include('complete');
      });
    });
  });
});
