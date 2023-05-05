// import Button from "../../components/Button";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useLazyGetLoanDetailQuery } from "../../../api/rtk";
import { useEffect } from "react";
import { Navigation } from "../../components/layouts/Navigation";
import { getOrderNo } from "../../../modules/location/getOrderNo";

import { isInAndroid } from "../../../modules/window/isInAndroid";
import { OrderStatusItem } from './OrderStatusItem'
import moment from "moment";
import { ApproveRecord } from "../../../api/loanService/ApproveRecord";
import { PageContent } from "../../components/layouts/PageContent";


const OrderStatusPage = (props: any) => {
    const navigate = useNavigate()
    const location = useLocation();
    const { approveRecords } = location.state;

    return (<div>
        {!isInAndroid() && <Navigation title={"Repay Details"} back={() => { navigate(-1) }} />}
        <PageContent>
            {approveRecords?.length > 0 && approveRecords && approveRecords?.map((record: ApproveRecord, index: number) => {
                return (<OrderStatusItem
                    key={record.title}
                    title={record.title}
                    content={record.content}
                    date={moment(record.createTime).format("DD-MM-YYYY HH:mm:ss")}
                    isHightLight={index === 0}
                />)
            })}
        </PageContent>

    </div>
    )
}

export default OrderStatusPage;
