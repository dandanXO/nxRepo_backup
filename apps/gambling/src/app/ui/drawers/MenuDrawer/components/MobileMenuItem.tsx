import cx from 'classnames';

export interface IMobileMenuItem {
  text: string;
  className?: string;
  icon?: React.ReactElement[] | React.ReactElement;
  onClick?: () => void;
  iconSuffix?: boolean
}

export const MobileMenuItem = (props: IMobileMenuItem) => {
  const { text, className = '', icon, onClick, iconSuffix = false } = props

  return (
    <button className={cx("mobile-menu-item flex w-full font-bold ", className)} onClick={onClick && onClick}>
      {!iconSuffix && <div className='z-50'>{icon}</div>}
      <p className='z-50'>{text}</p>
      {iconSuffix && <div className='z-50'>{icon}</div>}
    </button>
  )
}

