import cx from 'classnames';
import { TestingProps } from '../../../modules/TestingProps';
import { TailSpin } from 'react-loading-icons';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { getToken } from '../../../modules/location/getToken';
import React from 'react';

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
      // shadow-md shadow-gray-400
      className={cx(
        'rounded-md p-2 text-center font-bold w-full',
        {
          'border border-solid border-primary-main bg-primary-main text-white':
            props.type === undefined,
        },
        {
          'border border-solid border-cbg-tertiary-primary bg-primary-variant text-ctext-tertiary':
            props.type === 'secondary',
        },
        {
          'border-[1.5px] border-solid border-primary-main bg-none text-primary-main':
            props.type === 'ghost',
        },
        props.className
      )}
    >
      {props.text}
      {props.loading && <TailSpin height={25} className={'inline-block'} />}
    </button>
  );
};
