import {Moment} from 'moment';
import moment from 'moment-timezone';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useNavigate} from 'react-router';

import {FeeRateKeyEnum} from '../../../externel/backend/indexService/FeeRateKeyEnum';
import {PlatformProduct} from '../../../externel/backend/indexService/PlatformProduct';
import {ProductApplyDetail} from '../../../externel/backend/loanService/ProductApplyDetail';
import {ORDER_STATE} from '../../../domain/order/ORDER_STATE';
import {RISK_CONTROL_STATE} from '../../../domain/risk/RISK_CONTROL_STATE';
import {USER_AUTH_STATE} from '../../../domain/user/USER_AUTH_STATE';
import {getToken} from '../../../application/getToken';
import {RootState} from '../../../reduxStore';
import {modalSlice} from '../../../reduxStore/modalSlice';
import {Button} from '../../core-components/Button';
import {Horizontal} from '../../core-components/Horizontal';
import {LoanOverViewSection} from '../../core-components/sections/LoanOverViewSection';
import {AuthorizationModal} from '../../modals/AuthorizationModal';
import {LoanAgreementModal} from '../../modals/QRLoanAgreementModal';
import {QRSuccessModal} from '../../modals/QRSuccessModal';
import {QuickRepaymentSummaryModal} from '../../modals/QuickRepaymentSummaryModal';
import {PageOrModalPathEnum} from '../../PageOrModalPathEnum';
import {NoticeOrderOrQuotaRejectedSection} from './noticeSections/NoticeOrderOrQuotaRejectedSection';
import {NoticeUserAuthedEmptyQuotaSection} from './noticeSections/NoticeUserAuthedEmptyQuotaSection';
import {NoticeUserInProgressAuthStatusSections} from './noticeSections/NoticeUserInProgressAuthStatusSections';
import {NoticeUserReacquireOver3TimeSections} from './noticeSections/NoticeUserReacquireOver3TimeSections';
import {NoticeUserRejectedSection} from './noticeSections/NoticeUserRejectedSection';
import {ADBannerSection} from './sections/ADBannerSection';
import {AuthenticationSection} from './sections/AuthenticationSection';
import {LoanInformationSection} from './sections/LoanInformationSection';
import {MarqueeSection} from './sections/MarqueeSection';
import {RecommendedProductsSection} from './sections/RecommendedProductsSection';
import {TipsSection} from './sections/TipsSection';
import {UserInformationSection} from './sections/UserInformationSection';
import {WelcomeBackAndReapplyInTimeSection} from './sections/WelcomeBackAndReapplyInTimeSection';
import {IndexPageSagaAction} from './userUsecaseSaga/indexPageActions';
import SystemCouponModal from '../../modals/SystemCouponModal';
import {computeNumber} from "../../../modules/computeNumber";
import {formatDate} from "../../../modules/format/formatDate";
import NoRecommendProductModal from '../../modals/NoRecommendProductModal';
import ExitConfirmModal from '../../modals/ExitConfirmModal';

export type FinalProductType = PlatformProduct & {
  calculating: {
    finalLoanPrice: number;
    interestPrice: number;
    terms: number;
    disbursalPrice: number;
    dueDate: string;
  };
};

export type FinalProductsSummary = {
  loanAmount: number;
  interest: number;
  processingFee: number;
  serviceCharge: number;
  disbursalAmount: number;
  repaymentDate: Moment | null;
};

export type FeeRateKeyToPriceMapping = {
  [key in FeeRateKeyEnum]: number;
};

const initialFinalProductsSummary: FinalProductsSummary = {
  loanAmount: 0,
  interest: 0,
  processingFee: 0,
  serviceCharge: 0,
  disbursalAmount: 0,
  repaymentDate: null,
};

export enum PageStateEnum {
  unknow,
  UserAuthing,
  UserRejected,
}

export type PageState = {
  pageState: PageStateEnum;
};

