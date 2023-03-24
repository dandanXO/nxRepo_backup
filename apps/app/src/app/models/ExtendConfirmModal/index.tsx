import { Link ,useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import {
    Overlay,
    Title,
    Divider,

    ListItem,
} from "@frontend/mobile/shared/ui";
export const ExtendConfirmModal = () => {
    const navigate=useNavigate()
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
                        <div className="mb-2"><Button onClick={()=>navigate('/loan-record-detail/extend-modal')} buttonText={'Got it and go extension'} width={`w-full`} /></div>
                        <div><Button onClick={()=>navigate('/loan-record-detail')} buttonText={'Next time'} backgroundColor={'bg-orange-300'} width={`w-full`} /></div>
                    </div>
                </div>
            }}
        />

    )
}
