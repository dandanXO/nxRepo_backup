import { ReactNode } from 'react';
import { TestingProps } from '../../../../modules/TestingProps';
type Props = {
    children?: ReactNode;
} & TestingProps;

export const NoticeSectionContainer = (props: Props) => {
    return <div data-testing-id={props.dataTestingID} className={'mt-3 flex flex-col justify-center px-3 text-center align-middle'}>
        {props.children}
    </div>;
};
