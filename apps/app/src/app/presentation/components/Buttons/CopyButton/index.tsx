import cx from 'classnames';
import React from 'react';
import {alertModal} from "../../../../api/base/alertModal";

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
        try {
          navigator.clipboard.writeText(value);
        } catch (error) {
          alertModal(JSON.stringify(error));
        }
      }}
    >
      {text}
    </button>
  );
};

export default CopyButton;
