import { LocationChangeAction, push } from '@lagunovsky/redux-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { PagePathEnum } from '../../presentation/pages/PagePathEnum';
import { getToken } from '../../modules/querystring/getToken';
import { RootState } from '../../reduxStore';
import { InitialStateType, modalSlice } from '../../reduxStore/modalSlice';
import { getOrderNo } from '../../modules/querystring/getOrderNo';

// 目前的pathname
let prevPathname = ''

export function* routerOnLocationChangedSaga(action: LocationChangeAction) {
    console.log('Action', action);

    const { payload: { location } } = action;

    // 從 location 物件中取得要前往的 pathname
    const currentPath = location.pathname;
    const modalState:InitialStateType = yield select((state: RootState) => state.model);

    // 點擊瀏覽器的上一頁
    if (action.payload.action === "POP") {
        console.log('routerOnLocationChangedSaga', action);
        if (prevPathname === PagePathEnum.RepaymentPage
            || prevPathname === PagePathEnum.PersonalInfoPage
            || prevPathname === PagePathEnum.IndexPage) {
            yield put(push(`${PagePathEnum.IndexPage}?token=${getToken()}`));
        }

        // NOTE : RepaymentDetailPage route 控制
        if (currentPath === PagePathEnum.RepaymentDetailPage || currentPath === '/v2/repayment-detail/repayment-modal') {
            // 預約單 modal
            if (modalState.reservationProductsModal.show) {
                yield put(modalSlice.actions.updateReservationProductsModal({
                    ...modalState.reservationProductsModal,
                    show: false
                }));
            } else {
                // 還款 modal
                if (prevPathname === '/v2/repayment-detail/repayment-modal') {
                    yield put(push(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`));
                } else {
                    yield put(push(`${PagePathEnum.RepaymentPage}?token=${getToken()}`));
                }
            }
        }
    }
    
    // 更新 prevPathname，以便下一次比較
    prevPathname = currentPath;

}