import {renderByCountry} from "../../../../../i18n";
import {AllCountryInstance} from "../../../../../../environments/config/AllCountry";
import {NotificationButton, Overlay, Title} from "@frontend/mobile/shared/ui";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

import {i18nRepaymentStepsModalTranslations} from "./i18nTranslations";
import React from "react";
import {CloseICON} from "../../../../components/CloseICON";
import CloseICONPng from "../../../../components/CloseICON/limited_time_offer_icon.png";
interface I18nRepaymentStepsModalProps {
  setShowRepaymentSteps: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmCallback: any;
}

export const I18nRepaymentStepsModal = (props: I18nRepaymentStepsModalProps) => {
  return renderByCountry({
    [AllCountryInstance.PakistanCountry.country]: (
      <RepaymentStepsModal {...props}/>
    ),
    [AllCountryInstance.BangladeshCountry.country]: (
      <RepaymentStepsModal {...props}/>
    )
  }, <></>)
}

const StyledRepaymentStepsModal = styled.div`
`
const StyledContainer = styled.div`
  margin-bottom: 16px;
`
const StepContainer = styled.div<{last: boolean}>`
  position: relative;
  margin-bottom: ${(props) => props.last ? 0 : "40px"};
`
const Step = styled.div`
  position: absolute;
  width: 63px;
  height: 33px;
  margin: 0 auto;
  //margin: 16px 23px 22px 12px;
  //padding: 6px 6px 7px 7px;
  border-radius: 11px;
  background-color: #aaa;
  line-height: 33px;
  color: #fff;
  top: -15px;
  font-weight: 500
`
const Description = styled.div`
  width: 300px;
  //height: 63px;
  padding: 27px 22px 17px 20px;
  border-radius: 11px;
  background-color: #f5f5f5;
  text-align: left;
  color: #0f0f0f;
`

const ButtonGroup = styled.div`
    margin: 0 auto;
`;

export const PrimaryButton = styled.div`
  /* Display */
  flex: 1;

  /* Margin */
  //margin-right: 5px;

  /* Border */
  border-radius: 10px;

  //width: 113px;
  height: 48px;

  /* Text */
  line-height: 48px;
  text-align: center;
  font-weight: 600;
  /* Other */
  cursor: pointer;
  padding: 0 15px;

    //display: flex;
    //flex-direction: row;
    //justify-content: center;
  background: ${(props) => props.theme.button.primary.main};



  width: 225px;
  margin: 0 auto;
  color: ${(props) => props.theme.button.primary.text};
`;

const RepaymentStepsModal = (props: I18nRepaymentStepsModalProps) => {
  const {t} = useTranslation(i18nRepaymentStepsModalTranslations.namespace);
  const steps = [
    t("Step 1"),
    t("Step 2"),
    t("Step 3"),
  ]
  const stepDescriptions = [
    t("Press the “Repay” button on the App."),
    t("Walee Pay will fill out your account details on the checkout page."),
    t("Choose Jazz Cash or Easypaisa as your mobile wallet payment method to approve the transaction."),
  ]
  return (
    <Overlay content={(hide: () => void) => {
      return (
        <StyledRepaymentStepsModal>
          <Title>Repayment Steps</Title>
          <CloseICON src={CloseICONPng}/>
          <StyledContainer>
            {[0,0,0].map((item, index) => {
              return (
                <StepContainer last={index === 2}>
                  <Step>{steps[index]}</Step>
                  <Description>{stepDescriptions[index]}</Description>
                </StepContainer>
              )
            })}
          </StyledContainer>
          <ButtonGroup>
            <PrimaryButton onClick={() => {
              props.setShowRepaymentSteps(false);
              props.onConfirmCallback();
            }}>{t("Next")}</PrimaryButton>
          </ButtonGroup>
        </StyledRepaymentStepsModal>
      )
    }} show={true} />
  )
}
