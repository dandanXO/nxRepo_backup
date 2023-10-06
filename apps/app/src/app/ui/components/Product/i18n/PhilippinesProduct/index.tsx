import {MdExpandLess} from '@react-icons/all-files/md/MdExpandLess';
import {MdExpandMore} from '@react-icons/all-files/md/MdExpandMore';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {IChargeFeeDetails} from '../../../../../externel/backend/loanService/GetReservationResponse';
import {FinalProductType} from '../../../../pages/IndexPage';
import {Checkbox, ICheckboxProps} from '../../../../core-components/Checkbox';
import Money from '../../../Money';
import {i18nProduct} from '../translations';

interface IPhilippinesProductProps {
  product: FinalProductType;
  checkable?: boolean;
  checkboxProps?: ICheckboxProps;
  chargeFeeDetails?: IChargeFeeDetails[];
}

const PhilippinesProduct = ({
  product,
  checkable,
  checkboxProps,
  chargeFeeDetails,
}: IPhilippinesProductProps) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  const { t } = useTranslation(i18nProduct.namespace);

  const { finalLoanPrice, interestPrice } = product.calculating;

  return (
    <div className="mb-3 flex flex-col text-sm">
      <div className="flex items-center gap-2">
        {checkable && <Checkbox {...checkboxProps} />}
        <div
          className="text-ctext-primary flex w-full items-center justify-between"
          onClick={toggleExpand}
        >
          <div className="left flex items-center gap-2">
            <div className="h-6 w-6">
              <img alt="product" className="rounded-lg" src={product.logoUrl} />
            </div>
            <div>{product.productName}</div>
          </div>
          <div className="right flex items-center">
            <Money money={product.calculating.finalLoanPrice ?? 0} />
            {expand ? (
              <MdExpandLess size={30} className="fill-ctext-primary" />
            ) : (
              <MdExpandMore size={30} className="fill-ctext-primary" />
            )}
          </div>
        </div>
      </div>
      {expand && (
        <div className="text-ctext-secondary mt-2 flex flex-col gap-1 rounded-lg bg-[#F8F9F9] py-2 px-3 font-medium">
          <div className="flex justify-between">
            <div>{t('loanAmount')}</div>
            <div>
              <Money money={product.calculating.finalLoanPrice} />
            </div>
          </div>

          {/*<div>服務費</div>*/}
          {chargeFeeDetails?.map((i) => (
            <div key={i.title} className="flex justify-between">
              <div>{i.title}</div>
              <div>
                <Money money={i.feeAmount} />
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <div>{t('Disbursal Amount')}</div>
            <div>
              <Money money={product.calculating.disbursalPrice} />
            </div>
          </div>

          <div className="flex justify-between">
            <div>{t('Interest Fee')}</div>
            <div>
              <Money money={product.calculating.interestPrice} />
            </div>
          </div>

          <div className="flex justify-between">
            <div>{t('totalAmountToPay')}</div>
            <div>
              <Money
                money={
                  finalLoanPrice && interestPrice
                    ? interestPrice + finalLoanPrice
                    : 0
                }
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div>{t('Due Date')}</div>
            <div>{product.calculating.dueDate}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhilippinesProduct;
