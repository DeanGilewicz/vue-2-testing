import { newTodoName, resolutions, url } from '../specs/constants';
import {
  completeTodoHeaderEl,
  completeTodosEl,
  editTodoPageCancelButtonEl,
  editTodoPageInputEl,
  editTodoPageLinkEl,
  editTodoPageSaveButtonEl,
  incompleteTodoHeaderEl,
  incompleteTodosEl,
  todoEditButtonEl,
  todoInputCheckboxEl
} from '../../utils/elements';
import { generatedTodosWithOneComplete } from '../specs/shared/helpers';
import serverTodosData from '../../../api/data/todos.json';

const todosWithOneComplete = generatedTodosWithOneComplete(serverTodosData);

describe('Todo Application - Home Page Update Todo', () => {
  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when user attempts to change status of an existing todo`, () => {
      beforeEach(() => {
        cy.viewport(resolution.width, resolution.height);
      });

      it('should update an incomplete todo to a complete todo when todo checkbox is pressed', () => {
        cy.server();
        cy.route('/todos', serverTodosData).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');

        cy.get(incompleteTodoHeaderEl).contains('Outstanding (4)');
        cy.get(incompleteTodosEl).should('have.length', 4);
        cy.get(completeTodoHeaderEl).contains('Completed (0)');
        cy.get(completeTodosEl).should('have.length', 0);

        cy.get(incompleteTodosEl).eq(0).contains(serverTodosData[0].name);
        cy.get(incompleteTodosEl).eq(0).find(todoInputCheckboxEl).click();

        cy.get(incompleteTodoHeaderEl).contains('Outstanding (3)');
        cy.get(incompleteTodosEl).should('have.length', 3);
        cy.get(completeTodoHeaderEl).contains('Completed (1)');
        cy.get(completeTodosEl).should('have.length', 1);

        cy.get(completeTodosEl).eq(0).contains(serverTodosData[0].name);
      });

      it('should update a complete todo to an incomplete todo when todo checkbox is pressed', () => {
        cy.server();
        cy.route('/todos', todosWithOneComplete).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');

        cy.get(incompleteTodoHeaderEl).contains('Outstanding (3)');
        cy.get(incompleteTodosEl).should('have.length', 3);
        cy.get(completeTodoHeaderEl).contains('Completed (1)');
        cy.get(completeTodosEl).should('have.length', 1);

        cy.get(completeTodosEl).eq(0).contains(todosWithOneComplete[1].name);
        cy.get(completeTodosEl).eq(0).find(todoInputCheckboxEl).click();

        cy.get(incompleteTodoHeaderEl).contains('Outstanding (4)');
        cy.get(incompleteTodosEl).should('have.length', 4);
        cy.get(completeTodoHeaderEl).contains('Completed (0)');
        cy.get(completeTodosEl).should('have.length', 0);

        cy.get(incompleteTodosEl).eq(1).contains(todosWithOneComplete[1].name);
      });
    });
  });

  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when user clicks a todo edit button`, () => {
      beforeEach(() => {
        cy.server();
        cy.route('/todos', serverTodosData).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');
        cy.get(incompleteTodosEl).eq(0).find(todoEditButtonEl).click();
        cy.viewport(resolution.width, resolution.height);
      });

      it('should take the user to the edit page for that todo', () => {
        cy.url().should('include', '/demo-app/1/edit');
      });

      it('should take the user back to the home page without updating todo when typing into the todo name input and pressing the cancel button', () => {
        cy.get(editTodoPageInputEl).type(newTodoName);
        cy.get(editTodoPageCancelButtonEl).click();
        cy.url().should('eq', `${url}/demo-app`);
        cy.get(incompleteTodosEl).eq(0).contains(serverTodosData[0].name);
      });

      it('should take the user back to the home page without updating todo when typing into the todo name input and pressing the "back to all todos" link', () => {
        cy.get(editTodoPageInputEl).type(newTodoName);
        cy.get(editTodoPageLinkEl).click();
        cy.url().should('eq', `${url}/demo-app`);
        cy.get(incompleteTodosEl).eq(0).contains(serverTodosData[0].name);
      });

      it('should take the user back to the home page after updating the todo\'s name when typing into the todo name input and pressing the save button', () => {
        cy.get(editTodoPageInputEl).type(newTodoName);
        cy.get(editTodoPageSaveButtonEl).click();
        cy.url().should('eq', `${url}/demo-app`);
        cy.get(incompleteTodosEl).eq(0).contains(newTodoName);
      });
    });
  });

  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when user attempts to visit edit todo url for a todo that doesn't exist`, () => {
      beforeEach(() => {
        cy.server();
        cy.route('/todos', []).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');
        cy.viewport(resolution.width, resolution.height);
      });

      it('should redirect user back to the home page', () => {
        cy.visit(url + '/demo-app/1/edit');
        cy.url().should('eq', `${url}/demo-app`);
      });
    });
  });
});
