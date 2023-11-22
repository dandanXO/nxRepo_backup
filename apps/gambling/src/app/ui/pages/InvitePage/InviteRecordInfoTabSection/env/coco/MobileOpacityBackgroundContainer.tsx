import { ReactElement } from "react"

export const MobileOpacityBackgroundContainer = (props: { children: ReactElement[] }) => {
  return (
    <div className="py-3 bg-[var(--white-20)] text-white text-center px-2">
      {props.children}
    </div>
  )

}