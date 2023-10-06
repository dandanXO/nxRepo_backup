import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import {
  IndiaCountry,
  MexicoCountry,
  PakistanCountry,
  PhilippinesCountry,
} from '@frontend/shared/domain';

import { environment } from '../../../../environments/environmentModule/environment';
import { getOrderNo } from '../../../externel/window/querystring/getOrderNo';
import { renderByCountry } from '../../../modules/i18n';
import { RootState } from '../../../reduxStore';
import useExtendCreate from '../../hooks/useExtendCreate';
import useRepayTypes from '../../hooks/useRepayTypes';
import { RepaymentDetailPageUseCaseActions } from '../../pages/RepaymentDetailPage/userUsecaseSaga';
import IndiaExtendModal from './i18n/IndiaExtendModal';
import MexicoExtendModal from './i18n/MexicoExtendModal';
import PakistanExtendModal from './i18n/PakistanExtendModal';
import PhilippinesExtendModal from './i18n/PhilippinesExtendModal';

const PureExtendModal = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { repaymentData } = useSelector(
    (state: RootState) => state.repaymentDetailPage
  );

  const { repayConfirmDetail = {} } = location.state.currentData ?? {};
  const orderNo = location.state.currentData?.orderNo || getOrderNo();
  const { handlePostExtendCreate, isPostExtendCreateLoading } =
    useExtendCreate();

  const {
    triggerGetList,
    isRepayTypesFetching,
    repayTypesList,
    repayType,
    setRepayType,
  } = useRepayTypes();
  useEffect(() => {
    if (environment.country === PhilippinesCountry.country) {
      dispatch(RepaymentDetailPageUseCaseActions.user.repayData());
    } else {
      triggerGetList({ orderNo: orderNo });
    }
  }, []);

  const handleConfirm = () => {
    if (isRepayTypesFetching || isPostExtendCreateLoading) return;
    let payType = '';
    if (environment.country === PhilippinesCountry.country) {
      payType = repaymentData.payType || '';
    } else {
      payType = repayType && repayType.value;
    }

    handlePostExtendCreate &&
      handlePostExtendCreate(
        false,
        orderNo,
        repayConfirmDetail && repayConfirmDetail.extensionPayAmount
          ? repayConfirmDetail.extensionPayAmount
          : 0,
        payType
      );
  };

  return (
    <div>
      {renderByCountry(
        {
          [IndiaCountry.country]: (
            <IndiaExtendModal
              currentData={location.state.currentData}
              repayTypesList={repayTypesList}
              repayType={repayType}
              setRepayType={setRepayType}
              handleConfirm={handleConfirm}
              isPostExtendCreateLoading={isPostExtendCreateLoading}
            />
          ),
          [PakistanCountry.country]: (
            <PakistanExtendModal
              currentData={location.state.currentData}
              repayTypesList={repayTypesList}
              repayType={repayType}
              setRepayType={setRepayType}
              handleConfirm={handleConfirm}
              isPostExtendCreateLoading={isPostExtendCreateLoading}
            />
          ),
          [MexicoCountry.country]: (
            <MexicoExtendModal
              currentData={location.state.currentData}
              repayTypesList={repayTypesList}
              repayType={repayType}
              setRepayType={setRepayType}
              handleConfirm={handleConfirm}
              isPostExtendCreateLoading={isPostExtendCreateLoading}
            />
          ),
          [PhilippinesCountry.country]: (
            <PhilippinesExtendModal
              currentData={location.state.currentData}
              handleConfirm={handleConfirm}
              isPostExtendCreateLoading={isPostExtendCreateLoading}
            />
          ),
        },
        <IndiaExtendModal
          currentData={location.state.currentData}
          repayTypesList={repayTypesList}
          repayType={repayType}
          setRepayType={setRepayType}
          handleConfirm={handleConfirm}
          isPostExtendCreateLoading={isPostExtendCreateLoading}
        />
      )}
    </div>
  );
};

export default PureExtendModal;
