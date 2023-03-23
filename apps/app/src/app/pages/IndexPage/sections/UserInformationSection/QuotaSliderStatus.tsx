import ReactSlider from "./ReactSlider";
import {useState} from "react";
import {formatPrice} from "../../../../modules/formatPrice";

export const QuotaSliderStatus = () => {
  const [currentQuotaValue, setCurrentQuotaValue] = useState(6400);
  return (
    <div className={"mb-4"}>
      <div className={"h-[60px]"}>

        <div className={"flex flex-col justify-center items-center mb"}>
          <div className="w-full flex flex-row justify-between mb-2">
            <div className="text-white">You can get up to</div>
            <div className="text-white font-medium">₹ {formatPrice(currentQuotaValue)} / ${formatPrice(9600)}</div>
          </div>

          <div className="slider">
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
              min={0}
              max={9600}
              step={1000}
              value={currentQuotaValue}
              onChange={(value: any, index: any) => {
                setCurrentQuotaValue(value);
              }}
            />
          </div>

          <div className="w-full flex flex-row justify-between">
            <span className="text-white">MIN</span>
            <span className="text-white">MAX</span>
          </div>

        </div>

        {/*NOTE: ExclusiveLoanOffer*/}
        <div className={"p-2 bg-white rounded-lg relative top-1 flex flex-row justify-between shadow-md shadow-gray-300"}>
          <div>Exclusive Personal Loan offer</div>
          <div className={"text-orange-500"}>13:20:29</div>
        </div>

      </div>
    </div>
  )
}
