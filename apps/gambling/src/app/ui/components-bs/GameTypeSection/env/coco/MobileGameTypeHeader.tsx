import { Dispatch, SetStateAction } from "react";
import { environment } from "../../../../../../environments/environment";
import cx from 'classnames';
import {LeftOutlined} from "@ant-design/icons";

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
        {props.expandedBrand && (
          <button
            onClick={() => {
              props?.setExpandedBrand && props?.setExpandedBrand('')
            }}
          >
            {/*<img data-v-ddc8133e="" className="backSlots w-[24px] h-[24px] mr-4"*/}
            {/*  src={`assets/${environment.assetPrefix}/ic_gameHeader_back.png`}*/}
            {/*  alt=""></img>*/}
            <LeftOutlined className={"text-white text-xl mr-2"}/>
          </button>
        )}
        {showIcon && <img src={`assets/${environment.assetPrefix}/ic_game.png`} />}
        <span className={titleClassName}>{props.gameTypeName}</span>
      </div>


      {props?.onClick && !props.expandedBrand && !props.isViewAll &&(
        <div>
          <button
            onClick={props.onClick}
            className={
              cx("rounded-lg border-[1px] px-4 pt-[5px] pb-[2px] text-sm !font-bold",
                "text-[var(--primary-assistant)] border-[var(--primary-assistant)]")
            }
          >{seeMoreText ? seeMoreText : 'Tudo'}</button>
        </div>
      )}
    </header>

  )
}
