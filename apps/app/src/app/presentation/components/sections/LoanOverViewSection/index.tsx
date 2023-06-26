import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import { environment } from '../../../../../environments/environment';
import { ORDER_STATE } from '../../../../domain/order/ORDER_STATE';
import { RISK_CONTROL_STATE } from '../../../../domain/risk/RISK_CONTROL_STATE';
import { formatPrice } from '../../../../modules/format/formatPrice';
import { IndexPageProps } from '../../../../reduxStore';

type Props = IndexPageProps;

export const LoanOverViewSection = (props: Props) => {
  const isReacquireCreditAmount =
    props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able 
    // props.state.order.state !== ORDER_STATE.reject
    // props.state.order.state !== ORDER_STATE.hasInComingOverdueOrder &&
    // props.state.order.state !== ORDER_STATE.hasOverdueOrder;
  const [options, setOptions] = useState<{
    series: ApexOptions['series'];
    options: ApexOptions;
  }>({
    series: [],
    options: {
      labels: [''],
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      fill: {
        colors: isReacquireCreditAmount ? ['#AAAAAA'] : ['#78CB4D'],
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 5,
            size: '70%',
            background: 'transparent',
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: 'front',
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          track: {
            background: '#E5E5E5',
          },
          dataLabels: {
            show: false,
            name: {
              show: true,
              color: '#888',
              fontSize: '13px',
            },
            value: {
              show: true,
              color: '#111',
              fontSize: '30px',
              formatter: function (val) {
                return String(val);
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    if (props.state.indexAPI) {
      let percent = (props.state.indexAPI?.availableAmount / props.state.indexAPI?.totalAmount) * 100;
      // NOTICE: availableAmount: 999000, totalAmount: 1000000, 算出來是 99.9，但畫面缺口基本上分辨不出來有缺口
      if (percent > 99 && percent < 100) {
        percent = 99;
      }
      setOptions({
        options: {
            ...options,
            fill: { colors: isReacquireCreditAmount ? ['#AAAAAA'] : ['#78CB4D']}
        },
        series: [percent],
      });
    }
  }, [props.state.indexAPI,isReacquireCreditAmount]);


  return (
    <div className={'text-ctext-primary'}>
      <div className={'mb-2 font-bold'} data-testing-id="loanOverView">Loan Over View</div>

      <div className={'flex w-full flex-row justify-center'}>
        <div className={'left relative'}>
          <div className="container relative">
            <Chart options={options.options} series={options.series} type="radialBar" width="160" height="160" />
            <div className={'absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center'}>
              <div className="text">
                <div className='font-bold text-sm mb-1.5'>
                  {environment.currency}{' '}
                  {isReacquireCreditAmount ? ' ***' :  props.state.indexAPI?.availableAmount}
                </div>
                <div className='font-bold text-xs'>Available</div>
                <div className='font-bold text-xs'>Balance</div>
              </div>
            </div>
          </div>
        </div>

        <div className={'right flex flex-col items-end justify-center'}>
          <div className={'used-amount flex flex-col items-start justify-end'}>
            <div className={'label flex flex-row items-center justify-between'}>
              <div className={'label-color mr-2 h-1.5 w-4 rounded bg-cstate-disable-main'}></div>
              <div className={'label-price font-light text-xs'}>Used Amount</div>
            </div>
            <div className={'price font-bold w-full pl-6 text-sm'}>
              {environment.currency}{' '}
              {formatPrice(props.state.indexAPI?.usedAmount || 0)}
            </div>
          </div>
          <div className={'total-amount flex flex-col justify-end mt-2'}>
            <div className={'label font-light text-xs'}>Total Amount</div>
            <div className={'price font-bold text-sm'}>
              {environment.currency}{' '}
              {isReacquireCreditAmount ? ' ***** ' : formatPrice(props.state.indexAPI?.totalAmount || 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
