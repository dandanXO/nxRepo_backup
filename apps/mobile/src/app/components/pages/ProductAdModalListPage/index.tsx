import {Page} from "@frontend/mobile/shared/ui";
import React, {useEffect, useState} from "react";
import {useGetPersonalLoanRecommendQuery} from "../../../api";
import {environment} from "../../../../environments/environment";
import ReactSlider from 'react-slider'
import {GetPersonalLoanRecommendResponse, RecommendProduct} from "../../../api/GetPersonalLoanRecommend";

import {useTranslation} from "react-i18next";
import {i18nProductAdModalListPage} from "./i18n/translations";

import {
  Button,

  Countdown,
  CountdownContainer,
  Footer,
  StyledList,
  StyledSlider,
  Title,
  Product,
} from "./Components";
import moment from "moment/moment";


enum STATE {
  "INIT" ,
  "LOADING",
  "COUNTDOWN",
  "OVERDUE"
}

const ProductAdModalListPage = () => {

    const [state, setState] = useState<STATE>(STATE.INIT);


    // const { currentData: data, isLoading, isFetching, isSuccess, isError } = useGetPersonalLoanRecommendQuery({
    //   count: "",
    // });

    // NOTICE: mock
    const isSuccess = null;
    const isError = null;
    const isLoading = null;
    const isFetching = null;

    const [currentData, setCurrentData] = useState<GetPersonalLoanRecommendResponse>();

    const [currentValue, setCurrentValue] = useState<number>(0);
    const [timeString, setTimeString] = useState<string>("00 : 00 : 00");

    useEffect(() => {
      if(currentData?.quotaBar.current) {
        setCurrentValue(currentData?.quotaBar.current)
      }
    }, [currentData?.quotaBar.current]);


    // NOTICE: mock
    useEffect(() => {
      setState(STATE.LOADING);

      setTimeout(() => {
        setState(STATE.COUNTDOWN);

        const data: GetPersonalLoanRecommendResponse = {
          products: [
            {
              approvedRate:	"string",
              // 广告通过率

              approvedTime:	"string",
              // 广告通过时间

              csContact:	"string",
              // 客服電話

              csEmail:	"string",
              // 產品客服郵件

              interestRate:	"1.8%",
              // 建议借款服务费率

              loanableAmount:	1000,
              // 建议金额

              logoUrl: "string",
              // Logo icon

              productId:	1,
              // 產品编号

              productName: "AAASAAD LOAN",
              // 產品名稱

              terms: "91 days",
              // 建议借款周期
            },
            {
              approvedRate:	"string",
              // 广告通过率

              approvedTime:	"string",
              // 广告通过时间

              csContact:	"string",
              // 客服電話

              csEmail:	"string",
              // 產品客服郵件

              interestRate:	"1.8%",
              // 建议借款服务费率

              loanableAmount:	5000,
              // 建议金额

              logoUrl: "string",
              // Logo icon

              productId: 2,
              // 產品编号

              productName: "PRR LOAN",
              // 產品名稱

              terms: "91 days",
              // 建议借款周期
            }
          ],
          quotaBar: {
            current: 2000,
            // 拉霸初始額度

            interval: 100,
            // 拉霸額度間隔

            max: 8880,
            // 拉霸最高額度

            min: 100,
            // 拉霸最低額度
          },
          // quotaExpireTime: moment().add(1,'days').startOf("day").format('YYYY-MM-DD HH:mm:ss'),
          quotaExpireTime: moment().add(20,'second').format('YYYY-MM-DD HH:mm:ss'),
        } ;
        console.log("data", data);
        setCurrentData(data);

        setCurrentValue(data?.quotaBar.current);


        function countDown(quotaExpireTime: string) {
          const currentTime = moment();
          // const tomorrowTime = moment().add(1,'days').startOf("day");
          const tomorrowTime = moment(quotaExpireTime);

          // console.log("now", currentTime.format("MM/DD HH:mm:ss"))
          // console.log("tomorrow", tomorrowTime.format("MM/DD HH:mm:ss"))
          const diffTime = tomorrowTime.diff(currentTime, "seconds");
          // console.log("diffTime", diffTime);
          const duration = moment.duration(diffTime, "seconds");
          //   console.log("duration", duration);
          const padStartZero = (number: number) => {
            return String(number).padStart(2, "0");
          }
          const hours = duration.hours();
          const minutes = duration.minutes();
          const seconds = duration.seconds();
          // console.log("hours", hours);
          // console.log("minutes", minutes);
          // console.log("seconds", seconds);

          const end = hours === 0 && minutes === 0 && seconds === 0;
          const time = `${padStartZero(hours)} : ${padStartZero(minutes)} : ${padStartZero(seconds)}`;
          // console.log("time", time);
          return {
            time,
            end,
          };
        }
        const defaultTime = moment().add(20,'second').format('YYYY-MM-DD HH:mm:ss');
        const timeInfo = countDown(currentData?.quotaExpireTime || defaultTime);
        setTimeString(timeInfo.time);

        const intervalID = setInterval(() => {
          const timeInfo = countDown(currentData?.quotaExpireTime || defaultTime);
          setTimeString(timeInfo.time);
          if(timeInfo.end) {
            clearInterval(intervalID);
            setState(STATE.OVERDUE);
          }
        }, 1000)

        // setTimeout(() => {
        //   setState(STATE.OVERDUE);
        //
        // }, 10000)

      }, 2000);

    }, [])

    useEffect(() => {
      if(isLoading || isFetching || isError) {
        setState(STATE.LOADING);
      }
      if(isSuccess) {
        setState(STATE.COUNTDOWN);
      }
    }, [isLoading, isSuccess, isError])


    // NOTICE: for testing
    // const [trigger, { currentData: currentLazyData, isLoading: isLazyLoading, isFetching: isLazyFetching }] = useLazyGetPersonalLoanRecommendQuery({
      // refetchOnFocus: true,
      // refetchOnReconnect: true,
    // });
    // useEffect(() => {
    //   trigger({count: "2"});
    //   trigger({count: "2"});
    //   setInterval(() => {
    //     console.log("shoot")
    //     trigger({count: "2"});
    //   }, 10 * 1000)
    // }, [])

    let resultProducts: RecommendProduct[] = [];

    const [productList, setProductList] = useState<RecommendProduct[]>([]);

    useEffect(() => {
      if(currentData?.quotaBar.current ) {
        let currentTotalPrice = 0;

        let end = false;
        currentData?.products?.map((product) => {
          if(!end) {
            if(
              product?.loanableAmount &&
              product?.loanableAmount > 0 &&
              currentTotalPrice + product?.loanableAmount <= currentValue
            ) {
              // console.log("product?.loanableAmount", product?.loanableAmount)
              currentTotalPrice = currentTotalPrice + product?.loanableAmount
              resultProducts.push(product)
            } else {
              end = true;
            }
          }
        })
        // console.log("productList?", productList);
        setProductList(resultProducts);
      } else {
        resultProducts = [];
      }
    }, [currentValue]);
    // console.log("currentData", currentData);

    return (
        <Page>
          <StyledSlider>

            <div className="info">
              <div className="label">loan amount</div>
              <div className="price">{environment.currency} {(state === STATE.INIT || state === STATE.LOADING) ? "-" : currentValue}</div>
            </div>

            <div className="slider">
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                thumbActiveClassName="example-thumbActiveClassName"
                trackClassName="example-track"
                renderThumb={(props, state) => {
                  // console.log("props", props);
                  // console.log("state", state);
                  return (
                    <div {...props}>
                      <div className="example-thumb-inner"></div>
                    </div>
                  )
                }}
                // NOTE: WHY?
                // min={currentData?.quotaBar?.min ?? 0}
                // max={currentData?.quotaBar?.max ?? 1000}
                // step={currentData?.quotaBar?.interval ?? 0}
                min={currentData?.quotaBar?.min}
                max={currentData?.quotaBar?.max}
                step={currentData?.quotaBar?.interval}
                value={currentValue}
                onChange={(value, index) => {
                  setCurrentValue(value)
                }}
              />
            </div>

            <div className="slider-labels">
              <span className="min">Minimum</span>
              <span className="max">Maximum</span>
            </div>

          </StyledSlider>

          <CountdownContainer>
            <Countdown>
              <div className="title">Limited Time Offer Countdown :</div>
              <div className="timer">{timeString}</div>
              {state === STATE.OVERDUE && (
                <Button color="#fff" background="#F82626">Re-Acquire The Loan Amount</Button>
              )}
            </Countdown>
          </CountdownContainer>

          <Title>PERSONALIZED RECOMMENDATION</Title>

          <StyledList>
            {state === STATE.LOADING && (
              <div className="container">
                <div>Loading</div>
              </div>
            )}
            {state !== STATE.LOADING && productList?.length === 0 && (
              <div className="container">
                <p>Insufficient funds to provide product recommendations. Please adjust your budget accordingly.</p>
              </div>
            )}
            {state !== STATE.LOADING && productList?.map((product) => (
              <Product
                key={product.productId ?? ""}
                logoUrl={product.logoUrl ?? ""}
                productName={product.productName ?? ""}
                loanableAmount={product.loanableAmount ?? 0}
              />
            ))}
          </StyledList>

          <Footer>
            <Button background="#F58B10">Apply</Button>
          </Footer>

        </Page>
    );
};

export default ProductAdModalListPage;


