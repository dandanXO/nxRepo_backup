import React, { useState } from "react";
import Page from "../../core/components/Page";
import Advertisement from "../../components/Advertisement";
import PureLoanDetails, {
    PureLoanDetailsPageProps,
} from "../../components/PureLoanDetails";
import useLoanDetailStory from "../../components/useLoanDetailStory";
import ProductDetailModal from "./modal/ProductDetailModal"

type PureLoanDetailsAdvertisementPage = PureLoanDetailsPageProps;

export const PureLoanDetailsAdvertisementPage = (props: PureLoanDetailsAdvertisementPage) => {
    const [productDetails, setProductDetails] = useState({});
    const [showProductDetailModal,setShowProductDetailModal]= useState(false);
    return (
        <Page>
            <PureLoanDetails
                currentData={props.currentData}
                navigateToUploadPaymentReceiptPage={
                    props.navigateToUploadPaymentReceiptPage
                }
                handlePostRepayCreate={props.handlePostRepayCreate}
            />
            <Advertisement
                recommendProducts={props?.currentData?.recommendProducts}
                setProductDetails={setProductDetails}
                setShowProductDetailModal={setShowProductDetailModal}
            />
            {showProductDetailModal && (
                <ProductDetailModal
                    recommendProducts={productDetails}
                    setShowProductDetailModal={setShowProductDetailModal}
                />
            )}
        </Page>
    );
};

const LoanDetailsPage = () => {
    const {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
    } = useLoanDetailStory();
    return (
        <PureLoanDetailsAdvertisementPage
            currentData={currentData}
            navigateToUploadPaymentReceiptPage={
                navigateToUploadPaymentReceiptPage
            }
            handlePostRepayCreate={handlePostRepayCreate}
        />
    );
};

export default LoanDetailsPage;
