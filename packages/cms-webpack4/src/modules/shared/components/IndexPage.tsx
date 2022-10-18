import {Link} from "react-router-dom";


export function IndexPage() {
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
            <Link to="/risk-setting"><a> Risk Setting </a></Link>
        </div>
        <div>
            <Link to="/channel"><a> Channel</a></Link>
        </div>
    </div>
  );
}

export default IndexPage;
