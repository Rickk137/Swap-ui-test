context("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("target amount should correspond to source amount", () => {
    cy.getByComponentName("source-amount").type("10");

    cy.getByComponentName("target-amount")
      .invoke("val")
      .should((val) => {
        expect(val).not.be.eq("");
      });

    cy.getByComponentName("source-amount").clear();

    cy.getByComponentName("target-amount")
      .invoke("val")
      .should((val) => {
        expect(val).be.eq("");
      });
  });
});
