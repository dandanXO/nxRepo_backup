import React, {useCallback, useState} from "react";
import { useGetLoanDetailQuery } from "../../api";
import Page from "../../core/components/Page";
import useLocationOrderQueryString from "../../core/useLocationOrderQueryString";
import LoanInfo from "../components/LoanInfo";
import LoanDetail from "../components/LoanDetail";
import Advertisement from "../components/Advertisement";
import AmountPaidModal from "../components/modal/AmountPaidModal/AmountPaidModal";
import ExtendModal from "../components/modal/ExtendModal/ExtendModal";
import ExtensionDetailModal from "./modal/ExtensionDetailModal";
import RepaymentModal from "./modal/RepaymentModal";
import RepaymentNoticeModal from "./modal/RepaymentNoticeModal";
import {useNavigate} from "react-router-dom";

interface PureLoanDetailsPageProps {
    currentData: any;
    navigateToUploadPaymentReceiptPage: any;
}

export const PureLoanDetailsPage = (props: PureLoanDetailsPageProps) => {
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [showExtensionModal, setShowExtensionModal] = useState(false);
    const [showAmountPaidModal, setShowAmountPaidModal] = useState(false);
    const [showRepaymentModal, setShowRepaymentModal] = useState(false);
    const [showRepaymentNoticeModal, setShowRepaymentNoticeModal] = useState(false);

    return (
        <Page>
            {showExtendModal&&<ExtendModal setShowExtendModal={setShowExtendModal} {...props.currentData} />}
            {showExtensionModal && <ExtensionDetailModal setShowExtensionModal={setShowExtensionModal}/>}
            {props.currentData && showAmountPaidModal && <AmountPaidModal {...props.currentData} setShowAmountPaidModal={setShowAmountPaidModal}/>}
            {showRepaymentModal && <RepaymentModal balance={props.currentData.balance} setShowRepaymentModal={setShowRepaymentModal} setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}/>}
            {showRepaymentNoticeModal && <RepaymentNoticeModal setShowRepaymentNoticeModal={setShowRepaymentNoticeModal} />}
            <LoanInfo {...props.currentData} setShowExtensionModal={setShowExtensionModal} setShowAmountPaidModal={setShowAmountPaidModal} navigateToUploadPaymentReceiptPage={props.navigateToUploadPaymentReceiptPage}/>
            <LoanDetail {...props.currentData} setShowExtendModal={setShowExtendModal} setShowRepaymentModal={setShowRepaymentModal}/>
            <Advertisement />
        </Page>
    );
}

const LoanDetailsPage = () => {
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({ orderNo: pageQueryString.orderNo });
    const navigateToUploadPaymentReceiptPage = useCallback(() => {
        navigate(`/upload-payment-receipt?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`)
    }, [pageQueryString.token, pageQueryString.orderNo]);
    return (
        <PureLoanDetailsPage currentData={currentData} navigateToUploadPaymentReceiptPage={navigateToUploadPaymentReceiptPage} />
    )
}

export default LoanDetailsPage;
