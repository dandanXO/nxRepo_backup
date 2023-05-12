import { themes } from 'apps/app/src/environments/theme/customTailwindTheme';
import React from 'react';
import { StylesConfig } from 'react-select';
import { environment } from 'apps/app/src/environments/environment';

export const selectStyles: StylesConfig = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'white',
        padding: '0px 10px',
        border: 0,
        borderRadius: 0,
        borderBottom: '1px solid #aaaaaa',
        span: {
            width: 0,
        },
    }),
    //@ts-ignore
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            border: 0,
            color: isSelected ? '#fff' : '#000',
            backgroundColor: isSelected ? styles.backgroundColor : null,
        };
    },
    dropdownIndicator: styles => ({
        ...styles,
        width: '60px',
        justifyContent: 'end'
    })
};
