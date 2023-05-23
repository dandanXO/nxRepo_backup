import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import {
  useLazyGetBindCardDropListQuery,
  usePostBankBindSaveMutation,
  usePostBankBindSaveToPKMutation,
} from '../../../api/rtk';
import { renderByCountry } from '../../../modules/i18n';
import { isInAndroid } from '../../../modules/window/isInAndroid';
import { CustomPage } from '../../components/layouts/CustomPage';
import { Navigation } from '../../components/layouts/Navigation';
import { IndiaBindBankAccountPage } from './components/i18n/IndiaBindBankAccountPage';
import { PakistanBindBankAccountPage } from './components/i18n/PakistanBindBankAccountPage';

const BindBankCardPage = () => {
  // NOTICE: Common
  // NOTE: cardholderName
  const pageQueryString = useLocationOrderQueryString();
  const cardholderName = pageQueryString.cardholderName || useSelector((state: any) => state.indexPage.user.userName);

  // NOTICE: India
  // NOTE: 綁定銀行卡
  const [postBankBindSave, { isLoading: isLoadingPostBankBindSave }] = usePostBankBindSaveMutation();

  // NOTICE: Pakistan
  // NOTE: 綁定銀行卡
  const [postBankBindSaveToPK, { isLoading: isLoadingPostBankBindSaveToPK }] = usePostBankBindSaveToPKMutation();

  // NOTE: 取得電子錢包列表(IN 沒有, PK 有, BD未來有)
  const [
    triggerGetBindCardDropListQuery,
    {
      currentData: bindCardDropListData,
      isLoading: isBindCardDropListDataLoading,
      isFetching: isBindCardDropListDataFetching,
    },
  ] = useLazyGetBindCardDropListQuery({});

  // NOTE: 綁定電子錢包
  const [triggerPostBankBindSaveToPKMutation, { isLoading: isPostBankBindSaveToPKMutationLoading }] =
    usePostBankBindSaveToPKMutation();

  const navigate = useNavigate();

  return (
    <>
      {!isInAndroid() && (
        <Navigation
          title={'Add New Card'}
          back={() => {
            navigate(-1);
          }}
        />
      )}
      <CustomPage>
        {renderByCountry(
          {
            // NOTICE: default 0 index
            [IndiaCountry.country]: (
              <IndiaBindBankAccountPage
                isLoadingPostBankBindSave={isLoadingPostBankBindSave}
                postBankBindSave={postBankBindSave}
                cardholderName={cardholderName ?? ''}
              />
            ),
            [PakistanCountry.country]: (
              <PakistanBindBankAccountPage
                isLoadingPostBankBindSaveToPK={isLoadingPostBankBindSaveToPK}
                postBankBindSaveToPK={postBankBindSaveToPK}
                isPostBankBindSaveToPKMutationLoading={isPostBankBindSaveToPKMutationLoading}
                triggerPostBankBindSaveToPKMutation={triggerPostBankBindSaveToPKMutation}
                triggerGetBindCardDropListQuery={triggerGetBindCardDropListQuery}
                bindCardDropListData={bindCardDropListData}
                cardholderName={cardholderName ?? ''}
              />
            ),
          },
          <PakistanBindBankAccountPage
            isLoadingPostBankBindSaveToPK={isLoadingPostBankBindSaveToPK}
            postBankBindSaveToPK={postBankBindSaveToPK}
            isPostBankBindSaveToPKMutationLoading={isPostBankBindSaveToPKMutationLoading}
            triggerPostBankBindSaveToPKMutation={triggerPostBankBindSaveToPKMutation}
            triggerGetBindCardDropListQuery={triggerGetBindCardDropListQuery}
            bindCardDropListData={bindCardDropListData}
            cardholderName={cardholderName ?? ''}
          />
        )}
      </CustomPage>
    </>
  );
};

export default BindBankCardPage;
