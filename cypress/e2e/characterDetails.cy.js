describe('Character Details Page and Dynamic Routing', () => {
  it('navigates to a character details page when clicking a card and returns back', () => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character?page=1').as('getPage1');
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character/1').as('getCharacter1');

    cy.visit('/characters');
    cy.wait('@getPage1');

    cy.get('[data-cy="character-card"]').first().click();

    cy.url().should('include', '/characters/1');
    cy.wait('@getCharacter1');

    cy.get('[data-cy="character-details-card"]').should('be.visible');
    cy.contains('h1', 'Rick Sanchez').should('be.visible');
    cy.contains('Species:').should('be.visible');
    cy.contains('Type:').should('be.visible');
    cy.contains('Gender:').should('be.visible');
    cy.contains('Origin:').should('be.visible');
    cy.contains('Last Known Location:').should('be.visible');
    cy.contains('Episode Appearances:').should('be.visible');

    cy.get('[data-cy="back-btn"]').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/characters`);
    cy.contains('h1', 'Characters').should('be.visible');
  });

  it('loads character details directly via dynamic URL parameter', () => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character/2').as('getCharacter2');

    cy.visit('/characters/2');
    cy.wait('@getCharacter2');

    cy.contains('h1', 'Morty Smith').should('be.visible');
    cy.contains('Human').should('be.visible');
  });
});