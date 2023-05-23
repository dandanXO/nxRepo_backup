import { getInitService } from './appService/service/getInitService';
import { getIndexService } from './indexService/service/getIndexService';
import { getOpenIndexService } from './indexService/service/getOpenIndexService';
import { getQuotaModelStatusService } from './loanService/service/getQuotaModelStatusService';
import { postApplyLoanService } from './loanService/service/postApplyLoanService';
import { GetBankCardListService } from './userService/service/getBankCardListService';
import { getUserInfoService } from './userService/service/getUserInfoService';

// NOTICE: 根據 非 Page，而是 Domain 做切分
export const Service = {
  AppService: {
    getInit: getInitService,
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
  },
};
