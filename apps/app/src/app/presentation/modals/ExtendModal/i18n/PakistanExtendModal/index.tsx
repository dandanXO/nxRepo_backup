import React from "react";
import {useNavigate} from "react-router";
import ListItem from "../../../../components/ListItem";
import Divider from "../../../../components/Divider";
import moment from "moment";
import {Button} from "../../../../components/layouts/Button";
import CustomSelect from "../../../../components/Select";
import Money from "../../../../components/Money.tsx";

type paymentMethodValueType = {
    value: string;
    label: string;
};
const PakistanExtendModal = (props: any) => {
    const navigate = useNavigate();
    const { repayConfirmDetail: { extendDate, extensionFee, extensionPayAmount='' }, orderNo = '', productName = '', dueDate = '', overdueDays = '', penaltyInterest = '', reductionAmount, paidAmount } = props.currentData ?? {};

    return (

        <div className={`p-2`}>
            <div className="text-xl font-bold mb-4">Extend</div>
            <ListItem
              title={"Product"}
              text={productName ?? ""}
            />
            <ListItem title={"No."}
              text={orderNo ?? ""}
            />
            <ListItem
              title={"Due Date"}
              text={dueDate ? moment(dueDate).format("DD-MM-YYYY") : ''}
            />
            <ListItem
              title={"Overdue Days"}
              text={overdueDays ?? ""}
            />
            {/*NOTE: 展期費用*/}
            <ListItem
              title={"Extension Fee"}
              text={<Money money={extensionFee}/>}
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
              textColor={overdueDays > 0 ? "text-red-500" : ""}
            />

            <Divider />

            {/*NOTE: 總金額*/}
            <ListItem
              fontWeight="font-bold"
              title={"Total Extension Fee" as string}
              text={<Money money={extensionPayAmount}/>}
            />

            <div className="mt-6  mb-5 bg-gray-200 h-2 mx-[-20px]"></div>
            <div className="text-black text-xs font-bold text-left">{'Payment Method'}</div>
            <CustomSelect
                type={'standard'}
                options={props.repayTypesList || []}
                value={props?.repayType}
                onChange={(item: any) => {
                    props.setRepayType(item as paymentMethodValueType);
                }}
                isSearchable={false}
            />

            <div className={`flex flex-row mt-6 text-white`}>
                <div className={`grow mr-1.5`}>
                    <Button type={"secondary"} onClick={() => navigate(-2)} text={'Cancel'} className={`w-full`}/>
                </div>
                <div className={`grow ml-1.5`} >
                    <Button onClick={props.handleConfirm} text={'Confirm'} className={`w-full`}/>
                </div>
            </div>
        </div>
    );
};

export default PakistanExtendModal;
