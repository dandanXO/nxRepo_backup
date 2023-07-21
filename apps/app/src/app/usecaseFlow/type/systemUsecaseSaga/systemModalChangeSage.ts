import { push } from "@lagunovsky/redux-react-router";
import { put, select } from "redux-saga/effects";

import { RootState } from '../../../reduxStore';

export function* systemModalChangeSaga(action: any) {
    console.log('systemModalChangeSage', action);

    const navigator: RootState['navigator'] = yield select((state: RootState) => state.navigator);
    const currentPath = navigator.location.pathname + navigator.location.search
    const modalType = action.type.replace('model/update', '')
    if (action.payload.show) {
        yield put(push(`${currentPath}#${modalType}`));
    } else {
        yield put(push(`${currentPath}`));
    }

    // if(action.payload.action=== "POP"){
    //     yield put(
    //         modalSlice.actions[`update${'StarRatingModal'}`]({
    //             show:false
    //           })
    //       )
    //   }

}

