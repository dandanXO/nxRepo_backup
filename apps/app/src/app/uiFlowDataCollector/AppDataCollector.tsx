import React, { SyntheticEvent, useEffect } from 'react';
import { useLocation } from 'react-router';

import { environment } from '../../environments/environmentModule/environment';
import { usePostTraceBehaviorMutation } from '../externel/backend/rtk';
import { getCurrentUnixTimestamp } from '../modules/timezone/getCurrentUnixTimestamp';

const AppDataCollector = (props: { children: React.ReactNode }) => {
  // const whitePage: string[] = [ PagePathEnum.RepaymentDetailPage, PagePathEnum.BindBankcard ]

  const [postTraceBehaviour] =
    usePostTraceBehaviorMutation();

  // NOTE: Page enter, leave, duration
  const location = useLocation();

  useEffect(() => {
    // NOTICE: 目前巴基斯坦白牌需要增加
    if (environment.country !== 'pk') return;

    // if(whitePage.indexOf(location.pathname) === -1) return
    const start = performance.now();
    // console.log('[AppDataCollector] Page enter!', location.pathname, start);

    return () => {
      // NOTICE: 目前巴基斯坦白牌需要增加
      if (environment.country !== 'pk') return;

      const end = performance.now();
      const duration = end - start;

      // console.log('Page leave!', location.pathname, end);
      // console.log(
      //   '[AppDataCollector] Page duration!',
      //   location.pathname,
      //   duration
      // );

      const eventID = `${location.pathname}`.toUpperCase();
      postTraceBehaviour([
        {
          deviceCode: 'deviceCode',
          phoneNo: 'phoneNo',
          eventId: eventID,
          actionType: 'VISIT',
          eventTime: getCurrentUnixTimestamp(),
          duration: duration,
        },
      ]);
    };
  }, [location]);

  const onAppElementEvent = (event: SyntheticEvent) => {
    // NOTICE: 目前巴基斯坦白牌需要增加
    if (environment.country !== 'pk') return;

    // console.log('onAppElementClick.event', event);
    // console.log("onAppElementClick.event.target", event.target);
    // console.log("onAppElementClick.event.target.nodeName", (event.target as any)?.nodeName);
    const pageName = location.pathname.replace('/v2', '');

    // NOTE: Click
    if (event.type === 'click') {
      if ((event.target as any)?.nodeName === 'BUTTON') {
        const eventID = `${pageName}_CLICK_${
          (event.target as any)?.innerText
        }`.toUpperCase();
        // console.log('[AppDataCollector] CLICK.button');
        // console.log('[AppDataCollector] CLICK.button.eventID', eventID);
        postTraceBehaviour([
          {
            deviceCode: 'deviceCode',
            phoneNo: 'phoneNo',
            eventId: eventID,
            actionType: 'CLICK',
            eventTime: getCurrentUnixTimestamp(),
            duration: 0,
          },
        ]);
      }
    } else if (event.type === 'blur') {
      // NOTE: Input
      if ((event.target as any)?.nodeName === 'INPUT') {
        // const value = (event.target as any)?.value;
        const eventID = `${pageName}_INPUT_${
          (event.target as any)?.name
        }`.toUpperCase();
        // console.log('[AppDataCollector] Input.value:', value);
        // console.log('[AppDataCollector] Input.eventID:', eventID);
        postTraceBehaviour([
          {
            deviceCode: 'deviceCode',
            phoneNo: 'phoneNo',
            eventId: eventID,
            actionType: 'INPUT',
            eventTime: getCurrentUnixTimestamp(),
            duration: 0,
          },
        ]);
      }
    }
  };

  return (
    <div
      id="app-data-collector"
      className={'h-full'}
      onClick={onAppElementEvent}
      onBlur={onAppElementEvent}
    >
      {props.children}
    </div>
  );
};

export default AppDataCollector;
