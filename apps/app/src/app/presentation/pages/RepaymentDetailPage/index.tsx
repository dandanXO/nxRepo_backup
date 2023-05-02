// import Button from "../../components/Button";
import {Outlet, useLocation, useNavigate} from "react-router";
import {useLazyGetLoanDetailQuery} from "../../../api/rtk";
import {useEffect} from "react";
import {Navigation} from "../../components/layouts/Navigation";
import {getOrderNo} from "../../../modules/location/getOrderNo";
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
        <div className={`text-sm text-center bg-[#EDF4FF] text-[#3C64B1] py-2`}>Get more amount after instant payment</div>
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
