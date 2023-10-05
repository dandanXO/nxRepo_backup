import { Service } from '../../../externel/backend';
import { all, call, fork, put, select, take } from 'redux-saga/effects';
import { GetNotificationResponse } from '../../../externel/backend/indexService/GetNotificationResponse';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';
import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';

export function* systemFetchCouponSaga() {

    yield put(
        modalSlice.actions.updateSystemCouponModal({
            show: false,
            title: '',
            text: '',
            webUrl: '',
            action: '',
        })
    );
    const oldNotifications: GetNotificationResponse = yield select((state: RootState) => state.indexPage.notification);
    const lastestNotificationRespons: GetNotificationResponse = yield call(Service.IndexService.getNotification, null);
    const notifications = [...oldNotifications, ...lastestNotificationRespons];
    yield put(indexPageSlice.actions.updateNotification(notifications));

    if (notifications.length > 0) {
        yield put(
            modalSlice.actions.updateSystemCouponModal({
                show: true,
                title: notifications[0].title,
                text: notifications[0].text,
                webUrl: notifications[0].webUrl,
                action: notifications[0].action,
            })
        );
        const removeFirstNotifications = notifications.slice(1);
        yield put(indexPageSlice.actions.updateNotification(removeFirstNotifications));
    }

}
