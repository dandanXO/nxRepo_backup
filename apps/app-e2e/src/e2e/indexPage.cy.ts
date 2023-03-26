// NOTICE: refactor me
const APP_IDENTIFICATION = "[apps/app][e2e]";
const infoLog = (message, rest) => {
  if(!rest) {
    console.info(`${APP_IDENTIFICATION} ${message}`);
  } else {
    console.info(`${APP_IDENTIFICATION} ${message}`, rest);
  }
}

infoLog("env", Cypress.env());


// NOTE:
//  describe, it, GIVEN, WHEN, THEN

describe('IndexPage', () => {
  beforeEach(() => {
    cy.viewport("iphone-3")
    cy.visit("/")
  })

  afterEach(() => {
    //
  })

  it("status: 用戶未認證", () => {

  })

  it("status: 用戶認證中", () => {
    //
  })

  it("status: 用戶認證被拒絕", () => {
    //
  })

  // NOTICE: 訂單相關
  // NOTE: 但申請後還沒成功額度會扣嗎?使用者點擊Apply，才知道訂單審核中
  it("status: 用戶已認證、使用者點擊Apply，才知道訂單審核中", () => {
    //
  })

  it("status: 用戶已認證、有即將到期的訂單", () => {
    //
  })

  it("status: 用戶已認證、有逾期的訂單", () => {
    //
  })

  it("status: 用戶已認證、有訂單被拒絕", () => {
    //
  })

  it("status: 用戶已認證、有訂單被拒絕", () => {
    //
  })

  // NOTICE: 風控相關
  it("status: 用戶已認證、風控額度時間無效，需要重新獲取信用額度。", () => {
    //
  })

  it("status: 用戶已認證、風控額度時間無效，已經重新獲取信用額度過一次。", () => {
    //
  })

  it("status: 用戶已認證、風控額度時間有效，但額度不足", () => {
    //
  })

  it("status: 用戶已認證、風控額度時間有效，額度足夠。", () => {
    //
  })

  // NOTICE: 用戶已認證、風控有效，額度足夠下。開始 Apply 的流程
  it("status: 用戶已認證、風控額度時間有效，額度足夠。點擊 Apply 後，再次確認後，完成 Apply", () => {
    //
  })

});
