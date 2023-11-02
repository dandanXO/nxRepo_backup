import cx from 'classnames';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';

import {GetSignInConfigResponse, useGetSignInConfigMutation} from '../../../external';
import {AppLocalStorage} from '../../../persistant/localstorage';
import useBreakpoint from '../../hooks/useBreakpoint';
import {useAllowLoginRouterRules} from '../../router/useAllowLoginRouterRules';
import {CurrentLevelButton, OtherLevelButton} from '../VIPGradePage';
import {Footer} from './Footer';
import {MobileTemplate} from './MobileTemplate';
import {Notice} from './Notice';
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";

const DailySignInContainer = styled.div`
  //margin: 5vw 0;
  //background-size: 100% 100%;
  //width: 1498px;
  //height: 676px;
`;


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

const Panel = styled.div`
  //background: linear-gradient(
  //  180deg,
  //  rgba(152, 122, 255, 0.8) 0%,
  //  rgba(71, 50, 164, 0.8) 100%
  //);
  //background: linear-gradient(to bottom, #808080, #2b2b2b);
`;

const VIPContainer = styled.div`
  //background-color: #287052;
  background-color: rgba(40, 112, 82, 0.1);
  background-size: 100% 100%;
  border-radius: 28px;
  padding: 28px;
`;

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
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAaCAYAAADWm14/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZGMjAzNDYwNkQ2MTExRUVBQTJEQ0Y1OUJCQjRDMDgxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZGMjAzNDYxNkQ2MTExRUVBQTJEQ0Y1OUJCQjRDMDgxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkYyMDM0NUU2RDYxMTFFRUFBMkRDRjU5QkJCNEMwODEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkYyMDM0NUY2RDYxMTFFRUFBMkRDRjU5QkJCNEMwODEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5vXV+dAAAB2klEQVR42sSWzytEURTHZwbDkB8ZCkmk7CTZ2CmSH7NQCmUj7CjEQuTXQlb2NghLpVjxL5DFLPzIPBSxYSbkx0KZ8T11pl6ve98v855Tn9675/4433e679zrTbx67JgXDIFefj8AayBudaF0jz1bBrOqdiuoAeOWv8RGBvJAFGRo/D8gCN6sLOaz8fVlguBkaaDU6mJ2BNyCmMAf4z7HBXyDKc2Go/dJ7rMtoA50gWoT87bBhqq9DnZMzKviGA1qAX6wB8JgH1yDVYOFikC/qt0HCgzmLIIbjnEKDkGABIyBbs1gSnGHzmIzIEfVzgcTOuNbwBLXjKS1UxwSEJJMapb4aaePCPwkIFcyp00WgwR8SjpjEv80yBL4KQujkjnPEv87FaIevOwKOh94o22Ce/ZVgAjI1BFdCT64TRt6EAyAcsH4ULISUkrnQYlgUAIc8U7vBMMGm20B3PFZ0SQZ8wjmwJa2FGeDJ80GS6V9gWJ+CgsRdVx6nDNFHVxWCc8dFBAxU4qdzMDVfwtQzAg4czMDoguJj//jgAMCCsGLUQbiIqUpsKg2uN594MKN9LstQLEiIOyAgBMrt2I/XxpqU/j19aKTV+9aHuQDo/EPfwSV3WOwIjuSfwUYADUVZgz5+9arAAAAAElFTkSuQmCC'
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAATtJREFUOE+t008rRGEUx/HvL0RiZ2chZSE2Ulds5AWwsrC0mEkje1n5Ezt7k8YbUGzIK7AyKWLDRrG2oqZQjo7u1fQ09xpzPau7+J3Pvfec84h/OspyzGwAOAQMWJD0lJZPhcysDTgHpuJif56R9NkIy4I2gM2gaFXSbkMofvMocCfp3UNmNhl/TXtQ9AZEkm7jXCcwAtzIzE6AOeAR2AGOgSowlNKPa2AaWATWgH7gzKFXoKeuqAZ0/zLMMFNz6AKYyLkFVYf2gOWcUNmhAnCQEyo6NAZc5YTGHeoAXoCuFjFfid7vhTQzH3cUQKfxQvr18OPZLWA2yF1KihKoDJSCgE/TB1EPrTSY8L6kUgIVgUqLv7YkqZJAg8A94P36y/kAhiU9/FxaM5sHtoG+JqVnYF3SUdLAJuuyY1+4I2ifqehT2wAAAABJRU5ErkJggg==';
          return (
            <LevelButton
              className={'mr-3'}
              key={index}
              onClick={() => {
                setCurrentSelectedLevel(numberValue);
              }}
            >
              <img
                alt={isReachLevel ?"king" : "lock"}
                className={'mr-2'}
                src={currentLevel >= numberValue
                  ? vipIcon
                  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAARlJREFUOE/t07ErhVEYx/HvV2wmZZT4GyjJIEySv8AkShlEMYmQQSluKZvNYJYJGVCsNiO7RSbRo1svvfd47/Xe3dnO8z7P57z9OkfqrIgYB5aBPiCAa2BLvSsasagYEUvALpB+/wCm1JN07hcUET3AI9AG3AB7QCuwAAwCr0Cv+pLHiqB54CAb6FKrg0REO/AEdGR/dfwXtAZsAPfqQL45Iq6AYWBR3S8L3apDCXQOjJWFpoEZ4EGdS6AK0A9U0sBrMoqI7izkerciX39Xn78LP1BE7AArZYRcz7q6Wd3noUtgpEnoTJ34hxqmVpjRBTDaZNin6mQa9iFQcwFLoNvqagp1AkfZC2/5A/kEqs9lVn2rgUqc3rDlC5IRchOtsAplAAAAAElFTkSuQmCC'
                }
              />
              <span className={'text-[#fff] font-bold'}>VIP{numberValue}</span>
            </LevelButton>
          );
      })}
    </section>
  );
};

