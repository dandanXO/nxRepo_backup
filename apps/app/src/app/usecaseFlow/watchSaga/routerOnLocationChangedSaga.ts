import { LocationChangeAction, push, back, go } from '@lagunovsky/redux-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { PagePathEnum } from '../../presentation/pages/PagePathEnum';
import { getToken } from '../../modules/querystring/getToken';
import { RootState } from '../../reduxStore';
import { InitialStateType, modalSlice } from '../../reduxStore/modalSlice';
import { getOrderNo } from '../../modules/querystring/getOrderNo';
import {isSimpleWebView} from "../../modules/window/isSimpleWebView";

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

        if (prevPathname === PagePathEnum.RepaymentPage
            || prevPathname === PagePathEnum.PersonalInfoPage
            || prevPathname === PagePathEnum.IndexPage) {
            yield put(push(`${PagePathEnum.IndexPage}?token=${getToken()}`));
        }

        // NOTE : RepaymentDetailPage route 控制
        if (
          (
            prevPathname === PagePathEnum.RepaymentDetailPage ||
            currentPath === PagePathEnum.RepaymentDetailPage ||
              (currentPath.includes(PagePathEnum.RepaymentDetailPage
          ) && currentPath.length > PagePathEnum.RepaymentDetailPage.length))
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
                if(currentPath!=='/v2/repayment-detail/repayment-modal'){
                    yield put(go(-1))
                }
            }else{
                if (prevPathname.length > PagePathEnum.RepaymentDetailPage.length) {
                    yield put(push(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`));
                }

                if(!isSimpleWebView()) {
                  if (prevPathname === PagePathEnum.RepaymentDetailPage) {
                    yield put(push(`${PagePathEnum.RepaymentPage}?token=${getToken()}`));
                  }
                }
            }

        }

        // NOTE : 上傳還款證明單成功 route 控制
        if ((prevPathname === '/v2/uploaded-payment-receipt' ||
            prevPathname === '/v2/upload-payment-receipt' ||
            currentPath === '/v2/upload-payment-receipt') && prevPathname !== PagePathEnum.RepaymentDetailPage) {
            yield put(push(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`));

        }


    }

    // 更新 prevPathname，以便下一次比較
    if (action.payload.action === "PUSH") {
        prevPathname = currentPath;
    }

}
