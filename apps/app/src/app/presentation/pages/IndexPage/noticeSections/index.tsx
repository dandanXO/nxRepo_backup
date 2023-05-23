import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}
export const NoticeSectionContainer = (props: Props) => {
  return <div className={'mt-3 flex flex-col justify-center px-3 text-center align-middle'}>{props.children}</div>;
};
