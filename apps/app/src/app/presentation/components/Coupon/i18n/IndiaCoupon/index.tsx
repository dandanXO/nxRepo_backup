import cx from 'classnames';
import moment from 'moment';

import { ICouponProps } from '../..';
import Money from '../../../Money.tsx';

const isOverdueEqual3Days = (expiredTime: string) => {
  const currentTime = moment();
  const expireTime = moment(expiredTime);
  const overdueDay = expireTime.diff(currentTime, 'days');
  return overdueDay <= 3;
};

const IndiaCoupon = (props: ICouponProps) => {
  const {
    status = 'normal',
    couponType = '',
    couponName = '',
    couponContent = '',
    discountAmount = '',
    expireTime = '',
    buttonText = 'USE NOW',
  } = props;
  const layoutTypeStyle: any = {
    normal: {
      font: `text-ctext-primary`,
      darkContent: 'border-primary-main bg-primary-assistant',
      lightContent: 'border-primary-main bg-primary-assistant',
      buttonBG: 'bg-primary-main',
    },
    disabled: {
      font: `text-cstate-disable-main`,
      darkContent: 'border-cstate-disable-main bg-cstate-disable-assistant',
      lightContent: 'border-cstate-disable-main bg-cstate-disable-assistant',
      buttonBG: 'bg-cstate-disable-main',
    },
  };

  const typeStyle = status !== 'disabled' ? layoutTypeStyle['normal'] : layoutTypeStyle['disabled'];

  return (
    <div className={cx(`m-2 flex grow  `, { 'opacity-50': status === 'unUsable' })}>
      <div
        className={cx(`relative flex grow flex-col  rounded-l-lg  border border-r-0 p-2 text-left `, [
          typeStyle.lightContent,
        ])}
      >
        <div
          className={cx(
            'absolute top-[-1px] right-[-11px] h-[10px]  w-[20px] rounded-b-full border  border-t-0 border-solid bg-white ',
            {
              'border-primary-main': status !== 'disabled',
              'border-cstate-disable-main': status === 'disabled',
            }
          )}
        ></div>
        <div
          className={cx(
            'border-primary-main absolute bottom-[-1px] right-[-11px] h-[10px] w-[20px] rounded-t-full border border-b-0 border-solid bg-white',
            {
              'border-primary-main': status !== 'disabled',
              'border-cstate-disable-main': status === 'disabled',
            }
          )}
        ></div>

        <div
          className={cx(`font-bold`, 'text-xs', {
            'text-primary-variant': status !== 'disabled',
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
          {couponType}
        </div>
        <div className={cx(`text-sm font-bold`, [typeStyle.font])}>{couponName}</div>
        <div className={cx(`mb-1.5 text-xs`, [typeStyle.font])}>{couponContent}</div>
        <div
          className={cx('flex text-xs', {
            'text-cstate-error-main': status !== 'disabled' && isOverdueEqual3Days(expireTime),
            'text-ctext-secondary': status !== 'disabled' && !isOverdueEqual3Days(expireTime),
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
          Expired time {moment(expireTime).format('DD-MM-YYYY')}
        </div>
      </div>
      <div
        className={cx('w-[1px] overflow-hidden border-0 border  border-l-[1px] border-solid border-dashed', {
          'border-primary-main': status !== 'disabled',
          'border-cstate-disable-main': status === 'disabled',
        })}
      ></div>
      <div
        className={cx(`flex grow basis-16 flex-col items-center justify-center rounded-r-lg border border-l-0 p-2`, [
          typeStyle.darkContent,
        ])}
      >
        <div
          className={cx(`mb-1.5 text-base font-bold `, {
            'text-primary-main': status !== 'disabled',
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
          <Money money={discountAmount} isNagetive={true} moneyStyle={`text-lg`} currencyStyle={`text-xs`} />
        </div>
        <button
          // NOTE:優惠券不需點擊 (點擊功能先做保留)
          //   onClick={props.onClick}
          //   disabled={status !== 'normal'} //只有normal才能點擊
          disabled={true}
          className={cx(`whitespace-nowrap rounded px-2 py-1 text-xs text-white `, [typeStyle.buttonBG])}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default IndiaCoupon;
