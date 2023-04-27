import { useNavigate, useLocation } from "react-router";

import { PagePathEnum } from "../../../../pages/PagePathEnum";
import { getOrderNo } from "../../../../../modules/location/getOrderNo";
import { getToken } from "../../../../../modules/location/getToken";
import { Button } from "../../../../components/layouts/Button";

const IndiaExtendConfirmModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("ExtendConfirmModal.location.state", location.state);

    return (
        <div className={`p-4`}> <div className="text-xl font-bold">Extend</div>
            <div className="font-bold my-6 leading-tight">Extensions are intended for situations where you are genuinely experiencing financial difficulties and are unable to fully repay the amount owed.</div>
            <div className="font-bold mb-4 leading-tight">We recommend that you prioritize full repayment when possible for a higher credit limit.</div>
            <div className={`flex flex-col`}>
                <Button onClick={() => {
                    navigate(`${PagePathEnum.RepaymentDetailPage}/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                        state: {
                            currentData: location.state,
                        }
                    })
                }
                } text={"Got it and go extension"} className={`text-white bg-primary-main w-full mb-2`} />
                <Button onClick={() => navigate(-1)} text={'Next time'} className={`text-white bg-primary-variant w-full`} />
            </div>
        </div>
    )
}

export default IndiaExtendConfirmModal;
