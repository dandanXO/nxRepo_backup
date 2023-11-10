import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import { useRef } from "react";
import cx from "classnames";
export const ScrollTab = (props: { children: React.ReactElement[] | React.ReactElement; className?: string }) => {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 50; // 根据需要调整滚动距离
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 50; // 根据需要调整滚动距离
    }
  };
  return (
    <div className={cx("flex flex-row items-center bg-[rgba(1,62,66,0.1)]")}>
      <LeftSquareOutlined className={"bg-[rgba(1,62,66,0.1)] text-white text-lg visible xl:invisible grow-0"} onClick={handleScrollLeft} />
      <div ref={scrollContainerRef} className={cx(" flex flex-row shrink-auto overflow-hidden mx-2",props.className)}>
        {props.children}
      </div>
      <RightSquareOutlined className={"text-white text-lg visible xl:invisible grow-0"} onClick={handleScrollRight} />
    </div>
  )
}
