import { useNavigate } from "react-router";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";

import { useCallback, useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import { CustomAxiosError } from "../../api/rtk/axiosBaseQuery";
import { usePostRepayCreateMutation } from "../../api/rtk";
import {PostRepayCreateRequest} from "../../api/loanService/PostRepayCreateRequest";
import {PostRepayCreateResponse} from "../../api/loanService/PostRepayCreateResponse";
import {AppFlag} from "../../../environments/flag";


const useRepayCreate = () => {
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();

    const orderNo = pageQueryString.orderNo;
    const token = pageQueryString.token;

    // NOTE: usePostRepayCreateMutation
    const [postRepayCreate, { isLoading: isPostRepayCreateLoading }] = usePostRepayCreateMutation();

    const postRepayCreateRequest = (props: PostRepayCreateRequest) => new Promise((resolve, reject) => {
        console.log("[repay] postRepayCreateRequest.props", props);
        postRepayCreate(props)
            .unwrap()
            .then((data: PostRepayCreateResponse) => {
                console.log("data", data);
                // NOTICE: 跳轉至付款頁面
                window.location.href = data.nextUrl;
                resolve("");
            })
            .catch((err: CustomAxiosError) => {
                const error = new Error();
                error.name = "postRepayCreate"
                if (err) error.message = JSON.stringify(err)

                if(AppFlag.enableSentry) {
                  Sentry.captureException(error);
                }
                reject(err);
            })

    })
    const handlePostRepayCreate = (isForceApplyAfterRepay: boolean, orderNo: string, repayAmount: number, payType: string, couponRedeemNo: string) => {
        return postRepayCreateRequest({
            extend: false,
            forceApplyAfterRepay: isForceApplyAfterRepay,
            orderNo: orderNo,
            payType: payType,
            repayAmount: repayAmount,
            couponRedeemNo: couponRedeemNo
        });
    }

    return {
        handlePostRepayCreate,
    };
};
export default useRepayCreate;
