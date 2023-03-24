

interface ButtonProps {
    fontSize?: string;
    buttonText?: string;
    backgroundColor?: string;
    padding?: string;
    border?: string
    width?: string;
    color?:string;
    onClick?:()=>void
}


const Button = ({ fontSize = 'sm',
 buttonText = '', 
 border = '',
  padding = 'p-3', 
  backgroundColor = 'bg-orange-500', 
  width = 'w-auto' ,
  color='text-orange-100',
  onClick
}: ButtonProps) => {
    return <button onClick={onClick} className={`text-${fontSize} ${border} ${padding} ${width} ${backgroundColor} ${color} rounded-lg text-center leading-none`}>
        {buttonText}
    </button>
}

export default Button;