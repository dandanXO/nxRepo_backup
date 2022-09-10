import styled from "styled-components";
import React from "react";
import { flexCreator } from "../utils";

const LoanBrandStyled = styled.div<propsStyles>`
    ${flexCreator("row", "flex-start", "center")};
    font-size: ${({ theme }) => theme.fontSize[16]};
    font-weight: bold;
    img {
        width: ${(props) =>
            props.sizeType === "small"
                ? props.theme.fontSize[24]
                : props.theme.fontSize[38]};
        margin-right: 12px;
        border-radius: 8px;
    }
`;

type LoanBrandProps = {
    iconUrl: string;
    productName: string;
} & propsStyles;

interface propsStyles {
    sizeType?: string;
}

const LoanBrand = (props: LoanBrandProps) => {
    const { iconUrl, productName, sizeType } = props;
    return (
        <LoanBrandStyled className={"loanBrand"} sizeType={sizeType}>
            <div>
                <img src={iconUrl} alt="logo" />
            </div>
            <div>{productName}</div>
        </LoanBrandStyled>
    );
};

export default LoanBrand;
