import styled from "styled-components";
import React from "react";
import {flexCreator} from "./utils";

const CardStyled = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    font-size: ${({ theme }) => theme.fontSize[16]};
    position: relative;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 20px;
    background: ${({ theme }) => theme.color.white};
    ${flexCreator("column", '', '')}
    .hotTagText {
        position: absolute;
        top: 3px;
        right: 3px;
        font-size: ${({ theme }) => theme.fontSize[12]};
        font-weight: bold;
    }
`;

const HotTag = styled.div`
    position: absolute;
    top: -30px;
    right: -30px;
    width: 0;
    height: 0;
    border: 30px solid ${({ theme }) => theme.color.yellow};
    border-bottom-color: transparent;
    border-top-color: transparent;
    border-left-color: transparent;
    border-top-right-radius: 8px;
    transform: rotateZ(135deg);
`;


type CardProps = {
    children: React.ReactElement | React.ReactElement[];
    isHot:boolean,

}

const Card = (props: CardProps) => {
    const { children, isHot } = props;
    return (
        <CardStyled>
            {isHot && (
                <div>
                    <HotTag />
                    <span className={"hotTagText"}>Hot</span>
                </div>
            )}
            {children}
        </CardStyled>
    );
}

export default Card
