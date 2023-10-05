import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../application/getToken';
import Modal from '../../../../core-components/Modal';
import { Button } from '../../../../core-components/Button';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import { i18nExtendConfirmModal } from '../../translations';

const PhilippinesExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(i18nExtendConfirmModal.namespace);
  return (
    <Modal>
      <div className="py-4 px-6">
        <div className="text-ctext-primary font-bold">{t('Extend')}</div>
        <div className="text-ctext-secondary my-4 text-sm font-medium">
          <div>
            {t(
              'Extensions are intended for situations where you are genuinely experiencing financial difficulties and are unable to fully repay the amount owed.'
            )}
          </div>
          <div className="mt-3">
            {t(
              'We recommend that you prioritize full repayment when possible for a higher credit limit.'
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            text={t('Next Time')}
            outlineTheme="round"
            type="ghost"
            ghostTheme="disable"
            onClick={() => navigate(-1)}
          />
          <Button
            text={t('Go Extension')}
            outlineTheme="round"
            onClick={() => {
              navigate(
                `${
                  PageOrModalPathEnum.RepaymentDetailPage
                }/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`,
                {
                  state: {
                    currentData: location.state,
                  },
                }
              );
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PhilippinesExtendConfirmModal;
