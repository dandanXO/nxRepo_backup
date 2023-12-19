import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

import {useGetSignInConfigMutation} from '../../../external';
import {AppLocalStorage} from '../../../persistant/localstorage';
import useBreakpoint from '../../hooks/useBreakpoint';
import {useAllowLoginRouterRules} from '../../router/useAllowLoginRouterRules';
import {CurrentLevelButton, OtherLevelButton} from '../VIPGradePage';
import {environment} from "../../../../environments/environment";
import {tcx} from "../../utils/tcx";

import {renderByPlatform} from "../../utils/renderByPlatform";
import WDailySignInPage from "./env/wild/DailySignInPage";
import CocoDailySignInPage from "./env/coco/DailySignInPage";
import RioDailySignInPage from "./env/riojungle"
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import { notification } from "antd";

const Daily = styled.div<{
  disable: boolean;
}>`
  ${(props) => !props.disable && `
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACuCAYAAADQ3SQfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFFODU2NkFCNkE2QjExRUU5NTdCRjRFRkNBM0JERTg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFFODU2NkFDNkE2QjExRUU5NTdCRjRFRkNBM0JERTg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUU4NTY2QTk2QTZCMTFFRTk1N0JGNEVGQ0EzQkRFODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUU4NTY2QUE2QTZCMTFFRTk1N0JGNEVGQ0EzQkRFODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5qtyfYAAACbElEQVR42uzYO0qjURjH4ZgEBccFeJnpBF2AFu4igzesprZ1QHcgaKGWrmCYGRkvCxELLS0svGwg4BgQfI+cD0IIiOZ0Pg/8QcJn8/Ij0QzNbP+o9TEca+UtxCbza3xe7dht7CJ2EjuLdXofavb5xe+x3di0G9JlLDabtxa7jm3Fjrsfqnf93Ijt5AfExFtSI/9yM41+71DbsU134p2qZra636GWxMSAUS1VQaU/tvfdhAEdpJZSUMuxr+7BgKZiK/X81QCU0EpBzbsDhcyloMbdgUImUlAj7kAhw3U3oCRBISgEhaBAUAgKQYGgEBSCQlAgKASFoEBQCApBgaAQFIJCUCAoBIWgQFAICkGBoBAUgkJQICgEhaBAUAgKQYGgEBSCQlAgKASFoEBQCApBgaAQFIJCUCAoBIWgQFAICkGBoBAUgkJQICgEhaBAUAgKQSEoJ0BQCApBgaAQFIICQSEoBIWgQFAICkGBoBAUggJBISgEhaBAUAgKQYGgEBSCAkEhKASFoEBQCApBgaAQFIICQSEoBIWgQFAICkGBoBAUggJBISgEhaBAUAgKQYGgEBSCglqtWR8dcQXKBdX4Iih85CEoBAWCQlAICgSFoBAUggJBISgEBYJCUAgKBIWgEBSCAkEhKAQFgkJQCAp6g2o7A4V0UlD37kAhDymoS3egkPMU1Kk7UMhpCurIxx4FpIaOUlBPsQ33YEA/Y/+rrw3+xPbchA9K7fyuvjaobMYO3YZ3Oszt1HqDeo6tx1ZjN+7EG25yK+u5nVfNPg/+zf/5LcZasYXYN/f79B5jd7Gr2FnsV6zT+9CLAAMAqy8zpX+5V0QAAAAASUVORK5CYII=") center center no-repeat;
  `};
  margin-top: auto;
`;

const DailyDia = styled.div`
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAjCAYAAABoz8OXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExMUIzMDE1NkE2QjExRUVBRDU5RDIwMkFENUYyQTFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExMUIzMDE2NkE2QjExRUVBRDU5RDIwMkFENUYyQTFEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTExQjMwMTM2QTZCMTFFRUFENTlEMjAyQUQ1RjJBMUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTExQjMwMTQ2QTZCMTFFRUFENTlEMjAyQUQ1RjJBMUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WRkS2AAABlklEQVR42uycTStEYRxH74xBSlYW3pIkX0CSryBqiOIrEMlCbJSNkiQlG0sreWkiysegbDQbpcbCxkspRX7/5j71NF1qmvss1Dl1ytyZ2fw63blZPJmh7dkogQaZjx2WHfE1AONDluSdPJfH8iXpg9mEa+PxF4/kjOwhLqigSfbKMXkgi3JBZv4KrE5uyjPZx4ZQBa1yV57IZv+NnPf3hlxmK6iBCe/x6su/g00SF6TEqFzzfyKtuB12gRRZkd0usCnZxSaQInbTmnOB5dkDApB3gQ2yBQSgX7ZYYG1sAYFot8Aa2QFCPYtl2QBCQmBAYEBgAAQGBAYEBkBgQGBAYAAEBgQGBAZAYPAvA3tjBgjEpwVWYgcIRMkCu2UHCMC9fLXACmwBASi4ZzA7uOKRPSDNZy+57wKzF0tsAiliZ5w8uMCi+C62xS6QApdy3b3w/w+2KvfYB2rgWk5H8cEnlYHZxfmofBBKka2gCp7lohyR7/4buYQPn8qLqHxmhR1GNyA7ZT07Qsy3fJI38koeRr+ccPgjwABehTYrXIZQrAAAAABJRU5ErkJggg==") center center no-repeat;
  height: 30px;
  line-height: 30px;
`;

const days: number[] = [];

for (let i = 1; i <= 7; i += 1) {
  days.push(i);
}

