import styled from "styled-components";
import React from "react";
import { flexCreator } from "../utils";
import LoanBrand from "../LoanBrand";
import ListItem from "../ListItem";
import Button from "../Button";
import Divider from "../Divider"

const FlexRowItem = styled.div`
    ${flexCreator("row", "space-between", "center")};
    width: 100%;

`;

const CardContentStyled = styled.div`
    ${flexCreator("column", "space-between", "center")};
    width: 100%;
    font-weight: bold;
`;

const CardHeaderStyled = styled(FlexRowItem)`
    .title {
        display: flex;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize[16]};
        img {
            width: ${({ theme }) => theme.fontSize[38]};
            margin-right: 12px;
            border-radius: 8px;
        }
    }
    .text {
        font-size: ${({ theme }) => theme.fontSize[18]};
    }
`;

const CardFooterStyled = styled(FlexRowItem)`
    padding-top: 8px;
    margin-bottom: -6px;
    .linkButton{
        font-size: ${({ theme }) => theme.fontSize[12]};
    }
`;

type CardContentProps = {
    // loanStatus: object;
    // icon:string,
    // productName:string,
    // balance:string,
    // contentItems:[]
};
const contentItems=[
    {title:'aaaa',text:'1111'},
    {title:'bbbb',text:'2222'},
    {title:'cccc',text:'3333'},
    {title:'dddd',text:'4444'},
]

import icon from "../images/logo.jpg";

const CardContent = (props: CardContentProps) => {
    // const { loanStatus, icon, productName, balance,contentItems } = props;
    return (
        <CardContentStyled>
            <CardHeaderStyled>
                <LoanBrand iconUrl={icon} productName={'productName'}/>
                <div className={"text"}>{'balance'}</div>
            </CardHeaderStyled>
            {contentItems.map((item) => (
                <ListItem
                    title={item.title}
                    text={item.text}
                    textColor={"gray500"}
                />
            ))}
            <Divider/>
            <CardFooterStyled>
                <Button className={'linkButton'} styleType={'link'} >{'view details >'}</Button>
                <Button styleType={'primary'} size={'small'}>{'apply now >'}</Button>
            </CardFooterStyled>
        </CardContentStyled>
    );
};

export default CardContent;
