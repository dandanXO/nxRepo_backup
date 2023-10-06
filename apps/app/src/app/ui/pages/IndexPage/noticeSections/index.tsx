import { ReactNode } from 'react';

import { TestingProps } from '../../../../modules/cypress/TestingProps';

type Props = {
  children?: ReactNode;
} & TestingProps;

export const NoticeSectionContainer = (props: Props) => {
  return (
    <div
      data-testing-id={props.dataTestingID}
      className={
        'mt-8 flex flex-col justify-center px-3 text-center align-middle'
      }
    >
      {props.children}
    </div>
  );
};
