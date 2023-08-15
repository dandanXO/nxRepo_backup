
import { RiRadioButtonFill } from '@react-icons/all-files/ri/RiRadioButtonFill';
import { RiCheckboxBlankCircleLine } from '@react-icons/all-files/ri/RiCheckboxBlankCircleLine';
import { useState } from 'react';
interface IRadio {
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}

export const RadioOption = (props: IRadio) => {
    const { options, onChange } = props;
    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const handleClick = (value: string) => {
        setSelectedOption(value);
        onChange && onChange(value);
    };
    return (
        <div className='flex'>
            {options.map((option) => (
                <div className='flex items-center mr-2' key={option.value} onClick={() => handleClick(option.value)}>
                    {selectedOption === option.value
                        ? <RiRadioButtonFill className='fill-primary-main mr-1' />
                        : <RiCheckboxBlankCircleLine className='fill-primary-main mr-1' />}
                    {option.label}
                </div>
            ))}
        </div>
    )
}
