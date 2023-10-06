import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { MexicoCountry } from '@frontend/shared/domain';

import { getToken } from '../../../application/getToken';
import { getOrderNo } from '../../../externel/window/querystring/getOrderNo';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import Modal from '../../core-components/Modal';
import { i18nReservationSuccessModal } from './i18n/translations';

const ReservationSuccessModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOK = () => {
    dispatch(modalSlice.actions.updateReservationSuccessModal({ show: false }));
    navigate(
      `${
        PageOrModalPathEnum.RepaymentDetailPage
      }?token=${getToken()}&orderNo=${getOrderNo()}`
    );
  };
  const { t } = useTranslation(i18nReservationSuccessModal.namespace);

  return (
    <Modal className="relative">
      <div className="flex flex-col items-center justify-center p-6 pb-4">
        <div className="text-ctext-primary mb-4 text-base font-bold">
          {t('Reservation Success')}
        </div>
        <div className="text-ctext-primary mb-4 text-sm leading-none">
          {t('Congratulations! Your reservation is successful.')}{' '}
        </div>
        <div className="text-ctext-primary mb-8 text-sm leading-none">
          {t(
            'After the order is confirmed, you can view it on the "Payment" page. The final outcome will be based on the audit results.'
          )}
        </div>
        <Button
          text={t('OK')}
          onClick={handleOK}
          outlineTheme={
            environment.country === MexicoCountry.country ? 'round' : undefined
          }
        />
      </div>
    </Modal>
  );
};

export default ReservationSuccessModal;
