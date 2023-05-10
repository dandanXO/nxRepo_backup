import cx from 'classnames';
import moment from 'moment';
import { GetCouponApplicableList } from '../../../api/userService/GetCouponApplicableListResponse';
import Money from '../Money.tsx';

export type ICouponProps = GetCouponApplicableList & {
  layoutType?: number;
  status?: string;
  onClick?: () => void;
  buttonText?: string;
};

const isOverdueEqual3Days = (expiredTime: string) => {
  const currentTime = moment();
  const expireTime = moment(expiredTime);
  const overdueDay = expireTime.diff(currentTime, 'days');
  return overdueDay <= 3;
};

const Coupon = (props: ICouponProps) => {
  const {
    layoutType = 2,
    status = 'normal',
    couponType = '',
    couponName = '',
    couponContent = '',
    discountAmount = '',
    expireTime = '',
    buttonText = 'USE NOW'
    
  } = props;
  const layoutTypeStyle: any = {
    // type 1 for india , type 2 for pakistan
    1: {
      normal: {
        font: `text-ctext-primary`,
        darkContent: 'border-primary-main bg-primary-assistant',
        lightContent: 'border-primary-main bg-primary-assistant',
        buttonBG: 'bg-primary-main',
      },
      disabled: {
        font: `text-cstate-disable-main`,
        darkContent: 'border-cstate-disable-main bg-[#ECECEC]',
        lightContent: 'border-cstate-disable-main bg-[#ECECEC]',
        buttonBG: 'bg-cstate-disable-main',
      },
    },
    2: {
      normal: {
        font: 'text-ctext-primary',
        darkContent: 'border-primary-main bg-[#B2E4C6]',
        lightContent: 'border-primary-main bg-primary-assistant',
        buttonBG: 'bg-primary-main',
      },
      disabled: {
        font: `text-cstate-disable-main`,
        darkContent: 'border-cstate-disable-main bg-[#DFDFDF]',
        lightContent: 'border-cstate-disable-main bg-[#F9F9F9]',
        buttonBG: 'bg-cstate-disable-main',
      },
    },
  }[layoutType];
  cx.bind(layoutTypeStyle);

  const typeStyle = status !== 'disabled' ? layoutTypeStyle['normal'] : layoutTypeStyle['disabled'];

  return (
    <div
      className={cx(`flex m-2 grow  `, { 'opacity-50': status === 'unUsable' })}
    >
      <div
        className={cx(
          `flex flex-col p-2 text-left  border  border-r-0 grow rounded-l-lg relative `,
          [typeStyle.lightContent]
        )}
      >
        {layoutType === 1 && (
          <div
            className={cx(
              'absolute w-[20px] h-[10px] rounded-b-full  border border-solid top-[-1px]  right-[-11px] bg-white border-t-0 ',
              {
                'border-primary-main': status !== 'disabled',
                'border-cstate-disable-main': status === 'disabled',
              }
            )}
          ></div>
        )}
        {layoutType === 1 && (
          <div
            className={cx(
              'absolute w-[20px] h-[10px] rounded-t-full border border-solid border-primary-main bottom-[-1px] right-[-11px] bg-white border-b-0',
              {
                'border-primary-main': status !== 'disabled',
                'border-cstate-disable-main': status === 'disabled',
              }
            )}
          ></div>
        )}

        <div
          className={cx(`font-bold`, 'text-xs', {
            'text-primary-variant': status !== 'disabled',
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
          {couponType}
        </div>
        <div className={cx(`font-bold text-sm`, [typeStyle.font])}>
          {couponName}
        </div>
        <div className={cx(`text-xs mb-1.5`, [typeStyle.font])}>
          {couponContent}
        </div>
        <div
          className={cx('text-xs flex', {
            'text-cstate-error-main':
              status !== 'disabled' && isOverdueEqual3Days(expireTime),
            'text-ctext-secondary':
              status !== 'disabled' && !isOverdueEqual3Days(expireTime),
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
          Expired time {moment(expireTime).format('DD-MM-YYYY')}
        </div>
      </div>
      {layoutType === 1 && (
        <div
          className={cx(
            'w-[1px] border-l-[1px] border-0 border-dashed  border-solid border overflow-hidden',
            {
              'border-primary-main': status !== 'disabled',
              'border-cstate-disable-main': status === 'disabled',
            }
          )}
        ></div>
      )}
      <div
        className={cx(
          `flex flex-col justify-center p-2 basis-16 grow rounded-r-lg border border-l-0 items-center`,
          [typeStyle.darkContent]
        )}
      >
        <div className={cx(`font-bold mb-1.5 text-base `,{
            'text-primary-main': status !== 'disabled',
            'text-cstate-disable-main': status === 'disabled',
        })}>
          <Money
            money={discountAmount}
            isNagetive={true}
            moneyStyle={`text-lg`}
            currencyStyle={`text-xs`}
          />
        </div>
        <button
        // NOTE:優惠券不需點擊 (點擊功能先做保留)
        //   onClick={props.onClick}
        //   disabled={status !== 'normal'} //只有normal才能點擊
          disabled={true}
          className={cx(
            `text-xs whitespace-nowrap px-2 py-1 rounded text-white w-2/3`,
            [typeStyle.buttonBG]
          )}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Coupon;
