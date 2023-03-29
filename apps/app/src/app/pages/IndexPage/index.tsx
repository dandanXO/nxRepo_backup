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
import {indexPageSlice, ORDER_STATE, RISK_CONTROL_STATE, USER_AUTH_STATE} from "../../flow";
import {AuthenticationSection} from "./sections/AuthenticationSection";
import {ADBannerSection} from "./sections/ADBannerSection";
import {LoanOverViewSection} from "./sections/LoanOverViewSection";
import {useCallback, useMemo} from "react";
import cx from "classnames";
import {NoticeUserReacquireOver3TimeSections} from "./sections/NoticeSection/NoticeUserReacquireOver3TimeSections";
import {useNavigate} from "react-router-dom";
import {Horizontal} from "../../components/layouts/Horizontal";
import {Product} from "./sections/RecommendedProductsSection/Product";

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

  const loanInterestRate = indexPageState.indexAPI?.chargeFeeDetails.find(fee => fee.key === "LOAN_INTEREST");

  return (
    <div className={"container flex flex-col min-h-screen"}>

      <div className={"flex grow flex-col"}>

        <div>
          <MarqueeSection state={indexPageState}/>
        </div>

        <div className={"mb-5"}>
          <UserInformationSection state={indexPageState} pageState={finalPageState}/>
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
              <RecommendedProductsSection state={indexPageState}/>
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
          })}/>
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

      <TabBar/>

      {/*NOTE: 一鍵借款 Modal*/}
      <div className={"quick-repayment-modal z-10 w-screen h-screen bg-white p-5 sticky top-0 bottom-0 flex flex-col"}>
        {/*<div className={"close"}>X</div>*/}
        <div className={"header"}>
          <div className={"text-xl font-medium"}>My Loan Orders</div>
        </div>
        <div className={"summary flex-1"}>
          <div className={"flex flex-col"}>
            <div className={"text-md font-medium"}>Summary Details</div>
            <div className={"item-list"}>
              <div className={"item font-light flex flex-row justify-between"}>
                <div className={"key"}>Loan Amount</div>
                <div className={"value"}>₹ 6,400.00</div>
              </div>
              <div className={"item font-light flex flex-row justify-between"}>
                <div className={"key"}>Interest</div>
                <div className={"value"}>₹ 0.00</div>
              </div>
              <div className={"item font-light flex flex-row justify-between"}>
                <div className={"key"}>Processing Fee</div>
                <div className={"value"}>₹ 1,472.00</div>
              </div>
              <div className={"item font-light flex flex-row justify-between"}>
                <div className={"key"}>Service Charge</div>
                <div className={"value"}>₹ 128.00</div>
              </div>
              <div className={"item font-light flex flex-row justify-between"}>
                <div className={"key"}>Disbursal Amount</div>
                <div className={"value"}>₹ 4,800.00</div>
              </div>
              <div className={"item font-light flex flex-row justify-between"}>
                <div className={"key"}>Repayment Date</div>
                <div className={"value"}>03-25-2023</div>
              </div>
          </div>
        </div>
        </div>

        <Horizontal/>

        <div className={"products "}>
          <div className={"text-md font-medium mb-2"}>Your Products</div>
          <div className={"flex flex-col h-[200px] overflow-auto"}>
            {indexPageState.indexAPI?.products.map(((product, index) => {
              return (
                <Product key={index} product={product} loanInterestRate={!loanInterestRate ? 1 : loanInterestRate.counting}/>
              )
            }))}
          </div>
        </div>

        <Horizontal/>

        <div className={"footer flex-1"}>


          <div className={"bankcard"}>
            <div className={"text-md font-medium"}>Bank Card</div>
          </div>

          <Horizontal/>

          <div className={"text-xs font-light text-gray-400 mb-2"}>By continuing, I have read and agree
            <span className={"text-blue-500 underline"}> Loan Agreement </span> carefully.</div>
          <Button text={"Confirm"} bgColor={"bg-[#F58B10]"}/>

        </div>


      </div>
    </div>
  )
}

