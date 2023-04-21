import cx from "classnames";
import moment from "moment";
import { GetCouponApplicableList } from "../../../api/userService/GetCouponApplicableListResponse";
import {environment} from "../../../../environments/environment";

export type ICouponProps = GetCouponApplicableList & {
    layoutType?: number;
    status?: string;
    onClick?: () => void;
}


const isOverdueEqual3Days = (expiredTime: string) => {
    const currentTime = moment()
    const expireTime = moment(expiredTime);
    const overdueDay = expireTime.diff(currentTime, "days");
    return overdueDay <= 3
}

const Coupon = (props: ICouponProps) => {
    const { layoutType = 2, status = 'normal',couponType='', couponName = '', couponContent = '', discountAmount = '', expireTime = '' } = props;
    const layoutTypeStyle: any = {
        1: {
            normal: {
                font: ``,
                darkContent: ``,
                lightContent: ``,
                buttonBG: ``,
            },
            unUsable: {
                font: ``,
                darkContent: ``,
                lightContent: ``,
                buttonBG: ``,
            },
            disabled: {
                font: ``,
                darkContent: ``,
                lightContent: ``,
                buttonBG: ``,
            },
        },
        2: {
            normal: {
                font: `text-[#138641]`,
                darkContent: 'border-[#138641] bg-[#B2E4C6]',
                lightContent: 'border-[#138641] bg-[#F4FEF8]',
                buttonBG: 'bg-[#138641]'
            },
            unUsable: {
                font: `text-[#138641]`,
                darkContent: 'border-[#138641] bg-[#B2E4C6]',
                lightContent: 'border-[#138641] bg-[#F4FEF8]',
                buttonBG: 'bg-[#138641]'
            },
            disabled: {
                font: `text-[#C2C2C2]`,
                darkContent: 'border-[#C2C2C2] bg-[#DFDFDF]',
                lightContent: 'border-[#C2C2C2] bg-[#F9F9F9]',
                buttonBG: 'bg-[#C2C2C2]'
            },
        }
    }[layoutType]
    cx.bind(layoutTypeStyle);

    const typeStyle = layoutTypeStyle[status];
    return <div className={cx(`flex m-2 grow`, {
        'opacity-50': status === 'unUsable'
    })}>
        <div className={cx(`flex flex-col p-2 text-left  border border-solid border-r-0 grow`, {
            'rounded-l-lg': layoutType === 2,
        }, [typeStyle.lightContent]
        )}>
            <div className={cx(`font-bold texxt-xs`, [typeStyle.font])}>{couponType}</div>
            <div className={`font-bold text-sm leading-none`}>{couponName}</div>
            <div className={`text-sm leading-none mt-2 mb-3`}>{couponContent}</div>
            <div className={cx(`text-xs leading-none`, {
                'text-red-500': isOverdueEqual3Days(expireTime)
            })}>Expired time {moment(expireTime).format("DD-MM-YYYY")}</div>
        </div>
        <div className={cx(`flex flex-col border border-solid justify-center p-2 `, {
            'rounded-r-lg': layoutType === 2
        }, [typeStyle.darkContent])}
        >
            <div className={`font-bold`}>{discountAmount} {environment.currency}</div>
            <button onClick={props.onClick} disabled={status !== 'normal'}
                className={cx(`text-xs whitespace-nowrap px-2 py-1`, {
                    'rounded-md': layoutType === 2,
                    'text-white': layoutType === 2,
                }, [typeStyle.buttonBG])}>USE NOW</button>
        </div>
    </div>
}

export default Coupon;