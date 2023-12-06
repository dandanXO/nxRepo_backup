import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import { useRef } from "react";
import cx from "classnames";
export const ScrollTab = (props: { children: React.ReactElement[] | React.ReactElement; className?: string }) => {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      // 根据需要调整滚动距离
      scrollContainerRef.current?.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 70,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      // 根据需要调整滚动距离
      scrollContainerRef.current?.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 70,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className={cx("flex flex-row items-center")}>
      <LeftSquareOutlined className={"text-white text-lg flex xl:hidden grow-0"} onClick={handleScrollLeft} />
      <div ref={scrollContainerRef} className={cx("flex flex-row shrink-auto overflow-hidden mx-2 xl:mx-0",props.className)}>
        {props.children}
      </div>
      <RightSquareOutlined className={"text-white text-lg flex xl:hidden grow-0"} onClick={handleScrollRight} />
    </div>
  )
}
