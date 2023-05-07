import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { useNavigate } from 'react-router';

interface LinkItem {
  title: string;
  to: string;
  state?: any;
}

const LinkItem = (props: LinkItem) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-row justify-between items-center py-1`}
      onClick={() => {
        navigate(props.to, {
          state: props.state,
        });
      }}
    >
      <div>{props.title}</div>
      <FiChevronRight />
    </div>
  );
};

export default LinkItem;
