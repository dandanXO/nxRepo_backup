class IndexPagePo {
  marquee() {
    return cy.get("[data-testing-id='marquee']");
  }
  welcome() {
    return cy.get("[data-testing-id='welcome']")
  }
  loanableAmount() {
    return cy.get("[data-testing-id='loanableAmount']")
  }
  adProductInfo() {
    return cy.get("[data-testing-id='loanableAmount']")
  }
  adBanner() {
    return cy.get("[data-testing-id='adBanner']")
  }
  getMyLimitButton() {
    return cy.get("[data-testing-id='limit-button']");
  }
}

export const indexPagePo = new IndexPagePo();

