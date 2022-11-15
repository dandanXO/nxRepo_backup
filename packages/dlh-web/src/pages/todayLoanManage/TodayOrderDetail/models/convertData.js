import moment from 'moment';
import {intlMsg} from '../../../../locales/api/IntlMsg';
const converData = (obj = {}) => {
    const { user = {} } = obj;
    return {
        orderNo: obj['orderNo'] || '',
        name: obj['userTrueName'] || '',
        phoneNo: obj['userPhone'] || '',
        loanMoney: obj['deviceMoney'],
        applyTime: obj['applyTime'] ? moment(Number(obj['applyTime']) * 1000).format('YYYY-MM-DD HH:mm:ss') : '',
        appName: obj['appName'] || '',
        loanTime: obj['loanTime'] ? moment(Number(obj['loanTime']) * 1000).format('YYYY-MM-DD HH:mm:ss') : '',
        accountMoney: obj['lendMoney'],
        standOverNumber: obj['lengNum'],
        overdueTime: obj['expireDays'],
        backMoney: obj['payable'],
        lateFees: obj['overMoney'],
        serviceMoney: obj['serviceMoney'],
        hasBackMoney: obj['payMoney'],
        surplusBackMoney: obj['leftMoney'],
        standOverMoney: obj['lengMoneyWithOverMoney'],
        backRecord: obj['rePaymentList'] || [],
        standOverRecord: obj['lengList'] || [],
        overdueRecord: obj['overdueList'] || [],
        icloud: obj['icloud'] || {},
        deviceModel: obj['deviceModel'],
        isOlduser: Number(user['isOlduser']) === 0 ? intlMsg("page.table.no") : intlMsg("page.table.yes"),
        deviceMemory: obj['deviceMemory'],
        bankInfo: obj['bank'],
        expireTime: obj['expireTime'] ? moment(Number(obj['expireTime']) * 1000).format('YYYY-MM-DD HH:mm:ss') : '',
    }
};
const userConvertData = (obj = {}) => {
    const { user = {}, userRealnameInfo = {}, userAuthInfo = {} } = obj;
    return {
        name: user['nameTrue'] || '',
        phoneNo: user['phoneNo'] || '',
        idCard: user['idcardNo'] || '',
        address: user['address'] || '',
        email: user['email'] || '',
        idCardFrontPhoto: userRealnameInfo['idcardFrontPhoto'] || '',
        idCardBackPhoto: userRealnameInfo['idcardBackPhoto'] || '',
        idCardPhoto: userRealnameInfo['livingPhoto'] || '',
        panPhoto: userRealnameInfo['panPhoto'] || '',
        tdreportDes: user['tdreportDes'],
        tdreportPoint: user['tdreportPoint'],
        marriageStatus: userAuthInfo['marriageStatus'],
        position: userAuthInfo['position'],
        salaryRange: userAuthInfo['salaryRange'],
        emergencyContactInfos: userAuthInfo['emergencyContactInfos'],
        education: userAuthInfo['education']
    };
}
export { converData, userConvertData };