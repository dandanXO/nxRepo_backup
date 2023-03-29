import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdSVG from "./repayment_banner.svg";
import Button from "../../components/Button";
import { useNavigate, useLocation } from 'react-router-dom';


import {
    Horizontal,
    NotificationButton,
    RepayICON,
    ListItem,
    Title,
    Overlay,
    Radio,
    Input, Select,
} from "@frontend/mobile/shared/ui";
import { WithTranslation, withTranslation } from "react-i18next";
import { i18nRepaymentModal } from "./i18n/translations";
import { environment } from "../../../environments/environment";
import { Link } from "react-router-dom";
import { useLazyGetRepayTypesQuery } from "../../api";
import useRepayCreate from "../../hooks/useRepayCreate";

export const RepaymentModalContainer = styled.div`
    color: #101010;
    padding:16px;
`;
const SectionBalance = styled.div`
    padding: 10px;
`;

const MethodContainer = styled.div`
  margin-bottom: 18px;
`;

export const SectionButton = styled.div`
    margin-bottom: 10px;
`;

export const RepayAndApplyButton = styled(NotificationButton)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${(props) => props.theme.button.primary.text};
    background: ${(props) => props.disable ? "#C0C0C0" : props.theme.button.primary.main};
`;

export const RepaymentButton = styled(RepayAndApplyButton)`
    flex: 3 0 auto;
    background: ${(props) => props.theme.button.secondary.main};
    color: ${(props) => props.theme.button.secondary.text};
`;

const BoldText = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const PaymentMethodContainer = styled.div`
  margin-bottom: 18px;
  width:100%
  div{
    top:20px
  }
`;




const RepaymentModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handlePostRepayCreate } = useRepayCreate()
    const { balance = '', orderNo = '' } = location.state.currentData;

    const [radioValue, setRadioValue] = useState("balance");
    // NOTE: 變動數值
    const [balanceValue, setBalanceValue] = useState(balance);
    const [paymentMethodValue, setPaymentMethodValue] = useState(0);

    const [triggerGetList, { currentData: repayTypes, isLoading, isFetching: isRepayTypesFetching, isSuccess, isError, isUninitialized }] = useLazyGetRepayTypesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    useEffect(() => {
        triggerGetList({ orderNo: orderNo });
    }, [])

    const [paymentMethodList, setPaymentMethodList] = useState<string[]>([]);
    useEffect(() => {
        if (repayTypes !== undefined) {
            const methods = repayTypes && repayTypes?.map(item => {
                return item.payTypeAlias ? item.payTypeAlias : "";
            })
            setPaymentMethodList(methods);
        }
    }, [repayTypes])

    const handleConfirm = () => {
        // self
        /* props.setShowRepaymentModal(false);
        // other
        props.setShowRepaymentAdsModal(true); */
        const payType = repayTypes && repayTypes[paymentMethodValue].payType || '';
        handlePostRepayCreate(false, orderNo, balanceValue, payType);
    };

    return (
        <Overlay
            show={true}
            content={() => {
                return <RepaymentModalContainer>
                    <div className="text-xl font-bold mb-4">{props.t("Repayment")}</div>
                    <Horizontal />

                    <SectionBalance>
                        <ListItem
                            title={props.t("Balance") as any}
                            text={`${environment.currency} ${balance}`}
                        />
                    </SectionBalance>

                    <MethodContainer>
                        <Radio.Group
                            value={radioValue}
                            onCheck={(value: any) => {
                                setRadioValue(value);
                                if (value === "balance") {
                                    setBalanceValue(balance);
                                }
                            }}
                        >
                            <Radio value="balance">{props.t("Balance")}</Radio>
                            <Radio value="custom">{props.t("Custom Amount")}</Radio>
                        </Radio.Group>
                    </MethodContainer>

                    <Input
                        label={props.t("Amount") as string}
                        labelType="left"
                        value={`${environment.currency} ${balanceValue}`}
                        disabled={radioValue === "balance"}
                        onChange={(event: any) => {
                            let value = event.target.value;
                            value = value.replaceAll(`${environment.currency}`, "");
                            // NOTE: if custom balance exceed max balance then setting max balance
                            if (String(Number(value)) === "NaN" || String(value) === "0") {
                                setBalanceValue(1);
                                props.setRepayBalance(1);
                            } else {
                                if (Number(value) > Number(balance)) {
                                    value = balance;
                                }
                                console.log("[repay] onChange.value", value)
                                console.log(value)
                                setBalanceValue(value);
                                props.setRepayBalance(value);
                            }
                        }}
                    />
                    <PaymentMethodContainer>
                        <BoldText>{props.t("Payment Method")}</BoldText>

                        <Select
                            dataSource={paymentMethodList || []}
                            defaultIndex={paymentMethodValue}
                            fixButtonWidth={"100%"}
                            maxItemCount={4}
                            // FIXME: to controlled component
                            onSelect={(index: number) => {
                                setPaymentMethodValue(index);
                                props.setPayType(index);
                            }}
                        />
                    </PaymentMethodContainer>
                    <div className={`my-4`}><img className={`w-full`} src={AdSVG} /></div>
                    <div className={`flex flex-row my-3`}>
                        <div className={`mr-1.5 w-full`}>
                            <Button onClick={() => {
                                if (isRepayTypesFetching) return;
                                navigate(-1);
                            }} buttonText={props.t("Cancel")} backgroundColor={'bg-orange-300'} width={`w-full`} />
                        </div>
                        <div className={` ml-1.5 w-full`}>
                            <Button onClick={() => {
                                if (isRepayTypesFetching) return;
                                handleConfirm();
                            }} buttonText={'Repayment'} width={`w-full`} />
                        </div>
                    </div>
                    <div className={`text-xs text-gray-300 text-left`}>
                        <div>Attention：</div>
                        <ul className="list-decimal list-outside pl-3 pt-1">
                            <li>Before repayment, please make sure that you have enough  balance on your bank account.</li>
                            <li>In order to protect your rights, we strongly recommend you take a screenshot and upload your UTR number after completing the repayment and return to the APP to upload your repayment receipt.</li>
                        </ul>
                    </div>
                </RepaymentModalContainer>
            }}
        />

    );
};


export default withTranslation(i18nRepaymentModal.namespace)(RepaymentModal);
