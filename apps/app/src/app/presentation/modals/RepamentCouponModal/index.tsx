import { useNavigate, useLocation } from "react-router";
import Button from "../../components/Button";
import {  Overlay,
} from "@frontend/mobile/shared/ui";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/all";
import Coupon from "../../components/Coupon";
import { useEffect, useState } from "react";
import { ICouponProps } from '../../components/Coupon';
import { useLazyGetCouponApplicableListQuery } from "../../../api/rtk";
type ICouponOption = ICouponProps & {
    isChecked: boolean;
    index: number;
}
const RepamentCouponModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetCouponApplicableListQuery({
    //     pollingInterval: 0,
    //     refetchOnFocus: false,
    //     refetchOnReconnect: false
    // });
    // useEffect(() => {
    //     triggerGetList({ isFullRepay: true, orderNo:'no-20136519450815031',paymentAmount:0,paymentMethod:'BANK_ACCOUNT'});
    // }, [])
    const [checkedCoupon, setCheckedCoupon] = useState(0);
    const CouponOption = (props: ICouponOption) => {
        return (
            <div className={`flex justfy-center items-center`} onClick={() => setCheckedCoupon(props.index)}>
                <Coupon expiredTime={props.expiredTime} discountAmount={props.discountAmount} />
                {props.isChecked ? <MdRadioButtonChecked className={`fill-sky-500`} /> : <MdRadioButtonUnchecked className={`fill-sky-500`} />}
            </div>
        );
    };

    const data = [
        { discountAmount: -500, expiredTime: '17-03-2023 23:59', couponId: 1 },
        { discountAmount: -600, expiredTime: '17-03-2023 23:59', couponId: 2 },
        { discountAmount: -700, expiredTime: '17-03-2023 23:59', couponId: 3 }
    ]

    return (
        <Overlay
            show={true}
            enableClose={false}
            onCancel={() => navigate(-1)}
            content={(hide: () => void) => {
                return (
                    <div className={``}>
                        <div className="text-sm font-bold text-left ml-2">Choose one coupon</div>
                        {
                            data.map((i, index) => <CouponOption
                                expiredTime={i.expiredTime}
                                discountAmount={i.discountAmount}
                                isChecked={index === checkedCoupon}
                                index={index}
                            />
                            )
                        }
                        <div className="m-2 bg-slate-100 h-3"></div>
                        <div className="text-sm font-bold text-left ml-2">Not applicable to usage conditions</div>
                        {
                            data.map((i, index) => <Coupon
                                expiredTime={i.expiredTime}
                                discountAmount={i.discountAmount}
                                status="unUsable"
                            />
                            )
                        }
                        <div className="p-2">
                            <Button buttonText={'Confirm'} backgroundColor="bg-[#0C6D33]" width="w-full"/>
                        </div>
                    </div>
                )
            }}
        />

    )
}

export default RepamentCouponModal;
