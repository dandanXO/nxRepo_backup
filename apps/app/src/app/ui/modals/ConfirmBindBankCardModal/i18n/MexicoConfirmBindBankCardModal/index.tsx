import { RootState } from 'apps/app/src/app/reduxStore';
import {
  InitialStateType,
  modalSlice,
} from 'apps/app/src/app/reduxStore/modalSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '../../../../core-components/Button';
import ListItem from '../../../../core-components/ListItem';
import Modal from '../../../../core-components/Modal';
import { BindBankcardAction } from '../../../../pages/BindBankCardPage/userUsecaseSaga/bindBankcardAction';
import { i18nConfirmBindBankCardModal } from '../translations';

interface IConfirmBindBankCardModal {
  state?: InitialStateType['bindBankcardModal'];
}
const MexicoConfirmBindBankCardModal = ({
  state,
}: IConfirmBindBankCardModal) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);

  const ListItemTitleStlye = 'text-ctext-secondary font-bold text-sm';
  const ListItemTextStlye = 'text-ctext-primary w-[150px] text-right text-sm';
  const { t } = useTranslation(i18nConfirmBindBankCardModal.namespace);
  return (
    <Modal outlineTheme="round" className="overflow-auto">
      <div className="overflow-auto py-6 px-4">
        <div className="text-ctext-primary mb-4 text-base font-bold">
          {t('Confirm Payment Information')}
        </div>
        <ListItem
          className="mb-3"
          title={t('Payment method')}
          text={state?.cardTypeName ?? ''}
          titleColor={ListItemTitleStlye}
          textColor={ListItemTextStlye}
        />
        <ListItem
          className="mb-3"
          title={t('Cardholder Name')}
          text={state?.cardholderName ?? ''}
          titleColor={ListItemTitleStlye}
          textColor={ListItemTextStlye}
        />
        <ListItem
          className="mb-3"
          title={t('Bank Name')}
          text={state?.bankName ?? ''}
          titleColor={ListItemTitleStlye}
          textColor={ListItemTextStlye}
        />
        <ListItem
          className="mb-3"
          title={t('Account Number')}
          text={state?.bankAccNr ?? ''}
          titleColor={ListItemTitleStlye}
          textColor={ListItemTextStlye}
        />
        <div className={`mt-4 flex flex-row`}>
          <Button
            className={`mr-1 w-full`}
            type={'ghost'}
            ghostTheme={'none'}
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
            outlineTheme={'round'}
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

export default MexicoConfirmBindBankCardModal;
