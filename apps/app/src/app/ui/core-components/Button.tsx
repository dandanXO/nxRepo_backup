import React from 'react';
import { TailSpin } from 'react-loading-icons';

import { TestingProps } from '../../modules/cypress/TestingProps';
import { tcx } from '../../modules/ui/tailwindcss';

type Props = {
  text: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  type?: 'secondary' | 'ghost' | undefined | 'primary';
  primaryTypeGradient?: boolean;
  ghostTheme?: 'primary' | 'secondary' | 'tertiary' | 'disable' | 'none';
  outlineTheme?: 'round' | undefined;
  disable?: boolean;
} & TestingProps;

export const Button = (props: Props) => {
  const disable = typeof props.disable === 'undefined' ? false : props.disable;

  return (
    <button
      onClick={props.onClick}
      data-testing-id={props.dataTestingID}
      data-testing-disable={props.dataTestingDisable}
      data-testing-loading={props.loading}
      disabled={props.disable}
      // shadow-md shadow-gray-400
      className={tcx(
        'w-full rounded-md border-solid p-2 text-center font-bold',
        [
          'border-primary-main bg-primary-main b border text-white',
          (props.type === undefined || props.type === 'primary') && !disable,
        ],
        ['bg-primary-gradient', props.primaryTypeGradient === true && !disable],
        [
          'border-tertiary-main bg-tertiary-main border text-white',
          props.type === 'secondary',
        ],
        [
          'border-cstate-disable-main bg-cstate-disable-main text-white',
          props.disable === true,
        ],
        [
          'border-primary-main bg-cbg-secondary-main text-primary-main border-[1.5px]',
          props.type === 'ghost' &&
            (props.ghostTheme === undefined || props.ghostTheme === 'primary'),
        ],
        [
          'border-secondary-main bg-cbg-secondary-main text-secondary-main border-[1.5px]',
          props.type === 'ghost' && props.ghostTheme === 'secondary',
        ],
        [
          'border-ctext-tertiary bg-cbg-secondary-main text-ctext-tertiary border-[1.5px]',
          props.type === 'ghost' && props.ghostTheme === 'tertiary',
        ],
        [
          'border-cstate-disable-main bg-cbg-secondary-main text-cstate-disable-main border-[1.5px]',
          props.type === 'ghost' && props.ghostTheme === 'disable',
        ],
        [
          'bg-cbg-secondary-main text-ctext-tertiary',
          props.type === 'ghost' && props.ghostTheme === 'none',
        ],
        ['rounded-3xl', props.outlineTheme === 'round'],
        props.className
      )}
    >
      {props.text}
      {props.loading && <TailSpin height={25} className={'inline-block'} />}
    </button>
  );
};
