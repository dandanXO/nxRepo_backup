import {Page} from "@frontend/mobile/shared/ui";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {usePostApplyProductMutation} from "../../../api";
import {environment} from "../../../../environments/environment";
import ReactSlider from "./ReactSlider";
import {GetPersonalLoanRecommendResponse, RecommendProduct} from "../../../api/GetPersonalLoanRecommend";

import {
  ApplyContainer,
  Button,
  Countdown,
  CountdownContainer, EmbedPage,
  Footer,
  Product,
  StyledList,
  StyledSlider,
  Title,
} from "./Components";

import moment from 'moment-timezone';
import {AppDispatch, RootState} from "../../../store";

import { STATE } from "./redux"

import {autoRefreshCreator, getLoanRecommendFetch, personalLoanRecommendSlice} from "./redux";

let triggerRefreshID: NodeJS.Timer;
let debugTimeout1: NodeJS.Timer;
let debugTimeout2: NodeJS.Timer;

const ProductAdModalListPage = () => {
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

    // NOTICE: for testing
    const dispatch = useDispatch<AppDispatch>();

    const data = useSelector((state: RootState) => state.personalLoanRecommendSlice.data);
    // console.log("data", data);
    const [personalLoanInfo, setCurrentData] = useState<GetPersonalLoanRecommendResponse>();
    // console.log("personalLoanInfo", personalLoanInfo)


    const [currentValue, setCurrentValue] = useState<number>(0);
    const [timeString, setTimeString] = useState<string>("00 : 00 : 00");

    const pageStatus: STATE = useSelector((state: RootState) => state.personalLoanRecommendSlice.status);
    // console.log("[Eric] pageStatus", pageStatus)

    const [triggerApplyProduct, {
      data: applyData,
      isLoading: isApplyLoading,
      isSuccess: isApplySuccess,
      isError: isApplyError,
    }] = usePostApplyProductMutation();

    // NOTICE: 放在這邊其他地方讀取會是 undefined
    // let intervalID: NodeJS.Timer;
    // NOTICE: replace by this
    const intervalIDRef = useRef<NodeJS.Timer>();

    // NOTICE: 倒數
    const countDown = (countDownStr: string) => {
      const timeInfo = getTimeInfoBetweenCurrentAndCountDown(countDownStr);
      setTimeString(timeInfo.time);

      intervalIDRef.current = setInterval(() => {
        const timeInfo = getTimeInfoBetweenCurrentAndCountDown(countDownStr);
        setTimeString(timeInfo.time);
        if(timeInfo.end) {
          cancelCountDown();
          dispatch((personalLoanRecommendSlice.actions as any).overdue());
        }
      }, 1000)
      // console.log("intervalIDRef.current",intervalIDRef.current);
    }

    const cancelCountDown = () => {
      // console.log("[Countdown] cancel.intervalIDRef.current",intervalIDRef.current)
      // clearInterval(intervalIDRef.current);
      // clearInterval(intervalIDRef.current as any);
      clearInterval(intervalIDRef.current as NodeJS.Timer);
    }

    const [productList, setProductList] = useState<RecommendProduct[]>([]);

    // NOTE: DEBUG
    console.log("state", STATE[pageStatus]);

    // NOTE: user interaction
    const onUserClickToLoadRecommendation = useCallback(() => {
      dispatch(autoRefreshCreator());
    }, []);

    const onUserClickToApply = useCallback(() => {

      if(pageStatus === STATE.countdown) {
        cancelCountDown();
        dispatch((personalLoanRecommendSlice.actions as any).apply())
      } else if(STATE.overdue) {
        cancelCountDown();
        dispatch((personalLoanRecommendSlice.actions as any).applyOverdue())
      }

      triggerApplyProduct({
        applyQuota: currentValue,
        productIds: productList.map(product => product.productId)
      }).then((result) => {
        // console.log("result", result);
      }).catch((error) => {
        console.log(error);
      })

    }, [pageStatus, productList, currentValue])

    // NOTE: useEffect
    useEffect(() => {
      // dispatch((personalLoanRecommendSlice.actions as any).fetch())
      // dispatch((personalLoanRecommendSlice.actions as any).loading())
      dispatch(getLoanRecommendFetch());
    }, [])

    // NOTICE: Status
    useEffect(() => {
      if(pageStatus === "countdown") {
        if(personalLoanInfo?.quotaExpireTime) {
          // NOTICE: real world
          const expiredTime = personalLoanInfo?.quotaExpireTime ? personalLoanInfo?.quotaExpireTime.split(".")[0] : ""
          const countDownStr = moment(expiredTime).format('YYYY-MM-DD HH:mm:ss');
          countDown(countDownStr);
        }
      }
    }, [pageStatus, personalLoanInfo])

    // NOTICE: 清除計時器
    useEffect(() => {
      return () => {
        if(triggerRefreshID) clearTimeout(triggerRefreshID);
        if(debugTimeout1) clearTimeout(debugTimeout1);
        if(debugTimeout2) clearTimeout(debugTimeout2);
      }
    })

    // NOTICE: 過段時間會拿到 undefined
    useEffect(() => {
      // console.log("超怪 data", data)
      // console.log("超怪 latestData", latestData)
      // undefined=>undefined->hasData->undefined
      if(data) {
        setCurrentData(data);
        setCurrentValue(data?.quotaBar?.current || 0);
      } else {
        console.log("data 被重置成 undefined")
      }
    }, [data])

    // NOTICE: 目前額度發生變化
    useEffect(() => {
      if(personalLoanInfo?.quotaBar?.current) {
        setCurrentValue(() => {
          return personalLoanInfo?.quotaBar?.current
        })
      }
    }, [personalLoanInfo?.quotaBar?.current]);

    // NOTICE: 用戶拉動拉霸
    useEffect(() => {
      let resultProducts: RecommendProduct[] = [];
      if(personalLoanInfo?.quotaBar?.current) {
        let currentTotalPrice = 0;

        let end = false;
        personalLoanInfo?.products?.map((product) => {
          if(!end) {
            if(
              product?.loanableAmount &&
              product?.loanableAmount > 0 &&
              currentTotalPrice + product?.loanableAmount <= currentValue
            ) {
              currentTotalPrice = currentTotalPrice + product?.loanableAmount
              resultProducts.push(product)
            } else {
              end = true;
            }
          }
        })
        setProductList(resultProducts);
      } else {
        resultProducts = [];
        setProductList([])
      }
    }, [currentValue]);


    // NOTE: template
    if(
      pageStatus === STATE.countdown ||
      pageStatus === STATE.overdue ||
      pageStatus === STATE.overdueLoading ||
      pageStatus === STATE.loading ||
      pageStatus === STATE.init ||
      pageStatus === STATE.reject
    ) {
      return (
        <EmbedPage>
          <StyledSlider>

            <div className="info">
              <div className="label">Loan Amount</div>
              <div className="price">
                {environment.currency}
                {(pageStatus === STATE.init || pageStatus === STATE.loading) ? "-" : currentValue}
              </div>
            </div>

            <div className="slider">
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                thumbActiveClassName="example-thumbActiveClassName"
                trackClassName="example-track"
                renderThumb={(props: any, state: any) => {
                  // console.log("props", props);
                  // console.log("state", state);
                  return (
                    <div {...props}>
                      <div className="example-thumb-inner"></div>
                    </div>
                  )
                }}
                // NOTE: WHY?
                // min={personalLoanInfo?.quotaBar?.min ?? 0}
                // max={personalLoanInfo?.quotaBar?.max ?? 1000}
                // step={personalLoanInfo?.quotaBar?.interval ?? 0}
                min={personalLoanInfo?.quotaBar?.min}
                max={personalLoanInfo?.quotaBar?.max}
                step={personalLoanInfo?.quotaBar?.interval}
                value={currentValue}
                onChange={(value: any, index: any) => {
                  setCurrentValue(() => {
                    return !isNaN(value) ? value : 0;
                  })
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
              {(pageStatus === STATE.countdown) && (
                <>
                  <div className="title">LIMITED TIME OFFER COUNTDOWN :</div>
                  <div className="timer">{timeString}</div>
                </>
              )}
              {(pageStatus === STATE.overdue) && (
                <div className="button-container">
                  <Button color="#fff" background="#F82626" onClick={onUserClickToLoadRecommendation}>
                    <span>Re-Acquire The Loan Amount</span>
                  </Button>
                </div>
              )}
              {pageStatus === STATE.overdueLoading && (
                <div className="button-container">
                  <Button color="#fff" background="#F82626">
                    {/*<StyledLoading style={{*/}
                    {/*  transform: "scale(0.3)",*/}
                    {/*  width: "10px",*/}
                    {/*  height: "20px",*/}
                    {/*  top: "-9px",*/}
                    {/*}}*/}
                    {/*bg="#fff"/>*/}
                    <span>Refreshing . . . .</span>
                  </Button>
                </div>
              )}
            </Countdown>
          </CountdownContainer>


          {/*NOTICE: REFACTOR ME*/}
          <div className="" style={{
            position: "relative",
            top: "-20px"
          }}>
            {(pageStatus === STATE.countdown) && (
              <Title>PERSONALIZED RECOMMENDATION</Title>
            )}
            <StyledList>
              {pageStatus === STATE.countdown && productList?.length === 0 && (
                <div className="container">
                  <p>Insufficient funds to provide product recommendations. Please adjust your budget accordingly.</p>
                </div>
              )}
              {(pageStatus === STATE.countdown || pageStatus === STATE.overdue) && productList?.map((product) => (
                <Product
                  key={product.productId ?? ""}
                  logoUrl={product.logoUrl ?? ""}
                  productName={product.productName ?? ""}
                  loanableAmount={product.loanableAmount ?? 0}
                  interestRate={product?.interestRate ?? ""}
                  terms={product?.terms ?? ""}
                />
              ))}
              {pageStatus === STATE.overdueLoading && (
                <div className="container">
                  <div className="overdue">
                    <div>Please wait patiently for 30 seconds to 2 minutes while we review the loan amount you are eligible for as quickly as possible.</div>
                    <div>To prevent errors, please remain on this screen.</div>
                  </div>
                </div>
              )}
              {pageStatus === STATE.reject && (
                <div className="container">
                  <div className="overdue">
                    <div>Your current discount limit has been exhausted
                      We are reviewing the amount you can borrow for you, please wait patiently for 30 seconds to two minutes.</div>
                    <div>To avoid errors, we recommended that you stay on this screen.</div>
                  </div>
                </div>
              )}
            </StyledList>

            <Footer>
              <Button
                background="#F58B10"
                disable={pageStatus === STATE.init || pageStatus === STATE.loading || pageStatus === STATE.overdueLoading || productList.length === 0}
                onClick={() =>{
                  if((pageStatus === STATE.countdown || pageStatus === STATE.overdue) && productList.length > 0) onUserClickToApply();
                }}
              >Apply</Button>
            </Footer>

          </div>

        </EmbedPage>
      );
    } else if(pageStatus === STATE.apply) {
      return (
        <Page>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {pageStatus === STATE.apply && (
              <div className="content">
                <p className="p1">After the review is successful, you can view your loan order in the loan record.</p>
              </div>
            )}
          </ApplyContainer>
        </Page>
      )
    } else if(pageStatus === STATE.applyOverdue) {
      return (
        <Page>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {pageStatus === STATE.applyOverdue && (
              <div className="content">
                <p className="p1">The limited-time promotional loan scheme has expired, and the loan amount will be based on the latest review results.</p>
                <p className="p2">Please be patient while waiting for the review results. After the review is successful, you can view your loan order in the loan record.</p>
              </div>
            )}
          </ApplyContainer>
        </Page>
      )
    } else if(pageStatus === STATE.applyRepeat) {
      return (
        <Page>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {pageStatus === STATE.applyRepeat && (
              <div>
                <p className="p1">Please do not resubmit and wait patiently.</p>
              </div>
            )}
          </ApplyContainer>
        </Page>
      )
    } else{
      return (
        <Page>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
          </ApplyContainer>
        </Page>
      )
    }
};

export default ProductAdModalListPage;


// NOTICE: 顯示倒數字串
const getTimeInfoBetweenCurrentAndCountDown = (quotaExpireTime: string) => {
  // NOTICE: REFACTOR ME
  const currentTime = moment.tz("Asia/Kolkata")
  // console.log("currentTime.format", currentTime.format("YYYY-MM-DD HH:mm:ss"));
  const tomorrowTime = moment(quotaExpireTime)
  // console.log("tomorrow.format", tomorrowTime.format("YYYY-MM-DD HH:mm:ss"))
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
  const end = hours === 0 && minutes === 0 && seconds === 0;
  const time = `${padStartZero(hours)} : ${padStartZero(minutes)} : ${padStartZero(seconds)}`;
  return {
    time,
    end,
  };
}
