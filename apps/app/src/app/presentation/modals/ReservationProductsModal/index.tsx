import { useNavigate } from 'react-router';
import { Button } from '../../components/layouts/Button';
import Modal from '../../components/Modal';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { RootState } from '../../../reduxStore';
import { LoanAgreementModal } from '../QRLoanAgreementModal';

const ReservationProductsModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalState = useSelector((state: RootState) => state.model);

    const handleClose = () => {
        dispatch(modalSlice.actions.updateStarRatingSuccessModal({ show: false }));
    }

    const handleOK = () => {
        navigate(`${PagePathEnum.IndexPage}?token=${getToken()}`);
        handleClose();
    }

    return (
        <div>
            <Modal className='relative'>
                <div className=' p-4 flex flex-col justify-center items-center'>
                    <div className='text-base font-bold text-ctext-primary mb-4'>Good News</div>
                    <div className='text-sm text-left'>Congratulations! Your credit has been upgraded! We have selected some excellent options for you. Please choose the product you want to reserve based on your needs</div>
                    <div className='border border-solid border-cstate-disable-main mt-3 mb-5 w-full rounded-lg p-4'>
                        <div className='text-base'>Maximum Amount</div>
                        <div className='text-2xl font-bold'>11,000/16,000</div>
                    </div>
                    <div className={`mb-3 flex flex-row w-full`}>
                        <div className={`mr-1.5 w-full`}>
                            <Button
                                onClick={() => {
                                    dispatch(modalSlice.actions.updateReservationProductsModalgModal({ show: false }));
                                    //   if (isRepayTypesFetching) return;
                                    // navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, { state: { orderNo } });
                                }}
                                text={'Cancel'}
                                type={'ghost'}
                                ghostTheme={'tertiary'}
                        
                            />
                        </div>
                        <div className={` ml-1.5 w-ful whitespace-nowrap`}>
                            <Button
                                onClick={() => {
                                    // 
                                }}
                                text={'Reserve Application'} />
                        </div>
                    </div>
                    <div className={`text-left text-xs text-ctext-secondary`}>
                        <div>Notes:</div>
                        <ul className="list-outside list-decimal pl-3 pt-1">
                            <li>Maintaining good repayment behavior allows us to continue offering high-value, low-interest products.</li>
                            <li>Multiple booking requests will be automatically accommodated, and the final outcome will depend on the audit results.</li>
                            <li>Once the reservation orders are approved, the disbursement will be made directly.</li>
                            <li>After the reservation application is successful, you can view it on the "Payment" page.</li>
                            <li>By continuing, you agree and acknowledge the  
                                <a className={'text-blue-500 underline'} onClick={() => {
                                    dispatch(
                                        modalSlice.actions.updateLoanAgreementModal({
                                            show: true,
                                        })
                                    );
                                }}> Loan Agreement
                                </a> 
                                carefully.
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>
            {modalState.loanAgreementModal.show &&
                <LoanAgreementModal onClose={() => {
                    dispatch(
                        modalSlice.actions.updateLoanAgreementModal({
                            show: false,
                        })
                    );
                }} />
            }
        </div>
    );
};

export default ReservationProductsModal;

