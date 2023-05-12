import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import ListItem from '../../../../components/ListItem';
import Divider from '../../../../components/Divider';
import moment from 'moment';
import { Button } from '../../../../components/layouts/Button';
import Money from '../../../../components/Money.tsx';
import { Status } from '../../../../../modules/statusEnum';

const IndiaExtendModal = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { t } = props;
  const {
    repayConfirmDetail: { extendDate, extensionFee, extensionPayAmount = '' },
    orderNo = '',
    productName = '',
    dueDate = '',
    overdueDays = '',
    penaltyInterest = '',
    paidAmount,
    reductionAmount,
    status=''
  } = props.currentData ?? {};

  return (
    <div className={`p-2`}>
      <div className="text-xl font-bold mb-4 text-ctext-primary">Extend</div>
      <ListItem title={'Product'} text={productName ?? ''} titleColor='text-ctext-primary'/>
      <ListItem title={'No.'} text={orderNo ?? ''}  titleColor='text-ctext-primary'/>
      <ListItem
        title={'Due Date'}
        text={dueDate ? moment(dueDate).format('DD-MM-YYYY') : ''}
        titleColor='text-ctext-primary'
      />
      {/*NOTE: 展期費用*/}
      <ListItem title={'Extension Fee'} text={<Money money={extensionFee} />}  titleColor='text-ctext-primary'/>
      <ListItem
        title={'Overdue Days'}
        text={overdueDays ?? ''}
        titleColor='text-ctext-primary'
        textColor={overdueDays > 0 ? Status(status).color : 'text-ctext-primary'}
      />
      {/*NOTE: 展期罰金*/}
      <ListItem
        title={'Overdue Fee'}
        text={<Money money={penaltyInterest} />}
        titleColor='text-ctext-primary'
        textColor={overdueDays > 0 ? Status(status).color : 'text-ctext-primary'}
      />

      {/*NOTE: 減免金額*/}
      <ListItem
        title={'Reduction Amount'}
        text={<Money money={reductionAmount} isNagetive={true} />}
        titleColor='text-ctext-primary'
      />

      {/*NOTE: 已還金額*/}
      <ListItem
        title={'Amount Repaid'}
        text={<Money money={paidAmount} isNagetive={true} />}
        titleColor='text-ctext-primary'
      />

      <ListItem
        title={'Extension Due Date'}
        text={extendDate ? moment(extendDate).format('DD-MM-YYYY') : ''}
        textColor={'text-primary-main'}
      />

      <Divider />

      {/*NOTE: 總金額*/}
      <ListItem
        className="font-bold mt-3"
        title={'Total Extension Fee'}
        text={<Money money={extensionPayAmount} />}
        titleColor='text-ctext-primary'
      />
      <div className={`flex flex-row mt-6 text-white`}>
        <div className={`grow mr-1.5`}>
          <Button
            type={'ghost'}
            onClick={() => navigate(-2)}
            text={'Cancel'}
          />
        </div>
        <div className={`grow ml-1.5`}>
          <Button
            onClick={props.handleConfirm}
            text={'Confirm'}
          />
        </div>
      </div>
    </div>
  );
};

export default IndiaExtendModal;
