describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('renders the show overview and API statistics cards', () => {
    cy.contains('h1', 'About Rick and Morty').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
    cy.contains('Total Characters').should('be.visible');
    cy.contains('Total Locations').should('be.visible');
    cy.contains('Total Episodes').should('be.visible');
  });
});