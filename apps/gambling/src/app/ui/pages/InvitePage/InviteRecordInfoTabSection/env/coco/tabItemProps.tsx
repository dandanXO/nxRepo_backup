import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';

export const tabItemProps = (isActive: boolean) => {
  const isCoco777bet = environment.assetPrefix === 'coco777bet'
  if (isCoco777bet) {
    return {
      className: cx('rounded-lg mr-4 whitespace-nowrap text-sm sm:text-lg flex-1 sm:flex-0 flex justify-center', {
        'border border-solid border-[var(--primary-assistant)] text-[var(--primary-assistant)]': !isActive
      }),
      pureColor: true,
      background: "var(--primary-variant)",
      activeBackground: "linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%) "
    }
  }

}