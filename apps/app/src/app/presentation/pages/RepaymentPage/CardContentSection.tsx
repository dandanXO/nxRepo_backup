import moment from 'moment/moment';

import Money from '../../components/Money';
import { Button } from '../../core-components/Button';
import { PagePathEnum } from '../PagePathEnum';
import {formatDate} from "../../../modules/format/formatDate";

type ICardContentSection = {
  amountName: string;
  amountNameStyleClass?: string;
  orderAmount: string | number;
  orderAmountStyleClass?: string;
  onClick: () => void;

  // NOTE: refactor
  // NOTE: overdue
  dueDate?: string;
  // extension?: string;
  statusColor?: string;
};
export const CardContentSection = (props: ICardContentSection) => {
  const orderAmountStyleClass = props.orderAmountStyleClass ? props.orderAmountStyleClass : 'text-ctext-primary';
  return (
    <div className="flex flex-row items-center justify-between px-3">
      <div className={'flex flex-col'}>
        <div className={`text-xs ${props.amountNameStyleClass}`}>{props.amountName}</div>
        {/*{NOTE: 合同金: orderAmount}*/}
        <div className={`my-1 text-lg font-bold leading-none ${orderAmountStyleClass}`}>
          {<Money money={props.orderAmount ?? ''} />}
        </div>

        {props.dueDate && (
          <div className={`${props.statusColor} text-xs`}>
            {`Due ${formatDate(moment(props.dueDate)) ?? ''}`}
          </div>
        )}
      </div>

      <Button text={'Details'} className={'w-auto px-4 text-xs'} onClick={props.onClick} />
    </div>
  );
};
