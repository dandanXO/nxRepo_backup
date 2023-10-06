import { AiFillCheckSquare } from '@react-icons/all-files/ai/AiFillCheckSquare';
import { AiOutlineBorder } from '@react-icons/all-files/ai/AiOutlineBorder';
import cx from 'classnames';
import { useState } from 'react';

export interface ICheckboxProps {
  onClick?: (isChecked: boolean) => void;
  checked?: boolean;
  disable?: boolean;
}

export const Checkbox = (props: ICheckboxProps) => {
  const { disable = false, checked: initialChecked = false, onClick } = props;

  const [checked, setChecked] = useState(disable ? disable : initialChecked);

  const toggleChecked = () => {
    if (disable) return;
    setChecked(!checked);
    onClick && onClick(!checked);
  };

  return (
    <div onClick={toggleChecked} className="">
      {checked ? (
        <AiFillCheckSquare
          className={cx('h-6 w-6 rounded-2xl', {
            'fill-cstate-info-main': !props.disable,
            'fill-cstate-disable-main': props.disable,
          })}
        />
      ) : (
        <AiOutlineBorder className="fill-cstate-disable-main h-6 w-6 rounded-2xl" />
      )}
    </div>
  );
};
