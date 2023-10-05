import { useLocation, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../reduxStore';
import { Button } from '../../core-components/Button';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { getToken } from '../../../persistant/getToken';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { SystemCaseActions } from '../../../uiUsecaseFlow/type/systemUsecaseSaga/systemCaseActions';
import CouponModalContentAndroidWebviewPage from '../../pages/CouponModalContentAndroidWebviewPage';

const SystemCouponModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { systemCouponModal } = useSelector((state: RootState) => state.model);

    // NOTE :
    // 1. 若webUrl為有值，顯示本地的圖片，沒有則顯示text
    // 2. action :
    //    FORWARD_BROWSER，顯示text，webUrl跳轉到外部瀏覽器
    //    FORWARD_COUPON_PAGE (導去coupon頁)
    //    FORWARD_CUSTOMER_SERVICE (導去客服頁)
    //    FORWARD_LOAN_RECORD (導去還款列表頁)
    //    MESSAGE (顯示下一則訊息)
    //    FORWARD_BIND_BANKCARD (導去綁卡頁)
    const isForwardBrowser = systemCouponModal.action === 'FORWARD_BROWSER';

    const handleCancel = () => {
        dispatch(modalSlice.actions.updateSystemCouponModal({
            show: false,
            title: '',
            text: '',
            webUrl: '',
            action: '',
        }))
    }

    const handleOnClick = () => {

        if (systemCouponModal.action === 'MESSAGE') {
            dispatch(SystemCaseActions.SystemFetchCouponSaga());
            return;
        }

        if (isForwardBrowser) {
            window.location.href = systemCouponModal.webUrl
        } else {
            const nextUrl = {
                'FORWARD_COUPON_PAGE': `${PageOrModalPathEnum.MyCouponListPage}?token=${getToken()}`,
                'FORWARD_CUSTOMER_SERVICE': `${PageOrModalPathEnum.CustomerServicePage}?token=${getToken()}`,
                'FORWARD_LOAN_RECORD': `${PageOrModalPathEnum.RepaymentPage}?token=${getToken()}`,
                'FORWARD_BIND_BANKCARD': `${PageOrModalPathEnum.BindBankcard}?token=${getToken()}`,
            }[systemCouponModal?.action];

            navigate(nextUrl as string);
        }

        handleCancel();
    }

    return (
        <div className={'system-coupon-modal fixed top-0 bottom-0 z-10 flex h-full w-screen flex-col items-center justify-center bg-black bg-opacity-80 p-5'}>
            <div className={'modal-inner w-11/12 rounded-lg bg-white px-8 py-6 text-center'}>
                <div className={'flex flex-col items-center font-bold'}>
                    <div>{systemCouponModal.title}</div>
                </div>
                <div className={'my-5 flex flex-col text-sm'}>
                    {systemCouponModal.webUrl
                        ? (isForwardBrowser ? <div>{systemCouponModal.text}</div> : <CouponModalContentAndroidWebviewPage/>)
                        : (systemCouponModal.action === 'FORWARD_BIND_BANKCARD'
                            ? <div className='text-left' dangerouslySetInnerHTML={{ __html: systemCouponModal.text.replace(/\n/g, '<br/>') }} />
                            : <div>{systemCouponModal.text}</div>
                        )
                    }
                </div>
                <div className='flex'>
                    <Button className='mr-1' text={'Cancel'} type={'ghost'} ghostTheme={'tertiary'} onClick={handleCancel} />
                    <Button className='ml-1' text={'Next'} onClick={handleOnClick} />
                </div>
            </div>
        </div>
    );
};

export default SystemCouponModal;
