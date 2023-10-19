import cx from 'classnames';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { formatDate } from '../../../../../modules/format/formatDate';
import Money from '../../../Money';
import { ICouponProps } from '../../index';
import { i18nCoupon } from '../translations';

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
            'absolute bottom-[-1px] right-[-11px] h-[10px] w-[20px] rounded-t-full border border-b-0 border-solid bg-white',
            {
              'border-primary-main': status !== 'disabled',
              'border-cstate-disable-main': status === 'disabled',
            }
          )}
        ></div>

        <div
          className={cx(`mb-1.5 text-xs font-bold`, {
            'text-primary-variant': status !== 'disabled',
            'text-cstate-disable-main': status === 'disabled',
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
          className={cx(`mb-1.5 break-all text-xs leading-none `, [
            typeStyle.font,
          ])}
        >
          {couponContent}
        </div>
        <div
          className={cx('flex text-xs', {
            'text-cstate-error-main':
              status !== 'disabled' && isOverdueEqual3Days(expireTime),
            'text-ctext-secondary':
              status !== 'disabled' && !isOverdueEqual3Days(expireTime),
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
          {`${
            buttonText === 'USED' ? t('Used on') : t('Expired time')
          } ${formatDate(moment(expireTime))}`}
        </div>
      </div>
      <div
        className={cx(
          'w-[1px] overflow-hidden border-0 border  border-l-[1px] border-solid border-dashed',
          {
            'border-primary-main': status !== 'disabled',
            'border-cstate-disable-main': status === 'disabled',
          }
        )}
      ></div>
      <div
        className={cx(
          `flex w-1/3 flex-col items-center justify-center rounded-r-lg border border-l-0 p-2`,
          [typeStyle.darkContent]
        )}
      >
        <div
          className={cx(`text-center text-base font-bold`, {
            'text-primary-main': status !== 'disabled',
            'text-cstate-disable-main': status === 'disabled',
          })}
        >
          <Money
            money={discountAmount}
            isNagetive={true}
            moneyStyle={`text-base break-all leading-none`}
            currencyStyle={`text-base`}
          />
        </div>
        <button
          // NOTE:優惠券不需點擊 (點擊功能先做保留)
          onClick={props.onClick}
          disabled={status !== 'normal'} //只有normal才能點擊
          className={cx(
            `mt-2 whitespace-nowrap rounded-xl px-3 py-1 text-xs text-white`,
            [typeStyle.buttonBG]
          )}
        >
          {t(buttonText)}
        </button>
      </div>
    </div>
  );
};

export default IndiaCoupon;