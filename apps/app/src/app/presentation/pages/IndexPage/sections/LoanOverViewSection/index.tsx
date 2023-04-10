import {IndexPageProps} from "../../../../../usecaseFlow/reduxStore";
import {formatPrice} from "../../../../../modules/formatPrice";
import Chart from "react-apexcharts";
import {useEffect, useRef, useState} from "react";
import {ApexOptions} from "apexcharts";
import {environment} from "../../../../../../environments/environment";

type Props = IndexPageProps;

export const LoanOverViewSection = (props: Props) => {
  const options = useRef<ApexOptions>();
  options.current = {
    labels: [""],
    states: {
      hover: {
        filter: {
          type: 'none',
        }
      },
    },
    fill: {
      colors: ["#78CB4D"]
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
            opacity: 0.5
          }
        },
        track: {
          background: "#E5E5E5",
        },
        dataLabels: {
          show: false,
          name: {
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            show: true,
            color: "#111",
            fontSize: "30px",
            formatter: function (val) {
              return String(val);
            },
          }
        }
      }
    },
  }
  const [series, setSeries] = useState<number[]>();

  useEffect(() => {
    if(props.state.indexAPI) {
      let percent = (props.state.indexAPI?.availableAmount / props.state.indexAPI?.totalAmount) * 100;
      // console.log("percent", percent);
      // NOTICE: availableAmount: 999000, totalAmount: 1000000, 算出來是 99.9，但畫面缺口基本上分辨不出來有缺口
      if(percent > 99) {
        percent = 99
      }
      setSeries([percent])
    }
  }, [props.state.indexAPI])

  return (
    <div>
      <div className={"font-medium mb-2"}>Loan Over View</div>

      <div className={"w-full flex flex-row justify-between"}>

        <div className={"left relative"}>
          <div className="container relative">
            <Chart
              options={options.current}
              series={series}
              type="radialBar"
              width="180"
              height="180"
            />

            <div className={"absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center"}>
              <div className="text">
                <div>{environment.currency} {props.state.indexAPI?.availableAmount}</div>
                <div>Available Balance</div>
              </div>
            </div>

          </div>
        </div>

        <div className={"right flex flex-col justify-center items-end"}>
          <div className={"used-amount flex flex-col justify-end items-end"}>
            <div className={"label flex flex-row justify-between items-center"}>
              <div className={"label-color w-4 h-1.5 bg-[#E5E5E5] rounded mr-2"}></div>
              <div className={"label-price font-light"}>Used Amount</div>
            </div>
            <div className={"price font-medium"}>₹ {formatPrice(props.state.indexAPI?.usedAmount || 0)}</div>
          </div>
          <div className={"total-amount flex flex-col justify-end"}>
            <div className={"label font-light"}>Total Amount</div>
            <div className={"price font-medium text-right"}>₹ {formatPrice(props.state.indexAPI?.totalAmount || 0)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
