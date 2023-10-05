import {GetLoanDetailResponse} from "../../../app/src/app/externel/backend/loanService/GetLoanDetailResponse";
import {PageOrModalPathEnum} from "../../../app/src/app/ui/PageOrModalPathEnum";

describe("RepaymentPage", () => {
  beforeEach(() => {
    // NOTE: figma 360, 640
    cy.viewport(360, 640);
  })

  afterEach(() => {
    //
  })

  it("Unpaid", () => {

    const response: GetLoanDetailResponse & {isMock: boolean} = require("../fixtures/repaymentDetailPage/loan-detail_unpaid.json")

    cy.intercept("get", "/api/v2/loan/detail?orderNo=", {
      statusCode: 200,
      body: response,
    }).as("getLoanRecordList").then(() => {
      console.log("getLoanRecordList");
    })

    cy.visitApp(PageOrModalPathEnum.RepaymentDetailPage)

  })

})
