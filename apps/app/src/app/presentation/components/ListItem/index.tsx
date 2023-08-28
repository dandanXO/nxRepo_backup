import cx from 'classnames';
import { ReactNode } from 'react';

type ListItemProps = {
    title?: string | React.ReactElement | ReactNode ;
    text?: string | React.ReactElement | number ;
    titleColor?: string;
    textColor?: string;
    className?: string;
    isFetching?: boolean;
};

const ListItem = (props: ListItemProps) => {
    const { title, text, titleColor = 'text-black', textColor = '', className = '' } = props;
    return (
        <div className={cx(`mb-2 flex flex-row justify-between text-sm leading-none items-center`, className)}>
            <div className={cx(`${titleColor}`)}>{title}</div>
            <div className={cx(`${textColor === '' ? titleColor : textColor} `, {
                'skeleton': props.isFetching,
            })}>{text}</div>
        </div>
    );
};

export default ListItem;
