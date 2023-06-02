import { useLocation, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../reduxStore';
import { Button } from '../../components/layouts/Button';
import CouponImageSource from '../../../../assets/coupon.png';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { SystemCaseActions } from '../../../usecaseFlow/type/systemUsecaseSaga/systemCaseActions';

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
                'FORWARD_COUPON_PAGE': `${PagePathEnum.MyCouponListPage}?token=${getToken()}`,
                'FORWARD_CUSTOMER_SERVICE': `${PagePathEnum.CustomerServicePage}?token=${getToken()}`,
                'FORWARD_LOAN_RECORD': `${PagePathEnum.RepaymentPage}?token=${getToken()}`,
            }[systemCouponModal?.action];

            navigate(nextUrl as string);
        }
    }
    return (
        <div className={'system-coupon-modal fixed top-0 bottom-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-80 p-5'}>
            <div className={'modal-inner w-11/12 rounded-lg bg-white px-8 py-6 text-center'}>
                <div className={'flex flex-col items-center font-bold'}>
                    <div>{systemCouponModal.title}</div>
                </div>
                <div className={'my-5 flex flex-col text-sm'}>
                    {systemCouponModal.webUrl !== '' ?
                        (isForwardBrowser ? <div>{systemCouponModal.text}</div> : <img src={CouponImageSource} alt="Coupon" />) :
                        (<div>{systemCouponModal.text}</div>)
                    }
                </div>
                <div className='flex'>
                    <Button className='mr-1' text={'Cancel'} type={'ghost'} onClick={handleCancel} />
                    <Button className='ml-1' text={'Next'} onClick={handleOnClick} />
                </div>
            </div>
        </div>
    );
};

export default SystemCouponModal;
