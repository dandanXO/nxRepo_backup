import moment from 'moment';
import { orderStatus } from 'utils';

const data = {
    "code": 200,
    "data": {
        "examiner3Id": 0,
        "expireTime": 193361,
        "remark": "",
        "blackBox": "eyJlcnJvck1zZyI6IkVycm9yIERvbWFpbj1jb2xsZWN0aW9uIHVuZmluaXNoZWQgQ29kZT0wIFwiKG51bGwpXCIiLCJvcyI6ImlPUyIsImJsYWNrQm94IjoiVFI5UTczNFwvV1lnN2NQYjBVVFNMcFwvandvVnhiK2Q1U2pyNVVnSG5rVldJWVN4ZXMra29MeUNob1ExbEo3bVwvZ1VFZDlHXC9lamdDVjd5VXdGM3d5VGVmaXBoOE5BSTg4d0FYc2VSUmNqeHk2M1pYY3p4NkhVc2pycUhMcnE2cjFVS2V4RVwvek5jMGpVSjI5cWFPYUNVWjlFY1R2QWs5d3VvRGFybEVtTElDNGN2b0sxM2RrVmZcLzNRMVBMcFBCTXBSdXZUaytxQUU5RFFDbUxuaCs1QjY0RWpjM2lOaHl4TXdNRVRZMlJQMUlHT3VESnRpbVhSemFjT2M1dDc5Ukh5cEVINnEwRWx3XC91cUpuTlRVU01XakxHMWY2VGRMdGlPMENWWjV4aEZFbmV6dFFjTWdzd3p1QUFDdm1wTm9wcnk5a1wvYlJlNFhuajIrazJMbXJUaEJzUEdoOEtReHJUaDFNU0ZQMlJcL2FWTDhNUWhVOXYzUlZ0RFgyeUFwaGM2a2MwS1wvUFM0V2MxcXl6aWRhYkF5NUp0ZTBHN2p5b1lsY0txbjZoZGNzVWRzd096T1pZMGpvN0Y0dDcxdHowd1pvTmJ0RlV3YytDVFhyTlZSYnJkbVhtUURGMzFrV1lSUkRNblwvclRETDB3QkFVWjM0YzJ2c1wvWmYwTjFOXC9OVEtybUFjb1lOb1RocWlMOVFjejJPc0pnRVdUT1JWXC9oYm4wSk5hdURRXC9aZTRHQWtJWXlnU0s3RExONDlkSmRGaEtvR0p5VmZQbjdhNVJnMllDT2p2VnJubmlYSHc1YnBlcmI1YnlGV3VwQlMzNmNFZ2tsdHBGZ1doNWhYMHYrMHFjRzNlWUx1eUpzallHMEVkclZ4djNMWWRoa1VCRzdcL1BDQ0FVRGk3VEdvNmVvRjNLMnd3c3VITklvbU1qQmhZQWNucXlwbDJDZ1llWW5VWCtwOXd5SFZJb3JlbnhpS0ZlOFNPdkZ1Z0dDWUhUdFwvVWRJbXp6dXFUeHhyc1wvajR5dHdOUElSYjA2S1pkS014MGJYdTI3Y2U1bEpZT3RUcG5NV2Q1RFFlTktOd3NycjczYnV0aU5YQ3BSdUhSXC8xMFNmbnVtREI4ODRFdE9ybU5oa0F0V2lzVkMyNGtlcWE4d2tuYVFXaDF5YkdrczRDQjYydnhuWERLbDJZK2tnZ3NtT2xxVFF2dXNhR1gzVm5MS3IwSVVhQ1ZiUmpSVSt6R2pZZW1GcUhDSTFjTTRYdTJSa3VqRkcrOFNRXC91cTlmb0I4QVJxdEIxb2txMVJBSFdQemg5NytBeGJBVXdJUDdwS01FS0ROUlU4R0U1QU9hanZ6WkFDN2NyUnVPZ2hYRFJGZWVWSUhJY1pNN3pGQmk0ekFjVHBhYkh0VkRWQk5xS2NyaU9YbHM1Z290TitoTlNOb3k3Z2NxMkZcL3BDeWJJckR1SlErWDZxbFBvR0RXd1ArZTlQelJGNWNtR2lZNXlSMlhzVFhvb25pa1pwZlduclMrWTNVK2hhbThBczJsK1lyVG5zbVk4cWRSSGpJMEhHRkpkSEwwZ2RjWDAxQlNDNE9JWkZ5SGVGRWF5Vk52ZWhGc3FhN29CTGRPaVN1bGNCV3N6MUN6bXZlVm5qUDc0dE40ZDBYVjNaNmJsUE9kRVVTakFsU3RwMWl1SXRiSHYwYTdrMTgrcjQwdVlMbk1pelQ4ZDFaQlhMYWNXd2w5SWtSR2RjdVwvTlVLVTE5NnFyYkJ5S0RJWDA0ZlRPTmoybHVMUz0iLCJ2ZXJzaW9uIjoiMy4xLjAifQ==",
        "deviceModel": "iPhone X",
        "enable": 1,
        "applyTime": 1524301951,
        "examiner3Name": "",
        "deviceMoney": 3000,
        "id": 87,
        "serviceMoney": 0,
        "deviceName": "iPhone X",
        "userRealnameInfo": {
            "taskId": "RN7DvVVRDTE0vFhS",
            "birthday": "1992.04.12",
            "enabled": 1,
            "idcardBackPhoto": "idcardBackPhoto.jpg",
            "validityPeriod": "2010.12.15-2020.12.15",
            "idcardFrontPhoto": "idcardFrontPhoto.jpg",
            "idName": "孔赵壮",
            "idcardNo": "411425199204125495",
            "nation": "汉",
            "authResult": "T",
            "livingPhoto": "livingPhoto.jpg",
            "id": 277,
            "address": "河南省虞城县李老家乡孔堂村51号",
            "userId": 395,
            "partnerCode": "",
            "age": 0,
            "similarity": 0.8032,
            "livingAttack": "0",
            "gender": "男",
            "failReason": "",
            "verifyStatus": 0,
            "issuingAuthority": "庹城县公安局",
            "idcardPortraitPhoto": "idcardPortraitPhoto.jpg",
            "addTime": 1524301411
        },
        "processList":  [
            {
            "id": 375,
            "content": "审核未通过",
            "enabled": 1,
            "title": "审核未通过",
            "operatorId": "395",
            "expressNo": "",
            "expressName": "",
            "sortNo": 0,
            "orderId": 87,
            "addTime": 1524301982
        }, {
            "id": 374,
            "content": "提交订单",
            "enabled": 1,
            "title": "提交订单",
            "operatorId": "395",
            "expressNo": "",
            "expressName": "",
            "sortNo": 0,
            "orderId": 87,
            "addTime": 1524301952
        }],
        "isOlduser": 0,
        "userId": 395,
        "examiner1Name": "",
        "userPhone": "13121159180",
        "bank": {
            "id": 378,
            "icon": "http://mybk.weijingjurong.top/app/bankimg/icon/zhongguoYH.png",
            "enabled": 1,
            "updateTime": 1524301459,
            "remark": "",
            "bankPhone": "",
            "userId": 395,
            "background": "http://mybk.weijingjurong.top/app/bankimg/background/zhongguoYH.png",
            "bankName": "中国银行",
            "bankCardNo": "7582564",
            "addTime": 1524301459
        },
        "deviceMemory": "256",
        "channelName": "",
        "examiner2Id": 0,
        "status": 4,
        "channelId": 0,
        "deviceCode": "88E60CA8-1481-4AF6-80A4-4A45F28CC794",
        "examiner1Id": 0,
        "userTrueName": "孔赵壮",
        "refundReason": "同盾没通过",
        "examiner2Name": "",
        "orderNo": "499329389615478",
        "userIdcard": "411425199204125495",
        "loanTime": 0,
        "lendDays": 7,
        "user": {
            "tdreportPoint": 0,
            "remark": "",
            "statusYys": 1,
            "idcardNo": "32038119911010731X",
            "nameNick": "",
            "password": "",
            "id": 394,
            "balance": 0,
            "idcardExamineTime": 0,
            "token": "F1D5A2C17A70D92299CF5DFBD6F929A4",
            "isOlduser": 0,
            "ssq": "",
            "statusContacts": 1,
            "tdreportDes": "",
            "lastLoginTime": 0,
            "lat": 0,
            "statusIdcard": 1,
            "icon": "",
            "enabled": 1,
            "channelName": "",
            "lon": 0,
            "statusBank": 1,
            "updateTime": 1524301390,
            "status": 0,
            "servicePwd": "",
            "channelId": 0,
            "clientInfo": "",
            "appName": "appName",
            "phoneNo": "17710311658",
            "email": "",
            "address": "江苏省新沂市双塘镇高塘村八组25号",
            "nameTrue": "吴欣隆",
            "registerDeviceCode": "",
            "idcardExaminerId": 0,
            "salt": "",
            "addTime": 1524301345,
            "openId": "12345"
        },
        "lendMoney": 2250,
        "addTime": 1524301951,
        "handler": {}
    }
}
const convertBaseInfo = (obj) => {
    let { user = {}, bank = {}, userRealnameInfo = {}, userAuthInfo={}, userThirdInfoVo={}, isCertified} = obj;
    bank = bank || {};
    userRealnameInfo = userRealnameInfo || {};
    userAuthInfo = userAuthInfo || {};
    userThirdInfoVo = userThirdInfoVo || {};
    return {
        userId: obj.id,
        productName: obj.deviceModel,
        applicationMoney: obj.deviceMoney,  // ???????????????
        applicationTime: moment(Number(obj.applyTime) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        applicationDays: obj.lendDays,
        // serviceMoney: obj.serviceMoney,
        loanOption: orderStatus[obj.status],
        checkPerson: obj.examiner2Name,
        hasGiveMoney: obj.lendMoney,
        deviceMemory: obj['deviceMemory'],

        customerName: obj['nameTrue'],
        iphoneNumber: obj['phoneNo'],
        idCard: obj['idcardNo'],
        iphoneType: obj['deviceModel'],
        canLoanMoney: obj.deviceMoney,   // ??????????????????????
        email: obj['email'],
        source: obj.channelId,     //
        address: obj['address'],
        birthday: userRealnameInfo['birthday'],
        zodiac: obj['zodiac'] || '',
        deviceName: obj['deviceName'],

        bankCardType: '储蓄卡',  //????????????
        bank: bank['bankName'],
        cardNumber: bank['bankCardNo'],
        bankIphoneNumber: obj['userPhone'],
        addTime: moment(Number(bank['addTime'])*1000).format('YYYY-MM-DD HH:mm:ss'),

        idCardFront: userRealnameInfo['idcardFrontPhoto'],
        idCardBack: userRealnameInfo['idcardBackPhoto'],
        frontPic: userRealnameInfo['livingPhoto'],
        panPic: userRealnameInfo['panPhoto'],
        // score: obj['tdreportPoint'],
        // riskLevel: obj['tdreportDes'] || '',
        // zhimafen: obj['zhimafen'],
        similarity: userRealnameInfo['similarity'],
        channelName: obj['channelName'],
        userAuthInfo: userAuthInfo,
        salary: (userAuthInfo['salaryRange'] + '') || '',
        providerDisplayName: (userAuthInfo['providerDisplayName'] + '') || '',
        score: (userAuthInfo['score'] + '') || '',
        // bluelight: userThirdInfoVo['bluelight'],
        // destiny: userThirdInfoVo['destiny'],
        // epochScore: userThirdInfoVo['epochScore'],
        // shenDunscore: userThirdInfoVo['shenDunScore'],
        // customizedScore: userThirdInfoVo['customizedScore'],
        // creditReportScore: userThirdInfoVo['creditReportScore'],

        isCertified
    }
}
const convertICloud = (obj = {}) => {
    const icloud = obj['icloud'] || null;
    const icloudImg = obj['icloudImg'] || {};
    const imgArr = [icloudImg['image1'], icloudImg['image2']];
    let img = [];
    imgArr.forEach(item => {
        if(item && String(item).indexOf('/null?') === -1) {
            img.push(item);
        }
    })
    return {
        accountInfo: icloud ? [icloud] : [],
        picList: img
        // picList:
    }
}

export { convertBaseInfo, convertICloud }
