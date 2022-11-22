import {GetLoanDetailRecommendProducts} from "../../../api/getLoanDetail";
import React, {useState} from "react";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";
import {ListItem} from "@frontend/mobile/shared/ui";
import styled from "styled-components";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nLoanDetailsPage} from "./i18n/translations";

const BannerWithCardStyled = styled.div`
    width: 100%;
    .banner {
        width: 100%;
        border-radius: 8px;
        margin-bottom: -20px;
    }
    .bannerHide {
        width: 100%;
        border-radius: 8px;
        height: 50px;
        object-fit: cover;
        object-position: left top;
        margin-bottom: -20px;
    }
`;

type BannerWithCardProps = {
  adProps: GetLoanDetailRecommendProducts;
  setProductDetails: React.Dispatch<React.SetStateAction<object>>;
  setShowProductDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSubmitOrdereModal: React.Dispatch<React.SetStateAction<boolean>>;
} & WithTranslation;

const BannerWithCard = (props: BannerWithCardProps) => {
  const {
    backgroundUrl,
    logoUrl,
    productName,
    loanQuota,
    interestRate,
    term,
  } = props.adProps;

  const [isCollapse, setIsCollapse] = useState(true);
  const handleViewDetail = (detail: GetLoanDetailRecommendProducts) => {
    props.setProductDetails(detail);
    props.setShowProductDetailModal(true);
  };

  const handleApplyNow = (detail: GetLoanDetailRecommendProducts) => {
    props.setProductDetails(detail);
    props.setShowSubmitOrdereModal(true);
  };
  return (
    <BannerWithCardStyled>
      <img
        onClick={() => setIsCollapse(!isCollapse)}
        className={` ${isCollapse ? "banner" : "bannerHide"}`}
        src={backgroundUrl}
      />
      <Card isHot={true}>
        <CardContent
          icon={logoUrl ? logoUrl : ""}
          productName={productName ? productName : ""}
          balance={loanQuota ? loanQuota : ""}
          contentItems={
            <>
              <ListItem
                title={props.t("interest") as string}
                text={interestRate ? interestRate : ""}
              />
              <ListItem title={props.t("terms") as string} text={term ? term : ""}/>
            </>
          }
          handleViewDetail={() => handleViewDetail(props.adProps)}
          handleApplyNow={() => handleApplyNow(props.adProps)}
        />
      </Card>
    </BannerWithCardStyled>
  );
};

export default withTranslation(i18nLoanDetailsPage.namespace)(BannerWithCard)
