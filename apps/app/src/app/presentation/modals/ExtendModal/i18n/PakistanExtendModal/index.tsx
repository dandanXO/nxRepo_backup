import React from 'react';
import { useNavigate } from 'react-router';
import ListItem from '../../../../components/ListItem';
import Divider from '../../../../components/Divider';
import moment from 'moment';
import { Button } from '../../../../components/layouts/Button';
import CustomSelect from '../../../../components/Select';
import Money from '../../../../components/Money.tsx';
import { Status } from '../../../../../modules/statusEnum';
import Select from 'react-select';
import { selectStyles } from '../../../../components/layouts/selectStyles';

type paymentMethodValueType = {
  value: string;
  label: string;
};
const PakistanExtendModal = (props: any) => {
  const navigate = useNavigate();
  const {
    repayConfirmDetail: { extendDate, extensionFee, extensionPayAmount = '' },
    orderNo = '',
    productName = '',
    dueDate = '',
    overdueDays = '',
    penaltyInterest = '',
    reductionAmount,
    paidAmount,
    status = '',
  } = props.currentData ?? {};

  return (
    <div className={`p-2`}>
      <div className="text-xl font-bold mb-4 text-ctext-primary">Extend</div>
      <ListItem
        title={'Product'}
        text={productName ?? ''}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
      />
      <ListItem
        title={'No.'}
        text={orderNo ?? ''}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
      />
      <ListItem
        title={'Due Date'}
        text={dueDate ? moment(dueDate).format('DD-MM-YYYY') : ''}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
      />
      {/*NOTE: 展期費用*/}
      <ListItem
        title={'Extension Fee'}
        text={<Money money={extensionFee} />}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
      />
      <ListItem
        title={'Overdue Days'}
        text={overdueDays ?? ''}
        titleColor="text-ctext-secondary"
        textColor={
          status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'
        }
      />
      {/*NOTE: 展期罰金*/}
      <ListItem
        title={'Overdue Fee'}
        text={<Money money={penaltyInterest} />}
        titleColor="text-ctext-secondary"
        textColor={status === 'OVERDUE' ? Status(status).color : ''}
      />

      {/*NOTE: 減免金額*/}
      <ListItem
        title={'Reduction Amount'}
        text={<Money money={reductionAmount} isNagetive={true} />}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
      />

      {/*NOTE: 已還金額*/}
      <ListItem
        title={'Amount Repaid'}
        text={<Money money={paidAmount} isNagetive={true} />}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
      />

      <ListItem
        title={'Extension Due Date'}
        text={extendDate ? moment(extendDate).format('DD-MM-YYYY') : ''}
        titleColor="text-ctext-secondary"
        textColor="text-primary-main"
      />

      <Divider />

      {/*NOTE: 總金額*/}
      <ListItem
        className="font-bold mt-3"
        title={'Total Extension Fee' as string}
        text={<Money money={extensionPayAmount} />}
        titleColor="text-ctext-primary"
      />

      <div className="mt-6  mb-5 bg-cstate-disable-main h-2 mx-[-20px]"></div>
      <div className="text-black text-xs font-bold text-left">
        {'Payment Method'}
      </div>
      <Select
        styles={selectStyles}
        options={props.repayTypesList || []}
        value={props?.repayType}
        onChange={(item: any) => {
          props.setRepayType(item as paymentMethodValueType);
        }}
        isSearchable={false}
      />

      <div className={`flex flex-row mt-6 text-white`}>
        <div className={`grow mr-1.5`}>
          <Button
            type={'ghost'}
            onClick={() => navigate(-2)}
            text={'Cancel'}
            className={`w-full`}
          />
        </div>
        <div className={`grow ml-1.5`}>
          <Button
            onClick={props.handleConfirm}
            text={'Confirm'}
            className={`w-full`}
          />
        </div>
      </div>
    </div>
  );
};

export default PakistanExtendModal;
