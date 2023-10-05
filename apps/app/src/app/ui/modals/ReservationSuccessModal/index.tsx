import { useNavigate } from 'react-router';
import { Button } from '../../core-components/Button';
import Modal from '../../core-components/Modal';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { useDispatch } from 'react-redux';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { getToken } from '../../../application/getToken';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { i18nReservationSuccessModal } from './i18n/translations';
import { useTranslation } from 'react-i18next';
import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';

const ReservationSuccessModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOK = () => {
        dispatch(modalSlice.actions.updateReservationSuccessModal({ show: false }));
        navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`);

    }
    const { t } = useTranslation(i18nReservationSuccessModal.namespace);


    return (
        <Modal className='relative'>
            <div className='p-6 pb-4 flex flex-col justify-center items-center'>
                <div className='text-base font-bold text-ctext-primary mb-4'>{t('Reservation Success')}</div>
                <div className='text-sm text-ctext-primary mb-4 leading-none'>{t('Congratulations! Your reservation is successful.')} </div>
                <div className='text-sm text-ctext-primary mb-8 leading-none'>{t('After the order is confirmed, you can view it on the "Payment" page. The final outcome will be based on the audit results.')}</div>
                <Button text={t('OK')} onClick={handleOK} outlineTheme={environment.country === MexicoCountry.country ? 'round' : undefined} />
            </div>
        </Modal>
    );
};

export default ReservationSuccessModal;

