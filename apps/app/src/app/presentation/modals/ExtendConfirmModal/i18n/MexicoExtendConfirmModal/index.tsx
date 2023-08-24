import { useTranslation, withTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../modules/querystring/getToken';
import Modal from '../../../../components/Modal';
import { Button } from '../../../../components/layouts/Button';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { i18nExtendConfirmModal } from '../../translations';

const MexicoExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(i18nExtendConfirmModal.namespace);
  return (
    <Modal outlineTheme={'round'}>
      <div className={`p-4`}>
        <div className="text-xl font-bold">{t('Extend')}</div>
        <div className="my-6 font-bold leading-tight">
          {t('Extensions are intended for situations where you are genuinely experiencing financial difficulties and are unable to fully repay the amount owed.')}
        </div>
        <div className="mb-6 font-bold leading-tight">
          {t('We recommend that you prioritize full repayment when possible for a higher credit limit.')}
        </div>
        <div className={`flex flex-row `}>
          <Button onClick={() => navigate(-1)} type={'ghost'} ghostTheme={'none'} text={t('Next time')} className={`mr-1 w-full`} />
          <Button outlineTheme={'round'} className={`ml-1 w-full whitespace-nowrap`} text={t('Go Extension')}
            onClick={() => {
              navigate(`${PagePathEnum.RepaymentDetailPage}/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                state: {
                  currentData: location.state,
                },
              });
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default MexicoExtendConfirmModal;
