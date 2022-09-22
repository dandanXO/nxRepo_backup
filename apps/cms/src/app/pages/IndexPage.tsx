import {Link} from "react-router-dom";

export function Index() {
  return (
    <div>
      <div>
        <Link to="/product"><a> product </a></Link>
      </div>
      <div>
        <Link to="/merchant-manage"><a> merchantManage </a></Link>
      </div>
    </div>
  );
}

export default Index;
