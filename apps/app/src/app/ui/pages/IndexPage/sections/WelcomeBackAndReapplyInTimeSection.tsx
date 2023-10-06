import { TimePartition } from '../../../../reduxStore/indexPageSlice';

type Props = {
  refreshableCountdown: TimePartition;
};

export const WelcomeBackAndReapplyInTimeSection = (props: Props) => {
  return (
    <div
      className={'flex w-full flex-col items-center'}
      data-testing-id="welcomBackTimer"
    >
      <div className={'text-ctext-primary mb-2 text-center text-sm font-bold'}>
        Welcome back and reapply in
      </div>
      <div
        className={
          'border-cTextFields-outline-main flex w-[240px] flex-row rounded-md border py-2 px-2'
        }
      >
        <div className={'flex flex-1 flex-col items-center'}>
          <div
            className={'value text-ctext-primary text-sm font-normal'}
            data-testing-id="welcomBackTimer-days"
          >
            {props.refreshableCountdown.days || '00'}
          </div>
          <div className={'label text-ctext-tertiary text-xs'}>days</div>
        </div>
        <div className={'flex flex-1 flex-col items-center'}>
          <div
            className={'value text-ctext-primary text-sm font-normal'}
            data-testing-id="welcomBackTimer-hours"
          >
            {props.refreshableCountdown.hours || '00'}
          </div>
          <div className={'label text-ctext-tertiary text-xs'}>hours</div>
        </div>
        <div className={'flex flex-1 flex-col items-center'}>
          <div
            className={'value text-ctext-primary text-sm font-normal'}
            data-testing-id="welcomBackTimer-minutes"
          >
            {props.refreshableCountdown.minutes || '00'}
          </div>
          <div className={'label text-ctext-tertiary text-xs'}>minutes</div>
        </div>
        <div className={'flex flex-1 flex-col items-center'}>
          <div
            className={'value text-ctext-primary text-sm font-normal'}
            data-testing-id="welcomBackTimer-seconds"
          >
            {props.refreshableCountdown.seconds || '00'}
          </div>
          <div className={'label text-ctext-tertiary text-xs'}>seconds</div>
        </div>
      </div>
    </div>
  );
};
