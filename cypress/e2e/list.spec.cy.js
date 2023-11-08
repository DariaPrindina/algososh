describe('list tests', () => {
  beforeEach(() => {
    cy.visit(`/list`);
    cy.get('[data-test-id="list-input-value"]').as("value")
    cy.get('[data-test-id="list-input-index"]').as("index")
    cy.get('[data-test-id="add-in-head-btn"]').as("addInHead")
    cy.get('[data-test-id="delete-from-head-btn"]').as("deleteFromHead")
    cy.get('[data-test-id="add-in-tail-btn"]').as("addInTail")
    cy.get('[data-test-id="delete-from-tail-btn"]').as("deleteFromTail")
    cy.get('[data-test-id="add-by-index-btn"]').as("addByIndex")
    cy.get('[data-test-id="delete-by-index-btn"]').as("deleteByIndex")
  });

  it('if the input is empty, then the addInHead/addByIndex/deleteByIndex buttons is disable', () => {
    cy.get('@value').should('have.value', '');
    cy.get('@addInHead').should('be.disabled')
    cy.get('@addInTail').should('be.disabled')
    cy.get('@addByIndex').should('be.disabled')
    cy.get('@deleteByIndex').should('be.disabled')
  });
  
  it('correctness of rendering the default list', () => {
    cy.get('[data-test-id="circle"]').as('circle')
    cy.get('[data-test-id="circle-head"]').as("top")
    cy.get('[data-test-id="circle-tail"]').as("tail")
  
    cy.get('@circle').should('have.length', 4)
    cy.get('@circle').eq(0).should('have.text', '1')
    cy.get('@circle').eq(1).should('have.text', '8')
    cy.get('@circle').eq(2).should('have.text', '34')
    cy.get('@circle').eq(3).should('have.text', '0')
    
    cy.get('@top').eq(0).should('have.text', 'top')
    cy.get('@tail').eq(3).should('have.text', 'tail')
  })
  
  it('correctness of adding an element to the head', () => {
    cy.get('@value').type('22')
    cy.get('@addInHead').should('have.text', 'Добавить в head').should('not.be.disabled').click()
   
    cy.get('[data-test-id="circle-head"]').as('top')
    cy.get('[data-test-id="circle-tail"]').as('tail') 
    cy.get('[data-test-id="circle"]').as('circle')
  
    cy.get('@circle').eq(0).should('have.text', '22').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(0).should('have.text', '22').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@top').eq(0).should('have.text', 'top')
    cy.get('@tail').eq(4).should('have.text', 'tail')
  })
  
  it('correctness of adding an element to the tail', () => {
    cy.get('@value').type('33')
    cy.get('@addInTail').should('have.text', 'Добавить в tail').should('not.be.disabled').click()
   
    cy.get('[data-test-id="circle-head"]').as('top')
    cy.get('[data-test-id="circle-tail"]').as('tail') 
    cy.get('[data-test-id="circle"]').as('circle')
  
    cy.get('@circle').last().should('have.text', '33').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(4).should('have.text', '33').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@top').eq(0).should('have.text', 'top')
    cy.get('@tail').eq(4).should('have.text', 'tail')
  })
  
  it('correctness of adding an element by index', () => {
    cy.get('@value').type('44')
    cy.get('@index').type('2')
  
    cy.get('@addByIndex').should('have.text', 'Добавить по индексу').should('not.be.disabled').click()
  
    cy.get('[data-test-id="circle-head"]').as('top')
    cy.get('[data-test-id="circle-tail"]').as('tail') 
    cy.get('[data-test-id="circle"]').as('circle')
  
    cy.get('@top').get('@circle').eq(0).should('have.text', '44').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@top').get('@circle').eq(1).should('have.text', '44').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(2).should('have.text', '44').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    cy.wait(500)
    cy.get('@circle').eq(2).should('have.text', '44').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@circle').eq(0).should('have.text', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@circle').eq(1).should('have.text', '8').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
  
    cy.get('@top').eq(0).should('have.text', 'top')
    cy.get('@tail').eq(4).should('have.text', 'tail')
  })
  
  it('correctness of deleting an element from head', () => {
    cy.get('@deleteFromHead').should('have.text', 'Удалить из head').should('not.be.disabled').click()
   
    cy.get('[data-test-id="circle-head"]').as('top')
    cy.get('[data-test-id="circle-tail"]').as('tail') 
    cy.get('[data-test-id="circle"]').as('circle')
  
    cy.get('@top').get('@circle').eq(0).should('have.text', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.get('@circle').eq(0).should('have.text', '8').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
  
    cy.get('@top').should('have.text', 'top')
  })
  
  it('correctness of deleting an element from tail', () => {
    cy.get('@deleteFromTail').should('have.text', 'Удалить из tail').should('not.be.disabled').click()
   
    cy.get('[data-test-id="circle-head"]').as('top')
    cy.get('[data-test-id="circle-tail"]').as('tail') 
    cy.get('[data-test-id="circle"]').as('circle')
  
    cy.get('@tail').get('@circle').last().should('have.text', '0').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.get('@circle').last().should('have.text', '34').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
  
    cy.get('@tail').should('have.text', 'tail')
  })

  it('correctness of deleting an element by index', () => {
    cy.get('@index').type('2')

    cy.get('@addByIndex').should('be.disabled')
    cy.get('@deleteByIndex').should('not.be.disabled').click()

    cy.get('[data-test-id="circle-head"]').as('top')
    cy.get('[data-test-id="circle-tail"]').as('tail') 
    cy.get('[data-test-id="circle"]').as('circle')

    cy.get('@circle').eq(0).should('have.text', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(1).should('have.text', '8').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    cy.wait(500)
    cy.get('@circle').eq(2).should('have.text', '0').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@tail').get('@circle').eq(2).should('have.text', '0').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.wait(500)
    cy.get('@circle').eq(0).should('have.text', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@circle').eq(1).should('have.text', '8').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    cy.get('@circle').eq(2).should('have.text', '0').should('have.css', 'border', '4px solid rgb(0, 50, 255)')

    cy.get('@top').eq(0).should('have.text', 'top')
    cy.get('@tail').eq(2).should('have.text', 'tail')
  })
})