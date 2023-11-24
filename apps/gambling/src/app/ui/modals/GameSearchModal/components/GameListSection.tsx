import cx from 'classnames';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { ArrowLeft } from '../../../components/Icons/ArrowLeft';
import { ArrowRight } from '../../../components/Icons/ArrowRight';
import { useEffect, useRef, useState } from 'react';
import { DragScrollContainer } from '../../../components/DragScrollContainer';

interface IGameListSection {
  icon?: React.ReactElement;
  title: string;
  className?: string;
  gameListClassName?: string;
  children: React.ReactElement[] | React.ReactElement;
  isShowHeader?: boolean;
}
export const GameListSection = (props: IGameListSection) => {
  const { isMobile } = useBreakpoint();
  const { icon, title, className, gameListClassName, children, isShowHeader = true } = props;


  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClickToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 50; // 根据需要调整滚动距离
    }
  };

  const handleClickToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 50; // 根据需要调整滚动距离
    }
  };


  const [isOverflowedX, setIsOverflowedX] = useState(false);

  useEffect(() => {
    if (scrollContainerRef.current !== null) {
      const container = scrollContainerRef.current;
      const isOverflowedHorizontally = container?.scrollWidth > container?.clientWidth;
      setIsOverflowedX(isOverflowedHorizontally);
    }
  }, [children])



  return (
    <div className={cx("flex flex-col w-full mb-3.5",{
      'px-4':!isMobile,
      'px-2':isMobile
    } ,className)}>
      {isShowHeader &&
        (<div className='flex flex-row justify-between mb-3.5'>
          <div className='flex justify-center items-center'>
            <div>{icon && icon}</div>
            <div>{title}</div>
          </div>
          {!isMobile && isOverflowedX && <div className='flex '>
            <button onClick={handleClickToLeft}><ArrowLeft /></button>
            <button onClick={handleClickToRight}><ArrowRight /></button>
          </div>}
        </div>)}
      {!isMobile ?
        (<div ref={scrollContainerRef} className={cx("flex flex-1 overflow-hidden mx-2", gameListClassName)}>
          {children}
        </div>)
        : (<DragScrollContainer className={cx("flex flex-1 overflow-hidden", gameListClassName)}>
          {children}
        </DragScrollContainer>)
      }
    </div>
  )
}