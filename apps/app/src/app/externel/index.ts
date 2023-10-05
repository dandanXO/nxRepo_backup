import { getInitService } from './backend/appService/service/getInitService';
import { getIndexService } from './backend/indexService/service/getIndexService';
import { getNotificationService } from './backend/indexService/service/getNotificationService';
import { getOpenIndexService } from './backend/indexService/service/getOpenIndexService';
import { getQuotaModelStatusService } from './backend/loanService/service/getQuotaModelStatusService';
import { postApplyLoanService } from './backend/loanService/service/postApplyLoanService';
import { GetBankCardListService } from './backend/userService/service/getBankCardListService';
import { getUserInfoService } from './backend/userService/service/getUserInfoService';

// NOTICE: 根據 非 Page，而是 Domain 做切分
export const Service = {
  AppService: {
    getInit: getInitService,
  },
  IndexService: {
    getOpenIndex: getOpenIndexService,
    getIndex: getIndexService,
    getNotification: getNotificationService
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
export {LoginRequest} from "./backend/userService/LoginRequest";
export {LoginResponse} from "./backend/userService/LoginResponse";
