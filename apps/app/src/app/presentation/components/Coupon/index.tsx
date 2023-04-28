import cx from "classnames";
import moment from "moment";
import { GetCouponApplicableList } from "../../../api/userService/GetCouponApplicableListResponse";
import Money from "../Money.tsx";

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
                font: `text-primary-main`,
                darkContent: 'border-primary-main bg-primary-main',
                lightContent: 'border-primary-main bg-primary-assistant',
                buttonBG: 'bg-primary-variant'
            },
            unUsable: {
                font: `text-primary-main`,
                darkContent: 'border-primary-main bg-primary-main',
                lightContent: 'border-primary-main bg-primary-assistant',
                buttonBG: 'bg-primary-variant'
            },
            disabled: {
                font: `text-disabled-main`,
                darkContent: 'border-disabled-main bg-[#DFDFDF]',
                lightContent: 'border-disabled-main bg-[#F9F9F9]',
                buttonBG: 'bg-disabled-main'
            },
        },
        2: {
            normal: {
                font: 'text-primary-main',
                darkContent: 'border-primary-main bg-[#B2E4C6]',
                lightContent: 'border-primary-main bg-[#F4FEF8]',
                buttonBG: 'bg-primary-main'

            },
            unUsable: {
                font: 'text-primary-main',
                darkContent: 'border-primary-main bg-[#B2E4C6]',
                lightContent: 'border-primary-main bg-[#F4FEF8]',
                buttonBG: 'bg-primary-main'
            },
            disabled: {
                font: `text-disabled-main`,
                darkContent: 'border-disabled-main bg-[#DFDFDF]',
                lightContent: 'border-disabled-main bg-[#F9F9F9]',
                buttonBG: 'bg-disabled-main'
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
            <div className={cx(`font-bold`,'text-xs', [typeStyle.font])}>{couponType}</div>
            <div className={`font-bold text-sm text-black`}>{couponName}</div>
            <div className={`text-xs mb-1.5`}>{couponContent}</div>
            <div className={cx('text-xs flex', {
                'text-red-500': isOverdueEqual3Days(expireTime)
            })}>Expired time {moment(expireTime).format("DD-MM-YYYY")}</div>
        </div>
        <div className={cx(`flex flex-col border border-solid justify-center p-2 basis-16 grow`, {
            'rounded-r-lg': layoutType === 2
        }, [typeStyle.darkContent])}
        >
            <div className={cx(`font-bold mb-1.5 text-base `, {
                [typeStyle.font]: status !== 'disabled',
                "text-disabled-main": status === 'disabled',
            })}>
                <Money money={discountAmount} isNagetive={true} moneyStyle={'text-lg'} currencyStyle={`text-xs`} />
            </div>
            <button onClick={props.onClick} disabled={status !== 'normal'} //只有normal才能點擊
                className={cx(`text-xs whitespace-nowrap px-2 py-1`, {
                    'rounded': layoutType === 2,
                    'text-white': layoutType === 2,
                }, [typeStyle.buttonBG])}>USE NOW</button>
        </div>
    </div>
}

export default Coupon;