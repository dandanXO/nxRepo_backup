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

    const products = [
        {
            "productId": 48,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-4424980256908184.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 3000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 1,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-4424980256908184.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 2000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 2,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 8000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 2,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 8000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 2,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 8000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 2,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 8000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 2,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 8000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 2,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 8000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        },
        {
            "productId": 2,
            "productName": "t01",
            "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            "min": 3000,
            "max": 10000,
            "terms": 7,
            "platformChargeFeeRate": 0,
            "postPlatformChargeFeeRate": 0.4,
            "calculating": {
                finalLoanPrice: 8000,
                interestPrice: 1000,
                terms: 7,
                disbursalPrice: 4500,
                dueDate: '10-03-2023'
            }
        }
    ]

    const [selectedProducts, setSelectedProducts] = useState<FinalProductType[]>([products[0]]);
    const [productAmount, setProductAmount] = useState(products[0].calculating.finalLoanPrice || 0)

    const handleProductSelection = (isChecked: boolean, product: FinalProductType) => {
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
                        <div className='text-2xl font-bold'>{`${formatPrice(productAmount)}/16,000`}</div>
                    </div>
                    <div className={`mb-3 flex flex-col w-full h-1/2 overflow-auto`}>
                        {products.map((product, index) => {
                            return (
                                <Product
                                    key={index}
                                    product={product}
                                    checkable={true}
                                    checkboxProps={{
                                        disable: index === 0,
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
                                    console.log('selectedProducts',selectedProducts)
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

