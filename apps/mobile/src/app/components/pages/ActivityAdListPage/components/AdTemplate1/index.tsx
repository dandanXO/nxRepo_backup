
// NOTICE: 以下會儲存在資料庫，異動得請後端 執行 migrating，盡量固定
import {AdTemplateCard} from "../../index";
import styled from "styled-components";
import MainCardImg from "./promotions_bg@2x.png";

export interface AdTemplate1 {
  brandCard: AdTemplate1BrandCard;
  cards: AdTemplate1Card[];
}

export interface AdTemplate1BrandCard extends AdTemplateCard{
  title: string;
  priceUnit: string;
  price: string;
  description: string;
}

export interface AdTemplate1Card extends AdTemplateCard{
  title: string;
  description1: string;
  description2: string;
}

// NOTICE: 130px
const Container = styled.div`
  // NOTICE: simulated
  //background: lightgreen;
  overflow: scroll;
  height: 130px;
  display: flex;
  align-items: center;
`;

const ContainerContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const BaseAdTemplate1BrandCardUI = styled.div`
  flex: 0 0 120px;
  box-sizing: border-box;
  margin-right: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  width: 120px;
  height: 120px;
  text-align: center;
`
const StyledAdTemplate1BrandCardUI = styled(BaseAdTemplate1BrandCardUI)`
  //background: #ec606a;
  background-image: url(${MainCardImg});
  background-size: 120px 120px;
`
const StyledBrandTitle = styled.div`
  color: #ffffff;
  font-size: 11px;
  margin-top: 9px;
  margin-bottom: 15px;
`;

const StyledPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`
const StyledBrandPriceUnit = styled.div`
  color: #ffffff;
  font-size: 14px;
  margin-right: 4px;
`;
const StyledBrandPriceValue = styled.div`
  color: #ffffff;
  font-size: 21px;
`;
const StyledBrandDescription = styled.div`
  color: #ffffff;
  font-size: 11px;
`;

const StyledAdTemplate1CardUI = styled(BaseAdTemplate1BrandCardUI)`
  background: #ffffff;
`
const StyledTitle = styled.div`
  color: #000000;
  font-size: 11px;
  margin-top: 9px;
  margin-bottom: 15px;
`;
const StyledDescription1 = styled.div`
  color: #ec606a;
  font-size: 21px;
`;
const StyledDescription2 = styled.div`
  color: #a2a2a2;
  font-size: 11px;
  margin-bottom: 11px;
`;
const StyledActionName = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #101010;
`;
const AdTemplate1BrandCardUI = () => {
  return (
    <StyledAdTemplate1BrandCardUI>
      <StyledBrandTitle>新人福利</StyledBrandTitle>
      <StyledPrice>
        <StyledBrandPriceUnit>PKR</StyledBrandPriceUnit>
        <StyledBrandPriceValue>5,000</StyledBrandPriceValue>
      </StyledPrice>
      <StyledBrandDescription>新人大禮包</StyledBrandDescription>
    </StyledAdTemplate1BrandCardUI>
  )
}

const AdTemplate1CardUI = () => {
  return (
    <StyledAdTemplate1CardUI>
      <StyledTitle>利息優惠</StyledTitle>
      <StyledDescription1>- 3.5%</StyledDescription1>
      <StyledDescription2>原利息35%</StyledDescription2>
      <StyledActionName>點我借款 ></StyledActionName>
    </StyledAdTemplate1CardUI>
  )
}

export const AdTemplate1 = () => {
  return (
    <Container>
      <ContainerContent>
        <AdTemplate1BrandCardUI/>
        <AdTemplate1CardUI/>
        <AdTemplate1CardUI/>
      </ContainerContent>
    </Container>
  )
}
