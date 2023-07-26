import { LocationChangeAction, push, back } from '@lagunovsky/redux-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PagePathEnum } from '../../presentation/pages/PagePathEnum';
import { getToken } from '../../modules/querystring/getToken';
import { InitialStateType, modalSlice } from '../../reduxStore/modalSlice';
import { RootState } from '../../reduxStore';

// 目前的pathname
let prevPathname = '';
let prevHash = ''

export function* routerOnLocationChangedSaga(action: LocationChangeAction) {
    console.log('Action', action);

    const { payload: { location } } = action;

    // 從 location 物件中取得要前往的 pathname
    const currentPath = location.pathname;
    const currentHash = location.hash;


    // 點擊瀏覽器的上一頁    
    if (action.payload.action === "POP") {
        console.log('prevPathname', prevPathname)
        console.log('currentPath', currentPath)
        console.log('currentHash', currentHash)
        console.log('prevHash', prevHash)
        if (prevHash === '') {
            if (prevPathname === PagePathEnum.RepaymentPage
                || prevPathname === PagePathEnum.PersonalInfoPage
                || prevPathname === PagePathEnum.IndexPage) {
                yield put(push(`${PagePathEnum.IndexPage}?token=${getToken()}`));
            }
        } else {
            const modalName = prevHash.replace('#', '');
            const modalState: InitialStateType = yield select((state: RootState) => state.model);
            const prevModalState = Object.entries(modalState).filter(i => i[0].toLowerCase() === modalName.toLowerCase())[0]

            if (prevModalState[1].show) {
                yield put(
                    (modalSlice.actions as any)[`update${modalName}`]({
                        ...prevModalState[1],
                        show: false
                    })
                )
            }
        }
    }

    // 更新 prevPathname & prevHash，以便下一次比較
    prevPathname = currentPath;
    prevHash = currentHash

}