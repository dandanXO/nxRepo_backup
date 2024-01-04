import { Dispatch, ReactElement, SetStateAction } from "react";
import { environment } from "../../../../../../environments/environment";
import cx from 'classnames';
import { LeftOutlined } from "@ant-design/icons";
import { useScrollToPartPageTemplate } from "../../../../pageTemplate/hooks/useScrollToPartPageTemplate";
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

}) => {
  const { containerClassName = '', titleClassName = '', buttonClassName = '', icon, seeMoreText = '' } = props;
  const { scrollToCarousel } = useScrollToPartPageTemplate();
  const { isMobile } = useBreakpoint();
  return (
    <header className={cx(`flex flex-row relative tab-item-title-box justify-between items-center`, containerClassName)}>
      <div className="flex">
        {props.expandedBrand && (
          <button
            onClick={() => {
              props?.setExpandedBrand && props?.setExpandedBrand('')
              isMobile && scrollToCarousel();
            }}
          >
            <LeftOutlined className={"text-white text-xl mr-2"} />
          </button>
        )}
        {icon && icon}
        <span className={titleClassName}>{props.gameTypeName}</span>
      </div>

      {props?.onClick && !props.expandedBrand && !props.isViewAll && (
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
