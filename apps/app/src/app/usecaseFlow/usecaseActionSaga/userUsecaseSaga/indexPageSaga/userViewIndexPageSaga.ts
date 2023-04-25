// NOTE: Action: UserApplyProduct
import {call, put, select, fork, all} from "redux-saga/effects";
import {Service} from "../../../../api";
import {indexPageSlice, InitialState} from "../../../reduxStore/indexPageSlice";
import {USER_AUTH_STATE} from "../../../../domain/user/USER_AUTH_STATE";
import {SystemCaseActions} from "../../systemUsecaseSaga/systemCaseActions";
import {GetIndexResponse} from "../../../../api/indexService/GetIndexResponse";
import {catchSagaError} from "../../../utils/catchSagaError";
import {GetOpenIndexResponse} from "../../../../api/indexService/GetOpenIndexResponse";
import {RootState} from "../../../reduxStore";
import {RISK_CONTROL_STATE} from "../../../../domain/risk/RISK_CONTROL_STATE";
import {getToken} from "../../../../modules/location/getToken";
import {systemCallGetUserInfoSaga} from "../sharedSaga/systemCallGetUserInfoSaga";

export function* userViewIndexPageSaga(action: any) {
  try {
    console.log("[app][saga] userViewIndexPageSaga");

    // const token: string = yield select((state: RootState) => state.app.token);
    const token = getToken();

    // if(!token) {
      // console.log("[APP][MODE]: InAndroid Mode")
      // NOTICE: App Mode: InAndroid Mode
      // TODO: get token from querystring
      // const querystringToken = getToken();
    // } else {
      // console.log("[APP][MODE]: Web")
      // NOTICE: App Mode: Web
    // }

    yield call(systemCallGetUserInfoSaga);

    const indexPage: InitialState = yield select((state: RootState) => state.indexPage);
    const status: number = yield select((state: RootState) => state.indexPage.user.state);

    const { riskControl } = yield select((state: RootState) => state.indexPage);

    console.log("[app][saga] state.indexPage", indexPage);
    console.log("[app][saga] status", status);

    if (status === USER_AUTH_STATE.ready) {
      const packageID: string = yield select((state: RootState) => state.app.androidAppInfo?.packageId)
      const openIndexResponse: GetOpenIndexResponse = yield call(Service.IndexService.getOpenIndex, { packageId: packageID });
      yield put(indexPageSlice.actions.updateOpenAPI(openIndexResponse));

    } else {
      const indexResponse: GetIndexResponse = yield call(Service.IndexService.getIndex, {});
      yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));

      if ((indexResponse.noQuotaBalance === true || indexResponse.riskReject === true)
            && riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able
        ) {
            // NOTICE: 不能重刷，需等待重刷時間
            // console.log("不能重刷，需等待重刷時間")
            // const expireTime = moment(indexResponse.refreshableUntil);
            yield put(SystemCaseActions.SystemRefreshableCountdownSaga(indexResponse.refreshableUntil))

        } else {
            // NOTICE: 可以重刷
            // const currentTime = moment();
            // const expireTime = moment(indexResponse.offerExpireTime);
            // const isRiskControlOverdue = expireTime.isBefore(currentTime);
            // console.log("currentTime.format", currentTime.format())
            // console.log("expireTime.format", expireTime.format())
            // if (!isRiskControlOverdue && indexResponse.availableAmount > 0) {
            //     const expiredTime = indexResponse?.offerExpireTime;
            //     yield put(SystemCaseActions.SystemCountdownSaga(expiredTime))
            // }

            yield put(SystemCaseActions.SystemCountdownSaga(indexResponse?.offerExpireTime))
        }
    }

  } catch(error) {
    yield catchSagaError(error);
  }

}

