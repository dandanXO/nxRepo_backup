import {getOpenIndexService} from "./services/indexService/getOpenIndexService";
import {getIndexService} from "./services/indexService/getIndexService";
import {UserService} from "./services/userService";
import {applyLoanService} from "./services/loanService";

// NOTICE: 根據 非 Page，而是 Domain 做切分
export const Service = {
  IndexService: {
    getOpenIndex: getOpenIndexService,
    getIndex: getIndexService,
  },
  UserService,
  LoanService: {
    applyLoan: applyLoanService,
  }
}
