import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import { Overlay } from "@frontend/mobile/shared/ui";
import { Navigation } from "../../components/layouts/Navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../usecaseFlow/store";


export const CustomerServiceModal = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { indexAPI } = useSelector((state: RootState) => state.indexPage)

    return (

        <Overlay
            show={true}
            enableClose={false}
            onCancel={() => navigate(-1)}
            content={(hide: () => void) => {
                return <div className={`h-screen flex flex-col`}>
                    <Navigation title={"Customer Service"} back={() => { navigate(-1) }} />
                    <iframe className={`grow`} src={indexAPI?.customerServiceUrl} title="" />
                </div>
            }}
        />

    )
}
