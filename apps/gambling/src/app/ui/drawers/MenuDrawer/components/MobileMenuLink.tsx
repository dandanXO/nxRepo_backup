import cx from 'classnames';

interface IMobileMenuLink {
  text: string;
  className?:string;
  icon?: React.ReactElement[] | React.ReactElement;
  onClick?: () => void;
}
export const MobileMenuLink = (props: IMobileMenuLink) => {
  const { text, className = '', icon, onClick } = props;

  return (
    <button className={cx("mobile-menu-link flex mb-5 items-center text-sm",className)} onClick={onClick && onClick}>
      {icon && icon}
      <p>{text}</p>
    </button>
  )
}