
import Divider from "../../components/Divider";
import ListItem from "../../components/ListItem";
// import Button from "../../components/Button";

import { AmountPaidIcon, } from "@frontend/mobile/shared/ui";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";
import { useLazyGetLoanDetailQuery } from "../../../api/rtk";
import { useEffect, useState } from "react";
import { getToken } from "../../../modules/location/getToken";
import { environment } from "../../../../environments/environment";
import { Navigation } from "../../components/layouts/Navigation";
import moment from "moment";
import {Button} from "../../components/layouts/Button";
import { getOrderNo } from "../../../modules/location/getOrderNo";
import { renderByCountry } from "../../../modules/i18n";
import { IndiaCountry } from "../../../../../../../libs/shared/domain/src/country/IndiaCountry";
import { PakistanCountry } from "../../../../../../../libs/shared/domain/src/country/PakistanCountry";
import { BangladeshCountry } from "../../../../../../../libs/shared/domain/src/country/BangladeshCountry";
import IndiaRepaymentDetailPage from "./i18n/IndiaRepaymentDetailPage";
import PakistanRepaymentDetailPage from "./i18n/PakistanRepaymentDetailPage";
import {isInAndroid} from "../../../../main";

const RepaymentDetailPage = (props: any) => {
    const navigate = useNavigate()
    const location = useLocation();
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetLoanDetailQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    useEffect(() => {
        triggerGetList({ orderNo: location.state?.orderNo || getOrderNo() });
    }, [])

    return (<div>
        {!isInAndroid && <Navigation title={"Repay Details"} back={() => { navigate(-1) }} />}
        <div className={`text-sm text-center text-blue-500 bg-blue-200 py-2`}>Get more amount after instant payment</div>
        {/* NOTE: 目前印度與巴基斯坦樣式相同 (先使用巴基斯坦的版本) */}
        <PakistanRepaymentDetailPage currentData={currentData}/>
        {/* {
            renderByCountry({
                [IndiaCountry.country]: (
                    <PakistanRepaymentDetailPage currentData={currentData}/>
                ),
                [PakistanCountry.country]: (
                    <IndiaRepaymentDetailPage currentData={currentData}/>

                )
            }, (<PakistanRepaymentDetailPage currentData={currentData}/>))
        } */}
        <Outlet />
    </div>
    )
}

export default RepaymentDetailPage;
