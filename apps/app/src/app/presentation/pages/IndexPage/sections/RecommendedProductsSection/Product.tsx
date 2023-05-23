import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import { useCallback, useState } from 'react';

import { environment } from '../../../../../../environments/environment';
import { formatPrice } from '../../../../../modules/format/formatPrice';
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
    <div className={cx('product mb-1 flex flex-col')} onClick={toggleExpand}>
      <div className={'brand flex flex-row justify-between pb-1'}>
        <div className={'left flex flex-row items-center'}>
          <div className={'mr-3 h-10 w-10 rounded-md'}>
            <img src={props.product.logoUrl} />
          </div>
          <div className={'font-light'}>{props.product.productName}</div>
        </div>
        <div className={'right flex flex-row items-center'}>
          <div className={'font-light'}>₹ {formatPrice(props.product.calculating.finalLoanPrice)}</div>
          {expand ? <MdExpandLess size={30} color={'#AAAAAA'} /> : <MdExpandMore size={30} color={'#AAAAAA'} />}
        </div>
      </div>
      {expand && (
        <div className={'expandable-brand flex flex-col bg-[#F3F3F3] p-2 text-[#707070]'}>
          <div className={'item mb-1 flex flex-row justify-between font-light'}>
            <div className={'key'}>Interest</div>
            <div className={'value'}>
              {environment.currency} {formatPrice(props.product.calculating.interestPrice)}
            </div>
          </div>

          <div className={'item mb-1 flex flex-row justify-between font-light'}>
            <div className={'key'}>Terms</div>
            <div className={'value'}>{props.product.terms}days</div>
          </div>

          <div className={'item mb-1 flex flex-row justify-between font-light'}>
            <div className={'key'}>Disbursal Amount </div>
            <div className={'value'}>
              {environment.currency} {formatPrice(props.product.calculating.disbursalPrice)}
            </div>
          </div>

          <div className={'item mb-1 flex flex-row justify-between font-light'}>
            <div className={'key'}>Due Date</div>
            <div className={'value'}>{props.product.calculating.dueDate}</div>
          </div>
        </div>
      )}
    </div>
  );
};
