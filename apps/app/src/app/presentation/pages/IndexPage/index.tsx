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
import {RootState} from "../../../usecaseFlow/reduxStore";
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
import {LoanAgreementModal} from "../../modals/QRLoanAgreementModal";
import {QuickRepaymentSummaryModal} from "../../modals/QuickRepaymentSummaryModal";
import {QRSuccessModal} from "../../modals/QRSuccessModal";
import moment from "moment-timezone";
import {Page} from "../../components/layouts/Page";
import {Moment} from "moment";

import {USER_AUTH_STATE} from "../../../domain/USER_AUTH_STATE";
import {ORDER_STATE} from "../../../domain/ORDER_STATE";
import {RISK_CONTROL_STATE} from "../../../domain/RISK_CONTROL_STATE";
import {indexPageSlice} from "../../../usecaseFlow/reduxStore/indexPageSlice";
import {AuthorizationModal} from "../../modals/AuthorizationModal";
import {modalSlice} from "../../../usecaseFlow/reduxStore/modalSlice";
import {NoticeOrderOrQuotaRejectedSection} from "./sections/NoticeSection/NoticeOrderOrQuotaRejectedSection";
import {UseCaseActions} from "../../../usecaseFlow/usecaseAction/useCaseActions";
import {FeeRateKeyEnum} from "../../../api/indexService/FeeRateKeyEnum";
import {PlatformProduct} from "../../../api/indexService/PlatformProduct";
import {ProductApplyDetail} from "../../../api/loanService/ProductApplyDetail";

export type FinalProductType = PlatformProduct & {
  calculating: {
    finalLoanPrice: number;
    interestPrice: number;
    terms: number;
    disbursalPrice: number;
    dueDate: string;
  }
}

export type FinalProductsSummary = {
  loanAmount: number;
  interest: number;
  processingFee: number;
  serviceCharge: number;
  disbursalAmount: number;
  repaymentDate: Moment | null;
}

export type FeeRateKeyToPriceMapping = {
  [key in FeeRateKeyEnum]: number
};

