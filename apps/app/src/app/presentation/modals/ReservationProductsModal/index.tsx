import { useNavigate } from 'react-router';
import { Button } from '../../components/layouts/Button';
import Modal from '../../components/Modal';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { RootState } from '../../../reduxStore';
import { LoanAgreementModal } from '../QRLoanAgreementModal';
import { Product } from '../../components/Product/Product';
import { useEffect, useState } from 'react';
import { FinalProductType } from '../../pages/IndexPage';
import { formatPrice } from '../../../modules/format/formatPrice';
import { ReservationAction } from './userUsecaseSaga/reservationAction';
import { modalInitialState } from '../../../reduxStore/modalSlice';
const ReservationProductsModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalState = useSelector((state: RootState) => state.model);

    const { availableAmount } = modalState.reservationProductsModal;

    const products = modalState.reservationProductsModal.products.map(i => {
        return {
            logoUrl: i.logoUrl,
            productId: i.productId,
            productName: i.productName,
            max: 0,
            min: 0,
            platformChargeFeeRate: 0,
            terms: 0,
            required: i.required,
            calculating: {
                finalLoanPrice: i.productAmount,
                terms: i.terms,
                disbursalPrice: i.disbursalAmount,
                dueDate: i.dueDate,
                interestPrice: 0,
            }
        };
    })

    const initSelectedProduct = products.filter(i => i.required);
    const [selectedProducts, setSelectedProducts] = useState(initSelectedProduct);
    const [productAmount, setProductAmount] = useState(initSelectedProduct[0].calculating.finalLoanPrice || 0)

    const handleProductSelection = (isChecked: boolean, product:any) => {
      if (isChecked) {
        setSelectedProducts((prevSelected) => [...prevSelected, product]);
      } else {
        setSelectedProducts((prevSelected) => prevSelected.filter((selected) => selected.productId !== product.productId));
      }
    };

    useEffect(()=>{
        const totalAmout = selectedProducts.reduce((total, product) => {
            return total + product.calculating.finalLoanPrice;
        }, 0)
        setProductAmount(totalAmout)
    },[selectedProducts])

    return (
        <div className='reservationProducts-modal'>
            <Modal className='h-full ' maskclassName={'py-5 px-5'}>
                <div className='p-4 flex flex-col items-center overflow-auto'>
                    <div className='text-base font-bold text-ctext-primary mb-4'>Good News</div>
                    <div className='text-sm text-left leading-none'>Congratulations! Your credit has been upgraded! We have selected some excellent options for you. Please choose the product you want to reserve based on your needs</div>
                    <div className='border border-solid border-cstate-disable-main mt-3 mb-5 w-full rounded-lg p-4'>
                        <div className='text-base'>Maximum Amount</div>
                        <div className='text-2xl font-bold'>{`${formatPrice(productAmount)}/${formatPrice(availableAmount)}`}</div>
                    </div>
                    <div className={`mb-3 flex flex-col w-full h-1/2 overflow-auto`}>
                        {products.map((product:any, index) => {
                            return (
                                <Product
                                    key={index}
                                    product={product}
                                    checkable={true}
                                    checkboxProps={{
                                        disable: product.required,
                                        checked: false,
                                        onClick: (isChecked) => handleProductSelection(isChecked, product),
                                    }}
                                />
                            )

                        })}
                    </div>
                    <div className={`mb-3 flex flex-row w-full`}>
                        <div className={`mr-1.5 w-full`}>
                            <Button
                                onClick={() => {
                                    dispatch(modalSlice.actions.updateReservationProductsModal({
                                        ...modalInitialState.reservationProductsModal
                                    }));
                                }}
                                text={'Cancel'}
                                type={'ghost'}
                                ghostTheme={'tertiary'}

                            />
                        </div>
                        <div className={` ml-1.5 w-full whitespace-nowrap`}>
                            <Button
                                onClick={() => {
                                    const reservationDetail = selectedProducts.map((product) => {
                                        return { applyAmount: product.calculating.finalLoanPrice, productId: product.productId }
                                    })
                                    dispatch(ReservationAction.user.reservationAction({
                                        confirm: true,
                                        reservationDetail,
                                    }));
                                }}
                                text={'Reserve Application'} />
                        </div>
                    </div>
                    <div className={`text-left text-xs text-ctext-secondary leading-none`}>
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

