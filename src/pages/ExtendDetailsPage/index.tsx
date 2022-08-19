import {useParams} from "react-router-dom";
import Page from "../components/Page";

export default () => {
    const params = useParams();
    console.log(params);
    return <Page>ExtendDetailsPage</Page>
}
