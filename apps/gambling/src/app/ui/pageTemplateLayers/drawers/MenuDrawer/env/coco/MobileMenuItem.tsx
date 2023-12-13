import cx from "classnames";
import { IMobileMenuItem, MobileMenuItem as BaseMobileMenuItem } from "../../components/MobileMenuItem";

export const MobileMenuItem = (props: IMobileMenuItem) => {
  const { className } = props
  return (
    <BaseMobileMenuItem {...props} className={cx(`
      items-center
      text-sm
      py-1.5 px-3 mb-3
      font-normal
      text-white relative
      after:content-['']
      after:h-full
      after:top-0
      after:left-0
      after:absolute
      after:w-full
      after:rounded
      after:shadow-[0px_-6px_4px_0px_rgba(0,0,0,0.25)_inset]`,
      className
    )}
    />
  )
}
