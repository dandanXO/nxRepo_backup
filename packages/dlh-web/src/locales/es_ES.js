import messages  from './es_ES.json'
import antEs from 'antd/lib/locale/es_ES'

window.appLocale = {

  messages:{...messages},

  // locale
  locale: 'es-ES',

  antdMsg: antEs,
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
      currency: 'MXN',
    },
  },
};

export default window.appLocale;
