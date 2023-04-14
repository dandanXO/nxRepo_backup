import { Navigation } from "../../components/layouts/Navigation";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {RootState} from "../../../usecaseFlow/reduxStore";

const PartnerPage = () => {
    const navigate = useNavigate();
    const { init } = useSelector((state: RootState) => state.app)
    return (
        <div> <Navigation title={"Partner"} back={() => { navigate(-1) }} />
            <iframe className={`grow`} src={init?.partnershipUrl || ""} title="" />
        </div>
    )
}

export default PartnerPage;
