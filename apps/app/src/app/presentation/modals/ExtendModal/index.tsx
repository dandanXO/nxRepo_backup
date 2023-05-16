import React, { useEffect } from 'react';
import { Overlay } from '@frontend/mobile/shared/ui';
import { useLocation, useNavigate } from 'react-router';
import useExtendCreate from '../../hooks/useExtendCreate';
import useRepayTypes from '../../hooks/useRepayTypes';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { renderByCountry } from '../../../modules/i18n';
import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import IndiaExtendModal from './i18n/IndiaExtendModal';
import PakistanExtendModal from './i18n/PakistanExtendModal';

const PureExtendModal = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { repayConfirmDetail = {} } = location.state.currentData ?? {};
  const orderNo = location.state.currentData?.orderNo || getOrderNo();
  const { handlePostExpendCreate } = useExtendCreate();

  const {
    triggerGetList,
    isRepayTypesFetching,
    repayTypesList,
    repayType,
    setRepayType,
  } = useRepayTypes();
  useEffect(() => {
    triggerGetList({ orderNo: orderNo });
  }, []);

  const handleConfirm = () => {
    if (isRepayTypesFetching) return;
    handlePostExpendCreate &&
      handlePostExpendCreate(
        false,
        orderNo,
        repayConfirmDetail && repayConfirmDetail.extensionPayAmount
          ? repayConfirmDetail.extensionPayAmount
          : 0,
        repayType && repayType.value
      );
  };

  return (
    <div>
      <Overlay
        show={true}
        title="Notice"
        content={(hide: () => void) => {
          return renderByCountry(
            {
              [IndiaCountry.country]: (
                <IndiaExtendModal
                  currentData={location.state.currentData}
                  repayTypesList={repayTypesList}
                  repayType={repayType}
                  setRepayType={setRepayType}
                  handleConfirm={handleConfirm}
                />
              ),
              [PakistanCountry.country]: (
                <PakistanExtendModal
                  currentData={location.state.currentData}
                  repayTypesList={repayTypesList}
                  repayType={repayType}
                  setRepayType={setRepayType}
                  handleConfirm={handleConfirm}
                />
              ),
            },
            <IndiaExtendModal
              currentData={location.state.currentData}
              repayTypesList={repayTypesList}
              repayType={repayType}
              setRepayType={setRepayType}
              handleConfirm={handleConfirm}
            />
          );
        }}
        enableTitleHorizontal={true}
      ></Overlay>
    </div>
  );
};

export default PureExtendModal;
