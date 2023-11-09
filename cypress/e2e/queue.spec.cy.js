describe('queue tests', () => {
  beforeEach(() => {
    cy.visit(`/queue`);
    cy.get('[data-test-id="queue-input"]').as("input")
    cy.get('[data-test-id="queue-add-btn"]').as("addButton")
    cy.get('[data-test-id="queue-delete-btn"]').as("deleteButton")
    cy.get('[data-test-id="queue-clear-btn"]').as("clearButton")
  });

  it('if the input is empty, then the add button is disable', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@addButton').should('be.disabled')
  });

  it('correctness of adding elements in the queue', () => {
    cy.get('@input').type('1')
    cy.get('@addButton').should('have.text', 'Добавить').should('not.be.disabled').click()
    cy.get('[data-test-id="circle-head"]').as("head")
    cy.get('[data-test-id="circle-tail"]').as("tail")
    
    cy.get('[data-test-id="circle"]').as('circle')
    cy.get('@circle').eq(0).should('have.text', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(0).should('have.text', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@head').eq(0).should('have.text', 'head')
    cy.get('@tail').eq(0).should('have.text', 'tail')

    cy.get('@addButton').should('be.disabled')
    cy.get('@clearButton').should('not.be.disabled')
    cy.get('@deleteButton').should('not.be.disabled')
    
    cy.get('@input').type('2')
    cy.get('@addButton').should('not.be.disabled').click()
    cy.get('@circle').eq(0).should('have.text', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@circle').eq(1).should('have.text', '2').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(1).should('have.text', '2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@head').eq(0).should('have.text', 'head')
    cy.get('@tail').eq(1).should('have.text', 'tail')
    
    cy.get('@deleteButton').should('have.text', 'Удалить').should('not.be.disabled').click()
    cy.get('@circle').eq(0).should('have.text', '')
    cy.get('@circle').eq(1).should('have.text', '2')
    cy.get('@head').eq(1).should('have.text', 'head')
    cy.get('@tail').eq(1).should('have.text', 'tail')
  })

  it('correctness of removing elements in the queue', () => {
    cy.get('@input').type('1')
    cy.get('@addButton').should('have.text', 'Добавить').should('not.be.disabled').click()

    cy.get('[data-test-id="circle-head"]').as("head")
    cy.get('[data-test-id="circle-tail"]').as("tail")

    cy.get('@addButton').should('be.disabled')
    cy.get('@clearButton').should('not.be.disabled')
    cy.get('@deleteButton').should('not.be.disabled')
    cy.get('[data-test-id="circle"]').as('circle')
    
    cy.get('@input').type('2')
    cy.get('@addButton').should('not.be.disabled').click()
    cy.wait(500)
    cy.get('@head').eq(0).should('have.text', 'head')
    cy.get('@tail').eq(1).should('have.text', 'tail')
    
    cy.get('@deleteButton').should('have.text', 'Удалить').should('not.be.disabled').click()
    cy.get('@circle').eq(0).should('have.text', '')
    cy.get('@circle').eq(1).should('have.text', '2')
    cy.get('@head').eq(1).should('have.text', 'head')
    cy.get('@tail').eq(1).should('have.text', 'tail')
  })

  it('correctness of clearing elements in the queue', () => {
    cy.get('@input').type('1')
    cy.get('@addButton').should('have.text', 'Добавить').should('not.be.disabled').click()
    cy.get('[data-test-id="circle"]').as('circle')
    cy.get('[data-test-id="circle-head"]').as("head")
    cy.get('[data-test-id="circle-tail"]').as("tail")
    cy.get('@input').type('3')
    cy.get('@addButton').should('not.be.disabled').click()
    cy.get('@input').type('4')
    cy.get('@addButton').should('not.be.disabled').click()
    cy.get('@input').type('5')
    cy.get('@addButton').should('not.be.disabled').click()
    cy.get('@clearButton').should('have.text', 'Очистить').should('not.be.disabled').click()
    cy.get('@circle').eq(0).should('have.text', '')
    cy.get('@circle').eq(1).should('have.text', '')
    cy.get('@head').should('have.text', '')
    cy.get('@tail').should('have.text', '')
  })
})