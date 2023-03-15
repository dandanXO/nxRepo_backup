import styled from "styled-components";
import {RecommendProduct} from "../../../api/GetPersonalLoanRecommend";
import {useTranslation} from "react-i18next";
import {i18nProductAdModalListPage} from "./i18n/translations";
import {environment} from "../../../../environments/environment";
import React, {memo} from "react";

export const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 12px;
  text-align: center;
  letter-spacing: 1px;
`;

export const StyledProduct = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
    background: #FFF0DE;
    border-radius: 8px;
    margin-bottom: 8px;

    .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .icon{
            position: relative;
            .logoIcon {
              width: 2.25rem;
              height: 2.25rem;
              margin-right: 8px;
              box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);
            }
          }
          .productName {
            font-weight: 300;
            font-size: 16px;
          }
        }
        .right {
          .price {

          }
        }
    }
  .productInfo{
    color: #aaaaaa;
    font-weight: 100;
    font-size: 14px;
    letter-spacing: 1px;
  }
`;

export const StyledSlider = styled.div`
  background: #FFF0DE;
  border: 1.5px solid #F58B10;
  padding: 4px 8px 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
    .label {
      //font-size: 16px;
      font-weight: lighter;
    }
    .price {
      color: #F58B10;
      font-weight: bold;
      //font-size: 16px;
      font-size: 26px;
    }
  }

  .slider {
    width: 100%;
    .horizontal-slider {
      //width: 267px;
      height: 12px;
    }
    .example-track-0 {
      background: #F58B10;
      height: 12px;
      border-radius: 8px;
    }
    .example-track-1 {
      background: #FFF;
      height: 12px;
      border-radius: 8px;
    }
    .example-track {
      //width: 100px;
      //background: lightcoral;
    }
    .example-thumb {
      border: 1.5px solid #F58B10;
      background: #fff;

      width: 25px;
      height: 25px;

      top: -7px;
      text-align: center;
      line-height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .example-thumb-inner {
        background: #F58B10;
        width: 15px;
        height: 15px;
        border-radius: 50%;
      }
    }
    .example-thumbActiveClassName {
      //background: lightpink;
      //width: 50px;
      //height: 50px;
    }
  }
  .slider-labels {
    width: 100%;
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    color: #AAAAAA;
    font-weight: lighter;
    .min {

    }
    .max {

    }
  }
`

export const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -30px;
`;

export const Countdown = styled.div`
  border-radius: 8px;
  border: 1.5px solid #F82626;
  background: #fff;
  padding: 8px;

  width: 85%;

  font-size: 16px;
  font-weight: 400;
  color: #F82626;
  text-align: center;

  .title {

  }
  .timer {

  }

  .button-container {
    margin-top: 8px;
  }
`

type ButtonProps = {
  color?: string;
  background?: string;
  disable?: boolean;
}

export const Button = styled.button<ButtonProps>`
  color: ${(props) => props.color ?? "#fff"};
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  width: 90%;
  //height: 28px;
  //line-height: 28px;
  //padding: 6px 4px;
  padding: 8px;
  background: ${(props) => props.disable ? "#E5E5E5" : props.background ? props.background : "#707070"};
  border: 0;
  border-radius: 8px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ApplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    margin-bottom: 12px;
    width: 200px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .content {
    width: 86%;
    font-size: 16px;
    font-weight: lighter;
    text-align: center;
    color: #AAAAAA;
    .p1 {
      margin-bottom: 16px;
    }
    .p2 {

    }
  }
`
export const StyledList = styled.div`
  margin-bottom: 16px;

  min-height: 200px;
  max-height: 200px;
  overflow: auto;

  .container {
    //height: 225px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    p {
      color: #AAAAAA;
    }
    .overdue {
      display: flex;
      flex-direction: column;
    }
  }
`;

type ProductAdProps = Required<Pick<RecommendProduct, "logoUrl"|"productName"|"loanableAmount"|"interestRate"|"terms">>

export const Product = memo(({logoUrl, productName, loanableAmount,interestRate, terms}: ProductAdProps) => {
  const {t} = useTranslation(i18nProductAdModalListPage.namespace);
  return (
    <StyledProduct>
      <div className="product">
        <div className="left">
          <div className="icon">
            <img className="logoIcon" src={logoUrl} alt=""/>
          </div>
          <div className="productName">{productName ? productName : ""}</div>
        </div>
        <div className="right">
          <div className="price">{environment.currency} {loanableAmount ? loanableAmount : ""}</div>
        </div>
      </div>
      <div className="productInfo">
        <span>{t("interest")} : {interestRate ? interestRate : ""}</span> : <span>{t("terms")} : {terms ? terms : ""}</span>
      </div>
    </StyledProduct>
  )
});

