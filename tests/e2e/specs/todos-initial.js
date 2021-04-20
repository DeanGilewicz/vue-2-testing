import { resolutions, url } from '../specs/constants';
import { incompleteTodoHeaderEl, incompleteTodosEl } from '../../utils/elements';

describe('Todo Application - Home Page Initial Todos', () => {
  before(() => {
    cy.visit(url + '/demo-app');
  });

  resolutions.forEach((resolution) => {
    context(`${resolution.width} x ${resolution.height} - when the server responds with todos`, () => {
      beforeEach(() => {
        cy.viewport(resolution.width, resolution.height);
      });

      it('should display the server todos', () => {
        cy.get(incompleteTodoHeaderEl).contains('Outstanding (4)');
        cy.get(incompleteTodosEl).should('have.length', 4);
      });
    });
  });
});
