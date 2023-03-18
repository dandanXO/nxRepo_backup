import {Page} from "@frontend/mobile/shared/ui";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'


import {usePostApplyProductMutation} from "../../../api";
import {environment} from "../../../../environments/environment";
// import ReactSlider from 'react-slider'
import ReactSlider from "./ReactSlider";

import {GetPersonalLoanRecommendResponse, RecommendProduct} from "../../../api/GetPersonalLoanRecommend";

import {
  ApplyContainer,
  Button,
  Countdown,
  CountdownContainer,
  Footer,
  Product,
  StyledList,
  StyledSlider,
  Title,
} from "./Components";

import moment from 'moment-timezone';
import styled from "styled-components";
import {AppDispatch, RootState} from "../../../store";

import {autoRefreshCreator, getLoanRecommendFetch} from "./redux";

const EmbedPage = styled.div`
  background: ${({ theme }) => theme.color.gray100};
`;


enum STATE {
  "INIT" ,
  "LOADING",
  "COUNTDOWN",
  "OVERDUE",
  "OVERDUE_LOADING",
  "APPLY",
  "APPLY_OVERDUE",
  "APPLY_REPEAT",
  "REJECT"
}
// let intervalID: NodeJS.Timer;

let triggerRefreshID: NodeJS.Timer;
let debugTimeout1: NodeJS.Timer;
let debugTimeout2: NodeJS.Timer;

