import {AiOutlineFieldTime, GiPowderBag} from "react-icons/all"
import {IndexPageProps} from "../../../store";

type Props = IndexPageProps;

// TODO
export const LoanInformationSection = (props: Props) => {
  return (
    <div data-testing-id="adProductInfo" className={"ad flex flex-row justify-around"}>
      <div className={"flex flex-row"}>
        <div className={"flex flex-col justify-center"}>
          <div className={"mr-3"}>
            <GiPowderBag size={30}/>
          </div>
        </div>
        <div className={"info pt-1"}>
          <div className={"name"}>Interest rate</div>
          <div className={"value text-2xl"}>1.2-2.8%</div>
        </div>
      </div>
      <div className={"flex flex-row justify-center"}>
        <div className={"flex flex-col justify-center"}>
          <div className={"mr-3"}>
            <AiOutlineFieldTime size={30}/>
          </div>
        </div>
        <div className={"info pt-1"}>
          <div className={"name"}>Loan Term</div>
          <div className={"value text-2xl"}>91+ days</div>
        </div>
      </div>
    </div>
  )
}
