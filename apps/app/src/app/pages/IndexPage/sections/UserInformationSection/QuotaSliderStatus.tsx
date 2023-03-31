import ReactSlider from "./ReactSlider";
import React, {useEffect, useMemo, useState, SetStateAction} from "react";
import {formatPrice} from "../../../../modules/formatPrice";
import {IndexPageProps} from "../../../../usecaseFlow/store";
import {ORDER_STATE, RISK_CONTROL_STATE, USER_AUTH_STATE} from "../../../../usecaseFlow";
import {environment} from "../../../../../environments/environment";
import cx from "classnames";


type Props = IndexPageProps & {
  setQuotaBarTargetPrice: React.Dispatch<React.SetStateAction<number>>;
};

export const QuotaSliderStatus = (props: Props) => {
  const [currentQuotaValue, setCurrentQuotaValue] = useState(0);
  const [currentQuotaLabelValue, setCurrentQuotaLabelValue] = useState("");
  const [maxQuotaValue, setMaxQuotaValue] = useState("")
  const [disableQuotaBar, setDisableQuotaBar] = useState(false);
  // console.log("currentQuotaValue", currentQuotaValue)
  // console.log("maxQuotaValue", maxQuotaValue);

  useEffect(() => {
    setMaxQuotaValue(formatPrice(props.state.indexAPI?.quotaBar.max || 0));
  }, [props.state.indexAPI?.quotaBar.max])


  const disable = useMemo(() => {
    return [
      props.state.user.state === USER_AUTH_STATE.authing,
      props.state.user.state === USER_AUTH_STATE.reject,
      props.state.order.state === ORDER_STATE.hasInComingOverdueOrder,
      props.state.order.state === ORDER_STATE.hasOverdueOrder,
      props.state.order.state === ORDER_STATE.reject,
      props.state.riskControl.state === RISK_CONTROL_STATE.empty_quota,
    ].some(item => item === true);
  }, [props.state.user.state, props.state.order.state]);


  useEffect(() => {
    if(disable) {
      setCurrentQuotaLabelValue("****")
      setMaxQuotaValue("****")
      setDisableQuotaBar(true);
      props.setQuotaBarTargetPrice(0);
    } else {
      setCurrentQuotaValue(props.state.indexAPI?.quotaBar.current || 0)
      setCurrentQuotaLabelValue(formatPrice(props.state.indexAPI?.quotaBar.current || 0));
      setDisableQuotaBar(false);
      props.setQuotaBarTargetPrice(props.state.indexAPI?.quotaBar.current || 0);
    }
  }, [disable, props.state.indexAPI?.quotaBar])

  useEffect(() => {
    props.setQuotaBarTargetPrice(currentQuotaValue);
  }, [currentQuotaValue])

  return (
    <div className={"mb-4 text-center"}>
      <div className={"h-[60px]"}>

        <div className={"flex flex-col justify-center items-center mb"}>
          <div className="w-full flex flex-row justify-between mb-2">
            <div className="text-white text-sm font-light">You can get up to</div>
            <div className="text-white font-medium">{environment.currency} {currentQuotaLabelValue} / {maxQuotaValue}</div>
          </div>

          <div className="slider mb-1">
            <ReactSlider
              className="quota-slider"
              trackClassName={cx({
                "quota-slider-track" : !disable,
                "quota-slider-track-disable": disable,
              })}
              thumbClassName="quota-slider-thumb"
              thumbActiveClassName="active-quota-slider-thumb"
              renderThumb={(props: any, state: any) => {
                // console.log("props", props);
                // console.log("state", state);
                return (
                  <div {...props}>
                    <div className={cx({
                      "quota-slider-thumb-inner": !disable,
                      "quota-slider-thumb-inner-disable": disable,
                    })}></div>
                  </div>
                )
              }}
              disabled={disableQuotaBar}
              min={props.state.indexAPI?.quotaBar.min || 0}
              max={props.state.indexAPI?.quotaBar.max || 0}
              step={props.state.indexAPI?.quotaBar.serial || 0}
              value={currentQuotaValue}
              onChange={(value: any, index: any) => {
                // console.log("quota.value", value)
                setCurrentQuotaValue(value);
                setCurrentQuotaLabelValue(formatPrice(value));
              }}
            />
          </div>

          <div className="w-full flex flex-row justify-between">
            <span className="text-white text-xs font-light">MIN</span>
            <span className="text-white text-xs font-light">MAX</span>
          </div>

        </div>

        {/*NOTE: ExclusiveLoanOffer*/}
        <div className={"p-2 bg-white rounded-lg relative top-1 shadow-md shadow-gray-300"}>
          <span className={"pr-2"}>Exclusive Personal Loan offer</span>
          <span className={"text-orange-500"}>13:20:29</span>
        </div>

      </div>
    </div>
  )
}
