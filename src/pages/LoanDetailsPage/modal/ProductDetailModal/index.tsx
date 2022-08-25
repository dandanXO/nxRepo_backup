import Overlay from "../../../../core/components/Overlay";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ListItem from "../../../../core/components/ListItem";
import { GetLoanDetailRecommendProducts} from "../../../../api/getLoanDetail";
import LoanBrand from "../../../../core/components/LoanBrand";
import Title from "../../../../core/components/Modal/Title";
import Divider from "../../../../core/components/Divider";


const ModalContentStyled = styled.div`
    padding: 0 12px;
    color: ${({theme})=>theme.color.black};
    .info-title{
        text-align: left;
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
    }
`;


export interface PureProductDetailModalProps {
    recommendProducts?: GetLoanDetailRecommendProducts;
    setShowProductDetailModal: React.Dispatch<React.SetStateAction<boolean>>;

}
export const PureProductDetailModal = (props: PureProductDetailModalProps) => {
   
    return (
        <div>
            <Overlay
                show={true}
                enableClose={true}
                title="Notice"
                enableTitleHorizontal={true}
                onCancel={() => props.setShowProductDetailModal(false)}
                content={(hide: () => void) => {
                    return (
                        <ModalContentStyled>
                            <Title>Product Details</Title>
                            <Divider />
                            <LoanBrand
                                iconUrl={props?.recommendProducts?.logoUrl ?? ""}
                                productName={props?.recommendProducts?.productName ?? ""}
                                sizeType={"small"}
                            />
                            <ListItem
                                title={"Loanable amount"}
                                text={`₹ ${ props?.recommendProducts?.loanQuota ?? ""}`}
                            />
                            <ListItem
                                title={"Interest"}
                                text={props?.recommendProducts?.interestRate ?? ""}
                            />
                             <ListItem
                                title={"Terms"}
                                text={props?.recommendProducts?.term ?? ""}
                            />
                             <ListItem
                                title={"Approval Rates"}
                                text={props?.recommendProducts?.approvedRate ?? ""}
                            />
                             <ListItem
                                title={"Approval Time"}
                                text={props?.recommendProducts?.approvedTime ?? ""}
                            />
                            <Divider />
                            <div className={"info-title"}>customer service</div>
                            <ListItem
                                title={"Service time"}
                                text={props?.recommendProducts?.csTime ?? ""}
                            />
                              <ListItem
                                title={"Email"}
                                text={props?.recommendProducts?.csEmail ?? ""}
                            />
                        </ModalContentStyled>
                    );
                }}
            
            ></Overlay>
        </div>
    );
};



const ProductDetailModal = (props: PureProductDetailModalProps) => {
    return (
        <PureProductDetailModal
            recommendProducts={props?.recommendProducts}
            setShowProductDetailModal={props.setShowProductDetailModal}
        />
    );
};

export default ProductDetailModal;
