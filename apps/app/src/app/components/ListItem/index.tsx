type ListItemProps = {
    title?: string | React.ReactElement;
    text?: string | React.ReactElement | number;
    titleColor?: string;
    textColor?: string;
    fontWeight?: string;
    fontSize?: string;
};

const ListItem = (props: ListItemProps) => {
    const { title, text, titleColor = 'text-black', textColor = titleColor, fontWeight = '', fontSize = 'text-sm' } = props;
    return (
        <div className={`${fontWeight} ${fontSize} flex flex-row justify-between mb-2`}>
            <div className={`${titleColor}`}>{title}</div>
            <div className={`${textColor}`}>{text}</div>
        </div>
    );
};

export default ListItem;