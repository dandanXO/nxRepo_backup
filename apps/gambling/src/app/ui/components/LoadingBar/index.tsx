import {environment} from "../../../../environments/environment";
import cx from "classnames";
// import {useSpring, animated, useSpringRef, useChain} from "@react-spring/web";

export const LoadingBar = () => {
  // const commonAnimatedData = {
  //   from: {
  //     transform: "scale(0)",
  //   },
  //   to: {
  //     transform: "scale(1)",
  //   },
    // loop: true,
    // reset: true,
    // reverse: true,
    // config: {
    //   duration: 500,
    // },
  // }
  // const springRef1 = useSpringRef()
  // const [props , api] = useSpring(() => ({
  //   ...commonAnimatedData,
  //   ref: springRef1,
  //   config: {
  //     duration: 300,
  //   },
  // }));
  //
  // const springRef2 = useSpringRef()
  // const [props2 , api2] = useSpring(() => ({
  //   ...commonAnimatedData,
  //   ref: springRef2,
  //   config: {
  //     duration: 300,
  //   },
  // }));
  //
  // const springRef3 = useSpringRef()
  // const [props3 , api3] = useSpring(() => ({
  //   ...commonAnimatedData,
  //   ref: springRef3,
  //   config: {
  //     duration: 300,
  //   },
  // }));
  //
  // useChain([springRef1, springRef2, springRef3])

  return (
    <div className={cx(
      "w-[200px] h-[26px]",
      "flex flex-row justify-center items-center",
      // "bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]",
      "rounded-[27px]",
      "pl-3",
      "py-1",
      )}>
      {/*<img*/}
      {/*  className={"w-[14px] h-[14px] mr-1"}*/}
      {/*  src={`assets/${environment.assetPrefix}/Subtract.png`}*/}
      {/*/>*/}
      {/*<img*/}
      {/*  className={"w-[14px] h-[14px] mr-1"}*/}
      {/*  src={`assets/${environment.assetPrefix}/Dice-Two.png`}*/}
      {/*/>*/}
      {/*<img*/}
      {/*  className={"w-[14px] h-[14px] mr-1"}*/}
      {/*  src={`assets/${environment.assetPrefix}/Dice-Two.png`}*/}
      {/*/>*/}
      {/*<animated.div style={props}>*/}
        <img
          className={"w-[14px] h-[14px] mr-2 loading-animation-1"}
          src={`assets/${environment.uVersion}/Subtract.png`}
        />
      {/*</animated.div>*/}

      {/*<animated.div style={props2}>*/}
        <img
          className={"w-[14px] h-[14px] mr-2 loading-animation-2"}
          src={`assets/${environment.uVersion}/Dice-Two.png`}
        />
      {/*</animated.div>*/}

      {/*<animated.div style={props3}>*/}
        <img
          className={"w-[14px] h-[14px] mr-2 loading-animation-3"}
          src={`assets/${environment.uVersion}/Dice-Two.png`}
        />
      {/*</animated.div>*/}
    </div>
  )
}
