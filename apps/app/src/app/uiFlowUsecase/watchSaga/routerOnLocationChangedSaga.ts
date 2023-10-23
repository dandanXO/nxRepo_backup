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
  console.log('Action', action);
  const { payload: { location } } = action;
  const rootState: RootState = yield select((state: RootState) => state);
  const currentPath = location.pathname;
  yield true
  console.log('currentPath',prevPathname,currentPath)
  if (environment.country === IndiaCountry.country) {


    if (action.payload.action === 'POP') {
      // if (
      //   (prevPathname === PageOrModalPathEnum.RepaymentPage ||
      //   prevPathname === PageOrModalPathEnum.PersonalInfoPage ||
      //   prevPathname === PageOrModalPathEnum.IndexPage) && (prevPathname!==currentPath)
      // ) {
      //   yield put(push(`${PageOrModalPathEnum.IndexPage}?token=${getToken()}`));

      //   if (prevPathname === PageOrModalPathEnum.IndexPage) {
      //     if (
      //       GlobalAppMode.mode === 'SimpleWebView' ||
      //       GlobalAppMode.mode === 'IndexWebview'
      //     ) {
      //       yield put(
      //         modalSlice.actions.updateExitConfirmModal({
      //           show: true,
      //         })
      //       );
      //     } else if (GlobalAppMode.mode === 'PureH5') {
      //       // NOTE: nothing to do, stay in IndexPage
      //     }
      //   }
      // }
      // 預約單 modal
      if (rootState.model.reservationProductsModal.show) {
        yield put(
          modalSlice.actions.updateReservationProductsModal({
            ...rootState.model.reservationProductsModal,
            show: false,
          })
        );
        console.log('prevLocation', prevLocation)
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

      prevPathname = currentPath;
      prevLocation = location;
    }


    if (action.payload.action === "REPLACE") {
      if (location.pathname !== '/v2/uploaded-payment-receipt' &&
        !rootState.model.reservationProductsModal.show &&
        !rootState.model.starRatingModal.show &&
        !rootState.model.starRatingSuccessModal.show) {
        yield put(goStraight(-1))
      }

    }


  } else {
    // 從 location 物件中取得要前往的 pathname
    const rootState: RootState = yield select((state: RootState) => state);

    // 點擊瀏覽器的上一頁
    if (action.payload.action === 'POP') {
      // console.log('prevPathname', prevPathname)
      // console.log('currentPath', currentPath)
      // console.log('routerOnLocationChangedSaga', action);

      if (
        prevPathname === PageOrModalPathEnum.RepaymentPage ||
        prevPathname === PageOrModalPathEnum.PersonalInfoPage ||
        prevPathname === PageOrModalPathEnum.IndexPage
      ) {
        yield put(push(`${PageOrModalPathEnum.IndexPage}?token=${getToken()}`));

        if (prevPathname === PageOrModalPathEnum.IndexPage) {
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
        }
      } else {
        // NOTE : RepaymentDetailPage route 控制
        if (
          prevPathname === PageOrModalPathEnum.RepaymentDetailPage ||
          currentPath === PageOrModalPathEnum.RepaymentDetailPage ||
          (currentPath.includes(PageOrModalPathEnum.RepaymentDetailPage) &&
            currentPath.length > PageOrModalPathEnum.RepaymentDetailPage.length)
        ) {
          // 預約單 modal
          if (rootState.model.reservationProductsModal.show) {
            yield put(
              modalSlice.actions.updateReservationProductsModal({
                ...rootState.model.reservationProductsModal,
                show: false,
              })
            );
          }

          // RepaymentDetailPage 所有的彈窗
          if (prevPathname === '/v2/repayment-detail/repayment-coupon-modal') {
            if (currentPath !== '/v2/repayment-detail/repayment-modal') {
              yield put(go(-1));
            }
          } else {
            if (
              prevPathname.length > PageOrModalPathEnum.RepaymentDetailPage.length
            ) {
              yield put(
                push(
                  `${PageOrModalPathEnum.RepaymentDetailPage
                  }?token=${getToken()}&orderNo=${getOrderNo()}`
                )
              );
            }

            if (!isSimpleWebView()) {
              if (prevPathname === PageOrModalPathEnum.RepaymentDetailPage) {
                yield put(
                  push(`${PageOrModalPathEnum.RepaymentPage}?token=${getToken()}`)
                );
              }
            }
          }
        }

        // NOTE : 上傳還款證明單成功 route 控制
        if (
          (prevPathname === '/v2/uploaded-payment-receipt' ||
            prevPathname === '/v2/upload-payment-receipt' ||
            currentPath === '/v2/upload-payment-receipt') &&
          prevPathname !== PageOrModalPathEnum.RepaymentDetailPage
        ) {
          yield put(
            push(
              `${PageOrModalPathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${getOrderNo()}`
            )
          );
        }
      }
    }
    if (
      action.payload.action === 'PUSH' &&
      (prevPathname === PageOrModalPathEnum.RepaymentDetailPage ||
        currentPath === PageOrModalPathEnum.RepaymentDetailPage)
    ) {
      prevPathname = currentPath;
    } else {
      prevPathname = currentPath;
    }
    
  }
 

}
