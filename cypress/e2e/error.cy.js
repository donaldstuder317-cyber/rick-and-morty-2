describe('404 Not Found Page', () => {
  it('renders the NotFound component for an unknown URL', () => {
    cy.visit('/this-route-does-not-exist');
    cy.contains('404 - Page Not Found').should('be.visible');
    cy.contains('does not exist').should('be.visible');

    cy.contains('Return Home').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });
});