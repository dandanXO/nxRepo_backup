import { Page } from "@frontend/mobile/shared/ui";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useGetLoanRecommendQuery, useGetPersonalLoanRecommendQuery} from "../../../api";
import {environment} from "../../../../environments/environment";
import {useTranslation} from "react-i18next";
import {i18nProductAdModalListPage} from "./i18n/translations";
import ReactSlider from 'react-slider'
import {RecommendProduct} from "../../../api/GetPersonalLoanRecommend";

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin: 16px 0;
  text-align: center;
  letter-spacing: 1px;

`;
const StyledProduct = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
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
            font-weight: 500;
            font-size: 18px;
          }
        }
        .right {
          .price {

          }
        }
    }
`;

type ProductAdProps = Required<Pick<RecommendProduct, "logoUrl"|"productName"|"loanableAmount">>

const Product = ({ logoUrl, productName, loanableAmount }: ProductAdProps) => {
  const {t} = useTranslation(i18nProductAdModalListPage.namespace);
  return (
      <StyledProduct>
        <div className="product">
          <div className="left">
            <div className="icon">
              <img className="logoIcon" src={logoUrl} alt="" />
            </div>
            <div className="productName">{productName ? productName : ""}</div>
          </div>
          <div className="right">
            <div className="price">{environment.currency} {loanableAmount ? loanableAmount : ""}</div>
          </div>
        </div>
      </StyledProduct>
    )
}

const StyledSlider = styled.div`
  border: 1.5px solid #F58B10;
  padding: 16px 12px;
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
      background: #E5E5E5;
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
const ApplyButton = styled.button`
  background: #F58B10;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px;
  text-align: center;
  height: 50px;
  border: 0;
  width: 90%;
  border-radius: 8px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledList = styled.div`
  margin-bottom: 16px;

  min-height: 196px;
  max-height: 196px;
  overflow: auto;

  .loading-container {
    height: 196px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProductAdModalListPage = () => {

    // const { currentData, isLoading, isFetching } = useGetLoanRecommendQuery({ count: '' });
    const { currentData, isLoading, isFetching } = useGetPersonalLoanRecommendQuery({
      count: "",
    });

    const [currentValue, setCurrentValue] = useState<number>(0);

    useEffect(() => {
      if(currentData?.quotaBar.current) {
        setCurrentValue(currentData?.quotaBar.current)
      }
    }, [currentData?.quotaBar.current]);

    let resultProductId: number[] = [];

    const [productList, setProductList] = useState<RecommendProduct[]>();
    useEffect(() => {
      if(currentData?.quotaBar.current) {
        let currentPrice = 0;
        currentData?.products?.map((product) => {
          if(currentPrice < currentData?.quotaBar.current && product?.loanableAmount) {
            currentPrice = currentPrice + product?.loanableAmount
            if(product.productId) resultProductId.push(product.productId)
          }
        })
        const productList = currentData?.products?.filter(product => resultProductId.indexOf(product?.productId) > -1);
        setProductList(productList);
      } else {
        resultProductId = [];
      }
    }, [currentValue]);

    return (
        <Page>
          <StyledSlider>
            <div className="info">
              <div className="label">Borrowed amount</div>
              <div className="price">{environment.currency} {currentValue}</div>
            </div>
            <div className="slider">
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                thumbActiveClassName="example-thumbActiveClassName"
                trackClassName="example-track"
                renderThumb={(props, state) => {
                  // console.log("props", props);
                  // console.log("state", state);
                  return (
                    <div {...props}>
                      <div className="example-thumb-inner"></div>
                    </div>
                  )
                }}
                min={currentData?.quotaBar?.min}
                max={currentData?.quotaBar?.max}
                minDistance={currentData?.quotaBar?.interval}
                onChange={(value, index) => {
                  setCurrentValue(value);
                }}
              />
            </div>
            <div className="slider-labels">
              <span className="min">Minimum</span>
              <span className="max">Maximum</span>
            </div>

          </StyledSlider>

          <Title>PERSONALIZED RECOMMENDATION</Title>

          <StyledList>
            {isLoading && (
              <div className="loading-container">
                <div>Loading</div>
              </div>
            )}
            {!isLoading && productList?.map((product) => (
              <Product
                key={product.productId ?? ""}
                logoUrl={product.logoUrl ?? ""}
                productName={product.productName ?? ""}
                loanableAmount={product.loanableAmount ?? 0}
              />
            ))}
          </StyledList>

          <Footer>
            <ApplyButton>Apply</ApplyButton>
          </Footer>
        </Page>
    );
};

export default ProductAdModalListPage;


