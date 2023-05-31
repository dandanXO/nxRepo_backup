import cx from 'classnames';
import React, { SetStateAction, useEffect, useMemo, useState } from 'react';

import { environment } from '../../../../../../environments/environment';
import { ORDER_STATE } from '../../../../../domain/order/ORDER_STATE';
import { RISK_CONTROL_STATE } from '../../../../../domain/risk/RISK_CONTROL_STATE';
import { USER_AUTH_STATE } from '../../../../../domain/user/USER_AUTH_STATE';
import { formatPrice } from '../../../../../modules/format/formatPrice';
import { IndexPageProps } from '../../../../../reduxStore';
import ReactSlider from './ReactSlider';

type Props = IndexPageProps & {
  setQuotaBarTargetPrice: React.Dispatch<React.SetStateAction<number>>;
  countdown: string;
};

export const QuotaSliderStatus = (props: Props) => {
  // TODO: refactor
  // NOTE: 是否禁用 quota slider
  const disableQuotaSlider = useMemo(() => {
    // NOTE: 符合其中條件就進用 Quota Slider
    return [
      props.state.user.state === USER_AUTH_STATE.authing,
      props.state.user.state === USER_AUTH_STATE.reject,
      props.state.order.state === ORDER_STATE.hasInComingOverdueOrder,
      props.state.order.state === ORDER_STATE.hasOverdueOrder,
      props.state.order.state === ORDER_STATE.reject,
      props.state.riskControl.state === RISK_CONTROL_STATE.empty_quota,
      props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able,
    ].some((item) => item === true);
  }, [props.state.user.state, props.state.order.state, props.state.riskControl.state]);

  const [currentQuotaValue, setCurrentQuotaValue] = useState(0);
  const [currentQuotaLabelValue, setCurrentQuotaLabelValue] = useState('');
  const [maxQuotaValue, setMaxQuotaValue] = useState('');
  const [disableQuotaBar, setDisableQuotaBar] = useState(false);
  // console.log("currentQuotaValue", currentQuotaValue)
  // console.log("maxQuotaValue", maxQuotaValue);


  useEffect(() => {
    // NOTE: 禁用 Quota Slider
    if (disableQuotaSlider) {
      setCurrentQuotaLabelValue('****');
      setMaxQuotaValue('****');
      setDisableQuotaBar(true);
      props.setQuotaBarTargetPrice(0);
    } else {
      // NOTE: 啟用 Quota Slider
      setCurrentQuotaValue(props.state.indexAPI?.quotaBar.current || 0);
      setCurrentQuotaLabelValue(formatPrice(props.state.indexAPI?.quotaBar.current || 0));
      setMaxQuotaValue(formatPrice(props.state.indexAPI?.quotaBar.max || 0));
      setDisableQuotaBar(false);
      props.setQuotaBarTargetPrice(props.state.indexAPI?.quotaBar.current || 0);
    }
  }, [disableQuotaSlider, props.state.indexAPI?.quotaBar]);

  // NOTE: 與 Parent 溝通
  useEffect(() => {
    props.setQuotaBarTargetPrice(currentQuotaValue);
  }, [currentQuotaValue]);

  return (
    <div className={'mb-4 text-center'}>
      <div className={'h-[60px]'}>
        <div className={'mb flex flex-col items-center justify-center'}>
          <div className="mb-2 flex w-full flex-row justify-between">
            <div className="text-sm font-light text-white">You can get up to</div>
            <div className="font-medium text-white">
              {environment.currency} {currentQuotaLabelValue} / {maxQuotaValue}
            </div>
          </div>

          <div className="slider mb-1">
            <ReactSlider
              className="quota-slider"
              trackClassName={cx({
                'quota-slider-track': !disableQuotaSlider,
                'quota-slider-track-disable': disableQuotaSlider,
              })}
              thumbClassName={'quota-slider-thumb'}
              thumbActiveClassName="active-quota-slider-thumb"
              renderThumb={(props: any, state: any) => {
                // console.log("props", props);
                // console.log("state", state);
                return (
                  <div {...props}>
                    <div
                      className={cx({
                        'quota-slider-thumb-inner': !disableQuotaSlider,
                        'quota-slider-thumb-inner-disable': disableQuotaSlider,
                      })}
                    ></div>
                  </div>
                );
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

          <div className="flex w-full flex-row justify-between">
            <span className="text-xs font-light text-white">MIN</span>
            <span className="text-xs font-light text-white">MAX</span>
          </div>
        </div>

        {/*NOTE: ExclusiveLoanOffer*/}
        <div className={'relative top-1 rounded-lg bg-white px-1 py-2 shadow-md shadow-gray-300'}>
          <span className={'pr-2'}>Exclusive Personal Loan offer</span>
          <span className={`${props.countdown === '00:00:00' ? 'text-slate-500' : 'text-orange-500'}`}>
            {props.countdown}
          </span>
        </div>
      </div>
    </div>
  );
};
