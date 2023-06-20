import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../../../components/layouts/Button';
import ListItem from '../../../../components/ListItem';
import Modal from '../../../../components/Modal';
import { InitialStateType, modalSlice } from 'apps/app/src/app/reduxStore/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'apps/app/src/app/reduxStore';
import { BindBankcardAction } from '../../../../pages/BindBankCardPage/userUsecaseSaga/bindBankcardAction';
interface IConfirmBindBankCardModal {
    state?: InitialStateType['bindBankcardModal']
}
const PakistanConfirmBindBankCardModal = ({ state }: IConfirmBindBankCardModal) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const modalState = useSelector((state: RootState) => state.model)

    return (
        <Modal>
            <div className='py-6 px-4'>
                <div className='text-base text-ctext-primary mb-6 font-bold'>Confirm Payment Information</div>
                <ListItem
                    className='mb-3'
                    title={'Payment Method'}
                    text={state?.paymentMethod === 0 ? 'Mobile Wallet' : 'Bank Card'}
                    titleColor="text-ctext-secondary"
                    textColor="text-ctext-primary"
                />
                {
                    state?.paymentMethod === 1 &&
                    <>
                        <ListItem
                            className='mb-3'
                            title={'Cardholder Name'}
                            text={state?.cardholderName ?? ''}
                            titleColor="text-ctext-secondary"
                            textColor="text-ctext-primary w-[150px] text-right"
                        />
                        <ListItem
                            className='mb-3'
                            title={'Bank Name'}
                            text={state?.bankName ?? ''}
                            titleColor="text-ctext-secondary"
                            textColor="text-ctext-primary w-[150px] text-right"
                        />
                        <ListItem
                            className='mb-3'
                            title={'Account Number'}
                            text={state?.bankAccNr ?? ''}
                            titleColor="text-ctext-secondary"
                            textColor="text-ctext-primary w-[150px] text-right"
                        />
                    </>
                }
                {
                    state?.paymentMethod === 0 &&
                    <>
                        <ListItem
                            className='mb-3'
                            title={'Mobile Wallet'}
                            text={state?.walletName ?? ''}
                            titleColor="text-ctext-secondary"
                            textColor="text-ctext-primary"
                        />
                        <ListItem
                            className='mb-3'
                            title={'Mobile Wallet Account'}
                            text={state?.mobileWalletAccount ?? ''}
                            titleColor="text-ctext-secondary"
                            textColor="text-ctext-primary"
                        />
                    </>
                }
                <div className={`flex flex-row mt-6`}>
                    <Button onClick={() => dispatch(modalSlice.actions.updatebindBankcardModal({
                        ...modalState.bindBankcardModal,
                        show: false,
                    }))} text={'Cancel'} className={`mr-1 w-full`} type={'ghost'} />
                    <Button
                        className={`ml-1 w-full`}
                        text={'Confirm'}
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

export default PakistanConfirmBindBankCardModal;