export const LevelList = ({
  currentLevel,
  currentSelectedLevel,
  setCurrentSelectedLevel,
  startLevel = 0,
}: {
  startLevel?: number;
  currentLevel: number;
  currentSelectedLevel: number;
  setCurrentSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useAllowLoginRouterRules();
  const { isMobile } = useBreakpoint();

  const vips: number[] = [];

  for (let i = startLevel; i <= 25; i += 1) {
    vips.push(i);
  }

  const [initialPageX, setInitialPageX] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: any) => {
    setInitialPageX(e.pageX);
  };

  const handleMouseUp = (e: any) => {
    setInitialPageX(0);
  };

  const handleMouseMove = (e: any) => {
    if (initialPageX !== 0 && contentRef.current !== null) {
      const leftOrRight = initialPageX - e.pageX;
      contentRef.current.scrollLeft += leftOrRight;
      setInitialPageX(e.pageX);
    }
  };


  return (
    <section
      className={'vip-tab-items flex-no-wrap mb-4 flex flex-row overflow-auto ml-4'}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      ref={contentRef}
    >
      {vips.map((numberValue, index) => {
        const isReachLevel = numberValue === currentSelectedLevel
        const LevelButton = isReachLevel ? CurrentLevelButton : OtherLevelButton;
        const vipIcon = isReachLevel
          ? `assets/${environment.assetPrefix}/icon_vip_box_open.png`
          : `assets/${environment.assetPrefix}/icon_vip_box_open.png`;
          return (
            <LevelButton
              className={tcx('mr-3 p-2 text-3xl rounded-xl', ['p-1 pr-2 text-base rounded-lg', isMobile])}
              key={index}
              onClick={() => {
                setCurrentSelectedLevel(numberValue);
              }}
            >
              <img
                className='w-7 h-6'
                alt={isReachLevel ?"king" : "lock"}
                src={currentLevel >= numberValue
                  ? vipIcon
                  : `assets/${environment.assetPrefix}/icon_vip_box_close.png`
                }
              />
              <span className={'text-[#fff] font-bold'}>VIP{numberValue}</span>
            </LevelButton>
          );
      })}
    </section>
  );
};

export const DailySignInPage = () => {
  const [currentSelectedLevel, setCurrentSelectedLevel] = useState(1);

  useEffect(() => {
    setCurrentSelectedLevel(currentSelectedLevel)
  }, [currentSelectedLevel]);

  const [triggerGetSignInConfig, { data: signInConfig }] =
    useGetSignInConfigMutation();


  // console.log("signInConfig", signInConfig);

  useEffect(() => {
    if(signInConfig?.data?.vipLevel) {
      setCurrentSelectedLevel(signInConfig?.data?.vipLevel);
    }
  }, [signInConfig?.data?.vipLevel ])

  const onClickToSignIn = () => {
    return triggerGetSignInConfig({
      onlyGetSignInConfig: false,
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
    }).then((result) => {
        if('data' in result){
          if(result.data.code === 200) {
            return true
          }
          else {
            return false
          }
        }else {
          return false
        }
      }
    ).catch(()=> false)
  }

  useEffect(() => {
    triggerGetSignInConfig({
      onlyGetSignInConfig: true,
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
    });
  }, []);

  return renderByPlatform({
    "wild777bet": (
      <WDailySignInPage
        onClickToSignIn={onClickToSignIn}
        signInConfig={signInConfig?.data?.signInConfig || []}
        signInAllConfig={signInConfig?.data?.signInAllConfig || []}
        signInTotalDays={signInConfig?.data?.signInTotalDays || 0}
        todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
        vipLevel={signInConfig?.data?.vipLevel || 0}
        currentSelectedLevel={currentSelectedLevel}
        setCurrentSelectedLevel={setCurrentSelectedLevel}
      />
    ),
    "coco777bet": (
      <CocoDailySignInPage
        onClickToSignIn={onClickToSignIn}
        signInConfig={signInConfig?.data?.signInConfig || []}
        signInAllConfig={signInConfig?.data?.signInAllConfig || []}
        signInTotalDays={signInConfig?.data?.signInTotalDays || 0}
        todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
        vipLevel={signInConfig?.data?.vipLevel || 0}
        currentSelectedLevel={currentSelectedLevel}
        setCurrentSelectedLevel={setCurrentSelectedLevel}
      />
    ),
    "riojungle777bet": (
      <RioDailySignInPage
        onClickToSignIn={onClickToSignIn}
        currentVIP={signInConfig?.data?.vipLevel || 0}
        signInConfig={signInConfig?.data?.signInConfig || []}
        signInAllConfig={signInConfig?.data?.signInAllConfig || []}
        todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
        signInTotalDays={signInConfig?.data?.signInTotalDays || 0}
      />
    )
  }, (
    <CocoDailySignInPage
      onClickToSignIn={onClickToSignIn}
      signInConfig={signInConfig?.data?.signInConfig || []}
      signInAllConfig={signInConfig?.data?.signInAllConfig || []}
      signInTotalDays={signInConfig?.data?.signInTotalDays || 0}
      todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
      vipLevel={signInConfig?.data?.vipLevel || 0}
      currentSelectedLevel={currentSelectedLevel}
      setCurrentSelectedLevel={setCurrentSelectedLevel}
    />
  ))

  // (
  //   <PernambucanaDailySignInPage
  //     onClickToSignIn={onClickToSignIn}
  //     currentLevel={signInConfig?.data?.vipLevel || 0}
  //     signInConfig={signInConfig?.data?.signInConfig}
  //     signInAllConfig={signInConfig?.data?.signInAllConfig || []}
  //     signInTotalDays={signInConfig?.data?.signInTotalDays || 0}
  //     todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
  //     vipLevel={signInConfig?.data?.vipLevel || 0}
  //     currentSelectedLevel={currentSelectedLevel}
  //     setCurrentSelectedLevel={setCurrentSelectedLevel}
  //   />
  // ))
};
