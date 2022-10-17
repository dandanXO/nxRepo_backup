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
            <Link to="/risk-setting"><a> Risk Setting </a></Link>
        </div>
        <div>
            <Link to="/risk-setting-tag"><a> Risk Setting Tag</a></Link>
        </div>
    </div>
  );
}

export default IndexPage;
