import {getOpenIndexService} from "./indexService/getOpenIndexService";
import {getIndexService} from "./indexService/getIndexService";
import {GetUserInfoService} from "./userService/service/GetUserInfoService";
import {postApplyLoanService} from "./loanService/postApplyLoanService";
import {getQuotaModelStatusService} from "./loanService/getQuotaModelStatusService";
import {GetInitService} from "./appService/getInitService";
import {GetBankCardListService} from "./userService/service/GetBankCardListService";

// NOTICE: 根據 非 Page，而是 Domain 做切分
export const Service = {
  AppService: {
    getInit: GetInitService,
  },
  IndexService: {
    getOpenIndex: getOpenIndexService,
    getIndex: getIndexService,
  },
  UserService: {
    GetUserInfoService,
    GetBankCardList: GetBankCardListService,
  },
  LoanService: {
    applyLoan: postApplyLoanService,
    getQuotaModelStatus: getQuotaModelStatusService,
  }
}
