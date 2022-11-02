import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { GetLoanDetailRecommendProducts } from "../api/getLoanDetail";
import ProductDetailModal from "../modal/ProductDetailModal";
import SubmitOrderModal from "../modal/SubmitOrderModal";
import SubmitOrderSuccessModal from "../modal/SubmitOrderSuccessModal";
import { PostLoanSubmitOrderRequestBody } from "../api/postLoanSubmitOrder";
import { Card, CardContent, ListItem } from "@frontend/mobile/shared/ui";

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
    setShowSubmitOrdereModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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
        props.setShowProductDetailModal(true);
    };

    const handleApplyNow = (detail: GetLoanDetailRecommendProducts) => {
        props.setProductDetails(detail);
        props.setShowSubmitOrdereModal(true);
    };
    return (
        <BannerWithCardStyled>
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
                    handleViewDetail={() => handleViewDetail(props.adProps)}
                    handleApplyNow={() => handleApplyNow(props.adProps)}
                />
            </Card>
        </BannerWithCardStyled>
    );
};
export interface AdvertisementProps {
    recommendProducts: [];
    postLoanSubmitOrder: (obj: any) => any;
}
const Advertisement = (props: AdvertisementProps) => {
    const { recommendProducts = [] } = props;
    const [productDetails, setProductDetails] = useState({});
    const [showProductDetailModal, setShowProductDetailModal] = useState(false);
    const [showSubmitOrdereModal, setShowSubmitOrdereModal] = useState(false);
    const [showSubmitOrderSuccessModal, setShowSubmitOrderSuccessModal] =
        useState(false);

    const postLoanSubmitOrderRequest = useCallback(
        (requestBody: PostLoanSubmitOrderRequestBody) => {
          props.postLoanSubmitOrder(requestBody)
                .unwrap()
                .then(() => {
                    setShowSubmitOrdereModal(false);
                    setShowSubmitOrderSuccessModal(true);
                })
                .catch(({ }) => {
                    setShowSubmitOrdereModal(false);
                })
                .finally(() => {});
        },
        []
    );

    const handleLoanSubmitOrder = useCallback((productId: number) => {
        postLoanSubmitOrderRequest({
            productId: productId,
        });
    }, []);

    return (
        <div>
            <AdvertisementStyled>
                <div className={"infoTitle"}>More Recommend Loan</div>
                {recommendProducts.map((ad) => (
                    <BannerWithCard
                        key={ad["productId"]}
                        adProps={ad}
                        setShowProductDetailModal={setShowProductDetailModal}
                        setProductDetails={setProductDetails}
                        setShowSubmitOrdereModal={setShowSubmitOrdereModal}
                    />
                ))}
            </AdvertisementStyled>
            {showProductDetailModal && productDetails && (
                <ProductDetailModal
                    recommendProducts={productDetails}
                    setShowProductDetailModal={setShowProductDetailModal}
                />
            )}
            {showSubmitOrdereModal && (
                <SubmitOrderModal
                    productDetails={productDetails}
                    setShowSubmitOrdereModal={setShowSubmitOrdereModal}
                    handleLoanSubmitOrder={handleLoanSubmitOrder}
                />
            )}
            {showSubmitOrderSuccessModal && (
                <SubmitOrderSuccessModal
                    setShowSubmitOrderSuccessModal={
                        setShowSubmitOrderSuccessModal
                    }
                />
            )}
        </div>
    );
};

export default Advertisement;