// const limitRetryCount = 30;
// let currentRetryCount = 0;
// let firstLoadingList = false;


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

    // const [trigger, { currentData: data, data: latestData, isLoading, isFetching, isSuccess, isError, isUninitialized, requestId }] = useLazyGetPersonalLoanRecommendQuery({
    //
    // });
    // console.log("requestId", requestId);
    // console.log("isUninitialized", isUninitialized);
    // console.log("isLoading", isLoading);
    // console.log("isFetching", isFetching);
    // console.log("isSuccess", isSuccess);
    // console.log("isError", isError);

    // NOTICE: for testing
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = useState<STATE>(STATE.INIT);
    const [currentData, setCurrentData] = useState<GetPersonalLoanRecommendResponse>();

    console.log("currentData", currentData)
    const data = useSelector((state: RootState) => state.personalLoanRecommendSlice.data);
    console.log("data", data);

    const [currentValue, setCurrentValue] = useState<number>(0);
    const [timeString, setTimeString] = useState<string>("00 : 00 : 00");

    const debug = useSelector((state: RootState) => state.personalLoanRecommendSlice);
    console.log("debug", debug)

    const dataStatus = useSelector((state: RootState) => state.personalLoanRecommendSlice.status);
    console.log("[Eric] dataStatus", dataStatus)

    const isSuccess = dataStatus === "success";
    const isError = dataStatus === "failure";
    const isLoading = dataStatus === "loading";
    const isFetching = dataStatus === "loading";



    // const [triggerRefresh, {
    //   data: refreshData,
    //   isLoading: isRefreshLoading,
    //   isSuccess: isRefreshSuccess,
    //   isError: isRefreshError,
    // }] = usePostLoanQuotaRefreshMutation();

    const [triggerApplyProduct, {
      data: applyData,
      isLoading: isApplyLoading,
      isSuccess: isApplySuccess,
      isError: isApplyError,
    }] = usePostApplyProductMutation();

    const requestRecommendProducts = () => {
      // dispatch((personalLoanRecommendSlice.actions as any).loading())
      dispatch(getLoanRecommendFetch());
    }

    // const asyncRefreshTimeout = () => {
    //   // console.log("asyncRefreshTimeout")
    //   let retry = true;
    //   const asyncRequestRefresh = () => new Promise((resolve, reject) => {
    //     const pendingRefetch = () => {
    //       setTimeout(() => {
    //         resolve(false)
    //       }, 20 * 1000)
    //     };
    //     triggerRefresh(null).then((result)  => {
    //       // console.log("result", result);
    //       const data = (result as any).data as PostLoanQuotaRefreshResponse;
    //       // console.log("data", data);
    //       if((result as any).error) {
    //         // NOTICE: 商務邏輯錯誤
    //         // console.log("商務邏輯錯誤 - 像是時間太頻繁")
    //         pendingRefetch();
    //       } else {
    //         if(data.effective) {
    //           resolve(true);
    //         } else {
    //           // console.log("沒得到")
    //           pendingRefetch();
    //         }
    //       }
    //     }).catch((error) => {
    //       console.log("error", error);
    //       pendingRefetch();
    //     });
    //   })
    //
    //   if(!retry) {
    //     clearTimeout(triggerRefreshID);
    //     requestRecommendProducts();
    //   } else {
    //
    //     asyncRequestRefresh().then((effective) => {
    //       if(effective) {
    //         retry = false;
    //         requestRecommendProducts();
    //       } else {
    //         retry = true;
    //         // currentRetryCount++;
    //         asyncRefreshTimeout();
    //       }
    //     }).catch((error) => {
    //       // console.log("error", error)
    //       // console.log("還是拿不到")
    //       retry = true;
    //       asyncRefreshTimeout();
    //     })
    //   }
    //
    // }

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
          setState(STATE.OVERDUE);
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

    // NOTE: user interaction
    const onUserClickToLoadRecommendation = useCallback(() => {
      setState(STATE.OVERDUE_LOADING);
      // NOTICE: PRODUCTION
      // asyncRefreshTimeout();
      dispatch(autoRefreshCreator());
      // dispatch(getLoanRecommendAction.fetch())
    }, []);

    const onUserClickToApply = useCallback(() => {
      // console.log("onUserClickToApply.state", state);
      switch (state) {
        // case STATE.INIT: {
        //   break;
        // }
        // case STATE.LOADING: {
        //   break;
        // }
        case STATE.COUNTDOWN: {
          cancelCountDown();
          setState(STATE.APPLY);
          break;
        }
        case STATE.OVERDUE: {
          cancelCountDown();
          setState(STATE.APPLY_OVERDUE);
          break;
        }
        // case STATE.OVERDUE_LOADING: {
        //   break;
        // }
      }
      triggerApplyProduct({
        applyQuota: currentValue,
        productIds: productList.map(product => product.productId)
      }).then((result) => {
        // console.log("result", result);
      }).catch((error) => {
        console.log(error);
      })
    }, [state, productList, currentValue])

    console.log("isLoading, isSuccess, isError, currentData, isFetching", isLoading, isSuccess, isError, currentData, isFetching)


    useEffect(() => {
      // dispatch((personalLoanRecommendSlice.actions as any).fetch())
      // dispatch((personalLoanRecommendSlice.actions as any).loading())
      dispatch(getLoanRecommendFetch());
    }, [])

    // NOTE: useEffect
    // NOTICE: Status
    useEffect(() => {
      // 優先
      if(currentData && currentData?.riskReject) {
        console.log("近來")
        setState(STATE.REJECT);
      } else if(currentData && currentData?.processing) {
        console.log("近來")
        setState(STATE.APPLY_REPEAT);
      } else if(isLoading || isFetching || isError) {
        console.log("近來2")
        // setState(STATE.LOADING);
        setState(STATE.OVERDUE_LOADING); // 按鈕顯示loading
      } else if(isSuccess) {
        console.log("近來3")
        // setState(STATE.COUNTDOWN);
      }
    }, [isLoading, isSuccess, isError, currentData, isFetching])


    // NOTICE: Status
    useEffect(() => {
      if(dataStatus === "overdue") {
        setState(STATE.OVERDUE);
      } else if(dataStatus === "countdown") {
        setState(STATE.COUNTDOWN);

        const data = currentData
        const result = data as GetPersonalLoanRecommendResponse;
        if(result?.quotaExpireTime) {
          // const currentTime = moment.tz("Asia/Kolkata")
          // const expireTime = result?.quotaExpireTime.split(".")[0];
          // const isOverdue = currentTime.diff(expireTime) > 0;
          // if(isOverdue) {
            // setState(STATE.OVERDUE);
          // } else {
          //   setState(STATE.COUNTDOWN);
            // NOTICE: real world
            const expiredTime = result?.quotaExpireTime ? result?.quotaExpireTime.split(".")[0] : ""
            const countDownStr = moment(expiredTime).format('YYYY-MM-DD HH:mm:ss');
            countDown(countDownStr);
          // }
        }
      }
    }, [dataStatus, currentData])

    // NOTICE: Status
    // useEffect(() => {
    //   console.log("[only one]")
    //   NOTICE: PRODUCTION
      // setState(STATE.LOADING);
      // requestRecommendProducts();
      // return () => {
        // NOTICE: PRODUCTION
        // console.log("effect return cancel.intervalIDRef.current",intervalIDRef.current)
        // cancelCountDown();
      // }
    // }, [])



    // NOTICE: 清除計時器
    useEffect(() => {
      return () => {
        if(triggerRefreshID) clearTimeout(triggerRefreshID);
        if(debugTimeout1) clearTimeout(debugTimeout1);
        if(debugTimeout2) clearTimeout(debugTimeout2);
      }
    })
    console.log("state", STATE[state])
    // NOTICE: 過段時間會拿到 undefined
    useEffect(() => {
      // console.log("超怪 data", data)
      // console.log("超怪 latestData", latestData)
      // undefined=>undefined->hasData->undefined
      if(data) {
        setCurrentData(data);
        setCurrentValue(() => {
          return data?.quotaBar?.current || 0
        });
      } else {
        console.log("data 被重置成 undefined")
      }
    }, [data])

    // NOTICE: 目前額度發生變化
    useEffect(() => {
      if(currentData?.quotaBar?.current) {
        setCurrentValue(() => {
          return currentData?.quotaBar?.current
        })
      }
    }, [currentData?.quotaBar?.current]);

    // NOTICE: 用戶拉動拉霸
    useEffect(() => {
      let resultProducts: RecommendProduct[] = [];
      if(currentData?.quotaBar?.current) {
        let currentTotalPrice = 0;

        let end = false;
        currentData?.products?.map((product) => {
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


    if(
      state === STATE.COUNTDOWN ||
      state === STATE.OVERDUE ||
      state === STATE.OVERDUE_LOADING ||
      state === STATE.LOADING ||
      state === STATE.INIT ||
      state === STATE.REJECT
    ) {
      return (
        <EmbedPage>
          <StyledSlider>

            <div className="info">
              <div className="label">Loan Amount</div>
              <div className="price">{environment.currency} {(state === STATE.INIT || state === STATE.LOADING) ? "-" : currentValue}</div>
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
                // min={currentData?.quotaBar?.min ?? 0}
                // max={currentData?.quotaBar?.max ?? 1000}
                // step={currentData?.quotaBar?.interval ?? 0}
                min={currentData?.quotaBar?.min}
                max={currentData?.quotaBar?.max}
                step={currentData?.quotaBar?.interval}
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
              {(state === STATE.COUNTDOWN) && (
                <>
                  <div className="title">LIMITED TIME OFFER COUNTDOWN :</div>
                  <div className="timer">{timeString}</div>
                </>
              )}
              {(state === STATE.OVERDUE) && (
                <div className="button-container">
                  <Button color="#fff" background="#F82626" onClick={onUserClickToLoadRecommendation}>
                    <span>Re-Acquire The Loan Amount</span>
                  </Button>
                </div>
              )}
              {state === STATE.OVERDUE_LOADING && (
                <div className="button-container">
                  <Button color="#fff" background="#F82626">
                    {/*<span>Loading</span>*/}
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
            {(state === STATE.COUNTDOWN) && (
              <Title>PERSONALIZED RECOMMENDATION</Title>
            )}
            <StyledList>
              {/*{state === STATE.LOADING && (*/}
              {/*  <div className="container">*/}
              {/*    <div>Loading</div>*/}
              {/*  </div>*/}
              {/*)}*/}
              {state === STATE.COUNTDOWN && productList?.length === 0 && (
                <div className="container">
                  <p>Insufficient funds to provide product recommendations. Please adjust your budget accordingly.</p>
                </div>
              )}
              {(state === STATE.COUNTDOWN || state === STATE.OVERDUE) && productList?.map((product) => (
                <Product
                  key={product.productId ?? ""}
                  logoUrl={product.logoUrl ?? ""}
                  productName={product.productName ?? ""}
                  loanableAmount={product.loanableAmount ?? 0}
                  interestRate={product?.interestRate ?? ""}
                  terms={product?.terms ?? ""}
                />
              ))}
              {state === STATE.OVERDUE_LOADING && (
                <div className="container">
                  <div className="overdue">
                    <div>Please wait patiently for 30 seconds to 2 minutes while we review the loan amount you are eligible for as quickly as possible.</div>
                    <div>To prevent errors, please remain on this screen.</div>
                  </div>
                </div>
              )}
              {state === STATE.REJECT && (
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
                disable={state === STATE.INIT || state === STATE.LOADING || state === STATE.OVERDUE_LOADING || productList.length === 0}
                onClick={() =>{
                  if((state === STATE.COUNTDOWN || state === STATE.OVERDUE) && productList.length > 0) onUserClickToApply();
                }}
              >Apply</Button>
            </Footer>

          </div>

        </EmbedPage>
      );
    } else if(state === STATE.APPLY) {
      return (
        <Page>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {state === STATE.APPLY && (
              <div className="content">
                <p className="p1">After the review is successful, you can view your loan order in the loan record.</p>
              </div>
            )}
          </ApplyContainer>
        </Page>
      )
    } else if(state === STATE.APPLY_OVERDUE) {
      return (
        <Page>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {state === STATE.APPLY_OVERDUE && (
              <div className="content">
                <p className="p1">The limited-time promotional loan scheme has expired, and the loan amount will be based on the latest review results.</p>
                <p className="p2">Please be patient while waiting for the review results. After the review is successful, you can view your loan order in the loan record.</p>
              </div>
            )}
          </ApplyContainer>
        </Page>
      )
    } else if(state === STATE.APPLY_REPEAT) {
      return (
        <Page>
          <ApplyContainer>
            <div className="title">Your loan application has been submitted.</div>
            {state === STATE.APPLY_REPEAT && (
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
