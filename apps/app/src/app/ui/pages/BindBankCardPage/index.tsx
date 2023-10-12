import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';
import {
  IndiaCountry,
  MexicoCountry,
  PakistanCountry,
  PhilippinesCountry,
} from '@frontend/shared/domain';

import { isShowNavigation } from '../../../device/isShowNavigation';
import {
  useLazyGetBindCardDropListQuery,
  usePostBankBindSaveMutation,
  usePostBankBindSaveToPKMutation,
} from '../../../externel/backend/rtk';
import { renderByCountry } from '../../../modules/i18n';
import { Navigation } from '../../core-components/Navigation';
import { PageContent } from '../../core-components/PageContent';
import { IndiaBindBankAccountPage } from './i18nPage/IndiaBindBankAccountPage';
import { MexicoBindBankAccountPage } from './i18nPage/MexicoBindBankAccountPage';
import { PakistanBindBankAccountPage } from './i18nPage/PakistanBindBankAccountPage';
import PhilippinesBindBankAccountPage from './i18nPage/PhilippinesBindBankAccountPage';
import { i18nBankBindAccountPage } from './translations';
import { AllCountryIdentityName } from 'libs/shared/domain/src/country/enum/AllCountryIdentityName';
import { environment } from 'apps/app/src/environments/environmentModule/environment';

const BindBankCardPage = () => {
  // NOTICE: Common
  // NOTE: cardholderName
  const pageQueryString = useLocationOrderQueryString();
  const cardholderName =
    pageQueryString.cardholderName ||
    useSelector((state: any) => state.indexPage.user.bankCardName);

  // NOTICE: India
  // NOTE: 綁定銀行卡
  const [postBankBindSave, { isLoading: isLoadingPostBankBindSave }] =
    usePostBankBindSaveMutation();

  // NOTICE: Pakistan
  // NOTE: 綁定銀行卡
  const [postBankBindSaveToPK, { isLoading: isLoadingPostBankBindSaveToPK }] =
    usePostBankBindSaveToPKMutation();

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
  const [
    triggerPostBankBindSaveToPKMutation,
    { isLoading: isPostBankBindSaveToPKMutationLoading },
  ] = usePostBankBindSaveToPKMutation();

  const navigate = useNavigate();
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  const bindBankCardNavigator = {
    [AllCountryIdentityName.IN]: 'Add A New Card',
    [AllCountryIdentityName.PK]: 'Add New Card',
    [AllCountryIdentityName.MX]: 'Bank information',
    [AllCountryIdentityName.PH]: 'Add a New Wallet',
    [AllCountryIdentityName.BN]: 'Add A New Card',
  }[environment.country] || 'Add A New Card';
  
  return (
    <div className="overflow-auto">
      {isShowNavigation() && (
        <Navigation
          title={t(bindBankCardNavigator)}
          back={() => {
            navigate(-1);
          }}
        />
      )}
      <PageContent className="py-0">
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
                isPostBankBindSaveToPKMutationLoading={
                  isPostBankBindSaveToPKMutationLoading
                }
                triggerPostBankBindSaveToPKMutation={
                  triggerPostBankBindSaveToPKMutation
                }
                triggerGetBindCardDropListQuery={
                  triggerGetBindCardDropListQuery
                }
                bindCardDropListData={bindCardDropListData}
                cardholderName={cardholderName ?? ''}
              />
            ),
            [MexicoCountry.country]: (
              <MexicoBindBankAccountPage
                isLoadingPostBankBindSaveToPK={isLoadingPostBankBindSaveToPK}
                postBankBindSaveToPK={postBankBindSaveToPK}
                isPostBankBindSaveToPKMutationLoading={
                  isPostBankBindSaveToPKMutationLoading
                }
                triggerPostBankBindSaveToPKMutation={
                  triggerPostBankBindSaveToPKMutation
                }
                triggerGetBindCardDropListQuery={
                  triggerGetBindCardDropListQuery
                }
                bindCardDropListData={bindCardDropListData}
                cardholderName={cardholderName ?? ''}
              />
            ),
            [PhilippinesCountry.country]: <PhilippinesBindBankAccountPage />,
          },
          <PakistanBindBankAccountPage
            isLoadingPostBankBindSaveToPK={isLoadingPostBankBindSaveToPK}
            postBankBindSaveToPK={postBankBindSaveToPK}
            isPostBankBindSaveToPKMutationLoading={
              isPostBankBindSaveToPKMutationLoading
            }
            triggerPostBankBindSaveToPKMutation={
              triggerPostBankBindSaveToPKMutation
            }
            triggerGetBindCardDropListQuery={triggerGetBindCardDropListQuery}
            bindCardDropListData={bindCardDropListData}
            cardholderName={cardholderName ?? ''}
          />
        )}
      </PageContent>
    </div>
  );
};

export default BindBankCardPage;
