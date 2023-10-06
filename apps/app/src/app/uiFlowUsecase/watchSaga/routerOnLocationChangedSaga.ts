import {go, LocationChangeAction, push} from '@lagunovsky/redux-react-router';
import {put, select} from 'redux-saga/effects';
import {PageOrModalPathEnum} from '../../ui/PageOrModalPathEnum';
import {getToken} from '../../application/getToken';
import {RootState} from '../../reduxStore';
import {modalSlice} from '../../reduxStore/modalSlice';
import {isSimpleWebView} from "../../device/isSimpleWebView";
import {getOrderNo} from "../../externel/window/querystring/getOrderNo";
import {GlobalAppMode} from "../../application/GlobalAppMode";

// 目前的pathname
let prevPathname = ''

export function* routerOnLocationChangedSaga(action: LocationChangeAction) {
  // console.log('Action', action);

  const { payload: { location } } = action;

  // 從 location 物件中取得要前往的 pathname
  const currentPath = location.pathname;
  const rootState: RootState = yield select((state: RootState) => state);

  // 點擊瀏覽器的上一頁
  if (action.payload.action === "POP") {
    // console.log('prevPathname', prevPathname)
    // console.log('currentPath', currentPath)
    // console.log('routerOnLocationChangedSaga', action);

    if (prevPathname === PageOrModalPathEnum.RepaymentPage ||
      prevPathname === PageOrModalPathEnum.PersonalInfoPage ||
      prevPathname === PageOrModalPathEnum.IndexPage) {

      yield put(push(`${PageOrModalPathEnum.IndexPage}?token=${getToken()}`));

      if (prevPathname === PageOrModalPathEnum.IndexPage) {
        if(GlobalAppMode.mode === "SimpleWebView" || GlobalAppMode.mode === "IndexWebview") {
          yield put(modalSlice.actions.updateExitConfirmModal({
            show: true
          }));
        } else if(GlobalAppMode.mode === "PureH5") {
          // NOTE: nothing to do, stay in IndexPage
        }
      }
    } else {
      // NOTE : RepaymentDetailPage route 控制
      if (
        (
          prevPathname === PageOrModalPathEnum.RepaymentDetailPage ||
          currentPath === PageOrModalPathEnum.RepaymentDetailPage ||
          (currentPath.includes(PageOrModalPathEnum.RepaymentDetailPage
          ) && currentPath.length > PageOrModalPathEnum.RepaymentDetailPage.length))
      ) {

        // 預約單 modal
        if (rootState.model.reservationProductsModal.show) {
          yield put(modalSlice.actions.updateReservationProductsModal({
            ...rootState.model.reservationProductsModal,
            show: false
          }));
        }

        // RepaymentDetailPage 所有的彈窗
        if (prevPathname === '/v2/repayment-detail/repayment-coupon-modal') {
          if (currentPath !== '/v2/repayment-detail/repayment-modal') {
            yield put(go(-1))
          }
        } else {
          if (prevPathname.length > PageOrModalPathEnum.RepaymentDetailPage.length) {
            yield put(push(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`));
          }

          if (!isSimpleWebView()) {
            if (prevPathname === PageOrModalPathEnum.RepaymentDetailPage) {
              yield put(push(`${PageOrModalPathEnum.RepaymentPage}?token=${getToken()}`));
            }
          }
        }

      }

      // NOTE : 上傳還款證明單成功 route 控制
      if ((prevPathname === '/v2/uploaded-payment-receipt' ||
        prevPathname === '/v2/upload-payment-receipt' ||
        currentPath === '/v2/upload-payment-receipt') && prevPathname !== PageOrModalPathEnum.RepaymentDetailPage) {
        yield put(push(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`));

      }
    }




  }

  // 更新 prevPathname，以便下一次比較
  if (action.payload.action === "PUSH" &&
    (prevPathname === PageOrModalPathEnum.RepaymentDetailPage ||
      currentPath === PageOrModalPathEnum.RepaymentDetailPage)) {
    prevPathname = currentPath;
  } else {
    prevPathname = currentPath;
  }

}
