import { RootState } from 'apps/app/src/app/reduxStore';
import {
  InitialStateType,
  modalSlice,
} from 'apps/app/src/app/reduxStore/modalSlice';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '../../../../core-components/Button';
import ListItem from '../../../../core-components/ListItem';
import Modal from '../../../../core-components/Modal';
import { BindBankcardAction } from '../../../../pages/BindBankCardPage/userUsecaseSaga/bindBankcardAction';

interface IConfirmBindBankCardModal {
  state?: InitialStateType['bindBankcardModal'];
}
const PakistanConfirmBindBankCardModal = ({
  state,
}: IConfirmBindBankCardModal) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);

  return (
    <Modal>
      <div className="py-6 px-4">
        <div className="text-ctext-primary mb-6 text-base font-bold">
          {t('Confirm Payment Information')}
        </div>
        <ListItem
          className="mb-3"
          title={t('Payment Method')}
          text={state?.paymentMethod === 0 ? 'Mobile Wallet' : 'Bank Card'}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
        />
        {state?.paymentMethod === 1 && (
          <>
            <ListItem
              className="mb-3"
              title={t('Cardholder Name')}
              text={state?.cardholderName ?? ''}
              titleColor="text-ctext-secondary"
              textColor="text-ctext-primary w-[150px] text-right"
            />
            <ListItem
              className="mb-3"
              title={t('Bank Name')}
              text={state?.bankName ?? ''}
              titleColor="text-ctext-secondary"
              textColor="text-ctext-primary w-[150px] text-right"
            />
            <ListItem
              className="mb-3"
              title={t('Account Number')}
              text={state?.bankAccNr ?? ''}
              titleColor="text-ctext-secondary"
              textColor="text-ctext-primary w-[150px] text-right"
            />
          </>
        )}
        {state?.paymentMethod === 0 && (
          <>
            <ListItem
              className="mb-3"
              title={t('Mobile Wallet')}
              text={state?.walletName ?? ''}
              titleColor="text-ctext-secondary"
              textColor="text-ctext-primary"
            />
            <ListItem
              className="mb-3"
              title={t('Holder Name')}
              text={state?.cardholderName ?? ''}
              titleColor="text-ctext-secondary"
              textColor="text-ctext-primary"
            />
            <ListItem
              className="mb-3"
              title={t('Account Number')}
              text={state?.mobileWalletAccount ?? ''}
              titleColor="text-ctext-secondary"
              textColor="text-ctext-primary"
            />
          </>
        )}
        <div className={`mt-6 flex flex-row`}>
          <Button
            className={`mr-1 w-full`}
            type={'ghost'}
            ghostTheme={'tertiary'}
            text={t('Cancel')}
            onClick={() =>
              dispatch(
                modalSlice.actions.updatebindBankcardModal({
                  ...modalState.bindBankcardModal,
                  show: false,
                })
              )
            }
          />
          <Button
            className={`ml-1 w-full`}
            text={t('Confirm')}
            primaryTypeGradient={true}
            disable={modalState.bindBankcardModal.isProcessing}
            onClick={() => {
              dispatch(
                BindBankcardAction.user.bindBankcardSaveAction({
                  ...modalState.bindBankcardModal,
                  confirm: true,
                })
              );
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PakistanConfirmBindBankCardModal;
