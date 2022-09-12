import React, { Component } from 'react';
import { IntlProvider} from "react-intl";
import en_US from '../en_US';
import zh_CN from '../zh_CN';
import { LocaleProvider } from 'antd';
import {axios} from 'utils';



const Context = React.createContext();

let updStatus = null;

class IntlProviderWrapper extends Component{
    constructor(...args){
        super(...args);

        let userLang = navigator.language || navigator.userLanguage;
        let initLnag, initMsg, initAntdMsg;

        this.switchToEN = () =>{
          this.changeLange("en", en_US.messages, en_US.antdMsg);
        }

        this.switchToCN = () =>{
          this.changeLange("cn", zh_CN.messages, zh_CN.antdMsg);
        }

        console.log("lang="+userLang);
        if (String(userLang).startsWith("zh")){
          this.initLnag = 'cn';
          this.initMsg = zh_CN.messages;
          this.initAntdMsg = zh_CN.antdMsg;
        }else{
          this.initLnag = 'en';
          this.initMsg = en_US.messages;
          this.initAntdMsg = zh_CN.antdMsg;
        }

        this.saveLang(String(this.initLnag).toString());

        this.state ={
            locale : this.initLnag,
            messages : this.initMsg,
            antdMsg : this.initAntdMsg,
            switchToCN : this.switchToCN,
            switchToEN : this.switchToEN
        };

        
        
    } 

    setRemoteLang =(e) =>{
      let instance = axios.create();
      instance.interceptors.response.use(null);
      instance.post('/hs/intl/i18n', {lang : e}, { baseURL : '/','Content-Type': 'application/json',})
              .then((res) =>{
                if (Number(res.data.code) === 200){
                  window.sessionStorage.setItem('updSessionLocale', 'true');
                  clearInterval(updStatus);
                  updStatus = null;
                }else{
                  window.sessionStorage.setItem('updSessionLocale', 'false');
                }
              }).catch((error) =>{
                  console.log(error);
              })
    }

    chkUpdateLang = () =>{
      const updLocale = window.sessionStorage.getItem('updSessionLocale');
      if (updLocale === 'false'){
        this.setRemoteLang(window.sessionStorage.getItem('intllocale'));
      }
    }

    saveLang = (lan) =>{
      window.sessionStorage.setItem('intllocale', lan );
      window.sessionStorage.setItem('updSessionLocale', 'false');
      if (updStatus == null){
        setInterval(this.chkUpdateLang, 8000);
      }
    } 

    changeLange = (lan, msg, antdMsg) =>{
      this.setState({ locale: lan, messages : msg, antdMsg : antdMsg});
      this.saveLang(lan);
    }
    
    render() {
        const { children } = this.props;
        const { locale, messages, antdMsg } = this.state;
        return (
          <Context.Provider value={this.state}>
            <LocaleProvider locale = {antdMsg}>
              <IntlProvider key={locale}
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