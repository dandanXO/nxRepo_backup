import cx from 'classnames';
import moment from 'moment';
import Money from '../../../Money.tsx';
import { ICouponProps } from '../..';

const isOverdueEqual3Days = (expiredTime: string) => {
  const currentTime = moment();
  const expireTime = moment(expiredTime);
  const overdueDay = expireTime.diff(currentTime, 'days');
  return overdueDay <= 3;
};

const PakistanCoupon = (props: ICouponProps) => {
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
      font: 'text-ctext-primary',
      darkContent: 'border-primary-main bg-[#B2E4C6]',
      lightContent: 'border-primary-main bg-primary-assistant',
      buttonBG: 'bg-primary-main',
    },
    disabled: {
      font: `text-ctext-tertiary`,
      darkContent: 'border-[#C0C0C0] bg-cstate-disable-main',
      lightContent: 'border-[#C0C0C0] bg-cbg-secondary',
      buttonBG: 'bg-[#C0C0C0]',
    },
  };

  const typeStyle = status !== 'disabled' ? layoutTypeStyle['normal'] : layoutTypeStyle['disabled'];

  return (
    <div className={cx(`flex m-2 grow  `, { 'opacity-50': status === 'unUsable' })}>
      <div
        className={cx(`flex flex-col p-2 text-left  border  border-r-0 grow rounded-l-lg relative `, [
          typeStyle.lightContent,
        ])}
      >
        <div
          className={cx(`font-bold`, 'text-xs', {
            'text-primary-variant': status !== 'disabled',
            'text-ctext-tertiary': status === 'disabled',
          })}
        >
          {couponType}
        </div>
        <div className={cx(`font-bold text-sm`, [typeStyle.font])}>{couponName}</div>
        <div className={cx(`text-xs mb-1.5`, [typeStyle.font])}>{couponContent}</div>
        <div
          className={cx('text-xs flex', {
            'text-cstate-error-main': status !== 'disabled' && isOverdueEqual3Days(expireTime),
            'text-ctext-secondary': status !== 'disabled' && !isOverdueEqual3Days(expireTime),
            'text-ctext-tertiary': status === 'disabled',
          })}
        >
          Expired time {moment(expireTime).format('DD-MM-YYYY')}
        </div>
      </div>
      <div
        className={cx(`flex flex-col justify-center p-2 basis-16 grow rounded-r-lg border  items-center`, [
          typeStyle.darkContent,
        ])}
      >
        <div
          className={cx(`font-bold mb-1.5 text-base `, {
            'text-primary-main': status !== 'disabled',
            'text-[#C0C0C0]': status === 'disabled',
          })}
        >
          <Money money={discountAmount} isNagetive={true} moneyStyle={`text-lg`} currencyStyle={`text-xs`} />
        </div>
        <button
          // NOTE:優惠券不需點擊 (點擊功能先做保留)
          //   onClick={props.onClick}
          //   disabled={status !== 'normal'} //只有normal才能點擊
          disabled={true}
          className={cx(`text-xs whitespace-nowrap px-2 py-1 rounded text-white `, [typeStyle.buttonBG])}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PakistanCoupon;
