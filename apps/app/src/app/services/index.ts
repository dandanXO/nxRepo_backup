import {getOpenIndexService} from "./indexService/getOpenIndexService";
import {getIndexService} from "./indexService/getIndexService";
import {GetBankCardList, GetUserInfoService} from "./userService/userService";
import {applyLoanService} from "./loanService/loanService";
import {getQuotaModelStatusService} from "./loanService/getQuotaModelStatus";
import {GetInitService} from "./appService/getInitService";

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
    GetBankCardList,
  },
  LoanService: {
    applyLoan: applyLoanService,
    getQuotaModelStatus: getQuotaModelStatusService,
  }
}
