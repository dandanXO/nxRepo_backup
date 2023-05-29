import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}
export const PageContent = (props: Props) => {
  return <div className={'overflow-auto px-5'}>{props.children}</div>;
};
