import {Link} from "react-router-dom";
import Page from "../components/Page";

export default () => {
    return (
        <Page>
            <div>
                <Link to="/demo">demoPage</Link>
            </div>
            <div>
                <Link to="/loan-details?token=b5f2db2c45e24edcbc49540bae862fbd">loanDetailsPage</Link>
            </div>
            <div>
                <Link to="/extend-details">extendDetailsPage</Link>
            </div>
        </Page>
    )
}
