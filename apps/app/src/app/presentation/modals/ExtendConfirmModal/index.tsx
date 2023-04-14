import { useNavigate, useLocation } from "react-router";
import Button from "../../components/Button";
import {
    Overlay,
    Title,
    Divider,

    ListItem,
} from "@frontend/mobile/shared/ui";
import {PagePathEnum} from "../../pages/PagePathEnum";

const ExtendConfirmModal = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
                          navigate(`${PagePathEnum.RepaymentDetailPage}/extend-modal`, {
                            state: {
                              currentData: location.state.currentData,
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
