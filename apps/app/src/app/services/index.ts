import {getOpenIndexService} from "./indexService/getOpenIndexService";
import {getIndexService} from "./indexService/getIndexService";
import {UserService} from "./userService/userService";
import {applyLoanService} from "./loanService/loanService";
import {getQuotaModelStatusService} from "./loanService/getQuotaModelStatus";

// NOTICE: 根據 非 Page，而是 Domain 做切分
export const Service = {
  IndexService: {
    getOpenIndex: getOpenIndexService,
    getIndex: getIndexService,
  },
  UserService,
  LoanService: {
    applyLoan: applyLoanService,
    getQuotaModelStatus: getQuotaModelStatusService,
  }
}
