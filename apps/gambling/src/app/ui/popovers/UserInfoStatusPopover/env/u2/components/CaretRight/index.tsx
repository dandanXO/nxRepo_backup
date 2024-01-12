
interface ICaretRightProps {
  width?: number
  height?: number
  color?: string
}

export const CaretRight = ({
  color,
  width,
  height
}: ICaretRightProps) => {
  return (
    <svg width={width || "20"} height={height || "20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke={color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
