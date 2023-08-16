import cx from 'classnames';
import React from 'react';
import { TailSpin } from 'react-loading-icons';

import { TestingProps } from '../../../modules/TestingProps';

type Props = {
  text: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  type?: 'secondary' | 'ghost' | undefined | 'primary';
  primaryTypeGradient?: boolean;
  ghostTheme?: 'primary' | 'secondary' | 'tertiary' | 'none' ;
  outlineTheme?: 'round' | undefined
  disable?: boolean;
} & TestingProps;

export const Button = (props: Props) => {
  const disable = typeof props.disable === "undefined" ? false : props.disable;
  return (
    <button
      onClick={props.onClick}
      data-testing-id={props.dataTestingID}
      data-testing-disable={props.dataTestingDisable}
      data-testing-loading={props.loading}
      // shadow-md shadow-gray-400
      className={cx(
        'w-full rounded-md p-2 text-center font-bold border-solid',
        {
          'border border-primary-main bg-primary-main text-white': (props.type === undefined || props.type === "primary") && !disable,
        },
        {
          'bg-primary-gradient': props.primaryTypeGradient === true && !disable,
        },
        {
          'border border-tertiary-main bg-tertiary-main text-white': props.type === 'secondary',
        },
        {
          'border-cstate-disable-main bg-cstate-disable-main text-white': props.disable === true,
        },
        {
          'border-[1.5px] border-primary-main bg-cbg-secondary-main text-primary-main ': props.type === 'ghost' && (props.ghostTheme === undefined || props.ghostTheme === "primary"),
        },
        {
          'border-[1.5px] border-secondary-main bg-cbg-secondary-main text-secondary-main ': props.type === 'ghost' && props.ghostTheme === "secondary",
        },
        {
          'border-[1.5px] border-ctext-tertiary bg-cbg-secondary-main text-ctext-tertiary ': props.type === 'ghost' && props.ghostTheme === "tertiary",
        },
        {
          'bg-cbg-secondary-main text-ctext-tertiary ': props.type === 'ghost' && props.ghostTheme === "none",
        },
        {
          'rounded-3xl': props.outlineTheme === "round"
        },
        props.className
      )}
    >
      {props.text}
      {props.loading && <TailSpin height={25} className={'inline-block'} />}
    </button>
  );
};
