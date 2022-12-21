// NOTICE: 以下會儲存在資料庫，異動得請後端 執行 migrating，盡量固定
import {AdTemplateCard} from "../../index";
import styled from "styled-components";
import MainCardImg from "./promotions_bg@2x.png";
import {AdContainer} from "../AdContainer";
import {onClickToAction} from "../AdClick";

// NOTE: Data
export interface IAdTemplate1Data {
    // type?: "adTemplate1",
    brandCard: AdTemplate1BrandCard;
    cards: AdTemplate1Card[];
}

export interface AdTemplate1BrandCard {
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

// NOTE: Component

const AdTemplateContainer = styled(AdContainer)`
  overflow: scroll;
`
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
  // NOTICE:
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  // NOTICE:
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  // NOTICE:
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StyledDescription1 = styled.div`
  color: #ec606a;
  font-size: 21px;
  // NOTICE:
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StyledDescription2 = styled.div`
  color: #a2a2a2;
  font-size: 11px;
  margin-bottom: 11px;
  // NOTICE:
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StyledActionName = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #101010;
  // NOTICE:
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// NOTE:
interface IAdTemplate1BrandCardUI {
  data?: AdTemplate1BrandCard;
}

const AdTemplate1BrandCardUI = (props: IAdTemplate1BrandCardUI) => {
  return (
    <StyledAdTemplate1BrandCardUI>
      <StyledBrandTitle>{props.data?.title}</StyledBrandTitle>
      <StyledPrice>
        <StyledBrandPriceUnit>{props.data?.priceUnit}</StyledBrandPriceUnit>
        <StyledBrandPriceValue>{props.data?.price}</StyledBrandPriceValue>
      </StyledPrice>
      <StyledBrandDescription>{props.data?.description}</StyledBrandDescription>
    </StyledAdTemplate1BrandCardUI>
  )
}

// NOTE:
interface IAdTemplate1CardUI {
  data: AdTemplate1Card;
  onClick: any;
}
const AdTemplate1CardUI = (props: IAdTemplate1CardUI) => {
  return (
    <StyledAdTemplate1CardUI onClick={props.onClick}>
      <StyledTitle>{props.data?.title}</StyledTitle>
      <StyledDescription1>{props.data?.description1}</StyledDescription1>
      <StyledDescription2>{props.data?.description2}</StyledDescription2>
      <StyledActionName>{props.data?.actionName}</StyledActionName>
    </StyledAdTemplate1CardUI>
  )
}



// NOTE:
interface IAdTemplate1 {
  data: IAdTemplate1Data | null;
}

export const AdTemplate1 = (props: IAdTemplate1) => {
    // console.log("AdTemplate1: ", props)

    return (
        <AdTemplateContainer>
          <ContainerContent>
            <AdTemplate1BrandCardUI data={props.data?.brandCard} />
            {props.data?.cards?.map((data, index) => {
              return <AdTemplate1CardUI
                key={index}
                data={data}
                onClick={() => onClickToAction({
                  action: data.action,
                  actionUrl: data.actionUrl,
                })}/>
            })}
          </ContainerContent>
        </AdTemplateContainer>
    )
}
