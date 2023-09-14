import cx from 'classnames';
import React from 'react';

interface ICopyButtonProps {
  value: string;
  text?: string;
  className?: string;
}

const CopyButton = ({ value, className, text = 'Copy' }: ICopyButtonProps) => {
  return (
    <button
      className={`${cx(
        'h-full w-full text-center text-base font-bold text-white',
        className
      )}`}
      onClick={(e) => {
        navigator.clipboard.writeText(value);
      }}
    >
      {text}
    </button>
  );
};

export default CopyButton;
