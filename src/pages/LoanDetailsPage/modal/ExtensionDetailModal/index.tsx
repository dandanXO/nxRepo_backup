import Overlay from "../../../../core/components/Overlay";
import React from "react";
import styled from "styled-components";
import LoanBrand from "../../../../core/components/LoanBrand";
import Divider from "../../../../core/components/Divider";
import ListItem from "../../../../core/components/ListItem";
import Tag from "../../../../core/components/Tag";
import Accordion from "../../../../core/components/Accordion";
import { GetLoanDetailResponse } from "../../../../api/getLoanDetail";
import { useGetLoanDetailQuery } from "../../../../api";
import recordStatusStyleProps from "../../../../components/recordStatusColorMapper";

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

type ExtesionDetailProps = GetLoanDetailResponse & {
    setShowExtensionModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const renderExtesionDetail = (props: ExtesionDetailProps) => {
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
            <div className="totalTitle">Amount Paid with Extension</div>
            <div className="totalText">₹ {balance}</div>
            <Divider />
            <div className={"loanInfo-Card-Title"}>Gernal</div>
            <div className={"loanInfo-Card-list"}>
                <ListItem
                    title={"State"}
                    text={
                        <Tag status={status ? status : "EXTEND"}>{status}</Tag>
                    }
                />
                <ListItem title={"Amount Paid"} text={`₹ ${paidAmount}`} />
                <RepayRecordStyled>
                    <Accordion title={"Amount Paid Record"} isCollapse={true}>
                        {repayRecords.length === 0 ? (
                            <NoDataStyled>No paid records yet</NoDataStyled>
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
                                                            : "EXTEND"
                                                    }
                                                >
                                                    {record.repayType}
                                                </RepayTypeStyled>
                                            </div>
                                        }
                                        text={`₹ ${record.repayAmount}`}
                                    />
                                );
                            })
                        )}
                    </Accordion>
                </RepayRecordStyled>
                <ListItem title={"Balance"} text={`₹ ${balance}`} />
            </div>
            <Divider />
            <div className={"loanInfo-Card-Title"}>
                {chargeFeeDetail?.title}
            </div>
            {chargeFeeDetail?.items.map((item) => {
                const fieldType = item.fieldType === "CURRENCY" ? " ₹ " : "";
                return (
                    <ListItem
                        title={item.itemName}
                        text={`${fieldType}${item.value}`}
                    />
                );
            })}
            <div className={"loanInfo-Card-Title"}>Extension</div>
            <ListItem
                title={"Extension fee"}
                text={extensionFee ? extensionFee : ""}
            />
            <Divider />
            <ListItem
                title={"Original due date"}
                text={originalDueDate ? originalDueDate : ""}
            />
            <ListItem
                title={"Extension Date"}
                text={extendDate ? extendDate : ""}
            />
            <ListItem title={"Due Date"} text={dueDate ? dueDate : ""} />
            <Divider />
            <div className={"loanInfo-Card-Title"}>Link account</div>
            <ListItem title={"Bank card"} text={bankCardNo ? bankCardNo : ""} />
        </ExtesionDetailStyled>
    );
};

const ExtensionDetailModal = (props: ExtesionDetailProps) => {
    const { setShowExtensionModal, parentOrderNo } = props;
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({
        orderNo: parentOrderNo,
    });

    return (
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) =>
                    renderExtesionDetail({
                        ...currentData,
                        setShowExtensionModal,
                    })
                }
                enableTitleHorizontal={true}
                enableClose={true}
                onCancel={() => setShowExtensionModal(false)}
            ></Overlay>
        </div>
    );
};
export default ExtensionDetailModal;
