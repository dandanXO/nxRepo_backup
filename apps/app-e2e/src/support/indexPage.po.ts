class IndexPagePo {
    marquee() {
        return cy.get("[data-testing-id='marquee']");
    }
    welcome() {
        return cy.get("[data-testing-id='welcome']")
    }
    orderNotice(){
        return cy.get("[data-testing-id='orderNotice']")
    }
    quotaSlider() {
        return cy.get("[data-testing-id='quotaSlider']")
    }
    loanOverView() {
        return cy.get("[data-testing-id='loanOverView']")
    }
    loanableAmount() {
        return cy.get("[data-testing-id='loanableAmount']")
    }
    adProductInfo() {
        return cy.get("[data-testing-id='adProductInfo']")
    }
    getMyLimitButton() {
        return cy.get("[data-testing-id='limit-button']");
    }
    adBanner() {
        return cy.get("[data-testing-id='adBanner']");
    }
    applyButton() {
        return cy.get("[data-testing-id='apply']");
    }
    reacquireCreditButton() {
        return cy.get("[data-testing-id='reacquireCredit']");
    }
    viewAppProgressButton() {
        return cy.get("[data-testing-id='viewAppProgress']");
    }
    noticeUserRejected() {
        return cy.get("[data-testing-id='noticeUserRejected']");
    }
    noticeUserInProgress() {
        return cy.get("[data-testing-id='noticeUserInProgress']");
    }
    noticeOrderOrQuotaRejected() {
        return cy.get("[data-testing-id='noticeOrderOrQuotaRejected']");
    }
    noticeUserAuthedEmptyQuotae() {
        return cy.get("[data-testing-id='noticeUserAuthedEmptyQuota']");
    }
    noticeUserReacquireOver3Time() {
        return cy.get("[data-testing-id='noticeUserReacquireOver3Time']");
    }
    welcomBackTimer(){
        return cy.get("[data-testing-id='welcomBackTimer']");
    }
    tips(){
        return cy.get("[data-testing-id='tips']");
    }
    tabPayment() {
        return cy.get("[data-testing-id='tab-payment']");
    }
}

export const indexPagePo = new IndexPagePo();

