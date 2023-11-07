import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { getToken } from '../../../../../application/getToken';
import { getOrderNo } from '../../../../../externel/window/querystring/getOrderNo';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import { Button } from '../../../../core-components/Button';
import Modal from '../../../../core-components/Modal';
import { i18nExtendConfirmModal } from '../../translations';

const PakistanExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(i18nExtendConfirmModal.namespace);

  return (
    <Modal>
      <div className={`p-4`}>
        <div className="text-xl font-bold">{t('Extend')}</div>
        <div className="my-6 font-bold leading-tight">
          {t(
            'Extensions are intended for situations where you are genuinely experiencing financial difficulties and are unable to fully repay the amount owed.'
          )}
        </div>
        <div className="mb-6 font-bold leading-tight">
          {t(
            'We recommend that you prioritize full repayment when possible for a higher credit limit.'
          )}
        </div>
        <div className={`flex flex-row `}>
          <Button
            type={'ghost'}
            text={t('Next time')}
            className={`mr-1 w-full`}
            onClick={() => {
              navigate(
                `${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`,
                {
                  state: {
                    currentData: location.state,
                  },
                  replace: true
                }
              );
            }}
          />
          <Button
            primaryTypeGradient={true}
            className={`ml-1 w-full`}
            text={t('Go Extension')}
            onClick={() => {
              navigate(
                `${
                  PageOrModalPathEnum.RepaymentDetailPage
                }/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`,
                {
                  state: {
                    currentData: location.state,
                  },
                  replace: true
                }
              );
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PakistanExtendConfirmModal;
