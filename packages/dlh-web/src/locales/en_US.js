import messages from './en_US.json'
import antdEn from 'antd/lib/locale/en_US'

window.appLocale = {
    
    messages:{...messages},
  
    // locale
    locale: 'en-US',
  
    antdMsg: antdEn,
    // 自定义 formates
    formats: {
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
        currency: 'USD',
      },
    },
  };
  
  export default window.appLocale;