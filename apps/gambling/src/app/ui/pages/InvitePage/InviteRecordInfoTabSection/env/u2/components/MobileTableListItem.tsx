import { ReactElement } from "react";
import styled from "styled-components";
import cx from 'classnames';

const BottomLine = styled.div`
 height: 1px;
 background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.20) 49.48%, rgba(255, 255, 255, 0.00) 100%);
`
interface IMobileTableListItem { 
  title: string | ReactElement; 
  text: any; 
  bottomLine?: boolean; 
  className?: string; 
  textClassName?: string; 
}

export const MobileTableListItem = (props: IMobileTableListItem) => {
  const { title, text, bottomLine = true, className = '', textClassName = '' } = props;
  return (
    <div className={cx("text-sm flex flex-col", className)}>
      <div className="flex justify-between py-2">
        <div className="text-[var(--grayscale-70)]">{title}</div>
        <div className={cx("text-white", props.textClassName)}>{text}</div>
      </div>
      {bottomLine && <BottomLine />}
    </div>
  )
}