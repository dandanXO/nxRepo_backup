import { Service } from '../../../api';
import { all, call, fork, put, select, take } from 'redux-saga/effects';
import { GetNotificationResponse } from '../../../api/indexService/GetNotificationResponse';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';
import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';


const obj = [
    // {
    //     "title": "00000",
    //     "text": "00000",
    //     "webUrl": "https://blog.csdn.net/qq_39453402/article/details/120303244",
    //     "action": "FORWARD_BROWSER"
    // },
    {
        "title": "1111",
        "text": "1111",
        "webUrl": "https://blog.csdn.net/qq_39453402/article/details/120303244",
        "action": "FORWARD_COUPON_PAGE"
    },
    {
        "title": "2222",
        "text": "22222",
        "webUrl": "",
        "action": "FORWARD_CUSTOMER_SERVICE"
    },
    {
        "title": "33333",
        "text": "333333",
        "webUrl": "",
        "action": "FORWARD_LOAN_RECORD"
    }
]
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
    // console.log('systemFetchCouponSaga--------------', lastestNotificationRespons);
    const notifications = [...oldNotifications, ...lastestNotificationRespons]
    console.log('notifications--------------', oldNotifications, lastestNotificationRespons)
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
        console.log('notifications--------------shift', removeFirstNotifications)
        yield put(indexPageSlice.actions.updateNotification(removeFirstNotifications));
    }

}
