import { Navigation } from "../../components/layouts/Navigation";
import { useNavigate } from "react-router";
import MailIcon from '../../components/images/MailIcon.svg';
import Button from "../../components/Button";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import {RootState} from "../../../usecaseFlow/reduxStore";

export const CustomerServicePage = () => {
    const navigate = useNavigate();
    const { app } = useSelector((state: RootState) => state);
    return (
        <div>
            <Navigation title={"Customer Service"} back={() => { navigate(-1) }} />
            <div className="flex flex-col justify-center items-center">
                <div className="my-16"><img  src={MailIcon} alt=""/></div>
                <div>Service Time</div>
                <div className="mb-16">10:00 a.m. - 6:00 p.m.</div>
                <div className="mb-4"><a href={`mailto:${app?.init?.csEmail}`}><Button buttonText={'Contact By Mail'} padding="py-2 px-6" /></a></div>
                <div className="text-sm underline decoration-blue-500 text-blue-500"
                     onClick={() => {
                       navigate('customer-service-modal');
                     }}>Online Customer Service</div>
               <Outlet/>
            </div>
        </div>
    )
}
