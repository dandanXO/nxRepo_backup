import React, { useEffect, useState } from "react";
import AdSVG from "../../repayment_banner.svg";
import { useLocation, useNavigate } from "react-router";
import { Horizontal, Input, Overlay, Radio, } from "@frontend/mobile/shared/ui";
import Select,{ StylesConfig } from 'react-select';
import { withTranslation } from "react-i18next";
import { i18nRepaymentModal } from "../translations";
import { environment } from "../../../../../../environments/environment";
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from "../../../../components/layouts/Button";
import { IRepaymentModalProps } from "../../index";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";
import { getToken } from "../../../../../modules/location/getToken";
import { PagePathEnum } from "../../../../pages/PagePathEnum";
import cx from 'classnames';
import moment from "moment";
import ListItem from "../../../../components/ListItem";
import Money from "../../../../components/Money.tsx";
import { selectStyles } from "../../../../components/layouts/selectStyles";


type paymentMethodValueType = {
    type: string;
    label: string;
};


const PakistanRepaymentModal = (props: IRepaymentModalProps & any) => {
    const { radioValue, setRadioValue, balance, balanceValue, setBalanceValue, repayTypesList, isRepayTypesFetching, repayType, setRepayType, handleConfirm,orderNo } = props
    const navigate = useNavigate();
    const location = useLocation();
    const {coupon}=location.state;

  const [balanceValueErrorMessage, setBalanceValueErrorMessage] = useState("");

    return (
        <div className="text-left px-4">
            <div className="whitespace-nowrap mt-3 ml-[-4px] text-xs">
                <Radio.Group
                    value={radioValue}
                    onCheck={(value: any) => {
                        setRadioValue(value);
                        if (value === "balance") {
                            setBalanceValue(balance);
                            setBalanceValue(`${environment.currency}${balance}`);
                        }
                    }}
                >
                    <Radio value="balance">{props.t("Repay Full Amount")}</Radio>
                    <Radio value="custom">{props.t("Partial Repayment")}</Radio>
                </Radio.Group>
            </div>

            <div>
              <div className="text-black mt-3 text-xs">{"Payment Amount (PKR)"}</div>
              <Input
                labelType="none"
                outlineType="standard"
                value={balanceValue}
                disabled={radioValue === "balance"}
                onChange={(event: any) => {
                  let value = event.target.value;
                  // console.log("value", value);

                  value = value.replace(`${environment.currency}`, "");

                  if(value === "") {
                    setBalanceValueErrorMessage("This field cannot be left blank.")
                  }  else if(!new RegExp("^[0-9]*$").test(value)) {
                    setBalanceValueErrorMessage("Numbers only. Please try again.")
                  } else if (Number(value) > Number(balance)) {
                    // NOTE: 限制數字最大值
                    setBalanceValueErrorMessage("Amount cannot be greater than the repayment balance.")
                  } else {
                    setBalanceValueErrorMessage("")
                  }

                  // setBalanceValue(value);
                  if(value === environment.currency.slice(0, 2)) {

                  } else {
                    setBalanceValue(`${environment.currency}${value}`);
                  }
                }}
                onBlur={() => {

                }}
                errorMessage={balanceValueErrorMessage === "" ? "" : balanceValueErrorMessage}
              />
            </div>

            <div>
              <div className="text-black mt-2.5 text-xs">{"Payment Method"}</div>
              <Select
                styles={selectStyles}
                options={repayTypesList || []}
                value={repayType}
                onChange={(item) => {
                  setRepayType(item as paymentMethodValueType);
                }}
                isSearchable={false}
              />
            </div>

            {radioValue !== 'custom' &&
                <>
                    <div className="text-black mt-2.5 text-xs">{"Coupon (PKR)"}</div>
                    <div className="flex border-solid border-b border-[#aaaaaa] justify-center items-center pl-5 pr-4 py-1.5"
                        onClick={() => {
                            if (isRepayTypesFetching) return;
                            navigate(`${PagePathEnum.RepaymentDetailPage}/repayment-coupon-modal?token=${getToken()}`,
                                { state: { ...location.state, paymentAmount: balance, paymentMethod: repayType.value, } })
                        }}
                    >
                      <div className={cx('grow text-base flex-nowrap flex justify-between', {
                          'text-primary-main': coupon !== undefined && coupon !== null
                      })}>
                          {coupon ? (
                              <div className="flex justify-between grow">
                                  <div className="self-center">- {coupon.discountAmount}</div>
                                  <div className="flex flex-col text-xs text-gray-400">
                                      <div>expiration date</div>
                                      <div className="">{coupon.expireTime ? moment(coupon.expireTime).format("DD-MM-YYYY") : ''}</div>
                                  </div>
                              </div>) : (<div>Select</div>)

                          }
                          <RiArrowRightSLine className="text-2xl fill-[#CCCCCC]" />
                      </div>
                    </div>
                </>
            }

            <div className="mt-3 font-bold">
              <ListItem title={'Repayment Amount'} text={<Money money={Number(balance) - Number(coupon ? coupon.discountAmount : 0)} />} />
            </div>

            <div className={`flex flex-row my-3`}>
                <div className={`mr-1.5 w-full `}>
                    <Button onClick={() => {
                        if (isRepayTypesFetching) return;
                        navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`,{ state: { orderNo } })
                    }} text={props.t("Cancel")} className={`border border-solid border-gray-500 text-gray-500  w-full font-bold`} />
                </div>
                <div className={` ml-1.5 w-full`}>
                    <Button onClick={() => {
                        if (isRepayTypesFetching) return;
                        if(balanceValueErrorMessage === "") handleConfirm();
                    }} text={props.t("Repay")} className={`bg-primary-main w-full text-white font-bold border border-solid border-primary-main`} />
                </div>
            </div>
            <div className={`text-xs text-gray-400 text-left`}>
                <div>Attention：</div>
                <ul className="list-decimal list-outside pl-3 pt-1">
                    <li>Before repayment, please make sure that you have enough  balance on your bank account.</li>
                    <li>To protect your rights, we strongly recommend that you take a screenshot of the repayment details after completing the repayment, and upload your screenshot to the app.</li>
                </ul>
            </div>
            <div className={`my-4`}><img className={`w-full`} src={AdSVG} /></div>
        </div>

    );
};


export default withTranslation(i18nRepaymentModal.namespace)(PakistanRepaymentModal);



