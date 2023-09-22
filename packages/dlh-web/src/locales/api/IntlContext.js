import { LocaleProvider } from 'antd';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { axios } from 'utils';

import en_US from '../en_US';
import zh_CN from '../zh_CN';
import es_ES from "../es_ES";

const Context = React.createContext();

let updStatus = null;

class IntlProviderWrapper extends Component {
  constructor(...args) {
    super(...args);

    let userLang =
      Cookies.get('intllocale') || navigator.language || navigator.userLanguage;
    let initLnag, initMsg, initAntdMsg;

    this.switchToEN = () => {
      this.changeLange('en', en_US.messages, en_US.antdMsg);
    };

    this.switchToCN = () => {
      this.changeLange('cn', zh_CN.messages, zh_CN.antdMsg);
    };

    this.switchToES = () => {
      this.changeLange('es', es_ES.messages, es_ES.antdMsg);
    };

    console.log('lang=' + userLang);
    if (userLang === 'cn' || String(userLang).startsWith('zh')) {
      this.initLnag = 'cn';
      this.initMsg = zh_CN.messages;
      this.initAntdMsg = zh_CN.antdMsg;
    } else if(userLang === 'es') {
      this.initLnag = 'es';
      this.initMsg = es_ES.messages;
      this.initAntdMsg = es_ES.antdMsg;
    }
    else {
      this.initLnag = 'en';
      this.initMsg = es_ES.messages;
      this.initAntdMsg = es_ES.antdMsg;
    }

    this.saveLang(String(this.initLnag).toString());

    this.state = {
      locale: this.initLnag,
      messages: this.initMsg,
      antdMsg: this.initAntdMsg,
      switchToCN: this.switchToCN,
      switchToEN: this.switchToEN,
      switchToES: this.switchToES
    };
  }

  setRemoteLang = (e) => {
    let instance = axios.create();
    instance.interceptors.response.use(null);
    instance
      .post(
        '/hs/admin/intl/i18n',
        { lang: e },
        { baseURL: '/', 'Content-Type': 'application/json' }
      )
      .then((res) => {
        if (Number(res.data.code) === 200) {
          Cookies.set('updSessionLocale', 'true');
          clearInterval(updStatus);
          updStatus = null;
        } else {
          Cookies.set('updSessionLocale', 'false');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  chkUpdateLang = () => {
    const updLocale = Cookies.get('updSessionLocale');
    if (updLocale === 'false') {
      this.setRemoteLang(Cookies.get('intllocale'));
    }
  };

  saveLang = (lan) => {
    Cookies.set('intllocale', lan);
    Cookies.set('updSessionLocale', 'false');
    if (updStatus == null) {
      setInterval(this.chkUpdateLang, 8000);
    }
  };

  changeLange = (lan, msg, antdMsg) => {
    this.setState({ locale: lan, messages: msg, antdMsg: antdMsg });
    this.saveLang(lan);
  };

  render() {
    const { children } = this.props;
    const { locale, messages, antdMsg } = this.state;
    return (
      <Context.Provider value={this.state}>
        <LocaleProvider locale={antdMsg}>
          <IntlProvider
            key={locale}
            locale={locale}
            messages={messages}
            defaultLocale="en"
          >
            {children}
          </IntlProvider>
        </LocaleProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };
