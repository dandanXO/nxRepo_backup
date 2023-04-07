import { FiChevronRight } from "react-icons/all";
import { Link } from "react-router-dom";

interface LinkItem {
    title: string;
    to: string;
    state?: object;
}

const LinkItem = (props: LinkItem) => {
    return <Link className={`flex flex-row justify-between items-center py-1`} to={props.to} state={props.state}>
        <div>{props.title}</div>
      <FiChevronRight />
    </Link>
}

export default LinkItem;