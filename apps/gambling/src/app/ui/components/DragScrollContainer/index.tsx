import cx from "classnames";
import { useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useRef } from "react";

interface IDragScrollContainer {
  children: React.ReactElement[] | React.ReactElement;
  className?: string
}

export const DragScrollContainer = (props: IDragScrollContainer) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [, api] = useSpring(() => ({
    from: { left: 0 },
    onChange(v: any) {
      contentRef.current?.scroll({ left: v.value.left });
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
        from: () => [-contentRef.current!.scrollLeft, 0],
        axis: "x", // 仅在 x 方向 drag
        filterTaps: true
      }
    }
  );
  return (
    <div className={cx('overflow-x-auto no-scrollbar cursor-pointer', props.className)} {...bind()} ref={contentRef}>
      {props.children}
    </div>
  )
}