const IndexPage = () => {
  const dispatch = useDispatch();
  const [webViewVisible, setWebViewVisible] = useState(false);

  // NOTICE: REFACTOR ME
  useEffect(() => {
    dispatch(IndexPageSagaAction.user.viewIndexPageAction());
  }, []);

  useEffect(() => {
    // 監聽驗證完到首頁，重新取得index資料
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setWebViewVisible(true);
      } else {
        setWebViewVisible(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // NOTICE: REFACTOR ME
  useEffect(() => {
    if (webViewVisible) {
      dispatch(IndexPageSagaAction.user.viewIndexPageAction());
    }
  }, [webViewVisible]);


  const indexPageState = useSelector((state: RootState) => state.indexPage);
  // console.log(indexPageState)
  // NOTE: unknow | UserAuthing | UserRejected
  let finalPageState = PageStateEnum.unknow;
  if (indexPageState.user.state === USER_AUTH_STATE.authing) {
    finalPageState = PageStateEnum.UserAuthing;
  } else if (indexPageState.user.state === USER_AUTH_STATE.reject) {
    finalPageState = PageStateEnum.UserRejected;
  }

  // NOTE: User Event
  const isShowReacquireButton = indexPageState.user.state !== USER_AUTH_STATE.reject && indexPageState.user.state !== USER_AUTH_STATE.authing &&
    (indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able
      || indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_one_time) &&
    ( indexPageState.order.state === ORDER_STATE.empty
      || indexPageState.order.state === ORDER_STATE.normal
      || indexPageState.order.state === ORDER_STATE.hasInComingOverdueOrder
      || indexPageState.order.state === ORDER_STATE.hasOverdueOrder
    );

  const disableClickReacquireCredit = !(indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able && indexPageState.order.state !== ORDER_STATE.hasOverdueOrder) ;
  // && !(indexPageState.riskControl.state === RISK_CONTROL_STATE.valid);

  const onClickReacquireCredit = useCallback(() => {
    dispatch(IndexPageSagaAction.user.reacquireCreditAction(null));
  }, [disableClickReacquireCredit]);

  const onUserClickViewApplicationProgress = () => {
    navigate(`${PageOrModalPathEnum.ApplicationProgressPage}?token=${getToken()}`);
  }


  const navigate = useNavigate();

  // NOTICE: 推薦產品
  const [quotaBarTargetPrice, setQuotaBarTargetPrice] = useState(0);
  const [calculatingProducts, setCalculatingProducts] = useState<FinalProductType[]>();
  const [currentSelectedProductsPrice, setCurrentSelectedProductsPrice] = useState(0);
  const [calculatingSummary, setCalculatingSummary] = useState<FinalProductsSummary>();

//   console.log("calculatingProducts", calculatingProducts);

  // NOTE: setCalculatingProducts
  useEffect(() => {
    // console.log("==============================")
    // console.log("預期要借的總額", quotaBarTargetPrice);
    if (quotaBarTargetPrice === 0) {
        setCalculatingProducts([])
    }else if (indexPageState.indexAPI?.products && quotaBarTargetPrice > 0) {
      let currentSelectedProductsPrice = 0;
      // console.log("currentSelectedProductsPrice", currentSelectedProductsPrice)


      const currentSelectedProducts: FinalProductType[] = [];
      let processSuccess = false;

      const firstRoundFinalIndex = 0;
      indexPageState.indexAPI?.products.map((product, index) => {
        // console.log("currentTotalPrice", currentSelectedProductsPrice)
        // NOTE: 假如加入此商品總額度沒爆掉。
        const tempCurrentSelectedProductsPrice = currentSelectedProductsPrice + product.max;
        if (tempCurrentSelectedProductsPrice <= quotaBarTargetPrice) {
          // NOTE: 實際加入此商品
          const finalProduct: FinalProductType = {
            ...product,
            calculating: {
              finalLoanPrice: product.max,
              interestPrice: 0,
              terms: 0,
              disbursalPrice: 0,
              dueDate: '',
            },
          };
          currentSelectedProducts.push(finalProduct);
          // console.log("add product.max", product.max);
          // NOTE: 實際加入後商品的總額
          currentSelectedProductsPrice = currentSelectedProductsPrice + product.max;
          // console.log("added product currentTotalPrice", currentSelectedProductsPrice)
        } else if (tempCurrentSelectedProductsPrice > quotaBarTargetPrice ) {
          const remain = quotaBarTargetPrice - currentSelectedProductsPrice;
          if(product.min <= remain && remain <= product.max) {
            // NOTE: 實際加入此商品
            const finalProduct: FinalProductType = {
              ...product,
              calculating: {
                finalLoanPrice: remain,
                interestPrice: 0,
                terms: 0,
                disbursalPrice: 0,
                dueDate: '',
              },
            };
            currentSelectedProducts.push(finalProduct);
            // console.log("add product.max", product.max);
            // NOTE: 實際加入後商品的總額
            currentSelectedProductsPrice = currentSelectedProductsPrice + product.max;
            // console.log("added product currentTotalPrice", currentSelectedProductsPrice)
          }
        }
      });

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

      while (processSuccess && nextIndex <= maxIndex) {
        const nextProduct = indexPageState.indexAPI?.products[nextIndex];
        // console.log("nextProduct", nextProduct);
        if (nextProduct && nextProduct.min <= remainDistributingQuota) {
          // console.log("目前商品可以不借到 max 來達到滿足")
          // console.log("只借: ", remainDistributingQuota);
          // NOTE: 實際商品最後借到的金額
          const finalProduct: FinalProductType = {
            ...nextProduct,
            calculating: {
              finalLoanPrice: remainDistributingQuota >= nextProduct.max ? nextProduct.max : remainDistributingQuota,
              interestPrice: 0,
              terms: 0,
              disbursalPrice: 0,
              dueDate: '',
            },
          };
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
          [currentValue.key]: currentValue.counting,
        };
      }, {});
      // console.log("keyFeeMapping", keyFeeMapping);


      const finalProductsSummary = { ...initialFinalProductsSummary };
      // console.log("finalProductsSummary", finalProductsSummary);
      if (keyFeeMapping) {
        currentSelectedProducts.map((product) => {
          // console.log("product", product);

          const interestPrice = computeNumber(product.calculating.finalLoanPrice, "*", product.platformChargeFeeRate)
            .next("*", keyFeeMapping.LOAN_INTEREST)
            .result;


          const price = computeNumber(1, "-", product.platformChargeFeeRate).result
          const disbursalPrice = computeNumber(product.calculating.finalLoanPrice, "*", price).result;

          const dueDate = moment().add(product.terms - 1, 'days');
          const formatedDueDate = formatDate(dueDate)

          // console.log("interestPrice", interestPrice);
          // console.log("disbursalPrice", disbursalPrice);

          product.calculating.interestPrice = interestPrice;
          product.calculating.disbursalPrice = disbursalPrice;
          product.calculating.dueDate = formatedDueDate;

          const processingFee = computeNumber(product.calculating.finalLoanPrice, "*", product.platformChargeFeeRate)
            .next("*", keyFeeMapping.PROCESSING_FEE)
            .result;

          const serviceCharge = computeNumber(product.calculating.finalLoanPrice, "*", product.platformChargeFeeRate)
            .next("*", keyFeeMapping.SERVICE_FEE)
            .result;

          // console.log("processingFee", processingFee);
          // console.log("serviceCharge", serviceCharge);

          finalProductsSummary.loanAmount = computeNumber(finalProductsSummary.loanAmount, "+", product.calculating.finalLoanPrice)
            .result;


          // NOTE: 前置利息
          finalProductsSummary.interest = computeNumber(finalProductsSummary.interest, "+", interestPrice)
            .result;


          // NOTE: 前置利息
          finalProductsSummary.processingFee = computeNumber(finalProductsSummary.processingFee, "+", processingFee)
            .result;

          // NOTE: 前置利息
          finalProductsSummary.serviceCharge = computeNumber(finalProductsSummary.serviceCharge, "+", serviceCharge)
            .result;

          finalProductsSummary.disbursalAmount = computeNumber(finalProductsSummary.disbursalAmount, "+", disbursalPrice)
            .result;


          if (finalProductsSummary.repaymentDate) {
            const afterDueDate = dueDate.isAfter(finalProductsSummary.repaymentDate);
            if (afterDueDate) {
              finalProductsSummary.repaymentDate = dueDate;
            }
          } else {
            finalProductsSummary.repaymentDate = dueDate;
          }
        });
      }

      const lastChargeFeeKeyIndex = indexPageState.indexAPI?.chargeFeeDetails.length - 1
      const lastChargeFeeKey: any = indexPageState.indexAPI?.chargeFeeDetails[lastChargeFeeKeyIndex].key;
      // console.log("finalProductsSummary.1", JSON.parse(JSON.stringify(finalProductsSummary)));
      // console.log("lastChargeFeeKey", lastChargeFeeKey);

      if(lastChargeFeeKey) {

        const keyFeeMappingPrice: any = {
          "LOAN_INTEREST": finalProductsSummary.interest,
          "PROCESSING_FEE": finalProductsSummary.processingFee,
          "SERVICE_FEE": finalProductsSummary.serviceCharge,
        }

        let totalRemain = 0
        Object.keys(keyFeeMappingPrice).map((key: string) => {
          if(key !== lastChargeFeeKey) {
            const remain = keyFeeMappingPrice[key] % 10;
            keyFeeMappingPrice[key] = keyFeeMappingPrice[key] - remain;
            totalRemain = totalRemain + remain;
          }
        })

        if(lastChargeFeeKey) {
          keyFeeMappingPrice[lastChargeFeeKey] = keyFeeMappingPrice[lastChargeFeeKey] +  totalRemain;
          totalRemain = 0;
        }

        finalProductsSummary.interest = keyFeeMappingPrice["LOAN_INTEREST"];
        finalProductsSummary.processingFee = keyFeeMappingPrice["PROCESSING_FEE"];
        finalProductsSummary.serviceCharge = keyFeeMappingPrice["SERVICE_FEE"];

        // console.log("finalProductsSummary.2", JSON.parse(JSON.stringify(finalProductsSummary)));
      }

      // console.log("finalProductsSummary", finalProductsSummary);

      setCalculatingSummary(finalProductsSummary);
      setCalculatingProducts(currentSelectedProducts);
      setCurrentSelectedProductsPrice(currentSelectedProductsPrice);
    }
  }, [indexPageState.indexAPI?.products, quotaBarTargetPrice]);

  const applyDisable = useMemo(() => {
    let disable = false;
    // NOTICE: 主義下面判斷是否變成不能根據優先順序
    if (
      indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota ||
      indexPageState.order.state === ORDER_STATE.hasOverdueOrder ||
      // NOTICE: 額度不足
      // REFACTOR ME
      indexPageState.indexAPI?.availableAmount === 0 ||
      calculatingProducts?.length === 0
    ) {
      disable = true;
    }
    return disable;
  }, [indexPageState.user.state, indexPageState.order.state, indexPageState.riskControl.state, calculatingProducts]);

  const applyHide = useMemo(() => {
    return [
      indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota,
      indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_one_time,
      indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_over_3,
      indexPageState.riskControl.state === RISK_CONTROL_STATE.order_reject,
      indexPageState.user.state === USER_AUTH_STATE.ready,
      indexPageState.user.state === USER_AUTH_STATE.authing,
      indexPageState.user.state === USER_AUTH_STATE.reject,
      indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able,
      indexPageState.order.state === ORDER_STATE.hasOverdueOrder  && isShowReacquireButton,

      // (indexPageState.order.state === ORDER_STATE.hasOverdueOrder
      //   ||indexPageState.order.state === ORDER_STATE.normal
      //   ||indexPageState.order.state === ORDER_STATE.empty
      // ),
    ].some((condition) => condition === true);
  }, [indexPageState.riskControl.state, indexPageState.order.state, indexPageState.user.state]);

  // NOTE: 是否重新獲取額度中
  const {
    isLoading: isReacquireLoading,
    isSuccess,
    isError,
  } = useSelector((state: RootState) => state.indexPage.api.reacquire);

//   console.log("isReacquireLoading", isReacquireLoading);

  const countdown = useSelector((state: RootState) => state.indexPage.timeout.riskControlDate);
  // console.log("countdown", countdown);

  const refreshableCountdown = useSelector((state: RootState) => state.indexPage.timeout.refreshableDate);
  // console.log("refreshableCountdown", refreshableCountdown);

  // NOTE: User Event
  // TODO: refactor me
  const onClickApply = useCallback(() => {
    // NOTICE: empty guard

    if (!calculatingProducts) return;
    const simpleProducts: ProductApplyDetail[] = calculatingProducts.map((product) => {
      const simpleProduct: ProductApplyDetail = {
        applyAmount: product.calculating.finalLoanPrice,
        productId: product.productId,
      };
      return simpleProduct;
    });

    // Note: 沒有產品
    // if (simpleProducts.length === 0) {
    //     dispatch(modalSlice.actions.updateNoRecommendProductModal({ show: true }))
    // }

    dispatch(
      IndexPageSagaAction.user.applyProductAction({
          applyAmount: currentSelectedProductsPrice,
          // bankId: 11,
          details: simpleProducts,
      })
    );
    // navigate(`${PagePathEnum.IndexPage}/quick-repayment-modal?token=${getToken()}`)
  //
  }, [calculatingProducts, currentSelectedProductsPrice]);

  const onClickToCustomerService = useCallback(() => {
    navigate(`${PageOrModalPathEnum.CustomerServicePage}?token=${getToken()}`);
  }, []);

  // NOTE: Modal
  const modelState = useSelector((state: RootState) => state.model);

  return (
    <div className={'flex flex-col'}>
      {/*NOTE: 高度扣掉 TabBar:63px、Button:56px, 不能用vh計算有些瀏覽器會有自訂工具列*/}
      <div className={`flex flex-col overflow-auto h-[calc(100%-63px-56px)] w-full absolute top-0`}>
      {/*<input type="checkbox" className="toggle" checked />*/}

      {/*NOTE: 頭部與內容*/}
      <div className={'flex grow flex-col'}>
        <div>
          <MarqueeSection state={indexPageState} />
        </div>

        <div className={'mb-5'}>
          {/*NOTE: 顯示歡迎與是否顯示使用者與客服按鈕*/}
          {/*NOTE: 顯示即將逾期與逾期的狀態*/}
          {/*NOTE: 顯示尚未驗證CTA*/}
          {/*NOTE: 是否顯示 QuotaSlider*/}
          <UserInformationSection
            state={indexPageState}
            pageState={finalPageState}
            setQuotaBarTargetPrice={setQuotaBarTargetPrice}
            countdown={countdown}
            onClickToCustomerService={onClickToCustomerService}
          />
        </div>

        <div className="overflow-auto px-5 grow flex flex-col">
          {/*NOTE: 用戶尚未認證*/}
          {indexPageState.user.state === USER_AUTH_STATE.ready && (
            <>
              <div className={'mb-3'}>
                <LoanInformationSection state={indexPageState} />
              </div>

              <div className={'mb-3'}>
                <AuthenticationSection />
              </div>

              <div className={'mb-3'}>
                <ADBannerSection state={indexPageState} />
              </div>
            </>
          )}

          {/*NOTE: 用戶認證成功*/}
          {indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.valid &&
            (indexPageState.indexAPI?.availableAmount ?? 0) > 0 &&
            indexPageState.order.state !== ORDER_STATE.hasOverdueOrder  &&
            (indexPageState.indexAPI?.products?.length?? 0) > 0  && (
              <div className={'mt-6 mb-[-20px]'}>
                {/*NOTE: 顯示推薦產品列表*/}
                <RecommendedProductsSection state={indexPageState} calculatingProducts={calculatingProducts || []} />
                <Horizontal />
              </div>
            )}

          {/*NOTE: 顯示可用額度圓餅雷達圖*/}
          {
            // NOTE: 符合其中條件
            [
              indexPageState.riskControl.state === RISK_CONTROL_STATE.valid,
              indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able,
              //   indexPageState.order.state === ORDER_STATE.hasInComingOverdueOrder,
              //   indexPageState.order.state === ORDER_STATE.hasOverdueOrder,
              // NOTE: 首頁-認證完成-有效額度時間-額度不足 || 有額度
            //   indexPageState.indexAPI?.noQuotaBalance === false && indexPageState.indexAPI?.availableAmount >= 0,
            ].some((condition) => condition === true) &&
              indexPageState.user.state === USER_AUTH_STATE.success && (
                <div className={'mt-8'}>
                  <LoanOverViewSection state={indexPageState} />
                </div>
              )
          }

          {/*TODO: 用戶認證中或用戶拒絕*/}
          {indexPageState.user.state === USER_AUTH_STATE.authing ? (
            <NoticeUserInProgressAuthStatusSections />
          ) : indexPageState.user.state === USER_AUTH_STATE.reject ? (
            <NoticeUserRejectedSection />
          ) : null}

          {/*TODO: refactor me*/}
          {indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.expired_refresh_over_3 && (
              <NoticeUserReacquireOver3TimeSections />
            )}

          {/*TODO: refactor me*/}
          {/*TODO:新客拒絕或是老客拒絕*/}
          {indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.order_reject &&
            // indexPageState.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able &&
            (
              <NoticeOrderOrQuotaRejectedSection state={indexPageState}/>
            )}

          {/*NOTE: 用戶通過認證，但沒有可用額度*/}
          {indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota && (
              <NoticeUserAuthedEmptyQuotaSection />
            )}

          {/*TODO: refactor me*/}
          {/*NOTE: 顯示下次可借款倒數計時*/}
          {indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able &&
            ((indexPageState.riskControl.state === RISK_CONTROL_STATE.order_reject && Number(indexPageState.timeout.refreshableDate.days) < 1) ||
              indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota) && (
              <WelcomeBackAndReapplyInTimeSection refreshableCountdown={refreshableCountdown} />
            )}

          {/*TODO: refactor me*/}
          <div className='grow flex items-end'>
            <TipsSection state={indexPageState} isLoading={isReacquireLoading} />
          </div>

        </div>
      </div>
    </div>

      {/*NOTE: 底部*/}
      <div className={'absolute w-full bottom-[63px] px-3 py-2 '}>
        {/*// NOTE: Button - Apply Now*/}
        {!applyHide && (
          //   (indexPageState.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able) &&
          <Button
            dataTestingID={'apply'}
            dataTestingDisable={applyDisable}
            text={'Apply Now'}
            disable={applyDisable}
            onClick={() => !applyDisable && onClickApply()}
          />
        )}

        {/*TODO: refactor*/}
        {/*// NOTE: Button - View Application Progress*/}
        {(indexPageState.user.state === USER_AUTH_STATE.authing ||
          indexPageState.user.state === USER_AUTH_STATE.reject) && (
          <Button
            onClick={onUserClickViewApplicationProgress}
            dataTestingID={'viewAppProgress'}
            text={'View Application Progress'}
          />
        )}
        {isReacquireLoading && (
          <div data-testing-id={'notice-reacquireLoading'} className={'mb-3 text-center text-xs text-ctext-secondary'}>
            Please wait patiently for 30 seconds to two minutes while we review the maximum amount you can borrow as quickly as possible.
          </div>
        )}

        {/*TODO: refactor*/}
        {/*NOTE: 可以點擊獲取額度*/}
        {/*NOTE: 當點擊獲取額度時，顯示反灰按鈕*/}
        {isShowReacquireButton && (
            <Button
              dataTestingID={'reacquireCredit'}
              text={'Reacquire Credit Amount'}
              loading={isReacquireLoading}
              disable={isReacquireLoading || disableClickReacquireCredit}
              onClick={() => (!isReacquireLoading && !disableClickReacquireCredit) && onClickReacquireCredit()}
            />
          )}
      </div>

      {/*NOTE: Modals*/}
      {/*NOTE: Quick Repay Modal*/}

      {/* {modelState.quickRepaymentSummaryModal.show && (
        <div className={'z-10'}>
          <QuickRepaymentSummaryModal
            state={indexPageState}
            calculatingProducts={calculatingProducts || []}
            calculatingSummary={calculatingSummary || { ...initialFinalProductsSummary }}
            bankcardList={modelState.quickRepaymentSummaryModal.bankcardList || []}
            selectedBankcardId={modelState.quickRepaymentSummaryModal.selectedBankcardId}
            onChangeBankcardID={(id: number) => {
              dispatch(
                modalSlice.actions.updateQuickRepaymentSummaryModalSelectedID({
                  selectedBankcardId: id,
                })
              );
            }}
            onClose={() => {
              dispatch(
                modalSlice.actions.updateQuickRepaymentSummaryModal({
                  show: false,
                  confirm: false,
                })
              );
            }}
            onConfirmApply={() => {
              dispatch(
                modalSlice.actions.updateQuickRepaymentSummaryModal({
                  // NOTICE: 此處不關閉，來避免用戶提交中返回到首頁
                  show: true,
                  confirm: true,
                })
              );
            }}
            onClickLoanAgreement={() => {
              dispatch(
                modalSlice.actions.updateLoanAgreementModal({
                  show: true,
                })
              );
            }}
          />
        </div>
      )} */}

      {/*NOTE: Quick Repay - RepaymentAgreementModal*/}
      {modelState.loanAgreementModal.show && (
        <div className={'z-20'}>
          <LoanAgreementModal
            onClose={() => {
              dispatch(
                modalSlice.actions.updateLoanAgreementModal({
                  show: false,
                })
              );
            }}
          />
        </div>
      )}

      {/*NOTE: Quick Repay - SuccessModal*/}
      {modelState.QRSuccessModal.show && (
        <QRSuccessModal
          onClose={() => {
            dispatch(
              modalSlice.actions.updateQRSuccessModal({
                show: false,
              })
            );
          }}
        />
      )}

      {modelState.authorizationModal.show && (
        <AuthorizationModal
          onClose={() => {
            dispatch(
              modalSlice.actions.updateAuthorizationModal({
                show: false,
                confirm: false,
              })
            );
          }}
          onConfirm={() => {
            dispatch(
              modalSlice.actions.updateAuthorizationModal({
                show: false,
                confirm: true,
              })
            );
          }}
        />
      )}

      {/*NOTE: 優惠券通知 */}
      {modelState.systemCouponModal.show && (<SystemCouponModal/>)}

      {/*NOTE: 無推薦產品提示訊息 */}
      {modelState.noRecommendProductModal.show && (<NoRecommendProductModal/>)}

      {/*NOTE: 無推薦產品提示訊息 */}
      {modelState.exitConfirmModal.show && (<ExitConfirmModal/>)}

      <Outlet/>
    </div>
  );
};
export default IndexPage;
