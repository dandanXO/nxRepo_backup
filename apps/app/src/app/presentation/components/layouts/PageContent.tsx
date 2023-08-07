import { ReactNode } from 'react';
import { isShowNavigation } from '../../../modules/window/isShowNavigation';
import cx from 'classnames'
interface Props {
    children?: ReactNode;
    className?: string;
}

export const PageContent = (props: Props) => {
    return <div className={cx(`overflow-auto flex flex-col p-4`,
        {
            'h-[calc(100vh-56px)] pt-0': isShowNavigation(),
            'h-[100vh]': !isShowNavigation()
        }, props.className
    )}>
        {props.children}
    </div>
}