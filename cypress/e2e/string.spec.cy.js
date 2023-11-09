describe('string tests', () => {
  beforeEach(() => {
    cy.visit(`/recursion`);
    cy.get('[data-test-id="string-input"]').as("input")
    cy.get('[data-test-id="string-submit-btn"]').as("submitButton")
  });

  it('if the input is empty, then the add button is disable', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@submitButton').should('be.disabled')
  });

  it('the string unfolds correctly, a step-by-step check of the animation for the correctness of the operation performed and the correctness of styles', () => {
    cy.get('@input').type('qwer')
    cy.get('@submitButton').should('have.text', 'Развернуть').should('not.be.disabled').click()
    cy.get('[data-test-id="circle"]').as('circle')
    cy.wait(1000)
    cy.get('@circle').eq(0).should('have.text', 'Q').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.get('@circle').eq(3).should('have.text', 'R').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000)
    cy.get('@circle').eq(0).should('have.text', 'R').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    cy.get('@circle').eq(3).should('have.text', 'Q').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    cy.get('@circle').eq(1).should('have.text', 'W').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.get('@circle').eq(2).should('have.text', 'E').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000)
    cy.get('@circle').eq(1).should('have.text', 'E').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    cy.get('@circle').eq(2).should('have.text', 'W').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
  })

  it('a string with an odd number of characters unfolds correctly', () => {
    cy.get('@input').type('qwe')
    cy.get('@submitButton').should('have.text', 'Развернуть').should('not.be.disabled').click()
    cy.get('[data-test-id="circle"]').as('circle')
    cy.wait(1000)
    cy.get('@circle').eq(0).should('have.text', 'Q').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.get('@circle').eq(2).should('have.text', 'E').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(1000)
    cy.get('@circle').eq(2).should('have.text', 'Q').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    cy.get('@circle').eq(0).should('have.text', 'E').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    cy.get('@circle').eq(1).should('have.text', 'W').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
  })

  it('a string with one character unfolds correctly', () => {
    cy.get('@input').type('q')
    cy.get('@submitButton').should('have.text', 'Развернуть').should('not.be.disabled').click()
    cy.get('[data-test-id="circle"]').as('circle')
    cy.get('@circle').eq(0).should('have.text', 'Q').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.wait(1000)
    cy.get('@circle').eq(0).should('have.text', 'Q').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
  })
})