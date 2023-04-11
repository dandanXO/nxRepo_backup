import styled from "styled-components";
import React, {useCallback, useState} from "react";


import {WithTranslation, withTranslation} from "react-i18next";
import {i18nLoanDetailsPage} from "./i18n/translations";
import BannerWithCard from "./BannerWithCard";
import * as Sentry from "@sentry/react";


import {PostLoanSubmitOrderRequestBody} from "../../../api/rtk/old/PostLoanSubmitOrderRequestBody";
import {CustomAxiosError} from "../../../api/rtk/axiosBaseQuery";


import {AppFlag} from "../../../app";
import ProductDetailModal from "../../modals/old/ProductDetailModal";
import SubmitOrderModal from "../../modals/old/SubmitOrderModal";
import SubmitOrderSuccessModal from "../../modals/old/SubmitOrderSuccessModal";

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
          .catch((err: CustomAxiosError) => {
            const error = new Error();
            error.name = "postLoanSubmitOrder"
            if(err) error.message = JSON.stringify(err)
            if(AppFlag.enableSentry) {
              Sentry.captureException(error);
            }
            setShowSubmitOrdereModal(false);
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

