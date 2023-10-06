import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { formatDate } from '../../../../../modules/format/formatDate';
import Money from '../../../../components/Money';
import { Button } from '../../../../core-components/Button';
import Divider from '../../../../core-components/Divider';
import ListItem from '../../../../core-components/ListItem';
import Modal from '../../../../core-components/Modal';
import Select from '../../../../core-components/Select';
import { Status } from '../../../../statusEnum';
import { i18nExtendModal } from '../../translations';

type paymentMethodValueType = {
  value: string;
  label: string;
};
const MexicoExtendModal = (props: any) => {
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
  const { t } = useTranslation(i18nExtendModal.namespace);

  const paymentLabel = (color = window.theme?.text?.primary) => {
    return {
      ':before': {
        content: `"${t('Payment Method')}"`,
        display: 'block',
        color: color,
        top: 0,
        fontSize: '12px',
      },
    };
  };

  return (
    <Modal outlineTheme={'round'}>
      <div className={`p-4`}>
        <div className="text-ctext-primary mb-4 text-xl font-bold">
          {t('Extend')}
        </div>
        <ListItem
          title={t('Product')}
          text={productName ?? ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
        />
        <ListItem
          title={t('Order No.')}
          text={orderNo ?? ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary whitespace-nowrap"
        />
        <ListItem
          title={t('Due Date')}
          text={dueDate ? formatDate(moment(dueDate)) : ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
        />
        {/*NOTE: 展期費用*/}
        <ListItem
          title={t('Extension Fee')}
          text={<Money money={extensionFee} />}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
        />
        <ListItem
          title={t('Overdue Days')}
          text={overdueDays ?? ''}
          titleColor="text-ctext-secondary"
          textColor={
            status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'
          }
        />
        {/*NOTE: 展期罰金*/}
        <ListItem
          title={t('Overdue Fee')}
          text={<Money money={penaltyInterest} />}
          titleColor="text-ctext-secondary"
          textColor={
            status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'
          }
        />

        {/*NOTE: 減免金額*/}
        <ListItem
          title={t('Reduction Amount')}
          text={<Money money={reductionAmount} isNagetive={true} />}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
        />

        {/*NOTE: 已還金額*/}
        <ListItem
          title={t('Amount Repaid')}
          text={<Money money={paidAmount} isNagetive={true} />}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
        />

        <ListItem
          title={t('Extension Due Date')}
          text={extendDate ? formatDate(moment(extendDate)) : ''}
          titleColor="text-ctext-secondary text-left pr-0.5"
          textColor="text-primary-main whitespace-nowrap"
        />

        <Divider />

        {/*NOTE: 總金額*/}
        <ListItem
          className="mt-3 font-bold"
          title={t('Total Extension Fee') as string}
          text={<Money money={extensionPayAmount} />}
          titleColor="text-ctext-primary"
        />

        <div className="bg-cstate-disable-main -mx-4 mt-6 mb-5 h-2"></div>
        <Select
          styles={{
            control: (baseStyles: any, state: any) => ({
              ...baseStyles,
              paddingLeft: '4px',
              borderRadius: '9px',
              border: `1px solid ${window.theme?.input?.outline ?? '#aaaaaa'}`,
              textAlign: 'left',
            }),
            valueContainer: (style: any, state: any) => ({
              ...style,
              alignItems: 'end',
            }),
            //@ts-ignore
            indicatorsContainer: (provided) => ({
              ...provided,
              alignItems: 'end',
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: 'none',
            }),
            input: (styles) => ({ ...styles, bottom: 0 }),
            placeholder: (styles) => ({
              ...styles,
              color: window.theme?.input?.placeholder,
              ...paymentLabel(),
            }),
            singleValue: (styles, { data }) => ({
              ...styles,
              ...paymentLabel(),
            }),
          }}
          options={props.repayTypesList || []}
          value={props?.repayType}
          onChange={(item: any) => {
            props.setRepayType(item as paymentMethodValueType);
          }}
        />

        <div className={`mt-6 flex flex-row text-white`}>
          <div className={`mr-1.5 grow`}>
            <Button
              type={'ghost'}
              ghostTheme={'none'}
              onClick={() => navigate(-2)}
              text={t('Cancel')}
            />
          </div>
          <div className={`ml-1.5 grow`}>
            <Button
              outlineTheme={'round'}
              onClick={props.handleConfirm}
              text={t('Confirm')}
              disable={props.isPostExtendCreateLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MexicoExtendModal;
