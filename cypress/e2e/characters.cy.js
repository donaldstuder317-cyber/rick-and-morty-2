describe('Characters Page and Pagination', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character?page=1').as('getPage1');
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character?page=2').as('getPage2');
    cy.visit('/characters');
    cy.wait('@getPage1');
  });

  it('renders Bootstrap cards for the first page of characters', () => {
    cy.contains('h1', 'Characters').should('be.visible');
    cy.get('[data-cy="character-card"]').should('have.length', 20);
    cy.contains('Rick Sanchez').should('be.visible');
    cy.get('[data-cy="character-card"]').first().find('img').should('be.visible');
  });

  it('navigates to the next and previous pages using pagination buttons', () => {
    cy.get('[data-cy="prev-btn"]').should('be.disabled');
    cy.get('[data-cy="next-btn"]').should('not.be.disabled').click();

    cy.wait('@getPage2').its('response.statusCode').should('eq', 200);
    cy.contains('Page 2 of').should('be.visible');
    cy.get('[data-cy="character-card"]').should('have.length', 20);

    cy.get('[data-cy="prev-btn"]').should('not.be.disabled').click();

    cy.contains('Page 1 of').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
  });
});