const initialFinalProductsSummary: FinalProductsSummary = {
  loanAmount: 0,
  interest: 0,
  processingFee: 0,
  serviceCharge: 0,
  disbursalAmount: 0,
  repaymentDate: null,
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UseCaseActions.UserViewIndexPageAction());
  }, []);

  const indexPageState = useSelector((state: RootState) => state.indexPage);
  // const [hasClickReacquireCredit, setHasClickReacquireCredit] = useState(false);

  const onClickReacquireCredit = useCallback(() => {
    // setHasClickReacquireCredit(!hasClickReacquireCredit);
    // dispatch(indexPageSlice.actions.reacquire({}));
    dispatch(UseCaseActions.UserReacquireCreditAction(null));
  }, [])

  // NOTE:
  let finalPageState = PageStateEnum.unknow;
  if(indexPageState.user.state === USER_AUTH_STATE.authing) {
    finalPageState = PageStateEnum.UserAuthing;
  } else if(indexPageState.user.state === USER_AUTH_STATE.reject) {
    finalPageState = PageStateEnum.UserRejected;
  }

  const navigate = useNavigate();

  // NOTICE: 推薦產品
  const [quotaBarTargetPrice, setQuotaBarTargetPrice] = useState(0);
  const [calculatingProducts, setCalculatingProducts] = useState<FinalProductType[]>()
  const [currentSelectedProductsPrice, setCurrentSelectedProductsPrice] = useState(0);
  const [calculatingSummary, setCalculatingSummary] = useState<FinalProductsSummary>();

  // console.log("calculatingProducts", calculatingProducts);

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


      const keyFeeMapping: any = indexPageState.indexAPI?.chargeFeeDetails.reduce((previousMap, currentValue) => {
        return {
          ...previousMap,
          [currentValue.key]: currentValue.counting
        }
      }, {})
      // console.log("keyFeeMapping", keyFeeMapping);

      const finalProductsSummary = {...initialFinalProductsSummary};
      // console.log("finalProductsSummary", finalProductsSummary);
      if(keyFeeMapping) {
        currentSelectedProducts.map((product) => {
          // console.log("product", product);
          const interestPrice = product.calculating.finalLoanPrice * product.platformChargeFeeRate * keyFeeMapping.LOAN_INTEREST;
          const disbursalPrice = product.calculating.finalLoanPrice * (1 - product.platformChargeFeeRate)
          const dueDate = moment().add(product.terms - 1, "days");
          const formatedDueDate = dueDate.format("MM-DD-YYYY");

          // console.log("interestPrice", interestPrice);
          // console.log("disbursalPrice", disbursalPrice);

          product.calculating.interestPrice = interestPrice;
          product.calculating.disbursalPrice = disbursalPrice;
          product.calculating.dueDate = formatedDueDate;

          const processingFee = product.calculating.finalLoanPrice * product.platformChargeFeeRate * keyFeeMapping.PROCESSING_FEE;
          const serviceCharge = product.calculating.finalLoanPrice * product.platformChargeFeeRate * keyFeeMapping.SERVICE_FEE;

          // console.log("processingFee", processingFee);
          // console.log("serviceCharge", serviceCharge);

          finalProductsSummary.loanAmount = finalProductsSummary.loanAmount + product.calculating.finalLoanPrice
          finalProductsSummary.interest = finalProductsSummary.interest + interestPrice;
          finalProductsSummary.processingFee = finalProductsSummary.processingFee + processingFee
          finalProductsSummary.serviceCharge = finalProductsSummary.serviceCharge + serviceCharge
          finalProductsSummary.disbursalAmount = finalProductsSummary.disbursalAmount + disbursalPrice;

          if(finalProductsSummary.repaymentDate) {
            const afterDueDate = dueDate.isAfter(finalProductsSummary.repaymentDate)
            if(afterDueDate) {
              finalProductsSummary.repaymentDate = dueDate;
            }
          } else {
            finalProductsSummary.repaymentDate = dueDate;
          }
        })
      }
      // console.log("finalProductsSummary", finalProductsSummary);
      setCalculatingSummary(finalProductsSummary);
      setCalculatingProducts(currentSelectedProducts)
      setCurrentSelectedProductsPrice(currentSelectedProductsPrice);
    }
  }, [indexPageState.indexAPI?.products, quotaBarTargetPrice])

  const modelState = useSelector((state: RootState) => state.model);

  const applyDisable = useMemo(() => {
    let disable = false;

    // NOTICE: 主義下面判斷是否變成不能根據優先順序
    if(
      indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota ||
      indexPageState.order.state === ORDER_STATE.hasInComingOverdueOrder ||
      indexPageState.order.state === ORDER_STATE.hasOverdueOrder ||
      // NOTICE: 額度不足
      // REFACTOR ME
      indexPageState.indexAPI?.availableAmount === 0 ||
      calculatingProducts?.length === 0
    ) {
      disable = true;
    }
    return disable;
  }, [indexPageState.user.state, indexPageState.order.state, indexPageState.riskControl.state, calculatingProducts])

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

  const {isLoading, isSuccess, isError} = useSelector((state: RootState) => state.indexPage.api.reacquire);



  const countdown = useSelector((state: RootState) => state.indexPage.timeout.riskControlDate);
  // console.log("countdown", countdown);

  const refreshableCountdown = useSelector((state: RootState) => state.indexPage.timeout.refreshableDate);
  // console.log("refreshableCountdown", refreshableCountdown);

  // NOTICE: refactor me
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

    dispatch(UseCaseActions.UserApplyProductAction({
      applyAmount: currentSelectedProductsPrice,
      // bankId: 11,
      details: simpleProducts,
    }))

  }, [calculatingProducts, currentSelectedProductsPrice]);


  const onClickToCustomerService = useCallback(() => {
    navigate('/customer-service');
  }, []);

  return (
    <Page className={"flex flex-col"}>
      {/*<input type="checkbox" className="toggle" checked />*/}

      <div className={"flex grow flex-col"}>

        <div>
          <MarqueeSection state={indexPageState}/>
        </div>

        <div className={"mb-5"}>
          <UserInformationSection
            state={indexPageState}
            pageState={finalPageState}
            setQuotaBarTargetPrice={setQuotaBarTargetPrice}
            countdown={countdown}
            onClickToCustomerService={onClickToCustomerService}
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
              // NOTICE: 額度不足
              indexPageState.indexAPI?.noQuotaBalance === false && indexPageState.indexAPI?.availableAmount === 0,
            ].some(condition => condition === true) &&
            (
            <div className={"mb-3"}>
              <LoanOverViewSection state={indexPageState}/>
            </div>
          )}


          {/*TODO: Remove me by identify state*/}
          <div className={"mb-3"}>
            <TipsSection state={indexPageState} isLoading={isLoading}/>
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

          {/*TODO:新客拒絕或是老客拒絕*/}
          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.order.state === ORDER_STATE.reject
          ) && (
              <>
                <NoticeOrderOrQuotaRejectedSection days={refreshableCountdown.days}/>
              </>
          )}

          {/*TODO: 檢查下*/}
          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota
          ) && (
            <>
              <NoticeUserAuthedEmptyQuotaSection hours={refreshableCountdown.hours}/>
            </>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            (
              indexPageState.order.state === ORDER_STATE.reject ||
              indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota
            )
          ) && (
            <WelcomeBackAndReapplyInTimeSection refreshableCountdown={refreshableCountdown}/>
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

        {isLoading && (
          <div className={"text-xs text-gray-500 text-center mb-3"}>
            Please wait patiently for 30 seconds to two minutes while we review the maximum amount you can borrow as quickly as possible.
          </div>
        )}
        {/*NOTE: 可以點擊獲取額度*/}
        {/*NOTE: 當點擊獲取額度時，顯示反灰按鈕*/}
        {(
          indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able ||
          indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_one_time
        ) && (
          <>
            <Button
              onClick={onClickReacquireCredit}
              dataTestingID={"reacquireCredit"}
              text={"Reacquire Credit Amount"}
              loading={isLoading}
              bgColor={cx({
                "bg-[#F58B10]": indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able,
                "bg-[#D7D7D7]": isLoading
              })}/>
          </>
        )}
      </div>

      {/*NOTE: Quick Repay Modal*/}
      {modelState.quickRepaymentSummaryModal.show && (
        <QuickRepaymentSummaryModal
          state={indexPageState}
          calculatingProducts={calculatingProducts || []}
          calculatingSummary={calculatingSummary || {...initialFinalProductsSummary}}
          bankcardList={modelState.quickRepaymentSummaryModal.bankcardList || []}
          selectedBankcardId={modelState.quickRepaymentSummaryModal.selectedBankcardId}
          onChangeBankcardID={(id: number) => {
            dispatch(modalSlice.actions.updateQuickRepaymentSummaryModalSelectedID({
              selectedBankcardId: id
            }))
          }}
          onClose={() => {
            dispatch(modalSlice.actions.updateQuickRepaymentSummaryModal({
              show: false,
              confirm: false,
            }))
          }}
          onConfirmApply={() => {
            dispatch(modalSlice.actions.updateQuickRepaymentSummaryModal({
              // NOTICE: 此處不關閉，來避免用戶提交中返回到首頁
              show: true,
              confirm: true,
            }))
          }}
          onClickLoanAgreement={() => {
            dispatch(modalSlice.actions.updateLoanAgreementModal({
              show: true,
            }))
          }}
        />
      )}

      {/*NOTE: Quick Repay - RepaymentAgreementModal*/}
      {modelState.loanAgreementModal.show && (
        <LoanAgreementModal onClose={() => {
          dispatch(modalSlice.actions.updateLoanAgreementModal({
            show: false,
          }));
        }}/>
      )}

      {/*NOTE: Quick Repay - SuccessModal*/}
      {modelState.QRSuccessModal.show && (
        <QRSuccessModal onClose={() => {
          dispatch(modalSlice.actions.updateQRSuccessModal({
            show: false,
          }))
        }}/>
      )}

      {modelState.authorizationModal.show && (
        <AuthorizationModal
          onClose={() => {
            dispatch(modalSlice.actions.updateAuthorizationModal({
              show: false,
              confirm: false,
            }))
          }}
          onConfirm={() => {
            dispatch(modalSlice.actions.updateAuthorizationModal({
              show: false,
              confirm: true,
            }))
          }}
        />
      )}

    </Page>
  )
}

