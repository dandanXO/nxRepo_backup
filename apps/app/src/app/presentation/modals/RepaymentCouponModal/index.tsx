import { MdRadioButtonChecked } from '@react-icons/all-files/md/MdRadioButtonChecked';
import { MdRadioButtonUnchecked } from '@react-icons/all-files/md/MdRadioButtonUnchecked';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import NoDataImage from '../../../../assets/NoData.svg';
import { useLazyGetCouponApplicableListQuery } from '../../../api/rtk';
import { getToken } from '../../../modules/querystring/getToken';
import Coupon, { ICouponProps } from '../../components/Coupon';
import { Button } from '../../components/layouts/Button';
import { Navigation } from '../../components/layouts/Navigation';
import { PagePathEnum } from '../../pages/PagePathEnum';
import Modal from '../../components/Modal';
import { loadingSlice } from '../../../reduxStore/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { environment } from '../../../../environments/environmentModule/environment';
import { PakistanCountry } from 'libs/shared/domain/src/country/PakistanCountry';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { RootState } from '../../../reduxStore';
import { repaymentDetailPageSlice } from '../../../reduxStore/repaymentDetailPageSlice';

type ICouponOption = ICouponProps & {
    isChecked: boolean;
    index: number;
};
const RepaymentCouponModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const repaymentDetailPageState = useSelector((state: RootState) => state.repaymentDetailPage);
    
    const {  orderNo = getOrderNo() , balance } = repaymentDetailPageState.repaymentDetail || {};
    const {  payType ='MOBILE_WALLET'} =  repaymentDetailPageState.repaymentData|| {};
    const {  paymentAmount, paymentMethod } = location.state || {};
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] =
        useLazyGetCouponApplicableListQuery({
            pollingInterval: 0,
            refetchOnFocus: false,
            refetchOnReconnect: false,
        });

    useEffect(() => {
        triggerGetList({
            isFullRepay: true,
            orderNo,
            paymentAmount: Number(balance || paymentAmount) ,
            paymentMethod: payType!== undefined && payType === "BANK_ACCOUNT" ? "BANK_ACCOUNT" : "MOBILE_WALLET" || paymentMethod,
        });
    }, []);

    useEffect(() => {
        dispatch(loadingSlice.actions.updatePageLoading(isFetching))
    }, [isFetching]);

    const applicableCouponList = currentData && currentData.length > 0 ? currentData?.filter((i) => i.applicable === true) : [];
    const unApplicableCouponList = currentData && currentData.length > 0 ? currentData?.filter((i) => i.applicable === false) : [];
    const [checkedCoupon, setCheckedCoupon] = useState(-1);

    const CouponOption = (props: ICouponOption) => {
        return (
            <a className={`justfy-center flex items-center mx-4`} onClick={() => setCheckedCoupon(props.index)}>
                <Coupon {...props} />
                <div className='ml-2'>
                    {props.isChecked ? (
                        <MdRadioButtonChecked className={`fill-sky-500`} />
                    ) : (
                        <MdRadioButtonUnchecked className={`fill-sky-500`} />
                    )}
                </div>
            </a>
        );
    };

    const NotUsingCoupon = (props: ICouponOption) => {
        return (
            <a className={`justfy-center  mb-7 mx-4 flex items-center `} onClick={() => setCheckedCoupon(props.index)}>
                <div className="grow text-left text-xs font-bold text-ctext-primary">Not using a coupon for this repayment.</div>
                {props.isChecked ? <MdRadioButtonChecked className={`fill-sky-500`} /> : <MdRadioButtonUnchecked className={`fill-sky-500`} />}
            </a>
        );
    };

    const NoCouponSection = () => {
        return (
            <>
                <div className={`flex grow flex-col items-center justify-center`}>
                    <img src={NoDataImage} alt="" />
                    <div className={`mt-5`}>There are currently no coupon</div>
                </div>
                <div className="p-5">
                    <Button
                        text={'Back'}
                        className="w-full"
                        primaryTypeGradient={environment.country === PakistanCountry.country}
                        onClick={() => navigate(-1)}
                    />
                </div>
            </>
        );
    };

    const renderCouponList = () => {
        return (
            <>
                <div className={`grow overflow-y-auto overflow-x-hidden`}>
                    {applicableCouponList.length > 0 && (
                        <>
                            {/* 不選優惠券 checkedCoupon & index給-1 */}
                            <NotUsingCoupon index={-1} isChecked={-1 === checkedCoupon} />
                            <div className="mb-2 mx-4 text-left text-xs font-bold text-ctext-primary">Choose one coupon</div>
                            {applicableCouponList?.map((i, index) => {
                                return (
                                    <CouponOption
                                        expireTime={i.expireTime}
                                        discountAmount={i.discountAmount}
                                        isChecked={index === checkedCoupon}
                                        couponType={i.couponType}
                                        couponName={i.couponName}
                                        couponContent={i.couponContent}
                                        index={index}
                                        status="normal"
                                        key={i.id}
                                    />
                                );
                            })}
                            <div className="mb-4 mx-[-18px] h-2 bg-ctext-divider"></div>
                        </>
                    )}
                    {unApplicableCouponList.length > 0 && (
                        <>
                            <div className="mb-2 mx-4 text-left text-xs font-bold text-ctext-primary">Not applicable to usage conditions</div>
                            {unApplicableCouponList.map((i, index) => (
                                <div className='mx-4' >
                                    <Coupon
                                        expireTime={i.expireTime}
                                        discountAmount={i.discountAmount}
                                        couponType={i.couponType}
                                        couponName={i.couponName}
                                        couponContent={i.couponContent}
                                        status="unUsable"
                                        key={i.id}
                                    />
                                </div>

                            ))}
                        </>
                    )}
                </div>
                <div className="px-5 py-3">
                    <Button
                        text={'Confirm'}
                        primaryTypeGradient={environment.country===PakistanCountry.country}
                        className="w-full"
                        onClick={() =>{
                      
                            dispatch(repaymentDetailPageSlice.actions.updateRepaymentData({
                                ...repaymentDetailPageState.repaymentData,
                                coupon:applicableCouponList.length > 0 && checkedCoupon > -1 ? applicableCouponList[checkedCoupon] : null,
                            }))
                            navigate(`${PagePathEnum.RepaymentDetailPage}/repayment-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                                state: {
                                    ...location.state,
                                    coupon:
                                        applicableCouponList.length > 0 && checkedCoupon > -1 ? applicableCouponList[checkedCoupon] : null,
                                },
                            })}
                        }
                    />
                </div>
            </>
        );
    };

    return (
        <Modal className='h-full '>
            <Navigation title={''} back={() => {
                  navigate(`${PagePathEnum.RepaymentDetailPage}/repayment-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                    state: {
                        ...location.state,
                    },
                })
                }} />
            {currentData && currentData.length > 0 ? renderCouponList() : <NoCouponSection />}
        </Modal>
    )
};

export default RepaymentCouponModal;
