import {getOpenIndexService} from "./indexService/getOpenIndexService";
import {getIndexService} from "./indexService/getIndexService";
import {getUserInfoService} from "./userService/service/getUserInfoService";
import {postApplyLoanService} from "./loanService/service/postApplyLoanService";
import {getQuotaModelStatusService} from "./loanService/service/getQuotaModelStatusService";
import {GetInitService} from "./appService/getInitService";
import {GetBankCardListService} from "./userService/service/getBankCardListService";

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
    GetUserInfoService: getUserInfoService,
    GetBankCardList: GetBankCardListService,
  },
  LoanService: {
    applyLoan: postApplyLoanService,
    getQuotaModelStatus: getQuotaModelStatusService,
  }
}
