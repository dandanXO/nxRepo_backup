import { TimePartition } from '../../../../reduxStore/indexPageSlice';

type Props = {
  refreshableCountdown: TimePartition;
};

export const WelcomeBackAndReapplyInTimeSection = (props: Props) => {
  return (
    <div className={'flex w-full flex-col items-center'} data-testing-id='welcomBackTimer'>
      <div className={'mb-2 text-center font-bold text-sm text-ctext-primary'}>Welcome back and reapply in</div>
      <div className={'flex w-[240px] flex-row rounded-md border-[1.5px] py-2 px-2'}>
        <div className={'flex flex-1 flex-col items-center'}>
          <div className={'value text-sm font-normal text-ctext-primary'} data-testing-id='welcomBackTimer-days'>{props.refreshableCountdown.days || '00'}</div>
          <div className={'label text-xs text-gray-500'}>days</div>
        </div>
        <div className={'flex flex-1 flex-col items-center'}>
          <div className={'value text-sm font-normal text-ctext-primary'} data-testing-id='welcomBackTimer-hours'>{props.refreshableCountdown.hours || '00'}</div>
          <div className={'label text-xs text-gray-500'}>hours</div>
        </div>
        <div className={'flex flex-1 flex-col items-center'}>
          <div className={'value text-sm font-normal text-ctext-primary'} data-testing-id='welcomBackTimer-minutes'>{props.refreshableCountdown.minutes || '00'}</div>
          <div className={'label text-xs text-gray-500'}>minutes</div>
        </div>
        <div className={'flex flex-1 flex-col items-center'}>
          <div className={'value text-sm font-normal text-ctext-primary'} data-testing-id='welcomBackTimer-seconds'>{props.refreshableCountdown.seconds || '00'}</div>
          <div className={'label text-xs text-gray-500'}>seconds</div>
        </div>
      </div>
    </div>
  );
};
