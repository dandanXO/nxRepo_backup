import messages from './zh_CN.json';
import antdCN from 'antd/lib/locale/zh_CN';

window.appLocale = {

    messages: {...messages},
  
    // locale
    locale: 'zh-CN',
  
    antdMsg: antdCN,
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
        currency: 'CNY',
      },
    },
  };
  
  export default window.appLocale;