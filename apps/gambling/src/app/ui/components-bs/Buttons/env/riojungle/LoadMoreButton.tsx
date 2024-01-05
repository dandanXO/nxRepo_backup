import { Button } from "../../../../components-bs/Buttons/env/riojungle/Button"

export const LoadMoreButton = (props: { onClick: () => void }) => {
  return (
    <Button
      onClick={props.onClick}
      className="text-xs md:text-sm lg:text-base text-white bg-gradient-to-br from-[var(--primary-main)] to-[var(--secondary-main)] p-3 md:py-2.5 md:px-4 lg:py-2  font-medium"
      text={'Ver Mais'}
    />
  )
}