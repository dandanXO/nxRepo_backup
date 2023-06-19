// NOTICE: 顯示倒數字串
import moment from "moment-timezone";

export const getTimePartInfoBetweenCurrentAndCountDown = (quotaExpireTime: string) => {


    // 可重刷的時間是否已到期
    const isCanRefreshable = moment().isBefore(moment(quotaExpireTime));
    if (!isCanRefreshable) {
        return {
            time: { months: '00', days: '00', hours: '00', minutes: '00', seconds: '00' },
            end: true,
        }
    }

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
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const end = hours === 0 && minutes === 0 && seconds === 0;
    
    return {
        time: {
            months: padStartZero(months),
            days: padStartZero(days),
            hours: padStartZero(hours),
            minutes: padStartZero(minutes),
            seconds: padStartZero(seconds),
        },
        end,
    };


};
