
import cx from 'classnames';

interface IMobileMenuItem {
  text: string;
  className?: string;
  icon?: React.ReactElement[] | React.ReactElement;
  onClick?: () => void;
  iconSuffix?: boolean
}

export const MobileMenuItem = (props: IMobileMenuItem) => {
  const { text, className = '', icon, onClick, iconSuffix = false } = props

  return (
    <div className={cx("mobile-menu-item flex w-full py-2.5 px-4 mb-2 text-base font-bold ", className)} onClick={onClick && onClick}>
      {!iconSuffix && <div className='z-50'>{icon}</div>}
      <p className='z-50'>{text}</p>
      {iconSuffix && <div className='z-50'>{icon}</div>}
    </div>
  )
}

export const CocoMobileMenuItem = (props: IMobileMenuItem) => {
  const { className } = props
  return (
    <MobileMenuItem {...props} className={cx(`
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