import {Dispatch, ReactElement, SetStateAction} from "react";
import {environment} from "../../../../../../environments/environment";
import cx from 'classnames';
import {useSelector} from "react-redux";
import {LeftOutlined} from "@ant-design/icons";
import {useScrollToPartPageTemplate} from "../../../../pageTemplate/hooks/useScrollToPartPageTemplate";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";

export const GameTypeHeader = (props: {
  gameTypeName: string;
  onClick?: () => void;
  // showIcon?: boolean;
  containerClassName?: string;
  seeMoreText?: string | ReactElement;
  titleClassName?: string
  buttonClassName?: string;
  expandedBrand?: string;
  setExpandedBrand?: Dispatch<SetStateAction<string>>;
  isViewAll?: boolean;
  icon?: ReactElement;
  data?: any
  labelImgUrl?: string;
}) => {
  const {containerClassName = '', titleClassName = '', buttonClassName = '', icon, seeMoreText = '', data = []} = props;
  const {scrollToCarousel} = useScrollToPartPageTemplate();
  const {isMobile} = useBreakpoint();
  const {indexPagecurrentSelectLabel} = useSelector((state: any) => state.gameList);
  console.log('indexPagecurrentSelectLabel', indexPagecurrentSelectLabel)
  let gameTypeName = props.gameTypeName.split('-')[1] ? props.gameTypeName.split('-')[1] : props.gameTypeName.split('-')[0]
  if (props.isViewAll) {
    if (props?.data[0]) {
      gameTypeName = props.data[0].label
    }
    gameTypeName = gameTypeName.toLowerCase()
  } else {
    if (props?.data[0]) {
      // 防呆處理  後端結構可能會改因此預留
      gameTypeName = props.data[0]?.type.split('-')[0] as string
    }
  }
  // if(indexPagecurrentSelectLabel === 'Favoritos'){
  //   gameTypeName = 'favoritos'
  // }

  // const gameTypeIcon = `assets/${environment.uVersion}/${environment.mVersion}/icon_${gameTypeName.toLowerCase()}.png`;
  // switch (gameTypeName.toLowerCase()) {
  //   case "fishing":
  //   case "vivo":
  //   case "slots":
  //   case "viver":
  //   case "arcades":
  //   case "tables":
  //   case "favoritos":
  //     gameTypeIcon = `assets/${environment.uVersion}/${environment.mVersion}/icon_${gameTypeName.toLowerCase()}.png`;
  //     break
  //   default:
  //     gameTypeIcon = ``;
  //     break
  // }

  return (
    <header
      className={cx(`flex flex-row relative tab-item-title-box justify-between items-center`, containerClassName)}>
      <div className="flex">
        {props.expandedBrand && (
          <button
            onClick={() => {
              props?.setExpandedBrand && props?.setExpandedBrand('')
              isMobile && scrollToCarousel();
            }}
          >
            <LeftOutlined className={"text-white text-xl mr-2"}/>
          </button>
        )}
        <div className="flex items-center mr-2">
          {
            props.isViewAll ?
              (
                <img
                  className='w-6 h-6'
                  src={`assets/${environment.uVersion}/${environment.mVersion}/icon_${gameTypeName.toLowerCase()}.png`}
                  alt="recentIcon"
                  onError={(e) => {
                    console.log(`load game type index-tab-icon fail`, `item = ${gameTypeName}`, e)
                    e.currentTarget.style.visibility='hidden'
                  }}
                />
              )
              : (
                <img className='w-[64px] md:w-[88px]'
                     src={`assets/${environment.uVersion}/shared/${gameTypeName}-logo.png`} alt="recentIcon"/>
              )
          }

        </div>
        <span className={titleClassName}>{props.gameTypeName}</span>
      </div>

      {props?.onClick && !props.expandedBrand && (
        <div>
          <button
            onClick={(event) => {
              props.onClick && props.onClick();
              isMobile && scrollToCarousel();
            }}
            className={buttonClassName}
          >{seeMoreText ? seeMoreText : 'Tudo'}</button>
        </div>
      )}
    </header>

  )
}
