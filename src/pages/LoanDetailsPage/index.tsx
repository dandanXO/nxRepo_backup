import React, { useCallback, useEffect, useState } from "react";
import { useGetLoanDetailQuery, useGetRepayTypesQuery } from "../../api";
import { mockGetLoanDetailResponse } from "../../api/getLoanDetail";
import Page from "../../core/components/Page";
import useLocationOrderQueryString from "../../core/hooks/useLocationOrderQueryString";
import LoanInfo from "../../components/LoanInfo";
import LoanDetail from "../../components/LoanDetail";
import Advertisement from "../../components/Advertisement";
import AmountPaidModal from "../../components/modal/AmountPaidModal/AmountPaidModal";
import ExtendModal from "../../components/modal/ExtendModal/ExtendModal";
import ExtensionDetailModal from "./modal/ExtensionDetailModal";
import RepaymentModal from "./modal/RepaymentModal";
import RepaymentNoticeModal from "./modal/RepaymentNoticeModal";
import { useNavigate } from "react-router-dom";
import { usePostRepayCreateMutation } from "../../api";
import {
    PostRepayCreateRequestBody,
    PostRepayCreateResponse,
} from "../../api/postRepayCreate";

interface PureLoanDetailsPageProps {
    currentData: any;
    // repayTypes: any;
    navigateToUploadPaymentReceiptPage: any;
    handlePostRepayCreate: any;
}

export const PureLoanDetailsPage = (props: PureLoanDetailsPageProps) => {
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [showExtensionModal, setShowExtensionModal] = useState(false);
    const [showAmountPaidModal, setShowAmountPaidModal] = useState(false);
    const [showRepaymentModal, setShowRepaymentModal] = useState(false);
    const [showRepaymentNoticeModal, setShowRepaymentNoticeModal] =
        useState(false);
    const [repayBalance, setRepayBalance] = useState(props.currentData.balance);

    useEffect(() => {
        setRepayBalance(props.currentData.balance);
    }, [props.currentData]);
    return (
        <Page>
            {showExtendModal && (
                <ExtendModal
                    setShowExtendModal={setShowExtendModal}
                    {...props.currentData}
                    handlePostRepayCreate={props.handlePostRepayCreate}
                />
            )}
            {showExtensionModal && (
                <ExtensionDetailModal
                    setShowExtensionModal={setShowExtensionModal}
                />
            )}
            {props.currentData && showAmountPaidModal && (
                <AmountPaidModal
                    {...props.currentData}
                    setShowAmountPaidModal={setShowAmountPaidModal}
                />
            )}
            {showRepaymentModal && (
                <RepaymentModal
                    balance={props.currentData.balance}
                    setRepayBalance={setRepayBalance}
                    setShowRepaymentModal={setShowRepaymentModal}
                    setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}
                    handlePostRepayCreate={props.handlePostRepayCreate}
                />
            )}
            {showRepaymentNoticeModal && (
                <RepaymentNoticeModal
                    balance={repayBalance}
                    setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}
                    handlePostRepayCreate={props.handlePostRepayCreate}
                />
            )}
            <LoanInfo
                {...props.currentData}
                setShowExtensionModal={setShowExtensionModal}
                setShowAmountPaidModal={setShowAmountPaidModal}
                navigateToUploadPaymentReceiptPage={
                    props.navigateToUploadPaymentReceiptPage
                }
            />
            <LoanDetail
                {...props.currentData}
                setShowExtendModal={setShowExtendModal}
                setShowRepaymentModal={setShowRepaymentModal}
            />
            <Advertisement />
        </Page>
    );
};

const LoanDetailsPage = () => {
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({
        orderNo: pageQueryString.orderNo,
    });
    const {
        currentData: repayTypes,
        isLoading: isRepayTypesLoading,
        isFetching: isRepayTypesFetching,
    } = useGetRepayTypesQuery({});
    const orderNo = pageQueryString.orderNo;
    const token = pageQueryString.token;
    const [payType, setPayType] = useState("");
    const navigateToUploadPaymentReceiptPage = useCallback(() => {
        navigate(`/upload-payment-receipt?token=${token}&orderNo=${orderNo}`);
    }, [token, orderNo]);

    useEffect(() => {
        if (!isRepayTypesLoading) {
            setPayType(repayTypes[0].payType);
        }
    }, [isRepayTypesLoading]);
    const [postRepayCreate, { isLoading: isPostRepayCreateLoading }] =
        usePostRepayCreateMutation();

    const postRepayCreateRequest = useCallback(
        (props: PostRepayCreateRequestBody) => {
            postRepayCreate(props)
                .unwrap()
                .then((data: PostRepayCreateResponse) => {})
                .catch(({ error }) => {
                    console.log(error);
                })
                .finally(() => {});
        },
        []
    );

    const handlePostRepayCreate = useCallback(
        (
            isExtend: boolean,
            isForceApplyAfterRepay: true,
            repayAmount: number
        ) => {
            postRepayCreateRequest({
                extend: isExtend,
                forceApplyAfterRepay: isForceApplyAfterRepay,
                orderNo: orderNo,
                payType: payType,
                repayAmount: repayAmount,
            });
        },
        [orderNo, payType]
    );

    return (
        <PureLoanDetailsPage
            currentData={isLoading ? {} : mockGetLoanDetailResponse}
            navigateToUploadPaymentReceiptPage={
                navigateToUploadPaymentReceiptPage
            }
            handlePostRepayCreate={handlePostRepayCreate}
        />
    );
};

export default LoanDetailsPage;
