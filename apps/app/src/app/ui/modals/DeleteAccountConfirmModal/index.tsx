import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../core-components/Button';
import Modal from '../../core-components/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore';
import { ORDER_STATE } from '../../../domain/order/ORDER_STATE';
import {getToken, removeTokenFromLocalStorage} from '../../../application/getToken';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { useDeleteUserMutation } from '../../../externel/backend/rtk';
import { AndroidPage } from '../../../modules/window/IWindow';
import {GlobalAppMode} from "../../../application/GlobalAppMode";
import {isInApp} from "../../../device/isInApp";
import {alertModal} from "../../components/alertModal";
import {SentryModule} from "../../../modules/sentry";
import {select} from "redux-saga/effects";
import {userInfoPersistence} from "../../../persistant/UserInfoPersistence";

const DeleteAccountConfirmModal = () => {
    const navigate = useNavigate();
    const orderState = useSelector((state: RootState) => state.indexPage.order.state);
    const [deleteUser, { isSuccess: isDeteleUserSuccess, isLoading: isUserDeleting, }] = useDeleteUserMutation();

    const Content = () => {
      const appName: string =  useSelector((state: RootState) => state.app.appName);

      // NOTICE: 尚有未還的訂單，無法刪除帳號
        if (orderState === ORDER_STATE.normal || orderState === ORDER_STATE.hasInComingOverdueOrder || orderState === ORDER_STATE.hasOverdueOrder) {
            return (<div className='py-5 px-4'>
                <div className='font-bold text-xl text-ctext-primary mb-5'>Delete Account</div>
                <div className='text-sm text-ctext-secondary mb-5'>Sorry, you cannot delete your account directly as there are unpaid orders associated with it.</div>
                <div className='text-sm text-ctext-secondary mb-5'>If you have any questions or concerns, please contact our customer service for assistance.</div>
                <Button
                    onClick={() => {
                        navigate(`${PageOrModalPathEnum.AccountVerificationPage}?token=${getToken()}`);
                    }}
                    text={'OK'}
                />
            </div>)
        } else {
            return (
              <div className='py-5 px-4'>
                <div className='font-bold text-xl text-ctext-primary mb-5'>Thank You</div>
                <div className='text-sm text-ctext-secondary mb-3'>This account no longer exists.</div>
                <div className='text-sm text-ctext-secondary mb-3'>It will take 7 days for the account to be completely deleted.</div>
                <div className='text-sm text-ctext-secondary mb-3'>If you need to log in again, please wait until the deletion is complete.</div>
                <div className='text-sm text-ctext-secondary mb-5'>Hope to see you again!</div>

                <Button
                    onClick={() => {
                        // NOTICE: refactor me
                        let collectMessage = "";
                        let message = "";
                        // console.log('[app] GlobalAppMode', GlobalAppMode.mode);
                        deleteUser(null).unwrap().then(() => {
                            navigate(`${PageOrModalPathEnum.LoginPage}`);
                            if (GlobalAppMode.mode === 'IndexWebview') {
                                if (window['IndexTask'] && window['IndexTask']['navToPage'] && isInApp()) {
                                    window['IndexTask']['navToPage'](AndroidPage.LOGIN);
                                } else {
                                  message = "Error: APP:406"
                                  collectMessage = "Call Android IndexTask.navToPage unsuccessfully";
                                }
                            } else if(GlobalAppMode.mode === "SimpleWebView") {
                              message = "Error: APP:407"
                              collectMessage = "注意: SimpleWebView 不會有此 flow";
                            } else if(GlobalAppMode.mode === "PureH5") {
                              removeTokenFromLocalStorage();
                              userInfoPersistence.clearPhone();
                              // NOTE:
                              navigate(`${PageOrModalPathEnum.LoginPage}?appName=${appName}`);
                            }
                        }).catch((err) => {
                            navigate(`${PageOrModalPathEnum.AccountVerificationPage}?token=${getToken()}`);
                        }).finally(() => {
                          if(collectMessage) {
                            SentryModule.captureException("")
                          }
                          if(message) {
                            alertModal(message)
                          }
                        })
                    }}
                    text={'Confirm'}
                />
              </div>
            )
        }
    }

    return (
        <Modal>
            <Content />
        </Modal>
    );
};

export default DeleteAccountConfirmModal;
