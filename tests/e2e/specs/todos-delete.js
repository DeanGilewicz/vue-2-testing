import { resolutions, url } from '../specs/constants';
import {
  completeTodoHeaderEl,
  completeTodosEl,
  confirmationModalEl,
  confirmationModalCancelButtonEl,
  confirmationModalDeleteButtonEl,
  incompleteTodoHeaderEl,
  incompleteTodosEl,
  todoDeleteButtonEl
} from '../../utils/elements';
import { generatedTodosWithOneComplete } from '../specs/shared/helpers';
import serverTodosData from '../../../api/data/todos.json';

const todosWithOneComplete = generatedTodosWithOneComplete(serverTodosData);

describe('Todo Application - Home Page Delete Todo', () => {
  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when user attempts to delete an existing incomplete todo`, () => {
      beforeEach(() => {
        cy.server();
        cy.route('/todos', serverTodosData).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');
        cy.viewport(resolution.width, resolution.height);
      });

      it('should display the delete confirmation modal for the todo and not delete todo when associated delete button is pressed followed by cancel button', () => {
        cy.get(incompleteTodoHeaderEl).contains('Outstanding (4)');
        cy.get(incompleteTodosEl).should('have.length', 4);

        cy.get(incompleteTodosEl).eq(0).contains(serverTodosData[0].name);
        cy.get(incompleteTodosEl).eq(0).find(todoDeleteButtonEl).click();

        cy.get(confirmationModalEl).should('be.visible').find(confirmationModalCancelButtonEl).click();
        cy.get(confirmationModalEl).should('not.be.visible');

        cy.get(incompleteTodoHeaderEl).contains('Outstanding (4)');
        cy.get(incompleteTodosEl).should('have.length', 4);

        cy.get(incompleteTodosEl).eq(0).contains(serverTodosData[0].name);
      });

      it('should delete the todo when delete confirmation modal button is pressed for the todo', () => {
        cy.get(incompleteTodoHeaderEl).contains('Outstanding (4)');
        cy.get(incompleteTodosEl).should('have.length', 4);

        cy.get(incompleteTodosEl).eq(0).contains(serverTodosData[0].name);
        cy.get(incompleteTodosEl).eq(0).find(todoDeleteButtonEl).click();

        cy.get(confirmationModalEl).find(confirmationModalDeleteButtonEl).click();

        cy.get(incompleteTodoHeaderEl).contains('Outstanding (3)');
        cy.get(incompleteTodosEl).should('have.length', 3);

        cy.get(incompleteTodosEl).eq(0).should('not.contain', serverTodosData[0].name);
      });
    });
  });

  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when user attempts to delete an existing complete todo`, () => {
      beforeEach(() => {
        cy.server();
        cy.route('/todos', todosWithOneComplete).as('todos');
        cy.visit(url + '/demo-app');
        cy.wait('@todos');
        cy.viewport(resolution.width, resolution.height);
      });

      it('should display the delete confirmation modal for the todo and not delete todo when associated delete button is pressed followed by cancel button', () => {
        cy.get(completeTodoHeaderEl).contains('Completed (1)');
        cy.get(completeTodosEl).should('have.length', 1);

        cy.get(completeTodosEl).eq(0).contains(todosWithOneComplete[1].name);
        cy.get(completeTodosEl).eq(0).find(todoDeleteButtonEl).click();

        cy.get(confirmationModalEl).should('be.visible').find(confirmationModalCancelButtonEl).click();
        cy.get(confirmationModalEl).should('not.be.visible');

        cy.get(completeTodoHeaderEl).contains('Completed (1)');
        cy.get(completeTodosEl).should('have.length', 1);

        cy.get(completeTodosEl).eq(0).contains(todosWithOneComplete[1].name);
      });

      it('should delete the todo when delete confirmation modal button is pressed for the todo', () => {
        cy.get(completeTodoHeaderEl).contains('Completed (1)');
        cy.get(completeTodosEl).should('have.length', 1);

        cy.get(completeTodosEl).eq(0).contains(todosWithOneComplete[1].name);
        cy.get(completeTodosEl).eq(0).find(todoDeleteButtonEl).click();

        cy.get(confirmationModalEl).find(confirmationModalDeleteButtonEl).click();

        cy.get(completeTodoHeaderEl).contains('Completed (0)');
        cy.get(completeTodosEl).should('not.be.visible');
      });
    });
  });
});
