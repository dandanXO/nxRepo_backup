import { useLocation, useNavigate } from 'react-router';

import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../modules/querystring/getToken';
import { Button } from '../../../../components/layouts/Button';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import Modal from '../../../../components/Modal';
import { useTranslation } from 'react-i18next';
import { i18nExtendConfirmModal } from '../../translations';

const IndiaExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("ExtendConfirmModal.location.state", location.state);
  const { t } = useTranslation(i18nExtendConfirmModal.namespace);

  return (
    <Modal>
      <div className={`p-4`}>
        <div className="text-xl font-bold">{t('Extend')}</div>
        <div className="my-6 font-bold leading-tight">
          {t('Extensions are intended for situations where you are genuinely experiencing financial difficulties and are unable to fully repay the amount owed.')}
        </div>
        <div className="mb-4 font-bold leading-tight">
          {t('We recommend that you prioritize full repayment when possible for a higher credit limit.')}
        </div>
        <div className={`flex flex-col`}>
          <Button
            className={`mb-2 w-full`}
            text={t('Got it and go extension')}
            onClick={() => {
              navigate(`${PagePathEnum.RepaymentDetailPage}/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                state: {
                  currentData: location.state,
                },
              });
            }}
          />
          <Button type={'ghost'} ghostTheme={'tertiary'} className={`w-full`} text={t('Next time')} onClick={() => navigate(-1)} />
        </div>
      </div>
    </Modal>
  );
};

export default IndiaExtendConfirmModal;
