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

  const typeStyle =
    status !== 'disabled'
      ? layoutTypeStyle['normal']
      : layoutTypeStyle['disabled'];

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
        <div
          className={cx(
            'absolute w-[20px] h-[10px] rounded-b-full  border border-solid top-[-1px]  right-[-11px] bg-white border-t-0 ',
            {
              'border-primary-main': status !== 'disabled',
              'border-cstate-disable-main': status === 'disabled',
            }
          )}
        ></div>
        <div
          className={cx(
            'absolute w-[20px] h-[10px] rounded-t-full border border-solid border-primary-main bottom-[-1px] right-[-11px] bg-white border-b-0',
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
      <div
        className={cx(
          'w-[1px] border-l-[1px] border-0 border-dashed  border-solid border overflow-hidden',
          {
            'border-primary-main': status !== 'disabled',
            'border-cstate-disable-main': status === 'disabled',
          }
        )}
      ></div>
      <div
        className={cx(
          `flex flex-col justify-center p-2 basis-16 grow rounded-r-lg border border-l-0 items-center`,
          [typeStyle.darkContent]
        )}
      >
        <div
          className={cx(`font-bold mb-1.5 text-base `, {
            'text-primary-main': status !== 'disabled',
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
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
            `text-xs whitespace-nowrap px-2 py-1 rounded text-white `,
            [typeStyle.buttonBG]
          )}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default IndiaCoupon;
