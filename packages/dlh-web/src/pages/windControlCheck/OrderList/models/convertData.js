import moment from 'moment';
import {orderStatus} from 'utils';

const convertBaseInfo = (obj) => {
    let { user = {}, bank = {}, userRealnameInfo = {}, icloudImg = {}, icloud = {},userRiskD={},userRmsRiskX={}} = obj;
    user = user  || {};
    bank = bank || {};
    userRealnameInfo = userRealnameInfo || {};
    icloudImg = icloudImg || {};
    // console.log(icloud)
    icloud = icloud || {};
    return {
        orderNumber: obj.orderNo,
        userId: obj.userId,
        productName: obj.productName,
        applicationMoney: obj.deviceMoney,
        applicationTime: moment(Number(obj.applyTime) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        applicationDays: obj.lendDays,
        loanOption: orderStatus[obj.status],
        checkPerson: obj.examiner2Name,
        hasGiveMoney: obj.lendMoney,
        deviceMemory: obj['deviceMemory'],
        appName: obj.appName,

        customerName: user['nameTrue'],
        iphoneNumber: obj['userPhone'],
        idCard: obj['userIdcard'],
        iphoneType: obj['deviceModel'],
        canLoanMoney: obj.deviceMoney,
        email: user['email'],
        source: obj.channelName,
        address: user['address'],

        bankCardType: '储蓄卡',
        bank: bank['bankName'],
        cardNumber: bank['bankCardNo'],
        bankIphoneNumber: obj['userPhone'],
        addTime: moment(Number(bank['addTime'])*1000).format('YYYY-MM-DD HH:mm:ss'),

        idCardFront: userRealnameInfo['idcardFrontPhoto'],
        idCardBack: userRealnameInfo['idcardBackPhoto'],
        frontPic: userRealnameInfo['livingPhoto'],
        score: user['tdreportPoint'],
        riskLevel: user['tdreportDes'] || '',
        zhimafen: user['zhimafen'],
        icloudImg1: icloudImg['image1'] || '',
        icloudImg2: icloudImg['image2'] || '',
        icloud: icloud,
        modelScore5:obj['modelScore5'],
        modelScore6:obj['modelScore6'],
        modelScore7:obj['modelScore7'],
        modelScore8:obj['modelScore8'],
        userRiskD:userRiskD,
        userRmsRiskX : userRmsRiskX


    }
}
export { convertBaseInfo };