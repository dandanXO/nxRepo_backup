import cx from "classnames";
import {IMobileMenuItem, MobileMenuItem as BaseMobileMenuItem} from "../../components/MobileMenuItem";

export const MobileMenuItem = (props: IMobileMenuItem) => {
  const {className} = props
  return (
    <BaseMobileMenuItem {...props} className={cx(`
      text-base
      py-2.5 px-4 mb-2
      text-white relative
      after:content-['']
      after:skew-x-[-13deg]
      after:h-full
      after:top-0
      after:left-0
      after:absolute
      after:w-full
      after:rounded`,
      className
    )}
    />
  )
}
