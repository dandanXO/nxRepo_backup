import {CloseButton} from "../../components/layouts/CloseButton";
import {Horizontal} from "../../components/layouts/Horizontal";
import {Product} from "../../pages/IndexPage/sections/RecommendedProductsSection/Product";
import {MdExpandLess, MdExpandMore} from "react-icons/all";
import {Button} from "../../components/layouts/Button";
import {Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";
import {IndexPageProps} from "../../usecaseFlow/store";
import {FinalProductsSummary, FinalProductType} from "../../pages/IndexPage";
import {formatPrice} from "../../modules/formatPrice";


type Props = IndexPageProps & {
  calculatingProducts: FinalProductType[];
  setQuickRepaymentSummaryModal: Dispatch<SetStateAction<boolean>>;
  calculatingSummary: FinalProductsSummary;
  confirmApply: () => void;
  setShowLoanAgreementModal: Dispatch<SetStateAction<boolean>>;
}

export const QuickRepaymentSummaryModal = (props: Props) => {
  const [expandBankcard, setExpandBankcard] = useState(false);
  const onClickExpandBankcard = useCallback(() => {
    setExpandBankcard(!expandBankcard)
  }, [expandBankcard]);

  const onClickClose = useCallback(() => {
    props.setQuickRepaymentSummaryModal(false);
  }, [])

  const onClickConfirmApply = useCallback(() => {
    props.setQuickRepaymentSummaryModal(false)
    props.confirmApply()
  }, [])

  const onClickLoanAgreement = useCallback(() => {
    props.setShowLoanAgreementModal(true);
  }, []);

  return (
    <div className={"quick-repayment-modal z-10 w-screen h-screen bg-white p-4 fixed top-0 bottom-0 flex flex-col"}>
      <div onClick={onClickClose}>
        <CloseButton/>
      </div>
      <div className={"header"}>
        <div className={"text-xl font-medium"}>My Loan Orders</div>
      </div>
      <div className={"summary flex-1"}>
        <div className={"flex flex-col"}>
          <div className={"text-md font-medium"}>Summary Details</div>
          <div className={"item-list"}>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Loan Amount</div>
              <div className={"value"}>₹ {formatPrice(props.calculatingSummary.loanAmount)}</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Interest</div>
              <div className={"value"}>₹ {formatPrice(props.calculatingSummary.interest)}</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Processing Fee</div>
              <div className={"value"}>₹ {formatPrice(props.calculatingSummary.processingFee)}</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Service Charge</div>
              <div className={"value"}>₹ {formatPrice(props.calculatingSummary.serviceCharge)}</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Disbursal Amount</div>
              <div className={"value"}>₹ {formatPrice(props.calculatingSummary.disbursalAmount)}</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Repayment Date</div>
              <div className={"value"}>{props.calculatingSummary.repaymentDate?.format("MM-DD-YYYY")}</div>
            </div>
          </div>
        </div>
      </div>

      <Horizontal/>

      <div className={"products "}>
        <div className={"text-md font-medium mb-2"}>Your Products</div>
        <div className={"flex flex-col h-[200px] overflow-auto"}>
          {props.calculatingProducts.map(((product, index) => {
            return (
              <Product key={index} product={product}/>
            )
          }))}
        </div>
      </div>

      <Horizontal/>

      <div className={"footer flex-1"}>

        <div className={"bankcard"}>
          <div className={"text-md font-medium"}>Bank Card</div>
          <div className={"flex flex-row justify-between"}>
            <div className={"card-number text-sm"}>**** **** **** 0000</div>
            <div className={"change text-gray-400 flex flex-row justify-between"} onClick={onClickExpandBankcard}>
              <div className={"flex flex-row"}>
                <span className={"font-light"}>change</span>
                {expandBankcard ? (
                  <MdExpandLess size={30} color={"#AAAAAA"}/>
                ) : (
                  <MdExpandMore size={30} color={"#AAAAAA"}/>
                )}
              </div>
            </div>
          </div>
        </div>

        <Horizontal/>

        <div className={"text-xs font-light text-gray-400 mb-2"}>
          <span>By continuing, I have read and agree</span>
          <span className={"text-blue-500 underline"} onClick={onClickLoanAgreement}> Loan Agreement </span>
          <span>carefully.</span>
        </div>

        <Button text={"Confirm"} bgColor={"bg-[#F58B10]"} onClick={onClickConfirmApply}/>

      </div>


    </div>
  )
}
