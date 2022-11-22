import { Page } from "@frontend/mobile/shared/ui";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useGetLoanRecommendQuery } from "../../../api";
import {HotSvgIcon} from "./i18n/HotSvgIcon";
import {environment} from "../../../../environments/environment";
import {useTranslation} from "react-i18next";
import {i18nProductAdModalListPage} from "./i18n/translations";

const ProductAdStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: solid 1px ${({ theme }) => theme.color.gray200};
    padding: 22px 16px 16px 16px;
    .product {
        display: flex;
        margin-bottom: 8px;
        .icon{
          position: relative;
        }
        .hotIcon{
            position: absolute;
            top:-30%;
            left:-30%;
        }
        .logoIcon {
            width: 2.25rem;
            height: 2.25rem;
            margin-right: 8px;
            box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);
        }
        .productName {
            font-weight: 500;
        }
    }
    .productInfo {
        display: flex;
        justify-content: space-between;
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[14]};
    }
`;

interface ProductAdProps {
    logo?: string;
    productName?: string;
    loanQuota?: string;
    interestRate?: string;
    term?: string;
}

const ProductAd = ({ logo, productName, loanQuota, interestRate, term }: ProductAdProps) => {
  const {t} = useTranslation(i18nProductAdModalListPage.namespace);

  return (
      <ProductAdStyled>
        <div className="product">
          <div className="icon">
            <div className="hotIcon"><HotSvgIcon/></div>
            <img className="logoIcon" src={logo} alt="" /></div>
          <div>
            <div className="productName">{productName ? productName : ""}</div>
            <div>{environment.currency} {loanQuota ? loanQuota : ""}</div>
          </div>
        </div>
        <div className="productInfo">
          <div>{t("interest")} : {interestRate ? interestRate : ""}</div>
          <div>{t("terms")} : {term ? term : ""}</div>
        </div>
      </ProductAdStyled>
    )
}


const ProductAdModalListPage = () => {
    const { currentData, isLoading, isFetching } = useGetLoanRecommendQuery({ count: '' });
    useEffect(()=>{
        if(!isLoading && currentData && currentData?.length>0){
            window["SyncTask"] &&
            window["SyncTask"]["recommendBannerIsNotEmpty"] &&
            window["SyncTask"]["recommendBannerIsNotEmpty"]();
        }
    },[isLoading]);
    return (
        <Page>
            {!isLoading && currentData?.map((i) => (
                <ProductAd
                    key={i.productId}
                    logo={i.logoUrl}
                    productName={i.productName}
                    loanQuota={i.loanQuota}
                    interestRate={i.interestRate}
                    term={i.term}
                />
            ))}
        </Page>
    );
};

export default ProductAdModalListPage;


