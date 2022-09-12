import messages from './zh_TW.json';
import antdTW from 'antd/lib/locale/zh_TW'

window.appLocale ={
    
    messages: {...messages},
  
    antdMsg:antdTW,
    // locale
    locale: 'zh-TW',
  
    // 自定义 formates
    formats: {
      // 日期、时间
      date: {
        normal: {
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        },
      },
      // 货币
      money: {
        currency: 'HKD',
      },
    },
};

export default window.appLocale;