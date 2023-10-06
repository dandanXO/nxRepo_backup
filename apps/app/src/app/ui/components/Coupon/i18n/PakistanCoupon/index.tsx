import cx from 'classnames';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import Money from '../../../Money';
import { ICouponProps } from '../../index';
import { i18nCoupon } from '../translations';

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
  const layoutTypeStyle = {
    normal: {
      font: 'text-ctext-primary',
      darkContent: 'border-primary-main bg-tertiary-main',
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

  const typeStyle =
    status !== 'disabled'
      ? layoutTypeStyle['normal']
      : layoutTypeStyle['disabled'];

  const { t } = useTranslation(i18nCoupon.namespace);
  return (
    <div
      className={cx(`mb-3 flex w-full grow`, {
        'opacity-50': status === 'unUsable',
      })}
    >
      <div
        className={cx(
          `relative flex w-2/3 grow  flex-col  rounded-l-lg border border-r-0 p-2 text-left`,
          [typeStyle.lightContent]
        )}
      >
        <div
          className={cx(`mb-1.5 text-xs font-bold`, {
            'text-primary-variant': status !== 'disabled',
            'text-ctext-tertiary': status === 'disabled',
          })}
        >
          {couponType}
        </div>
        <div
          className={cx(`mb-1.5 break-all text-sm font-bold leading-none`, [
            typeStyle.font,
          ])}
        >
          {couponName}
        </div>
        <div
          className={cx(`mb-1.5 break-all text-xs leading-none `, {
            'text-ctext-secondary': status !== 'disabled',
            'text-ctext-tertiary': status === 'disabled',
          })}
        >
          {couponContent}
        </div>
        <div
          className={cx('flex text-xs', {
            'text-cstate-error-main':
              status !== 'disabled' && isOverdueEqual3Days(expireTime),
            'text-ctext-primary':
              status !== 'disabled' && !isOverdueEqual3Days(expireTime),
            'text-ctext-tertiary': status === 'disabled',
          })}
        >
          {`${
            buttonText === 'USED' ? t('Used on') : t('Expired time')
          } ${moment(expireTime).format('DD-MM-YYYY HH:mm')}`}
        </div>
      </div>
      <div
        className={cx(
          `flex w-1/3 flex-col items-center justify-center rounded-r-lg border p-2`,
          [typeStyle.darkContent]
        )}
      >
        <div
          className={cx(`text-center text-base font-bold`, {
            'text-primary-main': status !== 'disabled',
            'text-[#C0C0C0]': status === 'disabled',
          })}
        >
          <Money
            money={discountAmount}
            isNagetive={true}
            moneyStyle={`text-base break-all leading-none`}
            currencyStyle={`text-xs`}
          />
        </div>
        <button
          // NOTE:優惠券不需點擊 (點擊功能先做保留)
          onClick={props.onClick}
          disabled={status !== 'normal'} //只有normal才能點擊
          className={cx(
            `mt-2 whitespace-nowrap rounded px-2 py-1 text-xs text-white`,
            [typeStyle.buttonBG]
          )}
        >
          {t(buttonText)}
        </button>
      </div>
    </div>
  );
};

export default PakistanCoupon;
