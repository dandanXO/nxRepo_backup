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
  disable?: boolean;
} & TestingProps;

export const Button = (props: Props) => {
  const disable = typeof props.disable === "undefined" ? false : props.disable;
  return (
    <button
      onClick={props.onClick}
      data-testing-id={props.dataTestingID}
      data-testing-disable={props.dataTestingDisable}
      // shadow-md shadow-gray-400
      className={cx(
        'w-full rounded-md p-2 text-center font-bold border-solid',
        {
          'border-primary-main bg-primary-main border text-white': props.type === undefined && !disable,
        },
        {
          'border-tertiary-main bg-tertiary-main border text-white': props.type === 'secondary',
        },
        {
          'border-primary-main text-primary-main border-[1.5px] bg-none': props.type === 'ghost',
        },
        {
          'bg-cstate-disable-main border-cstate-disable-main text-white': props.disable === true,
        },
        props.className
      )}
    >
      {props.text}
      {props.loading && <TailSpin height={25} className={'inline-block'} />}
    </button>
  );
};
