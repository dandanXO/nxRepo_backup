// NOTICE: 顯示倒數字串
import moment from "moment-timezone";
export const getTimeInfoBetweenCurrentAndCountDown = (quotaExpireTime: string) => {
  // NOTICE: REFACTOR ME
  const currentTime = moment();
  // console.log("[test] currentTime.format", currentTime.format("YYYY-MM-DD HH:mm:ss"));
  const nextTime = moment(quotaExpireTime);
  // console.log("[test] tomorrow.format", nextTime.format("YYYY-MM-DD HH:mm:ss"))
  const diffTime = nextTime.diff(currentTime, 'seconds');
  // console.log("[test] diffTime", diffTime);
  const duration = moment.duration(diffTime, 'seconds');
  // console.log("[test] duration", duration);

  const padStartZero = (number: number) => {
    return String(number).padStart(2, '0');
  };
  const hours = Math.max(duration.hours(), 0);
  const minutes = Math.max(duration.minutes(), 0);
  const seconds = Math.max(duration.seconds(), 0);
  const end = hours === 0 && minutes === 0 && seconds === 0;
  const time = `${padStartZero(hours)}:${padStartZero(minutes)}:${padStartZero(seconds)}`;
  return {
    time,
    end,
  };
};
