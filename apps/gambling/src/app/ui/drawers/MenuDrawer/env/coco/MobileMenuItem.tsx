import cx from "classnames";
import {IMobileMenuItem, MobileMenuItem as BaseMobileMenuItem} from "../../components/MobileMenuItem";

export const MobileMenuItem = (props: IMobileMenuItem) => {
  const {className} = props
  return (
    <BaseMobileMenuItem {...props} className={cx(`
      text-white relative
      after:content-['']
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
