import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../../reduxStore';
import {
  InitialStateType,
  modalSlice,
} from '../../../../../reduxStore/modalSlice';
import ListItem from '../../../../components/ListItem';
import Modal from '../../../../components/Modal';
import { Button } from '../../../../components/layouts/Button';
import { i18nConfirmBindBankCardModal } from '../translations';

interface IPhilippinesConfirmBindBankCardModalProps {
  state?: InitialStateType['bindBankcardModal'];
}

const ListItemTitleStyle = 'text-ctext-secondary font-bold text-sm';
const ListItemTextStyle = 'text-ctext-primary font-medium text-sm';

const PhilippinesConfirmBindBankCardModal = ({
  state,
}: IPhilippinesConfirmBindBankCardModalProps) => {
  const { t } = useTranslation(i18nConfirmBindBankCardModal.namespace);

  const modalState = useSelector((state: RootState) => state.model);
  const dispatch = useDispatch();

  return (
    <Modal outlineTheme="round">
      <div className="py-6 px-7">
        <div className="text-ctext-primary mb-4 text-base font-bold">
          {t('Confirm Payment Information')}
        </div>
        <ListItem
          className="mb-3"
          title={t('ePayment')}
          text={state?.walletName}
          titleColor={ListItemTitleStyle}
          textColor={ListItemTextStyle}
        />
        <ListItem
          className="mb-3"
          title={t('holderName')}
          text={state?.holderName}
          titleColor={ListItemTitleStyle}
          textColor={ListItemTextStyle}
        />
        <ListItem
          className="mb-3"
          title={t('Account Number')}
          text={state?.mobileWalletAccount}
          titleColor={ListItemTitleStyle}
          textColor={ListItemTextStyle}
        />
        <div className="mt-4 flex flex-row gap-2">
          <Button
            text={t('Cancel')}
            type="ghost"
            onClick={() =>
              dispatch(
                modalSlice.actions.updatebindBankcardModal({
                  ...modalState.bindBankcardModal,
                  show: false,
                })
              )
            }
          />
          <Button text={t('Confirm')} />
        </div>
      </div>
    </Modal>
  );
};

export default PhilippinesConfirmBindBankCardModal;
