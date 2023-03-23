import styled from "styled-components";
import React from "react";
import {useTranslation} from "react-i18next";
import {i18nComponents} from "../i18n/translations";

const StyledAttention = styled.div`
  color: ${({ theme }) => theme.color.gray500};
  font-size: ${({ theme }) => theme.fontSize[12]};
  text-align: left;
  padding: 0px 14px;
`
export const Attention = () => {
  const {t} = useTranslation(i18nComponents.namespace);

  return (
    <StyledAttention>
      <p> {t("Attention")}： </p>
      <p>
        {t("1. Before repayment, please make sure that you have enough balance on your bank account.")}
      </p>
      <p>
        {t("2. Overdue for more than N days will not be able to extend or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our services.")}
      </p>
      <p>
        {t("3. Email us if you have any questions about your responsibilities or for more information. mail@mail.com")}
      </p>
    </StyledAttention>
  )
}
