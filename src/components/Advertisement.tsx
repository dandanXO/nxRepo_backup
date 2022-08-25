import styled from "styled-components";
import React, { useState } from "react";
import { GetLoanDetailRecommendProducts } from "../api/getLoanDetail";
import Card from "../core/components/Card";
import CardContent from "../core/components/CardContent";
import ListItem from "../core/components/ListItem";

const AdvertisementStyled = styled.div`
    margin-top: 32px;
    .infoTitle {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[14]};
        margin-bottom: 10px;
        text-align: left;
    }
`;

const BannerWithCardStyled = styled.div`
    width: 100%;
    .banner {
        width: 100%;
        border-radius: 8px;
        margin-bottom: -20px;
    }
    .bannerHide {
        width: 100%;
        border-radius: 8px;
        height: 50px;
        object-fit: cover;
        object-position: left top;
        margin-bottom: -20px;
    }
`;

export interface BannerWithCardProps {
    adProps: GetLoanDetailRecommendProducts;
    setProductDetails: React.Dispatch<React.SetStateAction<object>>;
    setShowProductDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const BannerWithCard = (props: BannerWithCardProps) => {
    const {
        backgroundUrl,
        logoUrl,
        productName,
        loanQuota,
        interestRate,
        term,
    } = props.adProps;

    const [isCollapse, setIsCollapse] = useState(true);
    const handleViewDetail = (detail: GetLoanDetailRecommendProducts) => {
        props.setProductDetails(detail);
        props.setShowProductDetailModal(true)
    }

    const handleApplyNow=()=>{
 
    }
    return (
        <BannerWithCardStyled >
            <img
                onClick={() => setIsCollapse(!isCollapse)}
                className={` ${isCollapse ? "banner" : "bannerHide"}`}
                src={backgroundUrl}
            />
            <Card isHot={true}>
                <CardContent
                    icon={logoUrl ? logoUrl : ""}
                    productName={productName ? productName : ""}
                    balance={loanQuota ? loanQuota : ""}
                    contentItems={
                        <>
                            <ListItem
                                title={"interest"}
                                text={interestRate ? interestRate : ""}
                            />
                            <ListItem title={"terms"} text={term ? term : ""} />
                        </>
                    }
                    handleViewDetail={()=>handleViewDetail(props.adProps)}
                    handleApplyNow={handleApplyNow}
                />
            </Card>
        </BannerWithCardStyled>
    );
};
export interface AdvertisementProps {
    recommendProducts: [];
    setProductDetails: React.Dispatch<React.SetStateAction<object>>;
    setShowProductDetailModal: React.Dispatch<React.SetStateAction<boolean>>;

};
const Advertisement = (props: AdvertisementProps) => {
    const { recommendProducts = [] } = props;
    return (
        <AdvertisementStyled>
            <div className={"infoTitle"}>More Recommend Loan</div>
            {recommendProducts.map((ad) => (
                <BannerWithCard key={ad['productId']} adProps={ad} {...props}/>
            ))}
        </AdvertisementStyled>
    );
};

export default Advertisement;
