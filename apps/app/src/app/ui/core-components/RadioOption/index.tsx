import {RiCheckboxBlankCircleLine} from '@react-icons/all-files/ri/RiCheckboxBlankCircleLine';
import {RiRadioButtonFill} from '@react-icons/all-files/ri/RiRadioButtonFill';
import React, {useState} from 'react';
import {tcx} from "../../../modules/ui/tailwindcss";

interface IRadio {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  radioOnTheme?: string;
  radioOffTheme?: string;
  onRadio?: React.ReactElement;
}

export const RadioOption = (props: IRadio) => {
  const { onRadio, options, onChange } = props;
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleClick = (value: string) => {
    setSelectedOption(value);
    onChange && onChange(value);
  };

  const radioOnClassName = tcx(
    'fill-primary-main mr-1 text-lg',
    props.radioOnTheme
  );

  return (
    <div className="flex">
      {options.map((option) => (
        <div
          className="mr-2 flex items-center leading-none"
          key={option.value}
          onClick={() => handleClick(option.value)}
        >
          {selectedOption === option.value ? (
            (onRadio &&
              React.cloneElement(onRadio, { className: radioOnClassName })) ?? (
              <RiRadioButtonFill className={radioOnClassName} />
            )
          ) : (
            <RiCheckboxBlankCircleLine
              className={tcx(
                'fill-primary-main mr-1 text-lg',
                props.radioOffTheme
              )}
            />
          )}
          {option.label}
        </div>
      ))}
    </div>
  );
};
