import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";

import {Overlay, RepayICON,} from "@frontend/mobile/shared/ui";
import {useTranslation} from "react-i18next";
import {i18nRepaymentAdsModal} from "./i18n/translations";
import {environment} from "../../../../../../environments/environment";
import GiftICONPng from "./limited_time_offer.png";
import CloseICONPng from "./limited_time_offer_icon.png";
import moment from "moment";
import {RepayAndApplyButton, RepaymentButton, RepaymentModalContainer, SectionButton} from "../RepaymentModal";
import {useLockRequest} from "../../../../../hooks/useLockRequest";

const Brand = styled.div`
  width: 100%;
  height: 215px;
  background: #ffdd24;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const GiftICON = styled.img`
  position: relative;
  width: 87%;
  top: -82px;
  left: -10px;
`;
const CloseICON = styled.img`
  position: relative;
  width: 27px;
  top: -183px;
  right: -284px;
`;

const BrandContent = styled.div`
  //background: indianred;
  position: relative;
  top: -77px;
`

const BrandHeader = styled.div`
  font-size: 33px;
  font-weight: 500;
  color: #e54242;
  margin-bottom: 16px;
`
const BrandLongTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #e54242;
  margin-bottom: 8px;
`
const BrandCountDown = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
`
const BrandShortTitle = styled.div`
  font-size: 19px;
  font-weight: 500;
`

const ContentContainer = styled.div`
  padding: 16px 10px 5px;
`

const UniversalRepayAndApplyButton = styled(RepayAndApplyButton)`
  background: ${(props) => props.theme.repaymentAdsModal.secondary.bg};
  color: ${(props) => props.theme.repaymentAdsModal.secondary.text};
  margin-bottom: 16px;
`;
const UniversalRepaymentButton = styled(RepaymentButton)`
  background: ${(props) => props.theme.repaymentAdsModal.main.bg};
  color: ${(props) => props.theme.repaymentAdsModal.main.text};
  margin-bottom: 16px;
`

type RepaymentAdsModalProps = {
  handlePostRepayCreate: any;
  setShowRepaymentAdsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRepaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRepaymentNoticeModal: React.Dispatch<React.SetStateAction<boolean>>;
  balance: string;
}

const RepaymentAdsModal = (props: RepaymentAdsModalProps) => {
    const {startRequest, endRequest, isRequestPending} = useLockRequest("handlePostRepayCreate");

    const {t} = useTranslation(i18nRepaymentAdsModal.namespace);

    const handleConfirm = () => {
      if(isRequestPending("handlePostRepayCreate")) {
        return;
      } else {
        startRequest("handlePostRepayCreate");
      }

      const formBalanceValue = Number(props.balance.replace(`${environment.currency}`, ""));
      // console.log("formBalanceValue", formBalanceValue);
      if(formBalanceValue === 0) return

      props.handlePostRepayCreate(
        false,
        false,
        formBalanceValue
      ).then(() => {
        props.setShowRepaymentAdsModal(false);
      }).finally(() => {
        endRequest("handlePostRepayCreate");
      })

    };
    const longTitle = useMemo(() => {
      const index = Math.floor(Math.random()*2);
      const titles = [
        t("Available for higher amount"),
        t("Available for lower interest rates"),
      ]
      return titles[index];
    },[]);

    const shortTitle = useMemo(() => {
      const index = Math.floor(Math.random()*2);
      const titles = [
        t("Good news for you…"),
        t("Just finish within 24 hours…"),
        t("Don’t rush to leave, here’s a time-limited offer"),
        t("only today"),
        t("special offer"),
        t("this week only"),
      ]
      return titles[index];
    }, []);

    const [timeString, setTimeString] = useState<string>();

    useEffect(() => {
      const timeInterval = setInterval(function(){
        const currentTime = moment();
        const tomorrowTime = moment().add(1,'days').startOf("day");
        // console.log("now", currentTime.format("MM/DD HH:mm:ss"))
        // console.log("tomorrow", tomorrowTime.format("MM/DD HH:mm:ss"))
        const diffTime = tomorrowTime.diff(currentTime, "seconds");
        // console.log("diffTime", diffTime);
        const duration = moment.duration(diffTime, "seconds");
        //   console.log("duration", duration);
        const padStartZero = (number: number) => {
          return String(number).padStart(2, "0");
        }
        const hours = padStartZero(duration.hours());
        const minutes = padStartZero(duration.minutes());
        const seconds = padStartZero(duration.seconds());
        const time = `${hours}:${minutes}:${seconds}`;
        // console.log("time", time);
        setTimeString(time);
      }, 1000);
      return () => {
        clearInterval(timeInterval);
      }
    })

    return (
        <div>
            <Overlay
                show={true}
                contentNoStyle={true}
                overflow={"unset"}
                content={(hide: () => void) => {
                    return (
                        <RepaymentModalContainer>
                          <SectionButton>
                              <Brand>
                                <CloseICON src={CloseICONPng} onClick={() => {
                                  props.setShowRepaymentAdsModal(false)
                                  props.setShowRepaymentModal(true);
                                }}/>
                                <GiftICON src={GiftICONPng}/>
                                <BrandContent>
                                  <BrandHeader>{t("Limited Time Offer")}</BrandHeader>
                                  <BrandLongTitle>{longTitle}</BrandLongTitle>
                                  <BrandCountDown>{t("Countdown")} : {timeString}</BrandCountDown>
                                  <BrandShortTitle>{shortTitle}</BrandShortTitle>
                                </BrandContent>
                              </Brand>

                              <ButtonContainer t={t} handleConfirm={handleConfirm} setShowRepaymentNoticeModal={props.setShowRepaymentNoticeModal}/>
                          </SectionButton>
                        </RepaymentModalContainer>
                    );
                }}
            ></Overlay>
        </div>
    );
};

interface IButtonContainer {
  handleConfirm: any;
  t: any;
  setShowRepaymentNoticeModal: any;
}
const ButtonContainer = (props: IButtonContainer) => {
  return (
    <ContentContainer>
      <UniversalRepaymentButton onClick={props.handleConfirm}>
        {props.t("Repayment")}
      </UniversalRepaymentButton>
      <UniversalRepayAndApplyButton
        onClick={() => {
          // NOTE: self
          props.setShowRepaymentNoticeModal(
            true
          );
        }}
      >
        <RepayICON />{props.t("Repay and Apply Again")}
      </UniversalRepayAndApplyButton>
    </ContentContainer>
  )
}

export default RepaymentAdsModal;
