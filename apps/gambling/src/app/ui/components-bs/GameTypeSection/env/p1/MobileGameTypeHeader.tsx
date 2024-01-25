import { Dispatch, SetStateAction } from "react";
import { environment } from "../../../../../../environments/environment";
import cx from 'classnames';

export const MobileGameTypeHeader = (props: {
  gameTypeName: string;
  onClick?: () => void;
  showIcon?: boolean;
  containerClassName?: string;
  seeMoreText?: string;
  titleClassName?: string
  textClassName?: string;
  expandedBrand?: string;
  setExpandedBrand?: Dispatch<SetStateAction<string>>;
  isViewAll?: boolean;
}) => {
  const { containerClassName = '', titleClassName = '', showIcon = true, textClassName = '', seeMoreText = '' } = props;
  // console.log('mobileGameTypeHeaderProps', props)
  return (
    <header className={cx(`flex flex-row relative tab-item-title-box justify-between items-center`, containerClassName)}>
      <div className="flex">
        {props.expandedBrand && <div onClick={() => {
          props?.setExpandedBrand && props?.setExpandedBrand('')
        }}>
          <img data-v-ddc8133e="" className="backSlots w-[24px] h-[24px] mr-4"
            src={`assets/${environment.uVersion}/ic_gameHeader_back.png`}
            alt=""></img>
        </div>}
        {showIcon && <img src={`assets/${environment.uVersion}/ic_game.png`} />}
        <span className={titleClassName}>{props.gameTypeName}</span>
      </div>
      {props?.onClick && !props.expandedBrand && !props.isViewAll &&(
        <div className={cx("flex justify-center items-center", textClassName)} onClick={props?.onClick}>
          <p className="z-10">{seeMoreText ? seeMoreText : 'Tudo'}</p>
        </div>
      )}
    </header>

  )
}
