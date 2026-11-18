describe('Home Page and Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the updated Home Page heading and Rick and Morty image', () => {
    cy.contains('h1', 'Welcome to the Rick And Morty Explorer').should('be.visible');

    cy.get('[data-cy="home-hero-img"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('navigates between pages using the NavBar links', () => {
    cy.get('nav').contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('h1', 'About Rick and Morty').should('be.visible');

    cy.get('nav').contains('Characters').click();
    cy.url().should('include', '/characters');
    cy.contains('h1', 'Characters').should('be.visible');

    cy.get('nav').contains('Home').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.contains('h1', 'Welcome to the Rick And Morty Explorer').should('be.visible');
  });
});