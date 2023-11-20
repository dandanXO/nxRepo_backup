import { Dispatch, SetStateAction } from "react";
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
  isViewAll?: boolean;
  setViewType?: Dispatch<SetStateAction<string>>;

}) => {
  const { containerClassName = '', titleClassName = '', showIcon = true, textClassName = '', seeMoreText = '' } = props;
  // console.log('mobileGameTypeHeaderProps', props)
  return (
    <header className={cx(`flex flex-row relative tab-item-title-box justify-between items-center`, containerClassName)}>
      <div className="flex">
        {props.isViewAll && <div onClick={() => {
          props?.setViewType && props?.setViewType('')
        }}>
          <img data-v-ddc8133e="" className="backSlots w-[24px] h-[24px] mr-4"
            src={`assets/${environment.assetPrefix}/ic_gameHeader_back.png`}
            alt=""></img>
        </div>}
        {showIcon && <img src={`assets/${environment.assetPrefix}/ic_game.png`} />}
        <span className={titleClassName}>{props.gameTypeName}</span>
      </div>
      {props?.onClick && !props.isViewAll &&(
        <div className={cx("flex justify-center items-center", textClassName)} onClick={props?.onClick}>
          <p className="z-10">{seeMoreText ? seeMoreText : 'Tudo'}</p>
        </div>
      )}
    </header>

  )
}
