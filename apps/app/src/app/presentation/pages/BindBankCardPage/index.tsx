import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { environment } from '../../../../environments/environmentModule/environment';
import {
  useLazyGetBindCardDropListQuery,
  usePostBankBindSaveMutation,
  usePostBankBindSaveToPKMutation,
} from '../../../api/rtk';
import { renderByCountry } from '../../../modules/i18n';
import { isShowNavigation } from '../../../modules/window/isShowNavigation';
import { CustomPage } from '../../components/layouts/CustomPage';
import { Navigation } from '../../components/layouts/Navigation';
import { PageContent } from '../../components/layouts/PageContent';
import { IndiaBindBankAccountPage } from './i18nPage/IndiaBindBankAccountPage';
import { MexicoBindBankAccountPage } from './i18nPage/MexicoBindBankAccountPage';
import { PakistanBindBankAccountPage } from './i18nPage/PakistanBindBankAccountPage';
import PhilippinesBindBankAccountPage from './i18nPage/PhilippinesBindBankAccountPage';
import { i18nBankBindAccountPage } from './translations';

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

  return (
    <>
      {isShowNavigation() && (
        <Navigation
          title={
            environment.country !== MexicoCountry.country
              ? 'Add New Card'
              : (t('Bank information') as string)
          }
          back={() => {
            navigate(-1);
          }}
        />
      )}
      <PageContent>
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
    </>
  );
};

export default BindBankCardPage;
