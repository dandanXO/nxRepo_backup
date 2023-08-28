import cx from 'classnames';
import React from 'react';

interface ILabelProps {
  title: string;
  value: string | number;
  extra?: React.ReactNode;
}

const Label = ({ title, value, extra }: ILabelProps) => {
  return (
    <div className="px border-cTextFields-outline-main flex w-full rounded-lg border py-2 px-4">
      <div
        className={`${cx('flex flex-col gap-px', {
          'w-2/3': extra,
          'w-full': !extra,
        })}`}
      >
        <div className="text-sm">{title}</div>
        <div className="text-base font-bold">{value}</div>
      </div>
      {extra && <div className="w-1/3">{extra}</div>}
    </div>
  );
};

export default Label;
