import {TabBar} from "../../components/layouts/TabBar";
import {LoanInformationSection} from "./sections/LoanInformationSection";
import {UserInformationSection} from "./sections/UserInformationSection";
import {RecommendedProductsSection} from "./sections/RecommendedProductsSection";
import {MarqueeSection} from "./sections/MarqueeSection";
import {Button} from "../../components/layouts/Button";
import {PageContent} from "../../components/layouts/PageContent";
import {TipsSection} from "./sections/TipsSection";

// import {NoticeOrderRejectedSection} from "./sections/NoticeSection/NoticeOrderRejectedSection";
import {NoticeUserRejectedSection} from "./sections/NoticeSection/NoticeUserRejectedSection";

import {NoticeUserAuthedEmptyQuotaSection} from "./sections/NoticeSection/NoticeUserAuthedEmptyQuotaSection";
import {NoticeUserInProgressAuthStatusSections} from "./sections/NoticeSection/NoticeUserInProgressAuthStatusSections";

import {WelcomeBackAndReapplyInTimeSection} from "./sections/WelcomeBackAndReapplyInTimeSection";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {indexPageSlice, ORDER_STATE, RISK_CONTROL_STATE, USER_AUTH_STATE, UserApplyProductAction} from "../../flow";
import {AuthenticationSection} from "./sections/AuthenticationSection";
import {ADBannerSection} from "./sections/ADBannerSection";
import {LoanOverViewSection} from "./sections/LoanOverViewSection";
import {useCallback, useEffect, useMemo, useState} from "react";
import cx from "classnames";
import {NoticeUserReacquireOver3TimeSections} from "./sections/NoticeSection/NoticeUserReacquireOver3TimeSections";
import {useNavigate} from "react-router-dom";
import {Horizontal} from "../../components/layouts/Horizontal";
import {Product} from "./sections/RecommendedProductsSection/Product";
import {AiOutlineClose, MdExpandLess, MdExpandMore} from "react-icons/all";
import {CloseButton} from "../../components/layouts/CloseButton";
import {LoanAgreementModal} from "../../models/QRLoanAgreementModal";
import {QuickRepaymentModal} from "../../models/QuickRepaymentModal";
import {QRSuccessModal} from "../../models/QRSuccessModal";
import moment from "moment-timezone";
import {PlatformProduct} from "../../api/services/indexService/getIndexService";
import {ProductApplyDetail} from "../../api/services/loanService";
import {Page} from "../../components/layouts/Page";

export type FinalProductType = PlatformProduct & {

  calculating: {
    finalLoanPrice: number;
    interestPrice: number;
    terms: number;
    disbursalPrice: number;
    dueDate: string;
  }
}

export enum PageStateEnum {
  unknow,
  UserAuthing,
  UserRejected,
}

