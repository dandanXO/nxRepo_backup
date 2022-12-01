import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";

import {NotificationButton, Overlay, RepayICON,} from "@frontend/mobile/shared/ui";
import {useTranslation, WithTranslation} from "react-i18next";
import {i18nRepaymentAdsModal} from "./i18n/translations";
import {environment} from "../../../../../../environments/environment";
import GiftICONPng from "./limited_time_offer.png";
import CloseICONPng from "./limited_time_offer_icon.png";
import moment from "moment";

const RepaymentModalContainer = styled.div`
  color: #101010;
`;

const SectionButton = styled.div`
    margin-bottom: 10px;
`;

const RepayAndApplyButton = styled(NotificationButton)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${(props) => props.theme.button.primary.text};
    margin-bottom: 16px;;
`;
const RepaymentButton = styled(RepayAndApplyButton)`
    flex: 3 0 auto;
    background: ${(props) => props.theme.button.info.main};
    color: ${(props) => props.theme.button.info.text};
`;

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

type RepaymentAdsModalProps = {
  balance: number;
  handlePostRepayCreate: any;
  setShowRepaymentAdsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRepaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRepaymentNoticeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepaymentAdsModal = (props: RepaymentAdsModalProps) => {
    // const [isRequestPending, setIsRequestPending] = useState(false);

    const {t} = useTranslation(i18nRepaymentAdsModal.namespace);
    const balance = props.balance;
    const [balanceValue, setBalanceValue] = useState(String(`${environment.currency}` + balance));

    const handleConfirm = () => {
      // if(isRequestPending) return;
      // if(!isRequestPending) setIsRequestPending(true);

      const formBalanceValue = Number(balanceValue.replace(`${environment.currency}`, ""));
      if(formBalanceValue === 0) return

      props.handlePostRepayCreate(
        false,
        false,
        formBalanceValue
      ).then(() => {
        // console.log("done!!")
        // setIsRequestPending(false);
        props.setShowRepaymentAdsModal(false);
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
                              <ContentContainer>
                                <RepayAndApplyButton
                                  onClick={() => {
                                    // NOTE: self
                                    props.setShowRepaymentNoticeModal(
                                      true
                                    );
                                  }}
                                >
                                  <RepayICON />{t("Repay and Apply Again")}
                                </RepayAndApplyButton>
                                <RepaymentButton onClick={handleConfirm}>
                                  {t("Repayment")}
                                </RepaymentButton>
                              </ContentContainer>

                          </SectionButton>
                        </RepaymentModalContainer>
                    );
                }}
            ></Overlay>
        </div>
    );
};


export default RepaymentAdsModal;
