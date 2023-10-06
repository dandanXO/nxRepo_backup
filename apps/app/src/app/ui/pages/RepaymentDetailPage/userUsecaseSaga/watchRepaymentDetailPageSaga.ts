import {errorFallback} from "../../../../uiFlowUsecase/utils/errorFallback";
import {takeLatest} from "redux-saga/effects";


import {RepaymentDetailPageUseCaseActions} from ".";
import {PhilippinesCountry} from '@frontend/shared/domain';
import {environment} from "../../../../../environments/environmentModule/environment";
import {systemShowReservationSaga} from "./systemShowReservationSaga";
import {userRepaymentDetailSaga} from "./userRepaymentDetailSaga";
import {userReserveSaga} from "./userReserveSaga";


export function* watchRepaymentDetailPageSaga() {
    yield takeLatest(RepaymentDetailPageUseCaseActions.system.showReservation.type, errorFallback, systemShowReservationSaga)
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.reserve.type, errorFallback, userReserveSaga);
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.repaymentDetail.type, errorFallback, userRepaymentDetailSaga)

    const countryName = environment.countryName
    const { userRepayDataSaga } =
      countryName === PhilippinesCountry.countryName
        ? require(`./i18n/${countryName}/userRepayDataSaga`)
        : require('./userRepayDataSaga');

    yield takeLatest(RepaymentDetailPageUseCaseActions.user.repayData.type, errorFallback, userRepayDataSaga)
}
