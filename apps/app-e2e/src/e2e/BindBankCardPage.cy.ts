import {PageOrModalPathEnum} from "../../../app/src/app/presentation/PageOrModalPathEnum";
import {GetBindCardDropListResponse} from "../../../app/src/app/api/rtk/old/GetBindCardDropList";


describe("BindBankCardPage", () => {
  beforeEach(() => {
    cy.viewport(360, 640);

  })

  it("客戶進入綁卡頁面", () => {
    const getBindBankCardResponse: GetBindCardDropListResponse = require("../fixtures/bindBankCardPage/bank-bind-info_normal.json");
    cy.intercept("get", "/api/v2/bank-bind/info", getBindBankCardResponse)

    cy.visitAPP(PageOrModalPathEnum.BindBankcard);

  })

})
