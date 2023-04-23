import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdSVG from "./repayment_banner.svg";
import {useLocation, useNavigate} from "react-router";
import {Horizontal, Input, ListItem, Overlay, Radio,} from "@frontend/mobile/shared/ui";
import Select from 'react-select';
import {withTranslation} from "react-i18next";
import {i18nRepaymentModal} from "./i18n/translations";
import {environment} from "../../../../environments/environment";
import useRepayCreate from "../../hooks/useRepayCreate";
import useRepayTypes from "../../hooks/useRepayTypes";
import {Button} from "../../components/layouts/Button";

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
  div {
    top:20px
  }
`;


type paymentMethodValueType = {
    type: string;
    label: string;
};

const RepaymentModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handlePostRepayCreate } = useRepayCreate()
    // console.log("location.state", location.state);

    const { balance = '', orderNo = '' } = location.state;

    const [radioValue, setRadioValue] = useState("balance");
    // NOTE: 變動數值
    const [balanceValue, setBalanceValue] = useState(balance);

    // NOTE: 付款方式
    const { triggerGetList, isRepayTypesFetching, repayTypesList, repayType, setRepayType } = useRepayTypes();
    useEffect(() => {
        triggerGetList({ orderNo: orderNo });
    }, [])

    const handleConfirm = () => {
        // self
        /* props.setShowRepaymentModal(false);
        // other
        props.setShowRepaymentAdsModal(true); */
        const payType = repayType && repayType.type;
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
                            } else {
                                if (Number(value) > Number(balance)) {
                                    value = balance;
                                }
                                // console.log("[repay] onChange.value", value)
                                // console.log(value)
                                setBalanceValue(value);
                            }
                        }}
                    />
                    <PaymentMethodContainer>
                        <BoldText>{props.t("Payment Method")}</BoldText>
                        <Select
                            options={repayTypesList || []}
                            value={repayType}
                            onChange={(item) => {
                                setRepayType(item as paymentMethodValueType);
                            }}
                        />
                    </PaymentMethodContainer>
                    <div className={`my-4`}><img className={`w-full`} src={AdSVG} /></div>
                    <div className={`flex flex-row my-3`}>
                        <div className={`mr-1.5 w-full`}>
                          <Button onClick={() => {
                            if (isRepayTypesFetching) return;
                            navigate(-1);
                          }} text={props.t("Cancel")} className={`bg-primary-variant w-full`}/>
                        </div>
                        <div className={` ml-1.5 w-full`}>
                          <Button onClick={() => {
                            if (isRepayTypesFetching) return;
                            handleConfirm();
                          }} text={props.t("Repayment")} className={`bg-primary-main w-full`}/>
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
