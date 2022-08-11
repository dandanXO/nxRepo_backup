import {useParams} from "react-router-dom";

export default () => {
    const params = useParams();
    console.log(params);
    return <div>ExtendDetailsPage</div>
}
