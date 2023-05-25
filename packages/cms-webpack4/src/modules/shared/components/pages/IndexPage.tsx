import { Link } from "react-router-dom";

export function IndexPage(): JSX.Element {
    return (
        <div>
            <div>
                <Link to="/product"><a> product </a></Link>
            </div>
            <div>
                <Link to="/merchant"><a> merchant </a></Link>
            </div>
            <div>
                <Link to="/user"><a> user </a></Link>
            </div>
            <div>
                <Link to="/user-info"><a> user info </a></Link>
            </div>
            <div>
                <Link to="/user-review"><a> user review </a></Link>
            </div>
            <div>
                <Link to="/user-review-info"><a> user review info</a></Link>
            </div>
            <div>
                <Link to="/user-review-record"><a> user review record</a></Link>
            </div>
            <div>
                <Link to="/risk-setting"><a> Risk Setting </a></Link>
            </div>
            <div>
                <Link to="/channel"><a> Channel</a></Link>
            </div>
            <div>
                <Link to="/whitelist"><a> WhiteList</a></Link>
            </div>
            <div>
                <Link to="/blacklist"><a> BlackList</a></Link>
            </div>
            <div>
                <Link to="/app-manage"><a> App Manage</a></Link>
            </div>
            <div>
                <Link to="/config-manage"><a> Config Manage</a></Link>
            </div>
            <div>
                <Link to="/order"><a> Order</a></Link>
            </div>
            <div>
                <Link to="/order-detail"><a>Order Detail</a></Link>
            </div>
            <div>
                <Link to="/order-review"><a> Order Review</a></Link>
            </div>
            <div>
                <Link to="/order-review-detail"><a>Order Review Detail</a></Link>
            </div>
            <div>
                <Link to="/order-final-review"><a> Order Final Review</a></Link>
            </div>
            <div>
                <Link to="/order-final-review-detail"><a>Order Final Review Detail</a></Link>
            </div>
            <div>
                <Link to="/order-review-record"><a> Order Review Record</a></Link>
            </div>
            <div>
                <Link to="/activity-ads"><a>activity-ads</a></Link>
            </div>
            <div>
                <Link to="/sms-config"><a>SMS Config</a></Link>
            </div>
            <div>
                <Link to="/pay-receipt"><a>pay receipt</a></Link>
            </div>
            <div>
                <Link to="/riskControlStatistic"><a>Daily Risk Control Level Stats</a></Link>
            </div>
            <div>
                <Link to="/new-customer-repayment-rate"><a>NewCustomerRiskControlRepaymentRatePage</a></Link>
            </div>
            <div>
                <Link to="/loginAccountMange"><a>Login Account Manage</a></Link>
            </div>
            <div>
                <Link to="/Registrations"><a>NewCustomersDailyConversionRatesPage</a></Link>
            </div>
            <div>
                <Link to="/reloanStatistics"><a>Reloan Statistics</a></Link>
            </div>

            {/*<button onClick={() => methodDoesNotExist()}>Test Sentry - Break the world</button>;*/}

        </div>
    );
}

export default IndexPage;
