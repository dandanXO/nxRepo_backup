import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}
export const PageContent = (props: Props) => {
  return <div className={'px-5 overflow-auto'}>{props.children}</div>;
};
