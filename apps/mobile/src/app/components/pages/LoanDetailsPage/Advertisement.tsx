import styled from "styled-components";
import React, {useCallback, useState} from "react";
import ProductDetailModal from "../../modals/ProductDetailModal";
import SubmitOrderModal from "../../modals/SubmitOrderModal";
import SubmitOrderSuccessModal from "../../modals/SubmitOrderSuccessModal";
import {PostLoanSubmitOrderRequestBody} from "../../../api/postLoanSubmitOrder";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nLoanDetailsPage} from "./i18n/translations";
import BannerWithCard from "./BannerWithCard";
import * as Sentry from "@sentry/react";

const AdvertisementStyled = styled.div`
    margin-top: 32px;
    .infoTitle {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[14]};
        margin-bottom: 10px;
        text-align: left;
    }
`;

type AdvertisementProps = {
    recommendProducts: [];
    isPostLoanSubmitOrderLoading: boolean;
    postLoanSubmitOrder: (obj: any) => any;
} & WithTranslation;

const Advertisement = (props: AdvertisementProps) => {
    const { recommendProducts = [] } = props;
    const [productDetails, setProductDetails] = useState({});
    const [showProductDetailModal, setShowProductDetailModal] = useState(false);
    const [showSubmitOrdereModal, setShowSubmitOrdereModal] = useState(false);
    const [showSubmitOrderSuccessModal, setShowSubmitOrderSuccessModal] =
        useState(false);

    const postLoanSubmitOrderRequest = (requestBody: PostLoanSubmitOrderRequestBody): Promise<string> => new Promise((resolve, reject) => {
        if(props.isPostLoanSubmitOrderLoading) return;

        props.postLoanSubmitOrder(requestBody)
          .unwrap()
          .then(() => {
            setShowSubmitOrdereModal(false);
            setShowSubmitOrderSuccessModal(true);
            resolve("");
          })
          .catch((error: any) => {
            setShowSubmitOrdereModal(false);
            Sentry.captureException(error);
            reject("error")
          })
    });

    const handleLoanSubmitOrder = (productId: number): Promise<string> => {
        return postLoanSubmitOrderRequest({
            productId: productId,
        });
    };

    return (
        <div>
            <AdvertisementStyled>
                <div className={"infoTitle"}>{props.t("More Recommend Loan")}</div>
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

export default withTranslation(i18nLoanDetailsPage.namespace)(Advertisement)

