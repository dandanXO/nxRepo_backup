import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../../../components/layouts/Button';
import ListItem from '../../../../components/ListItem';
import Modal from '../../../../components/Modal';
import { InitialStateType, modalSlice } from 'apps/app/src/app/reduxStore/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'apps/app/src/app/reduxStore';
import { BindBankcardAction } from '../../../../pages/BindBankCardPage/userUsecaseSaga/bindBankcardAction';
import { useTranslation } from 'react-i18next';
import { i18nConfirmBindBankCardModal } from '../translations';
interface IConfirmBindBankCardModal {
    state?: InitialStateType['bindBankcardModal']
}
const MexicoConfirmBindBankCardModal = ({ state }: IConfirmBindBankCardModal) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const modalState = useSelector((state: RootState) => state.model);

    const ListItemTitleStlye = "text-ctext-secondary font-bold text-sm";
    const ListItemTextStlye = "text-ctext-primary w-[150px] text-right text-sm";
    const { t } = useTranslation(i18nConfirmBindBankCardModal.namespace);
    return (
        <Modal outlineTheme='round'>
            <div className='py-6 px-4'>
                <div className='text-base text-ctext-primary mb-4 font-bold'>{t('Confirm Payment Information')}</div>
                <ListItem
                    className='mb-3'
                    title={t('Payment method')}
                    text={state?.cardTypeName ?? ''}
                    titleColor={ListItemTitleStlye}
                    textColor={ListItemTextStlye}
                />
                <ListItem
                    className='mb-3'
                    title={t('Cardholder Name')}
                    text={state?.cardholderName ?? ''}
                    titleColor={ListItemTitleStlye}
                    textColor={ListItemTextStlye}
                />
                <ListItem
                    className='mb-3'
                    title={t('Bank Name')}
                    text={state?.bankName ?? ''}
                    titleColor={ListItemTitleStlye}
                    textColor={ListItemTextStlye}
                />
                <ListItem
                    className='mb-3'
                    title={t('Account Number')}
                    text={state?.bankAccNr ?? ''}
                    titleColor={ListItemTitleStlye}
                    textColor={ListItemTextStlye}
                />
                <div className={`flex flex-row mt-4`}>
                    <Button
                        className={`mr-1 w-full`}
                        type={'ghost'}
                        ghostTheme={'none'}
                        text={t('Cancel')}
                        onClick={() => dispatch(modalSlice.actions.updatebindBankcardModal({
                            ...modalState.bindBankcardModal,
                            show: false,
                        }))}
                    />
                    <Button
                        className={`ml-1 w-full`}
                        text={t('Confirm')}
                        outlineTheme={'round'}
                        primaryTypeGradient={true}
                        onClick={() => {
                            dispatch(BindBankcardAction.user.bindBankcardSaveAction({
                                ...modalState.bindBankcardModal,
                                confirm: true,
                            }));
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default MexicoConfirmBindBankCardModal;
