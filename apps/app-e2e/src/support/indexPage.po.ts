class IndexPagePo {
  getMyLimitButton() {
    return cy.get(".authentication .div");
  }
}

export const indexPagePo = new IndexPagePo();

