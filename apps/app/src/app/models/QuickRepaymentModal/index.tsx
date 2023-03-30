import {CloseButton} from "../../components/layouts/CloseButton";
import {Horizontal} from "../../components/layouts/Horizontal";
import {Product} from "../../pages/IndexPage/sections/RecommendedProductsSection/Product";
import {MdExpandLess, MdExpandMore} from "react-icons/all";
import {Button} from "../../components/layouts/Button";
import {useCallback, useState} from "react";
import {IndexPageProps} from "../../store";
import {FinalProductType} from "../../pages/IndexPage";

type Props = IndexPageProps;

export const QuickRepaymentModal = (props: Props) => {
  const [expandBankcard, setExpandBankcard] = useState(false);
  const onClickExpandBankcard = useCallback(() => {
    setExpandBankcard(!expandBankcard)
  }, [expandBankcard]);

  return (
    <div className={"quick-repayment-modal z-10 w-screen h-screen bg-white p-4 sticky top-0 bottom-0 flex flex-col"}>
      <CloseButton/>
      <div className={"header"}>
        <div className={"text-xl font-medium"}>My Loan Orders</div>
      </div>
      <div className={"summary flex-1"}>
        <div className={"flex flex-col"}>
          <div className={"text-md font-medium"}>Summary Details</div>
          <div className={"item-list"}>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Loan Amount</div>
              <div className={"value"}>₹ 6,400.00</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Interest</div>
              <div className={"value"}>₹ 0.00</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Processing Fee</div>
              <div className={"value"}>₹ 1,472.00</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Service Charge</div>
              <div className={"value"}>₹ 128.00</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Disbursal Amount</div>
              <div className={"value"}>₹ 4,800.00</div>
            </div>
            <div className={"item font-light flex flex-row justify-between"}>
              <div className={"key"}>Repayment Date</div>
              <div className={"value"}>03-25-2023</div>
            </div>
          </div>
        </div>
      </div>

      <Horizontal/>

      <div className={"products "}>
        <div className={"text-md font-medium mb-2"}>Your Products</div>
        <div className={"flex flex-col h-[200px] overflow-auto"}>
          {props.state.indexAPI?.products.map(((product, index) => {
            const finalProduct: FinalProductType = {
              ...product,
              calculating: {
                finalLoanPrice: 0,
                interestPrice: 0,
                terms: 0,
                disbursalPrice: 0,
                dueDate: "",
              }
            };
            return (
              <Product key={index} product={finalProduct}/>
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

        <div className={"text-xs font-light text-gray-400 mb-2"}>By continuing, I have read and agree
          <span className={"text-blue-500 underline"}> Loan Agreement </span> carefully.</div>
        <Button text={"Confirm"} bgColor={"bg-[#F58B10]"}/>

      </div>


    </div>
  )
}
