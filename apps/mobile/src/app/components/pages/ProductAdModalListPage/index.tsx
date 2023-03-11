import {Page} from "@frontend/mobile/shared/ui";
import React, {useEffect, useState} from "react";
import {useGetPersonalLoanRecommendQuery} from "../../../api";
import {environment} from "../../../../environments/environment";
import ReactSlider from 'react-slider'
import {RecommendProduct} from "../../../api/GetPersonalLoanRecommend";

import {useTranslation} from "react-i18next";
import {i18nProductAdModalListPage} from "./i18n/translations";

import {
  Button,

  Countdown,
  CountdownContainer,
  Footer,
  StyledList,
  StyledSlider,
  Title,
  Product,
} from "./Components";

const ProductAdModalListPage = () => {

    const { currentData, isLoading, isFetching } = useGetPersonalLoanRecommendQuery({
      count: "",
    });

    // NOTICE: for testing
    // const [trigger, { currentData: currentLazyData, isLoading: isLazyLoading, isFetching: isLazyFetching }] = useLazyGetPersonalLoanRecommendQuery({
      // refetchOnFocus: true,
      // refetchOnReconnect: true,
    // });
    // useEffect(() => {
    //   trigger({count: "2"});
    //   trigger({count: "2"});
    //   setInterval(() => {
    //     console.log("shoot")
    //     trigger({count: "2"});
    //   }, 10 * 1000)
    // }, [])

    const [currentValue, setCurrentValue] = useState<number>(0);

    useEffect(() => {
      if(currentData?.quotaBar.current) {
        setCurrentValue(currentData?.quotaBar.current)
      }
    }, [currentData?.quotaBar.current]);

    let resultProductId: number[] = [];

    const [productList, setProductList] = useState<RecommendProduct[]>([]);

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
              <div className="label">loan amount</div>
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
                min={currentData?.quotaBar?.min ?? 0}
                max={currentData?.quotaBar?.max ?? 0}
                step={currentData?.quotaBar?.interval ?? 0}
                onChange={(value, index) => {
                  // console.log("value", value);
                  setCurrentValue(!isNaN(value) ? value : 0);
                }}
              />
            </div>

            <div className="slider-labels">
              <span className="min">Minimum</span>
              <span className="max">Maximum</span>
            </div>

          </StyledSlider>

          <CountdownContainer>
            <Countdown>
              <div className="title">Limited Time Offer Countdown :</div>
              <div className="timer">00 : 00 : 00</div>
              <Button color="#fff" background="#F82626">re-acquire the loan amount</Button>
            </Countdown>
          </CountdownContainer>

          <Title>PERSONALIZED RECOMMENDATION</Title>

          <StyledList>
            {isLoading && (
              <div className="container">
                <div>Loading</div>
              </div>
            )}
            {!isLoading && productList?.length === 0 && (
              <div className="container">
                <p>Insufficient funds to provide product recommendations. Please adjust your budget accordingly.</p>
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
            <Button background="#F58B10">Apply</Button>
          </Footer>

        </Page>
    );
};

export default ProductAdModalListPage;


