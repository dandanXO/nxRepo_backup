import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import ReactSlider from "./ReactSlider";

import {environment} from "../../../../environments/environment";
import {usePostApplyProductMutation} from "../../../api";
import {GetPersonalLoanRecommendResponse, RecommendProduct} from "../../../api/GetPersonalLoanRecommend";

import {
  ApplyContainer,
  Button,
  Countdown,
  CountdownContainer,
  EmbedPage,
  Footer,
  Product,
  StyledList,
  StyledSlider,
  Title,
} from "./Components";

import moment from 'moment-timezone';
import {AppDispatch, RootState} from "../../../store";

import {autoRefreshCreator, getLoanRecommendFetch, PersonalRecommendActions, STATE} from "./redux"

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
    const [personalLoanInfo, setCurrentData] = useState<GetPersonalLoanRecommendResponse>();
    // console.log("personalLoanInfo", personalLoanInfo)

    const pageStatus: STATE = useSelector((state: RootState) => state.personalLoanRecommendSlice.status);

    // NOTE: useEffect
    useEffect(() => {
      dispatch(getLoanRecommendFetch());
    }, [])

    const [currentValue, setCurrentValue] = useState<number>(0);
    const [timeString, setTimeString] = useState<string>("00 : 00 : 00");

    // NOTICE: 過段時間會拿到 undefined
    // NOTICE: 目前額度發生變化
    useEffect(() => {
      console.log("超怪 data", data)
      // console.log("超怪 latestData", latestData)
      // undefined=>undefined->hasData->undefined
      if(data) {
        setCurrentData(data);
        setCurrentValue(() => {
          return personalLoanInfo?.quotaBar?.current || 0;
        })
      } else {
        console.log("data 被重置成 undefined")

      }
    }, [data, personalLoanInfo])


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
          dispatch(PersonalRecommendActions[STATE.OVERDUE](STATE.OVERDUE))
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

    // NOTICE: Status
    useEffect(() => {
      if(pageStatus === "COUNTDOWN") {
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

    // NOTICE: 用戶拉動拉霸
    const [productList, setProductList] = useState<RecommendProduct[]>([]);
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
    }, [personalLoanInfo, currentValue]);

    // NOTE: DEBUG
    // console.log("[Eric] pageStatus", pageStatus)
    // console.log("state", STATE[pageStatus]);

    // NOTE: user interaction
    const onUserClickToLoadRecommendation = useCallback(() => {
      dispatch(autoRefreshCreator());
    }, []);

    const onUserClickToApply = useCallback(() => {
      if(pageStatus === STATE.COUNTDOWN) {
        cancelCountDown();
        dispatch(PersonalRecommendActions[STATE.APPLY](STATE.APPLY))
      } else if(STATE.OVERDUE) {
        cancelCountDown();
        dispatch(PersonalRecommendActions[STATE.APPLY_OVERDUE](STATE.APPLY_OVERDUE))
      }
      triggerApplyProduct({
        applyQuota: typeof currentValue === "number" ? currentValue : 0,
        productIds: productList.map(product => product.productId)
      }).then((result) => {
        // console.log("result", result);
      }).catch((error) => {
        console.log(error);
      })
    }, [pageStatus, productList, currentValue])


    // NOTE: template
    if(
      pageStatus === STATE.INIT ||
      pageStatus === STATE.LOADING ||
      pageStatus === STATE.COUNTDOWN ||
      pageStatus === STATE.OVERDUE ||
      pageStatus === STATE.OVERDUE_LOADING ||
      pageStatus === STATE.REJECT
    ) {
      return (
        <EmbedPage>
          <StyledSlider>

            <div className="info">
              <div className="label">Loan Amount</div>
              <div className="price">
                {environment.currency}
                {(personalLoanInfo?.quotaBar?.min === 0) ? "-" : currentValue}
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
              {(pageStatus === STATE.COUNTDOWN) && (
                <div className="countdown-info">
                  <div className="title">LIMITED TIME OFFER COUNTDOWN :</div>
                  <div className="timer">{timeString}</div>
                </div>
              )}
              {(pageStatus === STATE.OVERDUE) && (
                <div className="button-container">
                  <div className="countdown-info">
                    <div className="title">LIMITED TIME OFFER COUNTDOWN :</div>
                    <div className="timer">{timeString}</div>
                  </div>
                  <Button color="#fff" background="#F82626" onClick={onUserClickToLoadRecommendation}>
                    <span>Re-Acquire The Loan Amount</span>
                  </Button>
                </div>
              )}
              {pageStatus === STATE.OVERDUE_LOADING && (
                <div className="button-container">
                  <div className="countdown-info">
                    <div className="title">LIMITED TIME OFFER COUNTDOWN :</div>
                    <div className="timer">{timeString}</div>
                  </div>
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
            {(pageStatus === STATE.COUNTDOWN || pageStatus === STATE.OVERDUE) && (
              <Title>PERSONALIZED RECOMMENDATION</Title>
            )}
            <StyledList>
              {pageStatus === STATE.COUNTDOWN && productList?.length === 0 && (
                <div className="container">
                  <p>Insufficient funds to provide product recommendations. Please adjust your budget accordingly.</p>
                </div>
              )}
              {(pageStatus === STATE.COUNTDOWN || pageStatus === STATE.OVERDUE) && productList?.map((product) => (
                <Product
                  key={product.productId ?? ""}
                  logoUrl={product.logoUrl ?? ""}
                  productName={product.productName ?? ""}
                  loanableAmount={product.loanableAmount ?? 0}
                  interestRate={product?.interestRate ?? ""}
                  terms={product?.terms ?? ""}
                />
              ))}
              {pageStatus === STATE.OVERDUE_LOADING && (
                <div className="container">
                  <div className="overdue">
                    <div className={"p1"}>Please wait patiently for 30 seconds to 2 minutes while we review the loan amount you are eligible for as quickly as possible.</div>
                    <div className={"p2"}>To prevent errors, please remain on this screen.</div>
                  </div>
                </div>
              )}
              {pageStatus === STATE.REJECT && (
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
                disable={pageStatus === STATE.INIT || pageStatus === STATE.LOADING || pageStatus === STATE.OVERDUE_LOADING || productList.length === 0}
                onClick={() =>{
                  if((pageStatus === STATE.COUNTDOWN || pageStatus === STATE.OVERDUE) && productList.length > 0) onUserClickToApply();
                }}
              >Apply</Button>
            </Footer>

          </div>

        </EmbedPage>
      );
    } else if(pageStatus === STATE.APPLY) {
      return (
        <EmbedPage>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {pageStatus === STATE.APPLY && (
              <div className="content">
                <p className="p1">After the review is successful, you can view your loan order in the loan record.</p>
              </div>
            )}
          </ApplyContainer>
        </EmbedPage>
      )
    } else if(pageStatus === STATE.APPLY_OVERDUE) {
      return (
        <EmbedPage>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {pageStatus === STATE.APPLY_OVERDUE && (
              <div className="content">
                <p className="p1">The limited-time promotional loan scheme has expired, and the loan amount will be based on the latest review results.</p>
                <p className="p2">Please be patient while waiting for the review results. After the review is successful, you can view your loan order in the loan record.</p>
              </div>
            )}
          </ApplyContainer>
        </EmbedPage>
      )
    } else if(pageStatus === STATE.APPLY_REPEAT) {
      return (
        <EmbedPage>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {pageStatus === STATE.APPLY_REPEAT && (
              <div>
                <p className="p1">Please do not resubmit and wait patiently.</p>
              </div>
            )}
          </ApplyContainer>
        </EmbedPage>
      )
    } else if(pageStatus === STATE.FAILURE){
      return (
        <EmbedPage>
          <ApplyContainer>
            <div className="title">FAILURE</div>
          </ApplyContainer>
        </EmbedPage>
      )
    } else {
      return (
        <EmbedPage>
          <ApplyContainer>
            <div className="title">FAILURE code:2</div>
          </ApplyContainer>
        </EmbedPage>
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
