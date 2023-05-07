type ListItemProps = {
  title?: string | React.ReactElement;
  text?: string | React.ReactElement | number;
  titleColor?: string;
  textColor?: string;
  fontWeight?: string;
  fontSize?: string;
};

const ListItem = (props: ListItemProps) => {
  const {
    title,
    text,
    titleColor = 'text-black',
    textColor = '',
    fontWeight = '',
    fontSize = 'text-sm',
  } = props;
  return (
    <div
      className={`${fontWeight} ${fontSize} flex flex-row justify-between mb-2 leading-none`}
    >
      <div className={`${titleColor}`}>{title}</div>
      <div className={`${textColor === '' ? titleColor : textColor}`}>
        {text}
      </div>
    </div>
  );
};

export default ListItem;
