import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IChargeFeeDetails } from '../../../../../externel/backend/loanService/GetReservationResponse';
import { Checkbox, ICheckboxProps } from '../../../../core-components/Checkbox';
import { FinalProductType } from '../../../../pages/IndexPage';
import Money from '../../../Money';
import { i18nProduct } from '../translations';

type Props = {
  product: FinalProductType;
  checkable?: boolean;
  checkboxProps?: ICheckboxProps;
  chargeFeeDetails?: IChargeFeeDetails[];
};

export const IndiaProduct = (props: Props) => {
  const { checkable = false } = props;
  const [expand, setExpand] = useState(false);
  const toggleExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);
  const { t } = useTranslation(i18nProduct.namespace);
  return (
    <div className={cx('product mb-2 flex flex-col  text-sm ')}>
      <div className="flex flex-row items-center justify-between">
        {checkable && (
          <div className="mr-2">
            <Checkbox {...props?.checkboxProps} />
          </div>
        )}
        <div
          className={'brand flex grow flex-row justify-between pb-1'}
          onClick={toggleExpand}
        >
          <div className={'left flex flex-row items-center'}>
            <div className={'mr-3 h-10 w-10 rounded-md'}>
              <img src={props.product.logoUrl} />
            </div>
            <div className={'text-ctext-primary'}>
              {props.product.productName}
            </div>
          </div>
          <div
            className={'right text-ctext-primary flex flex-row items-center'}
          >
            <div>
              <Money money={props.product.calculating.finalLoanPrice ?? 0} />
            </div>
            {expand ? (
              <MdExpandLess size={30} className={'fill-cstate-disable-main'} />
            ) : (
              <MdExpandMore size={30} className={'fill-cstate-disable-main'} />
            )}
          </div>
        </div>
      </div>

      {expand && (
        <div
          className={
            'expandable-brand bg-cbg-tertiary text-ctext-secondary mt-2 flex flex-col py-3 px-4 text-xs'
          }
        >
          <div className={'item mb-2 flex flex-row justify-between '}>
            <div className={'key'}>{t('Terms')}</div>
            <div className={'value'}>
              {props.product.terms} {t('days')}
            </div>
          </div>

          <div className={'item mb-2 flex flex-row justify-between '}>
            <div className={'key'}>{t('Disbursal Amount')}</div>
            <div className={'value'}>
              <Money money={props.product.calculating.disbursalPrice ?? 0} />
            </div>
          </div>

          <div className={'item flex flex-row justify-between '}>
            <div className={'key'}>{t('Due Date')}</div>
            <div className={'value'}>{props.product.calculating.dueDate}</div>
          </div>
        </div>
      )}
    </div>
  );
};
