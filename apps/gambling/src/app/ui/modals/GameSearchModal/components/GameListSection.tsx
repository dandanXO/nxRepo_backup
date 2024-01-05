import cx from 'classnames';
import useBreakpoint from '../../../pageTemplate/hooks/useBreakpoint';
import { ArrowLeft } from '../../../components-bs/Icons/ArrowLeft';
import { ArrowRight } from '../../../components-bs/Icons/ArrowRight';
import { useEffect, useRef, useState } from 'react';
import { DragScrollContainer } from '../../../components/DragScrollContainer';
import { useGesture } from '@use-gesture/react';
import { useSpring } from '@react-spring/web';
import { tcx } from "../../../utils/tcx";
import { PrevAndNextButtons } from './PrevAndNextButtons';
import { LoadMoreButton } from '../../../components-bs/Buttons/LoadMoreButton';


interface IGameListSection {
  icon?: React.ReactElement;
  title: string | React.ReactElement[] | React.ReactElement;
  headerClassName?: string;
  className?: string;
  gameListClassName?: string;
  children: React.ReactElement[] | React.ReactElement;
  isShowHeader?: boolean;
  loadMore?:()=>void;
  expandedBrand?:boolean;
}
export const GameListSection = (props: IGameListSection) => {
  const { isMobile } = useBreakpoint();
  const { headerClassName, icon, title, className, gameListClassName, children, isShowHeader = true } = props;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClickToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 150 + 16; // 根据需要调整滚动距离
    }
  };

  const handleClickToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 150 + 16; // 根据需要调整滚动距离
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



  const [, api] = useSpring(() => ({
    from: { left: 0 },
    onChange(v: any) {
      scrollContainerRef.current!.scroll({ left: v.value.left });
    }
  }));

  const bind = useGesture(
    {
      onWheel() {
        api.stop(); // 取消动画，让浏览器自己处理
      },
      onDrag(h: any) {
        api.start({
          left: -h.offset[0],
          immediate: true // 无动画过程
        });
      }
    },
    {
      drag: {
        // 每次拖动传入 当前的 scrollLeft 作为初始状态
        from: () => [-scrollContainerRef.current!.scrollLeft, 0],
        axis: "x", // 仅在 x 方向 drag
        filterTaps: true
      }
    }
  );
  return (
    <div className={cx("flex flex-col w-full mb-2 md:mb-4 lg:mb-8", {
      // 'px-6': !isMobile,
      // 'px-2': isMobile
    }, className)}>
      {isShowHeader &&
        (<div className={tcx('flex flex-row justify-between mb-2 sm:mb-3.5 pl-1 sm:pl-0', headerClassName)}>
          <div className='flex justify-center items-center'>
            <div className=''>{icon && icon}</div>
            <div className='text-base md:text-lg lg:text-2xl items-center flex'>{title}</div>
          </div>
          {!isMobile && isOverflowedX && <PrevAndNextButtons handleClickToLeft={handleClickToLeft} handleClickToRight={handleClickToRight}/>}
        </div>)}
      {!isMobile ?
        (<div {...bind()} ref={scrollContainerRef} className={cx("GameListSection-PC flex flex-1 overflow-hidden", gameListClassName)}>
          {children}
        </div>)
        : (<DragScrollContainer className={cx("flex flex-1 overflow-hidden", gameListClassName)}>
          {children}
        </DragScrollContainer>)
      }
       {props.expandedBrand &&
        <div className="flex-1 mt-4 justify-center flex">
          <LoadMoreButton onClick={()=> props.loadMore && props.loadMore()}/>
        </div>
      }

    </div>
  )
}
