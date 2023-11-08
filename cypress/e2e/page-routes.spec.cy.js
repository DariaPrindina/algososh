describe('Testing page routes', () => {
  before(function() {
    cy.visit('/');
  });

  it('route recursion', function() {
    cy.visit(`/recursion`);
  });
  it('route fibonacci', function() {
    cy.visit(`/fibonacci`);
  });
  it('route sorting', function() {
    cy.visit(`/sorting`);
  });
  it('route stack', function() {
    cy.visit(`/stack`);
  });
  it('route queue', function() {
    cy.visit(`/queue`);
  });
  it('route list', function() {
    cy.visit(`/list`);
  });
})