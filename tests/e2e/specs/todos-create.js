import { rendersOneNewTodo } from '../specs/shared/assertions';
import { newTodoName, resolutions, url } from '../specs/constants';
import { todoAddButtonEl, todoTextInputEl } from '../../utils/elements';

describe('Todo Application - Home Page Create Todo', () => {
  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when user attempts to create a todo without a name`, () => {
      beforeEach(() => {
        cy.server();
        cy.route('GET', '/todos', []).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');
        cy.viewport(resolution.width, resolution.height);
      });

      it('should display an error message when input focused and return key pressed', () => {
        cy.get(todoTextInputEl).type('{enter}');
      });

      it('should display an error message when add todo button pressed', () => {
        cy.get(todoAddButtonEl).click();
      });
    });
  });

  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when user attempts to create a todo with a name`, () => {
      beforeEach(() => {
        cy.server();
        cy.route('GET', '/todos', []).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');
        cy.viewport(resolution.width, resolution.height);
      });

      it('should create the todo when input focused and return key pressed', () => {
        cy.get(todoTextInputEl).type(newTodoName).type('{enter}');
        rendersOneNewTodo(newTodoName);
      });

      it('should create the todo when add todo button pressed', () => {
        cy.get(todoTextInputEl).type(newTodoName);
        cy.get(todoAddButtonEl).click();
        rendersOneNewTodo(newTodoName);
      });
    });
  });
});
