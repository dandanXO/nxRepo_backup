import {AdTemplateCard} from "../index";
import {AdContainer} from "./AdContainer";
import styled from "styled-components";

const makeStyleEllipsisOverflowText = () => {
  return `
        // NOTICE:
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `;
}

export interface AdTemplate2 {
  type?: "adTemplate2",
  brandCard: AdTemplate2BrandCard;
  topCard: AdTemplate2Card;
  bottomCard: AdTemplate2Card;
}

export interface AdTemplate2BrandCard extends AdTemplateCard{
  title1: string;
  title2: string;
  priceUnit: string;
  price: string;
}

export interface AdTemplate2Card extends AdTemplateCard{
  title: string;
}

const AdTemplate2Container = styled(AdContainer)`
  display: flex;
  flex-direction: row;
`
const BrandCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #f4f1ec;
  padding: 10px;
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  margin-right: 8px;
`
const Title1 = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #845e3a;
  // NOTICE:
  ${makeStyleEllipsisOverflowText()};
`
const Title2 = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #845e3a;
  // NOTICE:
  ${makeStyleEllipsisOverflowText()};
`
const Price = styled.div`
  margin-bottom: 12px;
  // NOTICE:
  ${makeStyleEllipsisOverflowText()};
`;
const PriceUnit = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ef7e3a;
  margin-right: 4px;
`
const PriceValue = styled.span`
  font-size: 21px;
  font-weight: 500;
  color: #ef7e3a;
`
const Button = styled.div<{bgColor: string}>`
  border-radius: 10px;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  width: 81px;
  height: 20px;
  padding: 2px 16px;
  color: #fff;
  font-size: 12px;
  background-color: ${props => props.bgColor || "#ef7e3a"};
  // NOTICE:
  ${makeStyleEllipsisOverflowText()};
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 130px;
  flex: 1 1;
  overflow: hidden;
`;
const Card = styled.div<{bgColor: string}>`
  box-sizing: border-box;
  background-color: ${props => props.bgColor || "#e4f6ef"};
  padding: 8px;
  height: 56px;
`;
const Title = styled.div<{color: string}>`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.color || "#469c7d"};
  margin-bottom: 4px;
  // NOTICE:
  ${makeStyleEllipsisOverflowText()};
`;

interface IAdTemplate2 {
  data?: AdTemplate2;
}
export const AdTemplate2 = (props: IAdTemplate2) => {
  // console.log("props", props)
  return (
    <AdTemplate2Container>
      <BrandCard>
        <Title1>{props.data?.brandCard.title1}</Title1>
        <Title2>{props.data?.brandCard.title2}</Title2>
        <Price>
          <PriceUnit>{props.data?.brandCard.priceUnit}</PriceUnit>
          <PriceValue>{props.data?.brandCard.price}</PriceValue>
        </Price>
        <Button bgColor={"#ef7e3a"}>{props.data?.brandCard.actionName}</Button>
      </BrandCard>
      <CardContainer>
        <Card bgColor={"#e4f6ef"}>
          <Title color={"#469c7d"}>{props.data?.topCard.title}</Title>
          <Button bgColor={"#59c19e"}>{props.data?.topCard.actionName}</Button>
        </Card>
        <Card bgColor={"#f2f4fa"}>
          <Title color={"#485d8c"}>{props.data?.bottomCard.title}</Title>
          <Button bgColor={"#5175aa"}>{props.data?.bottomCard.actionName}</Button>
        </Card>
      </CardContainer>
    </AdTemplate2Container>
  )
}
