import cx from 'classnames';
// NOTE: https://chupai.github.io/posts/2101/clipboard/
import copy from 'copy-to-clipboard';
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
      onClick={() => {
        copy(value);
      }}
    >
      {text}
    </button>
  );
};

export default CopyButton;
