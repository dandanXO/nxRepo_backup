import { useNavigate, useLocation } from "react-router";
import Button from "../../components/Button";
import {
    Overlay,
} from "@frontend/mobile/shared/ui";
import {PagePathEnum} from "../../pages/PagePathEnum";
import {getOrderNo} from "../../../modules/location/getOrderNo";
import {getToken} from "../../../modules/location/getToken";

const ExtendConfirmModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("ExtendConfirmModal.location.state", location.state)
    return (
        <Overlay
            show={true}
            enableClose={true}
            onCancel={()=>navigate(-1)}
            content={(hide: () => void) => {
                return <div className={`p-4`}> <div className="text-xl font-bold">Extend</div>
                    <div className="font-bold my-6 leading-tight">Extensions are intended for situations where you are genuinely experiencing financial difficulties and are unable to fully repay the amount owed.</div>
                    <div className="font-bold mb-4 leading-tight">We recommend that you prioritize full repayment when possible for a higher credit limit.</div>
                    <div className={`flex flex-col`}>
                        <div className="mb-2" onClick={() => {
                          navigate(`${PagePathEnum.RepaymentDetailPage}/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                            state: {
                              currentData: location.state,
                            }
                          })}
                        }><Button buttonText={'Got it and go extension'} width={`w-full`} /></div>
                        <div><Button onClick={()=>navigate(-1)} buttonText={'Next time'} backgroundColor={'bg-orange-300'} width={`w-full`} /></div>
                    </div>
                </div>
            }}
        />

    )
}

export default ExtendConfirmModal;
