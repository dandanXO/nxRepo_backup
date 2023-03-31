

interface ButtonProps {
    fontSize?: string;
    buttonText?: JSX.Element | string;
    backgroundColor?: string;
    padding?: string;
    border?: string
    width?: string;
    height?: string;
    color?: string;
    style?: object;
    onClick?: () => void
}


const Button = ({ fontSize = 'sm',
    buttonText ,
    border = '',
    padding = 'py-2',
    backgroundColor = 'bg-orange-500',
    width = 'w-auto',
    color = 'text-orange-100',
    style = {},
    onClick
}: ButtonProps) => {
    return <button style={style} onClick={onClick} className={`text-${fontSize}  ${border} ${padding} ${width} ${backgroundColor} ${color} rounded-lg text-center `}>
        {buttonText}
    </button>
}

export default Button;