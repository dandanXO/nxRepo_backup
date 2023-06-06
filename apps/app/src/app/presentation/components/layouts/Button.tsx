import cx from 'classnames';
import React from 'react';
import { TailSpin } from 'react-loading-icons';

import { TestingProps } from '../../../modules/TestingProps';

type Props = {
  text: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  type?: 'secondary' | 'ghost' | undefined;
} & TestingProps;

export const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      data-testing-id={props.dataTestingID}
      data-testing-disable={props.dataTestingDisable}
      // shadow-md shadow-gray-400
      className={cx(
        'w-full rounded-md p-2 text-center font-bold border-solid',
        {
          'border-primary-main bg-primary-main border text-white': props.type === undefined,
        },
        {
          'border-tertiary-main bg-tertiary-main border text-white': props.type === 'secondary',
        },
        {
          'border-primary-main text-primary-main border-[1.5px] bg-none': props.type === 'ghost',
        },
        props.className
      )}
    >
      {props.text}
      {props.loading && <TailSpin height={25} className={'inline-block'} />}
    </button>
  );
};
