import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import { useCallback, useState } from 'react';

import Money from '../../../../components/Money';
import { FinalProductType } from '../../index';

type Props = {
  product: FinalProductType;
};

export const Product = (props: Props) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  return (
    <div
      className={cx('product mb-2 flex flex-col text-sm')}
      onClick={toggleExpand}
    >
      <div className={'brand flex flex-row justify-between pb-1'}>
        <div className={'left flex flex-row items-center'}>
          <div className={'mr-3 h-10 w-10 rounded-md'}>
            <img src={props.product.logoUrl} />
          </div>
          <div className={'text-ctext-primary'}>
            {props.product.productName}
          </div>
        </div>
        <div className={'right text-ctext-primary flex flex-row items-center'}>
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
      {expand && (
        <div
          className={
            'expandable-brand bg-cbg-tertiary text-ctext-secondary mt-2 flex flex-col py-3 px-4 text-xs'
          }
        >
          {/* <div className={'item mb-1 flex flex-row justify-between font-light'}>
            <div className={'key'}>Interest</div>
            <div className={'value'}>
              {environment.currency} {formatPrice(props.product.calculating.interestPrice)}
            </div>
          </div> */}

          <div className={'item mb-2 flex flex-row justify-between '}>
            <div className={'key'}>Terms</div>
            <div className={'value'}>{props.product.terms}days</div>
          </div>

          <div className={'item mb-2 flex flex-row justify-between '}>
            <div className={'key'}>Disbursal Amount </div>
            <div className={'value'}>
              <Money money={props.product.calculating.disbursalPrice ?? 0} />
            </div>
          </div>

          <div className={'item flex flex-row justify-between '}>
            <div className={'key'}>Due Date</div>
            <div className={'value'}>{props.product.calculating.dueDate}</div>
          </div>
        </div>
      )}
    </div>
  );
};
