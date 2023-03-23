

interface ButtonProps {
    fontSize?: string;
    buttonText?: string;
    borderColor?: string;
    backgroundColor?: string;
    borderSolid?: string;
    padding?: string;
    border?: string
    width?: string;
}


const Button = ({ fontSize = 'sm', buttonText = '', border = '', padding = 'py-3 px-3', backgroundColor = 'bg-orange-500', width = 'w-auto' }: ButtonProps) => {
    return <button className={`text-${fontSize} ${border}  ${padding} ${width} ${backgroundColor} rounded-lg text-center`}>
        {buttonText}
    </button>
}

export default Button;