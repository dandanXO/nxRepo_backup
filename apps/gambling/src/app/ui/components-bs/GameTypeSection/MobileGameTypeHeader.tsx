import { environment } from "../../../../environments/environment";
import cx from 'classnames';
export const MobileGameTypeHeader = (props: {
  gameTypeName: string;
  onClick?: () => void;
  showIcon?: boolean;
  containerClassName?: string;
  seeMoreText?: string;
  titleClassName?: string
  textClassName?: string;

}) => {
  const { containerClassName = '', titleClassName = '', showIcon = true, textClassName = '', seeMoreText = '' } = props;
  console.log('mobileGameTypeHeaderProps', props)
  return (
    <header className={cx(`flex flex-row relative tab-item-title-box justify-between items-center`, containerClassName)}>
      <div className="flex">
        {showIcon && <img src={`assets/${environment.assetPrefix}/ic_game.png`} />}
        <span className={titleClassName}>{props.gameTypeName}</span>
      </div>
      {props?.onClick && (
        <div className={cx("flex justify-center items-center", textClassName)} onClick={props?.onClick}>
          <p className="z-50">{seeMoreText ? seeMoreText : 'Tudo'}</p>
        </div>
      )}
    </header>

  )
}
