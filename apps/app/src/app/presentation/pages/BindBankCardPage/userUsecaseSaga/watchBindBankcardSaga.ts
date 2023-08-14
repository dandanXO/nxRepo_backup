import { errorFallback } from "apps/app/src/app/usecaseFlow/utils/errorFallback";
import { bindBankcardSaga } from "./i18n/pakistan/bindBankcardSaga";
import { takeLatest ,takeEvery} from "redux-saga/effects";
import { BindBankcardAction } from "./bindBankcardAction";

export function* watchBindBankcardSaga() {
    yield takeLatest(BindBankcardAction.user.bindBankcardSaveAction.type, errorFallback, bindBankcardSaga);
}
