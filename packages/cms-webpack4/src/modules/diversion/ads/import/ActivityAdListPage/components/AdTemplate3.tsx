import { AdTemplateCard } from "../index";
import { AdContainer } from "./AdContainer";
import styled from "styled-components";
import { onClickToAction } from "./AdClick";

export interface IAdTemplate3Data {
    brandCard: AdTemplate3Card;
    card: AdTemplate3Card;
}

export interface AdTemplate3Card extends AdTemplateCard{
    title: string;
    description1: string;
    description2: string;
}

const AdTemplate3Container = styled(AdContainer)`
    flex-direction: column;
    justify-content: space-between;
`;
const Card = styled.div<{bgColor: string}>`
    // NOTE: Self
    box-sizing: border-box;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.13);
    border-radius: 9px;
    background-color: ${props => props.bgColor};
    padding: 5px 7px;
    height: 56px;
    width: 100%;
    // NOTE: layout
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const Title = styled.div<{color: string}>`
    font-size: 12px;
    font-weight: 500;
    color: ${props => props.color};
`;
const Description = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
`;
const Description1 = styled.span<{color: string}>`
    font-size: 26px;
    font-weight: 500;
    color: ${props => props.color};
    margin-right: 8px;
`;
const Description2 = styled.span<{color: string}>`
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.color};
    align-self: center;
`;
const Button = styled.div<{bgColor: string; color: string}>`
    box-sizing: border-box;
    border-radius: 10px;
    background-color: ${props => props.bgColor};
    padding: 3px 12px;
    width: 58px;
    // height: 34px;
    color: ${props => props.color};
    font-size: 12px;
    align-self: center;
    // NOTE: layout
    display: flex;
    flex-direction: row;
    align-items: center;
`;

interface IAdTemplate3 {
    data: IAdTemplate3Data | null;
}
export const AdTemplate3 = (props: IAdTemplate3) => {
    console.log("AdTemplate3.props: ", props);
    return (
        <AdTemplate3Container>
            {/*NOTE: Brand*/}
            <Card bgColor={"#ec606a"} onClick={() => onClickToAction({
                action: props.data?.brandCard.action,
                actionUrl: props.data?.brandCard.actionUrl,
            })}>
                <Title color={"#fff"}>{props.data?.brandCard.title}</Title>
                <Description>
                    <Description1 color={"#fff"}>{props.data?.brandCard.description1}</Description1>
                    <Description2 color={"#fff"}>{props.data?.brandCard.description2}</Description2>
                </Description>
                <Button bgColor={"#fff"} color={"#ec606a"}>
                    <div>{props.data?.brandCard.actionName}</div>
                    <div>{'>'}</div>
                </Button>
            </Card>
            {/*NOTE: Card*/}
            <Card bgColor={"#fff"} onClick={() => onClickToAction({
                action: props.data?.card.action,
                actionUrl: props.data?.card.actionUrl,
            })}>
                <Title color={"#000"}>{props.data?.card.title}</Title>
                <Description>
                    <Description1 color={"#ec606a"}>{props.data?.card.description1}</Description1>
                    <Description2 color={"#a2a2a2"}>{props.data?.card.description2}</Description2>
                </Description>
                <Button bgColor={"#ec606a"} color={"#fff"}>
                    <div>{props.data?.card.actionName}</div>
                    <div>{'>'}</div>
                </Button>
            </Card>
        </AdTemplate3Container>
    );
};

