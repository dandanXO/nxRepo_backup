

interface ButtonProps {
    fontSize?: string;
    buttonText?: string;
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
    buttonText = '',
    border = '',
    padding = 'p-3',
    backgroundColor = 'bg-orange-500',
    width = 'w-auto',
    height = 'h-auto',
    color = 'text-orange-100',
    style = {},
    onClick
}: ButtonProps) => {
    return <button style={style} onClick={onClick} className={`text-${fontSize} ${style} ${border} ${padding} ${width} ${height} ${backgroundColor} ${color} rounded-lg text-center leading-0`}>
        {buttonText}
    </button>
}

export default Button;