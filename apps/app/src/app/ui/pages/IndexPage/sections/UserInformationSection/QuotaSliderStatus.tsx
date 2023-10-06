import cx from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import { environment } from '../../../../../../environments/environmentModule/environment';
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
      props.state.order.state === ORDER_STATE.hasOverdueOrder,
      props.state.riskControl.state === RISK_CONTROL_STATE.order_reject,
      props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able,
      props.state.riskControl.state ===
        RISK_CONTROL_STATE.expired_refresh_over_3,
      props.state.riskControl.state === RISK_CONTROL_STATE.empty_quota,
    ].some((item) => item === true);
  }, [
    props.state.user.state,
    props.state.order.state,
    props.state.riskControl.state,
  ]);

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
      setCurrentQuotaLabelValue(
        formatPrice(props.state.indexAPI?.quotaBar.current || 0)
      );
      setMaxQuotaValue(formatPrice(props.state.indexAPI?.quotaBar.max || 0));
      setDisableQuotaBar(false);
      props.setQuotaBarTargetPrice(props.state.indexAPI?.quotaBar.current || 0);
    }
  }, [disableQuotaSlider, props.state.indexAPI?.quotaBar]);

  // NOTE: 與 Parent 溝通
  useEffect(() => {
    props.setQuotaBarTargetPrice(currentQuotaValue);
  }, [currentQuotaValue]);

  // const isMinAndMaxEqual = props.state.indexAPI?.quotaBar.max === props.state.indexAPI?.quotaBar.min;
  // const disableSliderDragging = isMinAndMaxEqual ? isMinAndMaxEqual : disableQuotaBar;

  return (
    <div
      className={'mb-4 text-center'}
      data-testing-id={'quotaSlider'}
      data-testing-disable={disableQuotaSlider}
    >
      <div className={'h-[80px]'}>
        <div className={'mb flex flex-col items-center justify-center'}>
          <div className="mb-2 flex w-full flex-col justify-between">
            <div className="text-left text-sm text-white">
              You can get up to
            </div>
            <div className="text-right text-2xl font-bold text-white">
              {environment.currency}
              <span data-testing-id="current-quota-value">
                {' '}
                {currentQuotaLabelValue}
              </span>{' '}
              / <span data-testing-id="max-quota-value">{maxQuotaValue}</span>
            </div>
          </div>

          <div
            className="slider mb-1"
            data-testing-disable={disableQuotaSlider}
          >
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
              min={
                props.state.indexAPI?.quotaBar.steps &&
                props.state.indexAPI?.quotaBar.steps.length > 0
                  ? props.state.indexAPI?.quotaBar?.steps[0]
                  : props.state.indexAPI?.quotaBar.min || 0
              }
              max={props.state.indexAPI?.quotaBar.max || 0}
              step={props.state.indexAPI?.quotaBar.serial || 0}
              value={currentQuotaValue}
              onAfterChange={(value: any, index: any) => {
                const steps = props.state.indexAPI?.quotaBar.steps;
                if (typeof steps === 'undefined' || steps.length === 0) return;

                // NOTE: only steps
                let newValue = value;
                const direction = value > currentQuotaValue ? 'right' : 'left';
                for (let index = steps.length - 1; index >= 0; index--) {
                  if (value >= steps[index]) {
                    if (value === steps[index] || direction === 'left') {
                      newValue = steps[index];
                    } else {
                      const stepsIndex =
                        index + 1 >= steps.length ? steps.length : index + 1;
                      newValue = steps[stepsIndex];
                    }
                    break;
                  } else if (value <= steps[0]) {
                    newValue = steps[0];
                    setCurrentQuotaValue(steps[0]);
                  }
                }
                setCurrentQuotaValue(newValue);
                const quotaValue = isNaN(newValue) ? 0 : newValue;
                setCurrentQuotaValue(quotaValue);
                setCurrentQuotaLabelValue(formatPrice(quotaValue));
              }}
              onChange={(value: any, index: any) => {
                //NOTE: only non steps
                const steps = props.state.indexAPI?.quotaBar.steps;
                if (steps === undefined || steps.length === 0) {
                  setCurrentQuotaValue(value);
                  const quotaValue = isNaN(value) ? 0 : value;
                  setCurrentQuotaValue(quotaValue);
                  setCurrentQuotaLabelValue(formatPrice(quotaValue));
                }
              }}
            />
          </div>

          <div className="mt-2 flex w-full flex-row justify-between">
            <span className="text-xs text-white">MIN</span>
            <span className="text-xs text-white">MAX</span>
          </div>
        </div>

        {/*NOTE: ExclusiveLoanOffer*/}
        <div
          className={
            'relative top-1 rounded-lg bg-white px-1 py-2 shadow-md shadow-gray-300'
          }
        >
          <span className={'text-ctext-primary pr-2 text-sm'}>
            Exclusive Personal Loan offer
          </span>
          <span
            data-testing-id={'quota-countdown'}
            className={`${
              props.countdown === '00:00:00'
                ? 'text-cstate-disable-main'
                : 'text-primary-main'
            } text-sm font-bold`}
          >
            {props.countdown}
          </span>
        </div>
      </div>
    </div>
  );
};
