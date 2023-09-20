import moment from 'moment';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Status } from '../../../../../modules/statusEnum';
import Divider from '../../../../components/Divider';
import ListItem from '../../../../components/ListItem';
import Money from '../../../../components/Money.tsx';
import { Button } from '../../../../components/layouts/Button';
import {formatDate} from "../../../../../modules/format/formatDate";
import Modal from '../../../../components/Modal';
import { useTranslation } from 'react-i18next';
import { i18nExtendModal } from '../../translations';

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
  const { t } = useTranslation(i18nExtendModal.namespace);

  const listTitleStyle = "text-ctext-primary text-sm";
  const listTextStyle = "text-ctext-primary text-sm";

  return (
    <Modal>
      <div className={`p-2`}>
      <div className="text-ctext-primary mb-4 text-xl font-bold">
        {t('Extend')}
      </div>
      <ListItem
        title={t('Product')}
        text={productName ?? ''}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={t('Order No.')}
        text={orderNo ?? ''}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={t('Due Date')}
        text={dueDate ? formatDate(moment(dueDate)) : ''}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      {/*NOTE: 展期費用*/}
      <ListItem
        title={t('Extension Fee')}
        text={<Money money={extensionFee} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={t('Overdue Days')}
        text={overdueDays ?? ''}
        titleColor={listTitleStyle}
        textColor={`text-sm ${overdueDays > 0 ? Status(status).color : 'text-ctext-primary'}` }
      />
      {/*NOTE: 展期罰金*/}
      <ListItem
        title={t('Overdue Fee')}
        text={<Money money={penaltyInterest} />}
        titleColor={listTitleStyle}
        textColor={`text-sm ${overdueDays > 0 ? Status(status).color : 'text-ctext-primary'}` }
      />
      {/*NOTE: 減免金額*/}
      <ListItem
        title={t('Reduction Amount')}
        text={<Money money={reductionAmount} isNagetive={true} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      {/*NOTE: 已還金額*/}
      <ListItem
        title={t('Amount Repaid')}
        text={<Money money={paidAmount} isNagetive={true} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <ListItem
        title={t('Extension Due Date')}
        text={extendDate ? formatDate(moment(extendDate)) : ''}
        titleColor={listTitleStyle}
        textColor={"text-primary-main text-sm"}
      />
      <Divider />

      {/*NOTE: 總金額*/}
      <ListItem
        className="mt-2 font-bold"
        title={t('Total Extension Fee')}
        text={<Money money={extensionPayAmount} />}
        titleColor={listTitleStyle}
        textColor={listTextStyle}
      />
      <div className={`mt-5 flex flex-row text-white`}>
        <div className={`mr-1.5 grow`}>
          <Button type={'ghost'} ghostTheme={'tertiary'} onClick={() => navigate(-2)} text={t('Cancel')} />
        </div>
        <div className={`ml-1.5 grow`}>
          <Button onClick={props.handleConfirm} text={t('Confirm')} disable={props.isPostExtendCreateLoading}/>
        </div>
      </div>
      </div>
    </Modal>
  );
};

export default IndiaExtendModal;
