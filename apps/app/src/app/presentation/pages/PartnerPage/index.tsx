import { Navigation } from "../../components/layouts/Navigation";
import { useNavigate } from "react-router-dom";
export const PartnerPage = () => {
    const navigate = useNavigate();
    return (
        <div> <Navigation title={"Partner"} back={() => { navigate(-1) }} /></div>
    )
}
