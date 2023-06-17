import {GetLoanRecordListReponse} from "../../../app/src/app/api/loanService/GetLoanRecordListReponse";
import {PagePathEnum} from "../../../app/src/app/presentation/pages/PagePathEnum";

describe("RepaymentPage", () => {
  beforeEach(() => {
    // NOTE: figma 360, 640
    cy.viewport(360, 640);
  })

  afterEach(() => {
    //
  })

  it("Unpaid List", () => {
    const getLoanRecordListResponse: GetLoanRecordListReponse & {isMock: boolean} = require("../fixtures/repaymentPage/getLoanRecordListResponse_upload_list.json")

    cy.intercept("get", "/api/v3/loan/records?pageNumber=0&pageSize=500&status=UNPAID", {
      statusCode: 200,
      body: getLoanRecordListResponse,
    }).as("getLoanRecordList").then(() => {
      console.log("getLoanRecordList");
    })


   cy.visitApp(PagePathEnum.RepaymentPage)

  })

})
