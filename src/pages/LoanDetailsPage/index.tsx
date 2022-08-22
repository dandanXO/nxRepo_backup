import styled from "styled-components";
import React, {useState} from "react";
import { useGetLoanDetailQuery } from "../../api";
import Page from "../../core/components/Page";
import useLocationOrderQueryString from "../../core/useLocationOrderQueryString";
import LoanInfo from "../components/LoanInfo";
import LoanDetail from "../components/LoanDetail";
import Advertisment from "../components/Advertisement";
import AmountPaidModal from "../components/modal/AmountPaidModal/AmountPaidModal";
import ExtendModal from "../components/modal/ExtendModal/ExtendModal";
import ExtensionDetailModal from "./modal/ExtensionDetailModal";
import RepaymentModal from "./modal/RepaymentModal";
import RepaymentNoticeModal from "./modal/RepaymentNoticeModal";

const LoanDetailsPage = () => {
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [showExtensionModal, setShowExtensionModal] = useState(false);
    const [showAmountPaidModal, setShowAmountPaidModal] = useState(false);
    const [showRepaymentModal, setShowRepaymentModal] = useState(false);
    const [showRepaymentNoticeModal, setShowRepaymentNoticeModal] = useState(false);

    const pageQueryString = useLocationOrderQueryString();
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({ orderNo: pageQueryString.orderNo });

    return (
        <Page>
            {showExtendModal&&<ExtendModal setShowExtendModal={setShowExtendModal} {...currentData} />}
            {showExtensionModal && <ExtensionDetailModal setShowExtensionModal={setShowExtensionModal}/>}
            {currentData && showAmountPaidModal && <AmountPaidModal {...currentData} setShowAmountPaidModal={setShowAmountPaidModal}/>}
            {showRepaymentModal && <RepaymentModal balance={2000} setShowRepaymentModal={setShowRepaymentModal} setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}/>}
            {showRepaymentNoticeModal && <RepaymentNoticeModal setShowRepaymentNoticeModal={setShowRepaymentNoticeModal} />}
            <LoanInfo {...currentData} setShowExtensionModal={setShowExtensionModal} setShowAmountPaidModal={setShowAmountPaidModal}/>
            <LoanDetail {...currentData} setShowExtendModal={setShowExtendModal} setShowRepaymentModal={setShowRepaymentModal}/>
            <Advertisment />
        </Page>
    );
}



export default LoanDetailsPage;
