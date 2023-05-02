// import Button from "../../components/Button";
import {Outlet, useLocation, useNavigate} from "react-router";
import {useLazyGetLoanDetailQuery} from "../../../api/rtk";
import {useEffect} from "react";
import {Navigation} from "../../components/layouts/Navigation";
import {getOrderNo} from "../../../modules/location/getOrderNo";
import PakistanRepaymentDetailPage from "./i18n/PakistanRepaymentDetailPage";
import {renderByCountry} from "../../../modules/i18n";
import {IndiaCountry} from "../../../../../../../libs/shared/domain/src/country/IndiaCountry";
import {PakistanCountry} from "../../../../../../../libs/shared/domain/src/country/PakistanCountry";
import IndiaRepaymentDetailPage from "./i18n/IndiaRepaymentDetailPage";
import {isInAndroid} from "../../../modules/window/isInAndroid";

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
        {
            renderByCountry({
                [IndiaCountry.country]: (
                  <IndiaRepaymentDetailPage currentData={currentData}/>
                ),
                [PakistanCountry.country]: (
                  <PakistanRepaymentDetailPage currentData={currentData}/>
                )
            }, (
              <IndiaRepaymentDetailPage currentData={currentData}/>
              )
            )
        }
        <Outlet />
    </div>
    )
}

export default RepaymentDetailPage;
