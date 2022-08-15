import {Link} from "react-router-dom";

export default () => {
    return (
        <div>
            <div>
                <Link to="/demo">demoPage</Link>
            </div>
            <div>
                <Link to="/loan-details">loanDetailsPage</Link>
            </div>
            <div>
                <Link to="/extend-details">extendDetailsPage</Link>
            </div>
        </div>
    )
}
