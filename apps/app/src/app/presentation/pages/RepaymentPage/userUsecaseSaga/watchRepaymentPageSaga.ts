import { takeLatest ,takeEvery} from "redux-saga/effects";
import { RepaymentPageSagaActions } from ".";
import { errorFallback } from '../../../../usecaseFlow/utils/errorFallback';
import { userRepaymentPageSaga } from "./userRpaymentPageSaga";

export function* watchRepaymentPageSaga() {
    yield takeLatest(RepaymentPageSagaActions.user.pageAction.type, errorFallback, userRepaymentPageSaga)
}