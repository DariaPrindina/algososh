describe('fibonacci tests', () => {
  beforeEach(() => {
    cy.visit(`/fibonacci`);
    cy.get('[data-test-id="fibonacci-input"]').as("input")
    cy.get('[data-test-id="fibonacci-submit-btn"]').as("submitButton")
    cy.get('[data-test-id="fibonacci-clear-btn"]').as("clearButton")
  });

  it('if the input is empty, then the add button is disable', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@submitButton').should('be.disabled')
    cy.get('@clearButton').should('be.disabled')
  });

  it('the numbers are generated correctly', () => {
    cy.get('@input').type('2')
    cy.get('@submitButton').should('have.text', 'Рассчитать').should('not.be.disabled').click()
    cy.get('[data-test-id="circle"]').as('circle')
    cy.wait(1500)
    cy.get('@circle').eq(0).should('have.text', '0')
    cy.get('@circle').eq(1).should('have.text', '1')
    cy.get('@circle').eq(2).should('have.text', '1')
  })
})