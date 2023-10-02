import cx from 'classnames';
import React from 'react';
import {alertModal} from "../../../../api/base/alertModal";
import copy from 'copy-to-clipboard';

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
        navigator.clipboard.writeText(value);
        copy(value);
      }}
    >
      {text}
    </button>
  );
};

export default CopyButton;
