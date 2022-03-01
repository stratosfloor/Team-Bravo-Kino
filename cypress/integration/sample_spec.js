describe('Test my site is working', () => {
  it('Visits the localhost of my site', () => {
    cy.visit('http://localhost:5080');   
  });
  it('Check title on page', () => {
    cy.title().should('eq', 'Kino på Mars');
  })
  it('Click on "Filmer" in navbar and check if Idiocracy is showing', () => {
    cy.wait(1000);
    cy.get('ul').find('li').first().contains('Filmer').click();
    cy.get('ul').find('li').contains('Idiocracy');
  })
})

