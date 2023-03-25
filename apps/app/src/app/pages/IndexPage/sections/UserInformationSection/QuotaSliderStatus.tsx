import ReactSlider from "./ReactSlider";
import {useEffect, useRef, useState} from "react";
import {formatPrice} from "../../../../modules/formatPrice";
import {IndexPageProps} from "../../../../store";

type Props = IndexPageProps;

export const QuotaSliderStatus = (props: Props) => {
  const [currentQuotaValue, setCurrentQuotaValue] = useState(0);

  useEffect(() => {
    setCurrentQuotaValue(props.state.indexAPI?.quotaBar.current || 0);
  }, [props.state.indexAPI?.quotaBar])

  return (
    <div className={"mb-4 text-center"}>
      <div className={"h-[60px]"}>

        <div className={"flex flex-col justify-center items-center mb"}>
          <div className="w-full flex flex-row justify-between mb-2">
            <div className="text-white text-sm font-light">You can get up to</div>
            <div className="text-white font-medium">₹ {formatPrice(currentQuotaValue)} / ${formatPrice(props.state.indexAPI?.quotaBar.max || 0)}</div>
          </div>

          <div className="slider mb-1">
            <ReactSlider
              className="quota-slider"
              trackClassName="quota-slider-track"
              thumbClassName="quota-slider-thumb"
              thumbActiveClassName="active-quota-slider-thumb"
              renderThumb={(props: any, state: any) => {
                // console.log("props", props);
                // console.log("state", state);
                return (
                  <div {...props}>
                    <div className="quota-slider-thumb-inner"></div>
                  </div>
                )
              }}
              min={props.state.indexAPI?.quotaBar.min || 0}
              max={props.state.indexAPI?.quotaBar.max || 0}
              step={props.state.indexAPI?.quotaBar.serial || 0}
              value={currentQuotaValue}
              onChange={(value: any, index: any) => {
                setCurrentQuotaValue(value);
              }}
            />
          </div>

          <div className="w-full flex flex-row justify-between">
            <span className="text-white text-xs font-light">MIN</span>
            <span className="text-white text-xs font-light">MAX</span>
          </div>

        </div>

        {/*NOTE: ExclusiveLoanOffer*/}
        <div className={"p-2 bg-white rounded-lg relative top-1 flex flex-row justify-between shadow-md shadow-gray-300"}>
          <div>Exclusive Personal Loan offer</div>
          {/*TODO:*/}
          <div className={"text-orange-500"}>TODO: 13:20:29</div>
        </div>

      </div>
    </div>
  )
}
