import {getOpenIndexService} from "./indexService/getOpenIndexService";
import {getIndexService} from "./indexService/getIndexService";
import {GetUserInfoService} from "./userService/getUserInfoService";
import {postApplyLoanService} from "./loanService/postApplyLoanService";
import {getQuotaModelStatusService} from "./loanService/getQuotaModelStatusService";
import {GetInitService} from "./appService/getInitService";
import {GetBankCardList} from "./userService/getBankCardList";

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
    applyLoan: postApplyLoanService,
    getQuotaModelStatus: getQuotaModelStatusService,
  }
}
