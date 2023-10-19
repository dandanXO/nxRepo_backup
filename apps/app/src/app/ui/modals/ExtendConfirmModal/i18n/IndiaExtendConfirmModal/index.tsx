import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { getToken } from '../../../../../application/getToken';
import { getOrderNo } from '../../../../../externel/window/querystring/getOrderNo';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import { Button } from '../../../../core-components/Button';
import Modal from '../../../../core-components/Modal';
import { i18nExtendConfirmModal } from '../../translations';

const IndiaExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("ExtendConfirmModal.location.state", location.state);
  const { t } = useTranslation(i18nExtendConfirmModal.namespace);

  return (
    <Modal className={`text-ctext-primary`}>
      <div className="p-4">
        <div className="text-xl font-bold">{t('Extend')}</div>
        <div className="my-5 text-sm font-bold leading-tight">
          {t(
            'Extensions are intended for situations where you are genuinely experiencing financial difficulties and are unable to fully repay the amount owed.'
          )}
        </div>
        <div className="mb-4 text-sm font-bold leading-tight">
          {t(
            'We recommend that you prioritize full repayment when possible for a higher credit limit.'
          )}
        </div>
        <div className={`flex flex-col`}>
          <Button
            className={`mb-2 w-full`}
            text={t('Got It And Go Extension')}
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
          <Button
            type={'ghost'}
            ghostTheme={'tertiary'}
            className={`w-full`}
            text={'Next time'}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default IndiaExtendConfirmModal;