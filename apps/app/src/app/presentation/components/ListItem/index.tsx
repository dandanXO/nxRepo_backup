import cx from 'classnames';
type ListItemProps = {
  title?: string | React.ReactElement;
  text?: string | React.ReactElement | number;
  titleColor?: string;
  textColor?: string;
  className?: string;
};

const ListItem = (props: ListItemProps) => {
  const { title, text, titleColor = 'text-black', textColor = '', className = '' } = props;
  return (
    <div className={cx(`mb-2 flex flex-row justify-between text-sm leading-none `, className)}>
      <div className={`${titleColor}`}>{title}</div>
      <div className={`${textColor === '' ? titleColor : textColor}`}>{text}</div>
    </div>
  );
};

export default ListItem;
