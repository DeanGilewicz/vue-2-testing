import { incompleteTodoHeaderEl, incompleteTodosEl, todoDeleteButtonEl, todoEditButtonEl } from '../../../utils/elements';

export const rendersOneNewTodo = function(todoName) {
  cy.get(incompleteTodoHeaderEl).contains('Outstanding (1)');
  cy.get(incompleteTodosEl).should('have.length', 1).contains(todoName);
  cy.get(todoDeleteButtonEl).should('have.length', 1).contains('Delete');
  cy.get(todoEditButtonEl).should('have.length', 1).contains('Edit');
};
