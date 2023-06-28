import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../components/layouts/Button';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore';
import { ORDER_STATE } from '../../../domain/order/ORDER_STATE';
import { getToken } from '../../../modules/querystring/getToken';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { useDeleteUserMutation } from '../../../api/rtk';
import { AppGlobal, isInApp } from '../../../persistant/nativeAppInfo';
import { AndroidPage } from '../../../modules/window/IWindow';

const DeleteAccountConfirmModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderState = useSelector((state: RootState) => state.indexPage.order.state);
    const [deleteUser, { isSuccess: isDeteleUserSuccess, isLoading: isUserDeleting, }] = useDeleteUserMutation();

    const Content = () => {

        if (orderState === ORDER_STATE.normal || orderState === ORDER_STATE.hasInComingOverdueOrder || orderState === ORDER_STATE.hasOverdueOrder) {
            return (<div className='py-5 px-4'>
                <div className='font-bold text-xl text-ctext-primary mb-5'>Delete Account</div>
                <div className='text-sm text-ctext-secondary mb-5'>Sorry, you cannot delete your account directly as there are unpaid orders associated with it.</div>
                <div className='text-sm text-ctext-secondary mb-5'>If you have any questions or concerns, please contact our customer service for assistance.</div>
                <Button
                    onClick={() => {
                        navigate(`${PagePathEnum.AccountVerificationPage}?token=${getToken()}`);
                    }}
                    text={'OK'}
                />
            </div>)
        } else {
            return (<div className='py-5 px-4'>
                <div className='font-bold text-xl text-ctext-primary mb-5'>Thank You</div>
                <div className='text-sm text-ctext-secondary mb-3'>This account no longer exists.</div>
                <div className='text-sm text-ctext-secondary mb-3'>It will take 7 days for the account to be completely deleted.</div>
                <div className='text-sm text-ctext-secondary mb-3'>If you need to log in again, please wait until the deletion is complete.</div>
                <div className='text-sm text-ctext-secondary mb-5'>Hope to see you again!</div>

                <Button
                    onClick={() => {
                        deleteUser(null).unwrap().then(() => {
                            navigate(`${PagePathEnum.LoginPage}`);
                            if (AppGlobal.mode === 'IndexWebview') {
                                if (window['IndexTask'] && window['IndexTask']['navToPage'] && isInApp()) {
                                    window['IndexTask']['navToPage'](AndroidPage.LOGIN);
                                }
                            }
                        }).catch((err) => {
                            navigate(`${PagePathEnum.AccountVerificationPage}?token=${getToken()}`);
                        })
                    }}
                    text={'Confirm'}
                />
            </div>)
        }
    }

    return (
        <Modal>
            <Content />
        </Modal>
    );
};

export default DeleteAccountConfirmModal;
