import { Navigation } from "../../components/layouts/Navigation";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {RootState} from "../../../usecaseFlow/reduxStore";
import { Page } from "../../components/layouts/Page";

const OnlineCustomerServicePage = () => {
    const navigate = useNavigate();
    const { indexPage } = useSelector((state: RootState) => state);

    return (
        <Page className={`flex flex-col`}>
            <Navigation title={"Customer Service"} back={() => { navigate(-1) }} />
            <iframe className={`w-full grow`} src={indexPage?.indexAPI?.customerServiceUrl} title="" />
        </Page>
    )
}
export default OnlineCustomerServicePage;
