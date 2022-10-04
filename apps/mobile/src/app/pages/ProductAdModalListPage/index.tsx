import { Page } from "@frontend/mobile/shared/ui";
import React from "react";
import styled from "styled-components";


const ProductAdStyled = styled.div`

`;

interface ProductAdProps {
    logo?: string;
    productName?: string;
    loanQuota?: string;
    interestRate?: string;
    term?: string;
}

const ProductAd = ({ logo, productName, loanQuota }: ProductAdProps) => {
    return <ProductAdStyled>
        <div className="product">
            <div><img src={logo} alt="" /></div>
            <div>
                <div>{productName ? productName : ""}</div>
                <div>{loanQuota ? loanQuota : ""}</div>
            </div>
        </div>
        <div className="productInfo">
            <div>{productName ? productName : ""}</div>
            <div>{loanQuota ? loanQuota : ""}</div>
        </div>
    </ProductAdStyled>
}


const ProductAdModalListPage = () => {
    return (
        <Page>
            123
        </Page>
    );
};

export default ProductAdModalListPage;


