import { useNavigate, useLocation } from "react-router";
import { Overlay } from "@frontend/mobile/shared/ui";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/all";
import Coupon from "../../components/Coupon";
import { useEffect, useState } from "react";
import { ICouponProps } from '../../components/Coupon';
import { useLazyGetCouponApplicableListQuery } from "../../../api/rtk";
import { Navigation } from "../../components/layouts/Navigation";
import NoData from './NoData.svg';
import { Button } from "../../components/layouts/Button";

type ICouponOption = ICouponProps & {
    isChecked: boolean;
    index: number;
}
const RepamentCouponModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [triggerGetList, { currentData=[], isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetCouponApplicableListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    useEffect(() => {
        triggerGetList({ isFullRepay: true, orderNo: 'no-22066223416957878', paymentAmount: 0, paymentMethod: 'BANK_ACCOUNT' });
    }, [])

    const [checkedCoupon, setCheckedCoupon] = useState(0);
    const CouponOption = (props: ICouponOption) => {
        return (
            <div className={`flex justfy-center items-center`} onClick={() => setCheckedCoupon(props.index)}>
                <Coupon {...props} />
                {props.isChecked ? <MdRadioButtonChecked className={`fill-sky-500`} /> : <MdRadioButtonUnchecked className={`fill-sky-500`} />}
            </div>
        );
    };

    const applicableCouponList = currentData.length > 0 ? currentData?.filter(i => i.applicable === true) : [];
    const unApplicableCouponList = currentData.length > 0 ? currentData?.filter(i => i.applicable === false) : [];


    const renderNoCoupon = () => {
        return (
            <>
                <div className={`grow flex flex-col justify-center items-center`}>
                    <img src={NoData} alt="" />
                    <div className={`mt-5`}>There are currently no coupon</div>
                </div>
                <div className="p-2">
                    <Button text={'Back'} className="bg-primary-main w-full" onClick={()=> navigate(-1)}/>
                </div>
            </>
        )
    }

    const renderCouponList = () => {
        return (
            <>
                <div className={`grow`}>
                    {applicableCouponList.length > 0 &&
                        (<>
                            <div className="text-sm font-bold text-left ml-2 ">Choose one coupon</div>
                            {
                                applicableCouponList?.map((i, index) => {
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
                                        />)
                                })
                            }
                            <div className="m-2 mb-3 bg-slate-100 h-3"></div>
                        </>)
                    }
                    {
                        unApplicableCouponList.length > 0 && (
                            <>
                                <div className="text-sm font-bold text-left ml-2 ">Not applicable to usage conditions</div>
                                {
                                    unApplicableCouponList.map((i, index) => (<Coupon
                                        expireTime={i.expireTime}
                                        discountAmount={i.discountAmount}
                                        couponType={i.couponType}
                                        couponName={i.couponName}
                                        couponContent={i.couponContent}
                                        status="unUsable"
                                    />))
                                }
                            </>
                        )
                    }
                </div>
                <div className="p-2">
                    <Button text={'Confirm'} className="bg-primary-main w-full" />
                </div>
            </>
        )
    }
    return (
        <Overlay
            show={true}
            enableClose={false}
            onCancel={() => navigate(-1)}
            content={(hide: () => void) => {
                return (
                    <div className={`flex flex-col h-[85vh]`}>
                        <div className={`ml-[-8px] `}><Navigation title={""} back={() => { navigate(-1) }} /></div>
                        {currentData?.length === 0 ? renderNoCoupon() : renderCouponList()}
                    </div>
                )
            }}
        />

    )
}

export default RepamentCouponModal;
