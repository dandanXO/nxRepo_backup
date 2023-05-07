import {
    Overlay,
    ListItem,
    Divider,
    Tag,
    Accordion,
} from "@frontend/mobile/shared/ui";
import React from "react";
import styled from "styled-components";
import { GetLoanDetailResponse } from "../../../../../api/getLoanDetail";
import { useGetLoanDetailQuery } from "../../../../../api";
import recordStatusStyleProps from "../../../../../core/recordStatusColorMapper";
import { environment } from "../../../../../../environments/environment";
import LoanBrand from "../../../../components/LoanBrand";
import {
    useTranslation,
    WithTranslation,
    withTranslation,
} from "react-i18next";
import { i18nExtensionDetailModal } from "./i18n/translations";
import i18next from "i18next";

const ExtesionDetailStyled = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.color.black};

    .totalTitle {
        margin: 8px 0;
        font-size: ${({ theme }) => theme.fontSize[14]};
    }
    .totalText {
        font-size: ${({ theme }) => theme.fontSize[26]};
        font-weight: bold;
    }

    .loanInfo-Card-Title {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
        width: 100%;
        margin-bottom: 10px;
        text-align: left;
    }
    .loanInfo-Card-list {
        width: 100%;
    }
    .relatedRepayment {
        width: 100%;
        text-align: right;
        button {
            color: ${({ theme }) => theme.color.blue};
            font-size: ${({ theme }) => theme.fontSize[14]};
        }
    }
    .uploadButton {
        padding: 0px 12px;
        button {
            width: 100%;
            font-weight: bold;
        }
    }

    .noticeText {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
        padding: 18px 12px;
    }
`;
const RepayRecordStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.color.gray200};
    padding: 10px 14px;
    .itemTitle,
    .itemText {
        font-size: ${({ theme }) => theme.fontSize[12]};
    }
`;

interface RepayTypeStyledProps {
    status: string;
}
const RepayTypeStyled = styled.div<RepayTypeStyledProps>`
    margin-left: 12px;
    ${(props) => ({ ...recordStatusStyleProps[props.status] })}
`;
const NoDataStyled = styled.div`
    padding: 10px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.gray500};
`;

type renderExtesionDetailProps = GetLoanDetailResponse & {
    setShowExtensionModal: React.Dispatch<React.SetStateAction<boolean>>;
} & WithTranslation;

const renderExtesionDetail = (props: renderExtesionDetailProps) => {
    const {
        iconUrl,
        status,
        paidAmount = "",
        repayRecords = [],
        balance = "",
        productName,
        extensionFee,
        originalDueDate,
        extendDate,
        dueDate,
        bankCardNo,
        chargeFeeDetail,
        orderNo,
    } = props;

    return (
        <ExtesionDetailStyled>
            <div className="loanBrand">
                <LoanBrand
                    iconUrl={iconUrl ? iconUrl : ""}
                    productName={productName ? productName : ""}
                    sizeType={"small"}
                />
            </div>
            <div className="totalTitle">{props.t("Extension Fee")}</div>
            <div className="totalText">
                {environment.currency} {extensionFee ? extensionFee : ""}{" "}
            </div>
            <Divider />
            <div className={"loanInfo-Card-Title"}>{props.t("General")}</div>
            <div className={"loanInfo-Card-list"}>
                <ListItem
                    title={props.t("No.") as string}
                    text={orderNo ? orderNo : ""}
                />
                <ListItem
                    title={props.t("State") as string}
                    text={
                        <Tag status={status ? status : props.t("EXTEND")}>
                            {status}
                        </Tag>
                    }
                />
                <ListItem
                    title={props.t("Amount Paid") as string}
                    text={`${environment.currency} ${paidAmount}`}
                />
                <RepayRecordStyled>
                    <Accordion
                        title={props.t("Amount Paid Record")}
                        isCollapse={true}
                    >
                        {repayRecords.length === 0 ? (
                            <NoDataStyled>
                                {props.t("No paid records yet")}
                            </NoDataStyled>
                        ) : (
                            repayRecords.map((record) => {
                                return (
                                    <ListItem
                                        title={
                                            <div>
                                                <div>{record.repayDate}</div>
                                                <RepayTypeStyled
                                                    status={
                                                        record.repayType
                                                            ? record.repayType
                                                            : props.t("EXTEND")
                                                    }
                                                >
                                                    {record.repayType}
                                                </RepayTypeStyled>
                                            </div>
                                        }
                                        text={`${environment.currency} ${record.repayAmount}`}
                                    />
                                );
                            })
                        )}
                    </Accordion>
                </RepayRecordStyled>
                <ListItem
                    title={props.t("Balance") as string}
                    text={`${environment.currency} ${balance}`}
                />
            </div>
            <Divider />
            <div className={"loanInfo-Card-Title"}>
                {chargeFeeDetail?.title}
            </div>
            {chargeFeeDetail?.items.map((item) => {
                const fieldType =
                    item.fieldType === "CURRENCY"
                        ? ` ${environment.currency} `
                        : "";
                return (
                    <ListItem
                        title={item.itemName}
                        text={`${fieldType}${item.value}`}
                    />
                );
            })}
            {/* <div className={"loanInfo-Card-Title"}>Extension</div>
            <ListItem
                title={"Extension fee"}
                text={extensionFee ? extensionFee : ""}
            /> */}
            <Divider />
            <ListItem
                title={props.t("Original due date") as string}
                text={originalDueDate ? originalDueDate : ""}
            />
            <ListItem
                title={props.t("Extension Date") as string}
                text={extendDate ? extendDate : ""}
            />
            {/* <ListItem title={"Due Date"} text={dueDate ? dueDate : ""} /> */}
            <Divider />
            <div className={"loanInfo-Card-Title"}>
                {props.t("Link account")}
            </div>
            <ListItem
                title={props.t("Bank card") as string}
                text={bankCardNo ? bankCardNo : ""}
            />
        </ExtesionDetailStyled>
    );
};

type ExtensionDetailModalProps = GetLoanDetailResponse & {
    setShowExtensionModal: React.Dispatch<React.SetStateAction<boolean>>;
} & WithTranslation;

const ExtensionDetailModal = (props: ExtensionDetailModalProps) => {
    const { setShowExtensionModal, parentOrderNo } = props;
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({
        orderNo: parentOrderNo,
    });

    return (
        <div>
            <Overlay
                show={true}
                title={props.t("Notice") as string}
                content={(hide: () => void) =>
                    renderExtesionDetail({
                        ...currentData,
                        setShowExtensionModal,
                        t: props.t,
                        i18n: i18next,
                        tReady: false,
                    })
                }
                enableTitleHorizontal={true}
                enableClose={true}
                onCancel={() => setShowExtensionModal(false)}
            ></Overlay>
        </div>
    );
};

export default withTranslation(i18nExtensionDetailModal.namespace)(
    ExtensionDetailModal
);
