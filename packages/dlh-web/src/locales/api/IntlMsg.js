import {createIntl, createIntlCache} from 'react-intl'
import en_US from '../en_US';
import zh_CN from '../zh_CN';
import Cookies from "js-cookie";

const cache = createIntlCache();

export const intlMsg = (msgId) =>{
    const lang = Cookies.get("intllocale");

    let txt = '';
    let msg =  en_US.messages;
    if (String(lang) === 'cn'){
        msg = zh_CN.messages;
    }


    const intl = createIntl({locale: lang, messages : msg}, cache);
    txt = intl.formatMessage({id: msgId});
    return txt;
}