export type PageState = {
  pageState: PageStateEnum;
}
export const IndexPage = () => {
  const indexPageState = useSelector((state: RootState) => state.indexPage);
  // const [hasClickReacquireCredit, setHasClickReacquireCredit] = useState(false);

  const dispatch = useDispatch();
  const onClickReacquireCredit = useCallback(() => {
    // setHasClickReacquireCredit(!hasClickReacquireCredit);
    dispatch(indexPageSlice.actions.reacquire({}));
  }, [])

  // NOTE:
  let finalPageState = PageStateEnum.unknow;
  if(indexPageState.user.state === USER_AUTH_STATE.authing) {
    finalPageState = PageStateEnum.UserAuthing;
  } else if(indexPageState.user.state === USER_AUTH_STATE.reject) {
    finalPageState = PageStateEnum.UserRejected;
  }

  const applyDisable = useMemo(() => {
    let disable = false;

    // NOTICE: 主義下面判斷是否變成不能根據優先順序
    if(
      indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota ||
      indexPageState.order.state === ORDER_STATE.hasInComingOverdueOrder ||
      indexPageState.order.state === ORDER_STATE.hasOverdueOrder ||
      indexPageState.indexAPI?.availableAmount === 0
    ) {
      disable = true;
    }
    return disable;
  }, [indexPageState.user.state, indexPageState.order.state, indexPageState.riskControl.state])

  const applyHide = useMemo(() => {
    return [
      indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota,
      indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_one_time,
      indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_over_3,
      indexPageState.order.state === ORDER_STATE.reject,
      indexPageState.user.state === USER_AUTH_STATE.ready,
      indexPageState.user.state === USER_AUTH_STATE.authing,
      indexPageState.user.state === USER_AUTH_STATE.reject,

    ].some(condition => condition === true);
  }, [indexPageState.riskControl.state, indexPageState.order.state, indexPageState.user.state])

  const navigate = useNavigate();

  // NOTICE: 推薦產品
  const [quotaBarTargetPrice, setQuotaBarTargetPrice] = useState(0);
  const [calculatingProducts, setCalculatingProducts] = useState<FinalProductType[]>()
  const [currentSelectedProductsPrice, setCurrentSelectedProductsPrice] = useState(0);

  // NOTE: setCalculatingProducts
  useEffect(() => {
    // console.log("==============================")
    // console.log("預期要借的總額", quotaBarTargetPrice);
    if(indexPageState.indexAPI?.products && quotaBarTargetPrice > 0) {
      let currentSelectedProductsPrice = 0;
      // console.log("currentSelectedProductsPrice", currentSelectedProductsPrice)

      const currentSelectedProducts: FinalProductType[] = [];
      let processSuccess = false;

      let firstRoundFinalIndex = 0
      indexPageState.indexAPI?.products.map((product, index) => {
        if(processSuccess) {
          // NOTE: 已經完成任務，忽略執行
        } else {
          // console.log("currentTotalPrice", currentSelectedProductsPrice)
          // NOTE: 假如加入此商品沒爆掉。
          const tempCurrentSelectedProductsPrice = currentSelectedProductsPrice + product.max;

          if(tempCurrentSelectedProductsPrice <= quotaBarTargetPrice) {
            // NOTE: 實際加入此商品
            const finalProduct: FinalProductType = {
              ...product,
              calculating: {
                finalLoanPrice: product.max,
                interestPrice: 0,
                terms: 0,
                disbursalPrice: 0,
                dueDate: "",
              }
            }
            currentSelectedProducts.push(finalProduct);
            // console.log("add product.max", product.max);

            // NOTE: 實際加入後商品的總額
            currentSelectedProductsPrice = currentSelectedProductsPrice + product.max;
            // console.log("added product currentTotalPrice", currentSelectedProductsPrice)
          } else {
            // 不能再借了
            firstRoundFinalIndex = index;
            processSuccess = true;
          }
        }
      })

      // console.log("第一步已借的總商品金額", currentSelectedProductsPrice);
      // console.log("第一步已借的總商品", currentSelectedProducts);

      // NOTICE: second round
      // 還差多少要補
      const remainDistributingQuota = quotaBarTargetPrice - currentSelectedProductsPrice;
      // console.log("最後要補的總商品金額", remainDistributingQuota);

      // 目前商品無法滿足，往下找並且計算範圍
      let nextIndex = firstRoundFinalIndex;
      const maxIndex = indexPageState.indexAPI?.products?.length - 1;
      // console.log("nextIndex", nextIndex);
      // console.log("maxIndex", maxIndex);

      while(processSuccess && nextIndex <= maxIndex) {
        const nextProduct = indexPageState.indexAPI?.products[nextIndex];
        // console.log("nextProduct", nextProduct);
        if(
          nextProduct &&
          nextProduct.min <= remainDistributingQuota &&
          remainDistributingQuota < nextProduct.max
        ) {
          // console.log("目前商品可以不借到 max 來達到滿足")
          // console.log("只借: ", remainDistributingQuota);
          // NOTE: 實際商品最後借到的金額
          const finalProduct: FinalProductType = {
            ...nextProduct,
            calculating: {
              finalLoanPrice: remainDistributingQuota,
              interestPrice: 0,
              terms: 0,
              disbursalPrice: 0,
              dueDate: "",
            }
          }
          currentSelectedProducts.push(finalProduct);
          currentSelectedProductsPrice = currentSelectedProductsPrice + remainDistributingQuota;
          processSuccess = false;
        } else {
          // console.log("下個產品最小金額無法滿足剩餘要借的")
          nextIndex = nextIndex + 1;
        }
      }
      // console.log("currentSelectedProducts", currentSelectedProducts);
      // console.log("currentSelectedProductsPrice", currentSelectedProductsPrice);


      const loanInterestRate = indexPageState.indexAPI?.chargeFeeDetails.find(fee => fee.key === "LOAN_INTEREST");

      if(loanInterestRate) {
        currentSelectedProducts.map((product) => {
          const interestPrice = product.calculating.finalLoanPrice * product.platformChargeFeeRate * loanInterestRate.counting;
          const disbursalPrice = product.calculating.finalLoanPrice * (1 - product.platformChargeFeeRate)
          const dueDate = moment().add(product.terms - 1, "days").format("MM-DD-YYYY")
          product.calculating.interestPrice = interestPrice;
          product.calculating.disbursalPrice = disbursalPrice;
          product.calculating.dueDate = dueDate;
        })
      }
      setCalculatingProducts(currentSelectedProducts)
      setCurrentSelectedProductsPrice(currentSelectedProductsPrice);
    }
  }, [indexPageState.indexAPI?.products, quotaBarTargetPrice])

  const onClickApply = useCallback(() => {
    // NOTICE: empty guard
    if(!calculatingProducts) return;
    const simpleProducts: ProductApplyDetail[] = calculatingProducts.map((product) => {
      const simpleProduct: ProductApplyDetail = {
        applyAmount: product.calculating.finalLoanPrice,
        productId: product.productId,
      }
      return simpleProduct;
    });
    dispatch(UserApplyProductAction({
      applyAmount: currentSelectedProductsPrice,
      bankId: 11,
      details: simpleProducts,
    }))
  }, [currentSelectedProductsPrice]);

  return (
    <Page className={"flex flex-col"}>

      <div className={"flex grow flex-col"}>

        <div>
          <MarqueeSection state={indexPageState}/>
        </div>

        <div className={"mb-5"}>
          <UserInformationSection
            state={indexPageState}
            pageState={finalPageState}
            setQuotaBarTargetPrice={setQuotaBarTargetPrice}
          />
        </div>

        <PageContent>

          {indexPageState.user.state === USER_AUTH_STATE.ready && (
            <>
              <div className={"mb-3"}>
                <LoanInformationSection state={indexPageState}/>
              </div>
              <div className={"mb-3"}>
                <AuthenticationSection/>
              </div>
              <div className={"mb-3"}>
                {/*TODO*/}
                <ADBannerSection state={indexPageState}/>
              </div>
            </>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.valid
          )&& (
            <div className={"mb-4 mt-6"}>
              <RecommendedProductsSection state={indexPageState} calculatingProducts={calculatingProducts || []}/>
              <Horizontal/>
            </div>
          )}

          {
            [
              indexPageState.riskControl.state === RISK_CONTROL_STATE.valid,
              indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able,
              indexPageState.order.state === ORDER_STATE.hasInComingOverdueOrder,
              indexPageState.order.state === ORDER_STATE.hasOverdueOrder,
              indexPageState.indexAPI?.noQuotaBalance === false && indexPageState.indexAPI?.availableAmount === 0,
            ].some(condition => condition === true) &&
            (
            <div className={"mb-3"}>
              <LoanOverViewSection state={indexPageState}/>
            </div>
          )}


          {/*TODO: Remove me by identify state*/}
          <div className={"mb-3"}>
            <TipsSection state={indexPageState}/>
          </div>

          {indexPageState.user.state === USER_AUTH_STATE.authing ? (
            <NoticeUserInProgressAuthStatusSections/>
          ): indexPageState.user.state === USER_AUTH_STATE.reject ? (
            <NoticeUserRejectedSection/>
          ) : null}

          {
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_over_3 &&
            (
              <NoticeUserReacquireOver3TimeSections/>
            )
          }

          {/*TODO:訂單拒絕這邊不會有*/}
          {/*{(*/}
          {/*  indexPageState.user.state === USER_AUTH_STATE.success &&*/}
          {/*  indexPageState.order.state === ORDER_STATE.reject*/}
          {/*) && (*/}
          {/*    <>*/}
          {/*      <NoticeOrderRejectedSection/>*/}
          {/*    </>*/}
          {/*)}*/}

          {/*TODO: 檢查下*/}
          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota
          ) && (
            <>
              <NoticeUserAuthedEmptyQuotaSection/>
            </>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            (
              indexPageState.order.state === ORDER_STATE.reject ||
              indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota
            )
          ) && (
            <WelcomeBackAndReapplyInTimeSection/>
          )}


        </PageContent>

      </div>

      <div className={"sticky bottom-[63px] px-3 py-2"}>
        {/*TODO*/}
        {!applyHide &&
          (indexPageState.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able) && (
          <Button dataTestingID={"apply"} text={"Apply Now"} bgColor={cx({
            "bg-[#F58B10]": !applyDisable,
            "bg-[#D7D7D7]": applyDisable,
          })}
            onClick={onClickApply}
          />
        )}

        {(
          indexPageState.user.state === USER_AUTH_STATE.authing ||
          indexPageState.user.state === USER_AUTH_STATE.reject
        ) && (
          <>
            <Button onClick={() => {
              navigate("/application-progress");
            }} dataTestingID={"viewAppProgress"} text={"View Application Progress"} bgColor={"bg-[#F58B10]"}/>
          </>
        )}

        {/*NOTE: 可以點擊獲取額度*/}
        {/*NOTE: 當點擊獲取額度時，顯示反灰按鈕*/}
        {(
          indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able
        ) && (
          <>
            <Button
              onClick={onClickReacquireCredit}
              dataTestingID={"reacquireCredit"}
              text={"Reacquire Credit Amount"}
              bgColor={cx({
                "bg-[#F58B10]": indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able,
                "bg-[#D7D7D7]": indexPageState.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able
              })}/>
          </>
        )}

      </div>

      {/*NOTE: 一鍵借款 Modal*/}
      {/*<QuickRepaymentModal state={indexPageState}/>*/}
      {/*NOTE: 一鍵借款 AgreementModal*/}
      {/*<LoanAgreementModal/>*/}
      {/*<QRSuccessModal/>*/}

    </Page>
  )
}

