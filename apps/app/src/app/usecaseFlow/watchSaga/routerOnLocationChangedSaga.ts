import { LocationChangeAction, push } from '@lagunovsky/redux-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { PagePathEnum } from '../../presentation/pages/PagePathEnum';
import { getToken } from '../../modules/querystring/getToken';

// 目前的pathname
let prevPathname = ''

export function* routerOnLocationChangedSaga(action: LocationChangeAction) {
    console.log('Action', action);

    const { payload: { location } } = action;

    // 從 location 物件中取得要前往的 pathname
    const currentPath = location.pathname;

    // 點擊瀏覽器的上一頁
    if (action.payload.action === "POP") {
        if (prevPathname === PagePathEnum.RepaymentPage
            || prevPathname === PagePathEnum.PersonalInfoPage
            || prevPathname === PagePathEnum.IndexPage) {
            yield put(push(`${PagePathEnum.IndexPage}?token=${getToken()}`));
        }
    }
    
    // 更新 prevPathname，以便下一次比較
    prevPathname = currentPath;

}