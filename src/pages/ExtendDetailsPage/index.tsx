import {useParams} from "react-router-dom";
import Index from "../../core/components/Page";

export default () => {
    const params = useParams();
    console.log(params);
    return <Index>ExtendDetailsPage</Index>
}
