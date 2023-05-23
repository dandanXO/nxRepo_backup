import Money from '../../components/Money.tsx';
import { Button } from '../../components/layouts/Button';
import { PagePathEnum } from '../PagePathEnum';
import moment from 'moment/moment';

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
    <div className="flex flex-row justify-between px-3 items-center">
      <div className={'flex flex-col'}>
        <div className={`text-xs ${props.amountNameStyleClass}`}>{props.amountName}</div>
        {/*{NOTE: 合同金: orderAmount}*/}
        <div className={`text-lg font-bold my-1 leading-none ${orderAmountStyleClass}`}>
          {<Money money={props.orderAmount ?? ''} />}
        </div>

        {props.dueDate && (
          <div className={`${props.statusColor} text-xs`}>
            {`Due ${moment(props.dueDate).format('DD-MM-YYYY') ?? ''}`}
          </div>
        )}
      </div>

      <Button text={'Details'} className={'text-xs w-auto px-4'} onClick={props.onClick} />
    </div>
  );
};
