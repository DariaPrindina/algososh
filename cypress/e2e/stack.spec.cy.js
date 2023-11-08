describe('stack tests', () => {
  beforeEach(() => {
    cy.visit(`/stack`);
    cy.get('[data-test-id="stack-input"]').as("input")
    cy.get('[data-test-id="stack-add-btn"]').as("addButton")
    cy.get('[data-test-id="stack-delete-btn"]').as("deleteButton")
    cy.get('[data-test-id="stack-clear-btn"]').as("clearButton")
  });

  it('if the input is empty, then the add button is disable', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@addButton').should('be.disabled')
    cy.get('@deleteButton').should('be.disabled')
    cy.get('@clearButton').should('be.disabled')
  });

  it('the numbers are generated correctly', () => {
    cy.get('@input').type('12')
    cy.get('@addButton').should('have.text', 'Добавить').should('not.be.disabled').click()
    
    cy.get('[data-test-id="circle"]').as('circle')
    cy.get('@circle').should('have.length', 1)
    
    cy.get('@circle').eq(0).should('have.text', '12').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(0).should('have.text', '12').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    
    cy.get('@addButton').should('be.disabled')
    cy.get('@clearButton').should('not.be.disabled')
    cy.get('@deleteButton').should('not.be.disabled')
    
    cy.get('@input').type('34')
    cy.get('@addButton').should('not.be.disabled').click()
    cy.get('@circle').eq(0).should('have.text', '12').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@circle').eq(1).should('have.text', '34').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(1).should('have.text', '34').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@circle').should('have.length', 2)
    
    cy.get('@deleteButton').should('have.text', 'Удалить').should('not.be.disabled').click()
    cy.get('@circle').should('have.length', 1)

    cy.get('@clearButton').should('have.text', 'Очистить').should('not.be.disabled').click()
    cy.get('@circle').should('not.exist')
  })
})