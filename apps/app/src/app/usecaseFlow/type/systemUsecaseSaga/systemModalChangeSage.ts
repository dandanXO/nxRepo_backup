import { push, back } from "@lagunovsky/redux-react-router";
import { put, select } from "redux-saga/effects";

import { RootState } from '../../../reduxStore';

export function* systemModalChangeSaga(action: any) {
    console.log('systemModalChangeSage', action);

    //NOTE: Modal開合不更新route
    if (!action.payload.routeControl && action.payload.routeControl !== undefined) { 
        return 
    }else {
        const navigator: RootState['navigator'] = yield select((state: RootState) => state.navigator);
        const currentPath = navigator.location.pathname + navigator.location.search
        const modalType = action.type.replace('model/update', '');

        if (action.payload.show) {
            yield put(push(`${currentPath}#${modalType}`));

        } else {
            if (navigator.action !== 'POP') {
                yield put(back());
            }
        }
    }

}
