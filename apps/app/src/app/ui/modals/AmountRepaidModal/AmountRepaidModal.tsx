import moment from 'moment';
import React from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router';
import styled from 'styled-components';

import {flexCreator, Overlay} from '@frontend/mobile/shared/ui';

import {GetLoanDetailResponse} from '../../../externel/backend/rtk/old/getLoanDetail';
import {getToken} from '../../../application/getToken';
import recordStatusStyleProps from '../../../modules/recordStatusColorMapper';
import Divider from '../../core-components/Divider';
import Money from '../../components/Money';
import {PageOrModalPathEnum} from '../../PageOrModalPathEnum';
import {i18nAmountRepaidModal} from './i18n/translations';
import {formatDate} from "../../../modules/format/formatDate";
import {getOrderNo} from "../../../externel/window/querystring/getOrderNo";

const ModalContentStyled = styled.div`
  padding: 0 12px;
`;

const RecordStyled = styled.div<RecordStyledProps>`
  margin: 0 16px -8px 16px;
  font-size: 12px;
  .recordStatus {
    width: 100%;
    ${flexCreator('row', 'flex-end', 'center')};
    ${(props) => ({ ...recordStatusStyleProps[props.status] })}
    margin-top: -8px;
    text-align: right;
  }
`;

const NoDataStyled = styled.div`
  height: 200px;
  ${flexCreator('row', 'center', 'center')};
`;

type AmountRepaidRecordsProps = Pick<GetLoanDetailResponse, 'repayRecords'> & {
  // setShowAmountPaidModal: React.Dispatch<React.SetStateAction<boolean>>;
} & WithTranslation;

interface RecordStyledProps {
  status: string;
}
const Record = (props: { repayDate: string; repayAmount: React.ReactElement; repayType: string }) => {
  const { repayDate, repayAmount, repayType } = props;
  return (
    <>
      <RecordStyled status={repayType}>
        <div className={`my-1 flex justify-between text-xs text-black `}>
          <div>{repayDate}</div>
          <div>{repayAmount}</div>
        </div>
        <div className={`recordStatus`}>
          <div>{repayType}</div>
        </div>
      </RecordStyled>
      <Divider />
    </>
  );
};
const renderRecordList = (props: AmountRepaidRecordsProps) => {
  // console.log('props', props);
  const { repayRecords = [] } = props;
  return repayRecords?.map((i) => (
    <Record
      repayDate={i.repayDate ? formatDate(moment(i.repayDate)) : ''}
      repayAmount={<Money money={i.repayAmount ? i.repayAmount : 0} />}
      repayType={i.repayType ? i.repayType : ''}
    />
  ));
};

const AmountRepaidModal = (props: AmountRepaidRecordsProps) => {
  const { repayRecords, t } = props;
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log('AmountRepaidModal.state', state);
  // console.log('AmountRepaidModal.props', props);

  return (
    <div>
      <Overlay
        show={true}
        enableClose={true}
        title="Notice"
        contentNoStyle={true}
        content={(hide: () => void) => {
          return (
            <div>
              <div className="mt-[-10px] text-sm font-bold">{t('Amount Repaid Record')}</div>
              <Divider />
              {state.repayRecords?.length === 0 ? (
                <NoDataStyled>{t('No paid records yet')}</NoDataStyled>
              ) : (
                <ModalContentStyled>{renderRecordList(state)}</ModalContentStyled>
              )}
            </div>
          );
        }}
        onCancel={() => navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`)}
        enableTitleHorizontal={true}
      ></Overlay>
    </div>
  );
};

export default withTranslation(i18nAmountRepaidModal.namespace)(AmountRepaidModal);
