import moment from 'moment';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Status } from '../../../../../modules/statusEnum';
import Divider from '../../../../components/Divider';
import ListItem from '../../../../components/ListItem';
import Money from '../../../../components/Money.tsx';
import { Button } from '../../../../components/layouts/Button';
import {formatDate} from "../../../../../modules/format/formatDate";

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
    status = '',
  } = props.currentData ?? {};

  const listTitleStyle = "text-ctext-primary text-sm";
  const listTextStyle = "text-ctext-primary text-sm";

  return (
    <div className={`p-2`}>
      <div className="text-ctext-primary mb-4 text-xl font-bold">Extend</div>
      <ListItem
        title={'Product'}
        text={productName ?? ''}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={'No.'}
        text={orderNo ?? ''}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={'Due Date'}
        text={dueDate ? formatDate(moment(dueDate)) : ''}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      {/*NOTE: 展期費用*/}
      <ListItem
        title={'Extension Fee'}
        text={<Money money={extensionFee} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={'Overdue Days'}
        text={overdueDays ?? ''}
        titleColor={listTitleStyle}
        textColor={`text-sm ${overdueDays > 0 ? Status(status).color : 'text-ctext-primary'}` }
      />
      {/*NOTE: 展期罰金*/}
      <ListItem
        title={'Overdue Fee'}
        text={<Money money={penaltyInterest} />}
        titleColor={listTitleStyle}
        textColor={`text-sm ${overdueDays > 0 ? Status(status).color : 'text-ctext-primary'}` }
      />
      {/*NOTE: 減免金額*/}
      <ListItem
        title={'Reduction Amount'}
        text={<Money money={reductionAmount} isNagetive={true} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      {/*NOTE: 已還金額*/}
      <ListItem
        title={'Amount Repaid'}
        text={<Money money={paidAmount} isNagetive={true} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={'Extension Due Date'}
        text={extendDate ? formatDate(moment(extendDate)) : ''}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <Divider />

      {/*NOTE: 總金額*/}
      <ListItem
        className="mt-2 font-bold"
        title={'Total Extension Fee'}
        text={<Money money={extensionPayAmount} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <div className={`mt-5 flex flex-row text-white`}>
        <div className={`mr-1.5 grow`}>
          <Button type={'ghost'} ghostTheme={'tertiary'} onClick={() => navigate(-2)} text={'Cancel'} />
        </div>
        <div className={`ml-1.5 grow`}>
          <Button onClick={props.handleConfirm} text={'Confirm'} disable={props.isPostExtendCreateLoading}/>
        </div>
      </div>
    </div>
  );
};

export default IndiaExtendModal;
