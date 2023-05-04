import React from "react";
import {useLocation, useNavigate} from "react-router";
import ListItem from "../../../../components/ListItem";
import Divider from "../../../../components/Divider";
import moment from "moment";
import {Button} from "../../../../components/layouts/Button";
import Money from "../../../../components/Money.tsx";

const IndiaExtendModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const { t } = props;
    const { repayConfirmDetail: { extendDate, extensionFee, extensionPayAmount='' }, orderNo = '', productName = '', dueDate = '', overdueDays = '', penaltyInterest = '', paidAmount, reductionAmount } = props.currentData ?? {};

    return (
        <div className={`p-2`}>
            <div className="text-xl font-bold mb-4">Extend</div>
            <ListItem
              title={"Product"}
              text={productName ?? ""}
            />
            <ListItem
              title={"No."}
              text={orderNo ?? ""}
            />
            <ListItem
              title={"Due Date"}
              text={dueDate ? moment(dueDate).format("DD-MM-YYYY") : ''}
            />
            {/*NOTE: 展期費用*/}
            <ListItem
              title={"Extension Fee"}
              text={<Money money={extensionFee}/>}
            />
            <ListItem
              title={"Overdue Days"}
              text={overdueDays ?? ""}
              textColor={overdueDays > 0 ? "text-red-500" : ""}
            />
            {/*NOTE: 展期罰金*/}
            <ListItem
              title={"Overdue Fee"}
              text={<Money money={penaltyInterest}/>}
              textColor={"text-red-500"}
            />

            {/*NOTE: 減免金額*/}
            <ListItem
              title={"Reduction Amount"}
              text={<Money money={reductionAmount}/>}
              textColor={"text-red-500"}
            />

            {/*NOTE: 已還金額*/}
            <ListItem
              title={"Amount Repaid"}
              text={<Money money={paidAmount}/>}
              textColor={"text-red-500"}
            />

            <ListItem
              title={"Extension Due Date"}
              text={moment(extendDate).format("DD-MM-YYYY") ?? ""}
              textColor={"text-primary-main"}
            />

            <Divider />

            {/*NOTE: 總金額*/}
            <ListItem
                fontWeight="font-bold"
                title={"Total Extension Fee"}
                text={<Money money={extensionPayAmount}/>}
            />
            <div className={`flex flex-row mt-6 text-white`}>
                <div className={`grow mr-1.5`}>
                    <Button type={"secondary"} onClick={() => navigate(-2)} text={'Cancel'} className={`w-full`} />
                </div>
                <div className={`grow ml-1.5`} >
                    <Button onClick={props.handleConfirm} text={'Confirm'} className={`w-full`} />
                </div>
            </div>
        </div>
    );
};

export default IndiaExtendModal;
