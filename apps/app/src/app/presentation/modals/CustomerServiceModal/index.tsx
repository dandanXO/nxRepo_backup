import { useNavigate, useLocation } from "react-router";

import { Overlay } from "@frontend/mobile/shared/ui";
import { Navigation } from "../../components/layouts/Navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../usecaseFlow/reduxStore";


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
