import { LocationChangeAction, go, goStraight, push, replace } from '@lagunovsky/redux-react-router';
import { put, select } from 'redux-saga/effects';

import { GlobalAppMode } from '../../application/GlobalAppMode';
import { getToken } from '../../application/getToken';
import { isSimpleWebView } from '../../device/isSimpleWebView';
import { getOrderNo } from '../../externel/window/querystring/getOrderNo';
import { RootState } from '../../reduxStore';
import { modalSlice } from '../../reduxStore/modalSlice';
import { PageOrModalPathEnum } from '../../ui/PageOrModalPathEnum';
import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { IndiaCountry } from '@frontend/shared/domain';

// 目前的pathname
let prevPathname = '';
let prevLocation: any = null;

export function* routerOnLocationChangedSaga(action: LocationChangeAction) {
  const { payload: { location } } = action;
  const rootState: RootState = yield select((state: RootState) => state);
  const currentPath = location.pathname;
  // console.log('Action', action);
  // console.log('prevLocation', prevLocation)
  // console.log('currentPath', prevPathname, currentPath)

  if (action.payload.action === 'POP') {

    if(prevPathname === PageOrModalPathEnum.LoginPage){
      yield put(push(`${PageOrModalPathEnum.LoginPage}?appName=${rootState.app.appName}&appID=${rootState.app.appID}&appDomain=${rootState.app.appDomain}`));
    } else if (prevPathname === PageOrModalPathEnum.IndexPage) {
      if (
        GlobalAppMode.mode === 'SimpleWebView' ||
        GlobalAppMode.mode === 'IndexWebview'
      ) {
        yield put(
          modalSlice.actions.updateExitConfirmModal({
            show: true,
          })
        );
      } else if (GlobalAppMode.mode === 'PureH5') {
        // NOTE: nothing to do, stay in IndexPage
      }
    } else if (
      (prevPathname === PageOrModalPathEnum.RepaymentPage ||
        prevPathname === PageOrModalPathEnum.PersonalInfoPage ||
        prevPathname === PageOrModalPathEnum.IndexPage) && (prevPathname !== currentPath)
    ) {
      yield put(push(`${PageOrModalPathEnum.IndexPage}?token=${getToken()}`));
    }

    // 預約單 modal
    if (rootState.model.reservationProductsModal.show) {
      yield put(
        modalSlice.actions.updateReservationProductsModal({
          ...rootState.model.reservationProductsModal,
          show: false,
        })
      );
      yield put(push(`${PageOrModalPathEnum.RepaymentDetailPage}${prevLocation.search}`, { state: prevLocation.state }))
    }

    if (rootState.model.starRatingModal.show) {
      yield put(modalSlice.actions.updateStarRatingModal({ show: false }))
      yield put(push(`${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`))
    }

    if (rootState.model.starRatingSuccessModal.show) {
      yield put(modalSlice.actions.updateStarRatingSuccessModal({ show: false }))
      yield put(push(`${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`))
    }

  }

  if (action.payload.action === "REPLACE") {

    if (location.pathname !== '/v2/uploaded-payment-receipt' &&
      prevPathname !== PageOrModalPathEnum.AccountVerificationPage &&

      location.pathname !== PageOrModalPathEnum.LoginPage &&
      !rootState.model.reservationProductsModal.show &&
      !rootState.model.starRatingModal.show &&
      !rootState.model.starRatingSuccessModal.show) {
      yield put(goStraight(-1))
    }

  }
  prevPathname = currentPath;
  prevLocation = location;
}
