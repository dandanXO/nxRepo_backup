import {Page, StyledLoading} from "@frontend/mobile/shared/ui";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  useGetPersonalLoanRecommendQuery,
  useLazyGetPersonalLoanRecommendQuery, usePostApplyProductMutation,
  usePostLoanQuotaRefreshMutation
} from "../../../api";
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
  Product, ApplyContainer,
} from "./Components";

import moment from 'moment-timezone';
import {PostLoanQuotaRefreshResponse} from "../../../api/PostLoanQuotaRefreshResponse";
import styled from "styled-components";

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
}

const debugSwitch = (isDebeg: boolean, debugFun: () => void, fun: () => void) => {
  isDebeg ? debugFun() : fun();
}

// NOTICE: MODE
const debug = false;

// let intervalID: NodeJS.Timer;
let init = false;

let triggerRefreshID: NodeJS.Timer;
let debugTimeout1: NodeJS.Timer;
let debugTimeout2: NodeJS.Timer;

// const limitRetryCount = 30;
// let currentRetryCount = 0;
const ProductAdModalListPage = () => {

    const [state, setState] = useState<STATE>(STATE.INIT);

    const [currentData, setCurrentData] = useState<GetPersonalLoanRecommendResponse>();
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [timeString, setTimeString] = useState<string>("00 : 00 : 00");

    // const { currentData: data, isLoading, isFetching, isSuccess, isError } = useGetPersonalLoanRecommendQuery({
    //   count: "",
    // });
    const [trigger, { currentData: data, isLoading, isFetching, isSuccess, isError }] = useLazyGetPersonalLoanRecommendQuery({

    });


    useEffect(() => {
      setCurrentData(data);
      setCurrentValue(data?.quotaBar?.current || 0);
    }, [data])

    const [triggerRefresh, {
      data: refreshData,
      isLoading: isRefreshLoading,
      isSuccess: isRefreshSuccess,
      isError: isRefreshError,
    }] = usePostLoanQuotaRefreshMutation();

    const [triggerApplyProduct, {
      data: applyData,
      isLoading: isApplyLoading,
      isSuccess: isApplySuccess,
      isError: isApplyError,
    }] = usePostApplyProductMutation();

    // NOTICE: mock
    // const isSuccess = null;
    // const isError = null;
    // const isLoading = null;
    // const isFetching = null;
    const mockResponse = () => {
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

            interestRate:	"0.8%",
            // 建议借款服务费率

            loanableAmount:	5000,
            // 建议金额

            logoUrl: "string",
            // Logo icon

            productId: 2,
            // 產品编号

            productName: "PRR LOAN",
            // 產品名稱

            terms: "5 days",
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

            interestRate:	"1.0%",
            // 建议借款服务费率

            loanableAmount:	2000,
            // 建议金额

            logoUrl: "string",
            // Logo icon

            productId: 3,
            // 產品编号

            productName: "DOGGY LOAN",
            // 產品名稱

            terms: "12 days",
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
        processing: false,
      } ;
      // console.log("data", data);
      setCurrentData(data);
      setCurrentValue(data?.quotaBar.current);
    }

    useEffect(() => {
      if(currentData && currentData?.processing) {
        setState(STATE.APPLY_REPEAT);
      } else if(isLoading || isFetching || isError) {
        setState(STATE.LOADING);
      } else if(isSuccess) {
        // setState(STATE.COUNTDOWN);
      }
    }, [isLoading, isSuccess, isError, currentData])

    useEffect(() => {
      return () => {
        // console.log("安全清除 id");
        if(triggerRefreshID) clearTimeout(triggerRefreshID);
        if(debugTimeout1) clearTimeout(debugTimeout1);
        if(debugTimeout2) clearTimeout(debugTimeout2);
      }
    })

    const requestRecommendProducts = () => {
      console.log("requestRecommendProducts");
      trigger({
        count: "",
      }).then((data) => {
        const result = data.data;
        if(result?.quotaExpireTime) {
          const currentTime = debug ? moment() : moment.tz("Asia/Kolkata")
          // console.log("currentTime.format:", currentTime.format("YYYY-MM-DD HH:mm:ss"))
          // console.log("quotaExpireTime:", result?.quotaExpireTime);
          // console.log("quotaExpireTime.2:", result?.quotaExpireTime.split(".")[0]);
          // console.log("quotaExpireTime.3:", moment(result?.quotaExpireTime.split(".")[0]).format("YYYY-MM-DD HH:mm:ss"));
          const expireTime = result?.quotaExpireTime.split(".")[0];
          const isOverdue = currentTime.diff(expireTime) > 0;
          if(isOverdue) {
            console.log("[mode][production] 過期");
            setState(STATE.OVERDUE);
          } else {
            console.log("[mode][production] 只能執行一次")
            setState(STATE.COUNTDOWN);
            // NOTICE: real world
            const expiredTime = result?.quotaExpireTime ? result?.quotaExpireTime.split(".")[0] : ""
            const countDownStr = moment(expiredTime).format('YYYY-MM-DD HH:mm:ss');
            // NOTICE: DEBUG
            // const defaultTime = moment().add(5,'second').format('YYYY-MM-DD HH:mm:ss');
            // const countDownStr = defaultTime;
            countDown(countDownStr);
          }
        }
      }).catch((error) => {
        console.log("requestRecommendProducts")
        console.log(error)
      })
    }
    useEffect(() => {
      if(init) return;
      init = true;

      debugSwitch(debug,() => {
        // NOTICE: DEBUG
        console.log("[mode][debug] 只能執行一次")
        setState(STATE.LOADING);

        debugTimeout1 = setTimeout(() => {
          mockResponse();
          setState(STATE.COUNTDOWN);
          // console.log("[Countdown] start")
          const defaultTime = moment().add(20,'second').format('YYYY-MM-DD HH:mm:ss');
          const countDownStr = defaultTime;
          countDown(countDownStr);
        }, 2000);
      }, () => {
        // NOTICE: PRODUCTION
        setState(STATE.LOADING);
        requestRecommendProducts();
      })

      return () => {
        debugSwitch(debug, () => {
          // NOTICE: DEBUG
          console.log("effect return cancel.intervalIDRef.current",intervalIDRef.current)
          cancelCountDown();
        }, () => {
          // NOTICE: PRODUCTION
          console.log("effect return cancel.intervalIDRef.current",intervalIDRef.current)
          cancelCountDown();
        })
      }

    }, [])

    const asyncRefreshTimeout = () => {
      let retry = true;
      const asyncRequestRefresh = () => new Promise((resolve, reject) => {
        const pendingRefetch = () => {
          setTimeout(() => {
            resolve(false)
          }, 20 * 1000)
        };
        triggerRefresh(null).then((result)  => {
          console.log("result", result);
          const data = (result as any).data as PostLoanQuotaRefreshResponse;
          console.log("data", data);
          if((result as any).error) {
            // NOTICE: 商務邏輯錯誤
            console.log("商務邏輯錯誤 - 像是時間太頻繁")
            pendingRefetch();
          } else {
            if(data.effective) {
              resolve(true);
            } else {
              console.log("沒得到")
              pendingRefetch();
            }
          }
        }).catch((error) => {
          console.log("error", error);
          pendingRefetch();
        });
      })

      if(!retry) {
        clearTimeout(triggerRefreshID);
        requestRecommendProducts();
      } else {
        asyncRequestRefresh().then((effective) => {
          if(effective) {
            retry = false;
            requestRecommendProducts();
          } else {
            retry = true;
            // currentRetryCount++;
            asyncRefreshTimeout();
          }
        }).catch((error) => {
          // console.log("error", error)
          // console.log("還是拿不到")
          retry = true;
          asyncRefreshTimeout();
        })
      }

    }

    const onClickToLoadRecommendation = useCallback(() => {
      setState(STATE.OVERDUE_LOADING);

      debugSwitch(debug, () => {
        // NOTICE: DEBUG
        debugTimeout2 = setTimeout(() => {
          mockResponse();
          setState(STATE.COUNTDOWN);
          // const mockCountDownStr = currentData?.quotaExpireTime;
          const defaultTime = moment().add(20,'second').format('YYYY-MM-DD HH:mm:ss');
          const mockCountDownStr = defaultTime;
          countDown(mockCountDownStr);
        }, 3 * 1000)
      }, () => {

        // NOTICE: PRODUCTION
        asyncRefreshTimeout();
      })

    }, [debug]);

    // NOTICE: 放在這邊其他地方讀取會是 undefined
    // let intervalID: NodeJS.Timer;
    // NOTICE: replace by this
    const intervalIDRef = useRef<NodeJS.Timer>();

    const onClickToApply = () => {
      // console.log("onClickToApply.state", state);
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
        console.log("result", result);
      }).catch((error) => {
        console.log(error);
      })

    };

    useEffect(() => {
      if(currentData?.quotaBar.current) {
        setCurrentValue(currentData?.quotaBar.current)
      }
    }, [currentData?.quotaBar.current]);

    const getTimeInfoBetweenCurrentAndCountDown = (quotaExpireTime: string) => {
      // NOTICE: REFACTOR ME (debug)
      const currentTime = debug ? moment() : moment.tz("Asia/Kolkata")
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

    const countDown = (countDownStr: string) => {
      // console.log("[Countdown] start")
      // const defaultTime = moment().add(20,'second').format('YYYY-MM-DD HH:mm:ss');
      // const countDownStr = currentData?.quotaExpireTime || defaultTime;
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

    console.log("state", STATE[state])

    if(state !== STATE.APPLY && state !== STATE.APPLY_OVERDUE && state !== STATE.APPLY_REPEAT) {
      return (
        <EmbedPage>
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
                  setCurrentValue(!isNaN(value) ? value : 0)
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
                  <Button color="#fff" background="#F82626" onClick={onClickToLoadRecommendation}>
                    <span>Re-Acquire The Loan Amount</span>
                  </Button>
                </div>
              )}
              {/*// NOTICE: DEBUG*/}
              {/*{(state === STATE.OVERDUE) && (*/}
              {/*  <div className="button-container">*/}
              {/*    <Button color="#fff" background="#F82626" onClick={onClickToLoadRecommendation}>*/}
              {/*      <span>測試開拿</span>*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*)}*/}
              {state === STATE.OVERDUE_LOADING && (
                <div className="button-container">
                  <Button color="#fff" background="#F82626">
                    {/*<span>Loading</span>*/}
                    <StyledLoading style={{
                      transform: "scale(0.3)",
                      width: "10px",
                      height: "20px",
                      top: "-9px",
                    }}
                    bg="#fff"/>
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
              {state === STATE.LOADING && (
                <div className="container">
                  <div>Loading</div>
                </div>
              )}
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
                  terms={product?.interestRate ?? ""}
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
            </StyledList>

            <Footer>
              <Button
                background="#F58B10"
                disable={state === STATE.INIT || state === STATE.LOADING || state === STATE.OVERDUE_LOADING || productList.length === 0}
                onClick={() =>{
                  if((state === STATE.COUNTDOWN || state === STATE.OVERDUE) && productList.length > 0) onClickToApply();
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
            {/*{state === STATE.APPLY && (*/}
            {/*  <div className="content">*/}
            {/*    <p className="p1">After the review is successful, you can view your loan order in the loan record.</p>*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*{state === STATE.APPLY_OVERDUE && (*/}
            {/*  <div className="content">*/}
            {/*    <p className="p1">The limited-time promotional loan scheme has expired, and the loan amount will be based on the latest review results.</p>*/}
            {/*    <p className="p2">Please be patient while waiting for the review results. After the review is successful, you can view your loan order in the loan record.</p>*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*{state === STATE.APPLY_REPEAT && (*/}
            {/*  <div>*/}
            {/*    <p className="p1">Please do not resubmit and wait patiently.</p>*/}
            {/*  </div>*/}
            {/*)}*/}
          </ApplyContainer>
        </Page>
      )
    }
};

export default ProductAdModalListPage;