export const DayList = (props: {
  currentSelectedLevel: number;
  signInAllConfig: {
    identifier: string;
    value: string;
  }[];
  className?: string;
  itemClassName?: string;
  signInConfig?: GetSignInConfigResponse['data']['signInConfig'];
  signInTotalDays: GetSignInConfigResponse['data']['signInTotalDays'];
  todayIsSignIn: GetSignInConfigResponse['data']['todayIsSignIn'];
  vipLevel: GetSignInConfigResponse['data']['vipLevel'];
}) => {
  const { signInAllConfig, currentSelectedLevel } = props;
  const vipConfig = signInAllConfig.find(
    (config) =>
      config.identifier.split('::')[2].replace('V', '') ===
      `${currentSelectedLevel}`
  );

  const dayConfigs = JSON.parse(vipConfig?.value || '[]');

  return (
    <section
      className={cx(
        'flex-no-wrap mb-6 flex w-full flex-row overflow-auto',
        props.className
      )}
    >
      {days.map((day, index) => {
        const config = dayConfigs.find(
          (dayConfig: any) => dayConfig.days === day
        );
        const disable = currentSelectedLevel === props.vipLevel && index + 1 <= props.signInTotalDays;
        return (
          <Daily
            key={index}
            disable={disable}
            className={cx(
              'day-item mr-4 flex min-h-[50px] w-[25%] flex-1 flex-col items-center justify-start rounded-lg pb-4',
                    props.itemClassName,
              {
                "bg-[#274b38]": disable
              }
            )}
          >
            <DailyDia
              className={'bg-purple mb-2 w-full rounded-t text-lg text-white'}
            >
              Dia{day}
            </DailyDia>
            {/*<div className={"w-[88px] h-[74px]"}>*/}
            {/*</div>*/}
            <div>
              <img alt={'money'} src={'assets/001/gold.png'} />
            </div>
            <div className="h-10"></div>
            <div className="flex-grow flex flex-col justify-center items-center">
              <span className="text-white">R${config?.cashback}</span>
            </div>
          </Daily>
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


  console.log("signInConfig", signInConfig);

  useEffect(() => {
    if(signInConfig?.data?.vipLevel) {
      setCurrentSelectedLevel(signInConfig?.data?.vipLevel);
    }
  }, [signInConfig?.data?.vipLevel ])

  const { isMobile } = useBreakpoint();

  const onClickToSignIn = () => {
    triggerGetSignInConfig({
      onlyGetSignInConfig: false,
      token: AppLocalStorage.getItem('token') || '',
    }).then(() => {
      // done
    })
  }
  useEffect(() => {
    triggerGetSignInConfig({
      onlyGetSignInConfig: true,
      token: AppLocalStorage.getItem('token') || '',
    });
  }, []);

  useAutoUpdateBalance();

  if (isMobile) {
    return (
      <MobileTemplate
        onClickToSignIn={onClickToSignIn}
        currentLevel={signInConfig?.data?.vipLevel || 0}
        signInAllConfig={signInConfig?.data?.signInAllConfig || []}
        signInConfig={signInConfig?.data?.signInConfig}
        signInTotalDays={signInConfig?.data?.signInTotalDays || 0}
        todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
        vipLevel={signInConfig?.data?.vipLevel || 0}
        setCurrentSelectedLevel={setCurrentSelectedLevel}
        currentSelectedLevel={currentSelectedLevel}
      />
    );
  }

  return (
    <>
      <div className={'px-14 py-8'}>
        <VIPContainer>
        <DailySignInContainer className={'flex w-full flex-row'}>
        {/*<section className={'flex shrink-0 flex-row'}>*/}
        {/*  <img*/}
        {/*    alt={'rabbit'}*/}
        {/*    className="h-[660px] w-[332px]"*/}
        {/*    src={'assets/img.05e3d09a.png'}*/}
        {/*  />*/}
        {/*</section>*/}

        <Panel
          className={
            'flex-3  relative mt-8 mb-12 flex w-[calc(100%)] flex-col rounded-t-3xl p-8'
          }
        >
          {/*<img*/}
          {/*  alt={'title'}*/}
          {/*  className={'absolute top-[-45px] left-[200px] h-[71px] w-[592px]'}*/}
          {/*  src={'assets/title.75fa9aa0.png'}*/}
          {/*/>*/}
          <span className="font-weight-bold text-yellow-300" style={{ fontSize: '40px' }}>BONUS DE LOGIN VIP</span>

          <LevelList
            startLevel={1}
            currentLevel={signInConfig?.data?.vipLevel || 0}
            currentSelectedLevel={currentSelectedLevel}
            setCurrentSelectedLevel={setCurrentSelectedLevel}
          />

          <DayList
            currentSelectedLevel={currentSelectedLevel}
            signInAllConfig={signInConfig?.data?.signInAllConfig || []}
            signInConfig={signInConfig?.data?.signInConfig}
            signInTotalDays={signInConfig?.data?.signInTotalDays || 0}
            todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
            vipLevel={signInConfig?.data?.vipLevel || 0}
          />

          <Notice />

          <Footer
            onClickToSignIn={onClickToSignIn}
            todayIsSignIn={signInConfig?.data?.todayIsSignIn || false}
            vipLevel={signInConfig?.data?.vipLevel || 0}
            setCurrentSelectedLevel={setCurrentSelectedLevel}
          />

        </Panel>
      </DailySignInContainer>
        </VIPContainer>
      </div>
    </>
  );
};
