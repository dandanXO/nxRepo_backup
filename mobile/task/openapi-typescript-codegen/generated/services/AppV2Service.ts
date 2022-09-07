/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {  } from '../models';
import type { AadhaarCrossPanVerifyCallback } from '../models/AadhaarCrossPanVerifyCallback';
import type { AadhaarVerifyCallback } from '../models/AadhaarVerifyCallback';
import type { APP_ } from '../models/APP_';
import type { AppInfoItem } from '../models/AppInfoItem';
import type { AudioList } from '../models/AudioList';
import type { BankAccountBindResponse } from '../models/BankAccountBindResponse';
import type { BindBandCardRequest } from '../models/BindBandCardRequest';
import type { Bluetooth } from '../models/Bluetooth';
import type { CalRecordItem } from '../models/CalRecordItem';
import type { ContactItem } from '../models/ContactItem';
import type { FileList } from '../models/FileList';
import type { GCT_ } from '../models/GCT_';
import type { ID_Card_OCR_ } from '../models/ID_Card_OCR_';
import type { IDCard_ } from '../models/IDCard_';
import type { IDCardIQCScanRequest } from '../models/IDCardIQCScanRequest';
import type { kyc_ } from '../models/kyc_';
import type { KycItemResponse } from '../models/KycItemResponse';
import type { LivenessCallback } from '../models/LivenessCallback';
import type { LivenessRequest } from '../models/LivenessRequest';
import type { LoanApplyDetail } from '../models/LoanApplyDetail';
import type { Location } from '../models/Location';
import type { LoginInfoRequest } from '../models/LoginInfoRequest';
import type { LoginInfoResponse } from '../models/LoginInfoResponse';
import type { LoginOrRegisterRequest } from '../models/LoginOrRegisterRequest';
import type { Network } from '../models/Network';
import type { OcrLicenseResponse } from '../models/OcrLicenseResponse';
import type { OTP_ } from '../models/OTP_';
import type { Page_ } from '../models/Page_';
import type { PAN_Card_OCR_ } from '../models/PAN_Card_OCR_';
import type { PanCard_ } from '../models/PanCard_';
import type { PanIQCScanRequest } from '../models/PanIQCScanRequest';
import type { PanVerifyCallback } from '../models/PanVerifyCallback';
import type { PhotoList } from '../models/PhotoList';
import type { QuestionnaireAnswer } from '../models/QuestionnaireAnswer';
import type { ReceiptUploadResponse } from '../models/ReceiptUploadResponse';
import type { SimCard } from '../models/SimCard';
import type { SmsItem } from '../models/SmsItem';
import type { SubmitOrderLoanRequest } from '../models/SubmitOrderLoanRequest';
import type { SystemInfo } from '../models/SystemInfo';
import type { VideoList } from '../models/VideoList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppV2Service {

    /**
     * 绑卡页
     * 绑卡页
     * @param appName
     * @param token
     * @returns string OK
     * @throws ApiError
     */
    public static bindBankCardUsingGet(
        appName?: string,
        token?: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/bank-card/bind',
            query: {
                'appName': appName,
                'token': token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * app首页
     * app首页接口，获取基本信息
     * @returns  OK
     * @throws ApiError
     */
    public static indexUsingGet(): CancelablePromise<> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/index',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * app初始化配置
     * @returns APP_ OK
     * @throws ApiError
     */
    public static initConfigUsingGet(): CancelablePromise<APP_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/init',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 後台多国语系
     * @param lang lang
     * @returns string OK
     * @throws ApiError
     */
    public static i18NUsingGet(
        lang?: string,
    ): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/init/i18n',
            query: {
                'lang': lang,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * APP UI Labels
     * @param lang lang
     * @returns string OK
     * @throws ApiError
     */
    public static appLabelsUsingGet(
        lang?: string,
    ): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/init/labels',
            query: {
                'lang': lang,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 绑定主卡
     * 绑定主卡
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static switchBankCardMainUsingPost(
        request: BindBandCardRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/bank-card/main',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 手机APP
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitAppsUsingPut(
        request: Array<AppInfoItem>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/apps',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 音频
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitAudiosUsingPut(
        request: AudioList,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/audios',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 蓝牙
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitBluetoothUsingPut(
        request: Bluetooth,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/bluetooth',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 通话记录
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitCallRecordUsingPut(
        request: Array<CalRecordItem>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/call-record',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 通讯录
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitContactsUsingPut(
        request: Array<ContactItem>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/contacts',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 挡案
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitFilesUsingPut(
        request: FileList,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/files',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * GPS定位
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitLocationUsingPut(
        request: Location,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/location',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 网路
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitNetworkUsingPut(
        request: Network,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/network',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 相册
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitPhotosUsingPut(
        request: PhotoList,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/photos',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * SIM卡
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitSimUsingPut(
        request: SimCard,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/sim',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 短信
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitSmsUsingPut(
        request: Array<SmsItem>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/sms',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 系统/装置
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitSystemUsingPut(
        request: SystemInfo,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/system',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 视频
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitVideosUsingPut(
        request: VideoList,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/device/videos',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 提交紧急联系人
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitEmergeContactsUsingPut(
        request: Array<>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/emerge-contact',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 提交aadhaar卡报告
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static aadhaarSuccessUsingPost(
        request: ,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/gct/aadhaar/success',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * A卡认证报告回调
     * @param callback callback
     * @returns any OK
     * @throws ApiError
     */
    public static aadhaarVerifyCallbackUsingPost(
        callback: AadhaarVerifyCallback,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/gct/callback/aadhaar',
            body: callback,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 活体认证报告回调
     * @param callback callback
     * @returns any OK
     * @throws ApiError
     */
    public static aadhaarCrossPanVerifyCallbackUsingPost(
        callback: AadhaarCrossPanVerifyCallback,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/gct/callback/aadhaar-cross-pan',
            body: callback,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 活体认证报告回调
     * @param callback callback
     * @returns any OK
     * @throws ApiError
     */
    public static livenessCallbackUsingPost(
        callback: LivenessCallback,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/gct/callback/liveness',
            body: callback,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * P卡认证报告回调
     * @param callback callback
     * @returns any OK
     * @throws ApiError
     */
    public static panVerifyCallbackUsingPost(
        callback: PanVerifyCallback,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/gct/callback/pan',
            body: callback,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 配置
     * @returns GCT_ OK
     * @throws ApiError
     */
    public static getConfigUsingGet(): CancelablePromise<GCT_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/kyc/gct/config',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 提交活体报告
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static livenessSuccessUsingPost(
        request: ,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/gct/liveness/success',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 提交pan卡报告
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static panSuccessUsingPost(
        request: ,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/gct/pan/success',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 关联KYC认证uid用户
     * @returns kyc_ OK
     * @throws ApiError
     */
    public static uidUsingGet(): CancelablePromise<kyc_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/kyc/gct/uid',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * AADHR身份证扫描提交 (IQC)
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static idCardIqcScanUsingPost(
        request: IDCardIQCScanRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/id/iqc',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * AADHAR身份证扫描结果确认
     * AADHAR身份证扫描结果确认
     * @returns ID_Card_OCR_ OK
     * @throws ApiError
     */
    public static idCardOcrReviewUsingGet(): CancelablePromise<ID_Card_OCR_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/kyc/id/review',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * AADHR身份证扫描提交
     * AADHAR身份证扫描提交
     * @param files
     * @param ocrType
     * @returns any OK
     * @throws ApiError
     */
    public static idCardUploadScanUsingPost(
        files?: Array<Blob>,
        ocrType?: 'advance' | 'gct' | 'mobi',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/id/scan',
            query: {
                'files': files,
                'ocrType': ocrType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * AADHAR身份证扫描提交结果确认
     * AADHAR身份证扫描提交结果确认
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static idCardOcrSubmitUsingPost(
        request: IDCard_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/id/submit',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * KYC认证项目
     * @returns KycItemResponse OK
     * @throws ApiError
     */
    public static kycItemUsingGet(): CancelablePromise<KycItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/kyc/items',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 人脸识别认证
     * 人脸识别认证
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static livenessUsingPost(
        request: LivenessRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/liveness',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * OCR授權密鑰
     * @returns OcrLicenseResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static getLicenseUsingPost(): CancelablePromise<OcrLicenseResponse | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/ocr/license',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描提交(IQC)
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static panCardIqcScanUsingPost(
        request: PanIQCScanRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/pan/iqc',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描结果确认
     * Pan税卡扫描结果确认
     * @returns PAN_Card_OCR_ OK
     * @throws ApiError
     */
    public static panCardOcrReviewUsingGet(): CancelablePromise<PAN_Card_OCR_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/kyc/pan/review',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描提交
     * Pan税卡扫描提交
     * @param files
     * @param ocrType
     * @returns any OK
     * @throws ApiError
     */
    public static panCardOcrScanUsingPost(
        files?: Blob,
        ocrType?: 'advance' | 'gct' | 'mobi',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/pan/scan',
            query: {
                'files': files,
                'ocrType': ocrType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Pan税卡扫描结果确认
     * Pan税卡扫描结果确认
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static panCardOcrSubmitUsingPost(
        request: PanCard_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/kyc/pan/submit',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 提交個人信息
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitPersonalInfoUsingPut(
        request: Array<>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/personal-info',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 個人信息問題列表
     * @returns  OK
     * @throws ApiError
     */
    public static getPersonalInfoItemsUsingGet(): CancelablePromise<Array<>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/kyc/personal-info/items',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 提交问卷答案
     * @param answers answers
     * @returns any OK
     * @throws ApiError
     */
    public static submitQuestionnaireAnswerUsingPut(
        answers: Array<QuestionnaireAnswer>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/kyc/questionnaire/answer',
            body: answers,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 問券列表
     * @returns  OK
     * @throws ApiError
     */
    public static questionnaireItemsUsingGet(): CancelablePromise<Array<>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/kyc/questionnaire/items',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 申請借款詳情
     * @param productId 產品ID
     * @returns LoanApplyDetail OK
     * @throws ApiError
     */
    public static loanApplyDetailUsingGet(
        productId: string,
    ): CancelablePromise<LoanApplyDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/loan/apply/detail',
            query: {
                'productId': productId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 待款訂單詳情
     * @param orderNo 訂單號
     * @returns  OK
     * @throws ApiError
     */
    public static getLoanDetailUsingGet(
        orderNo?: string,
    ): CancelablePromise<> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/loan/detail',
            query: {
                'orderNo': orderNo,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 貸款紀錄列表
     * @param pageNumber 頁碼, default: 0
     * @param pageSize 一頁幾筆紀錄, default: 10
     * @param status 貸款紀錄狀態Filter
     * @returns Page_ OK
     * @throws ApiError
     */
    public static getLoanRecordsUsingGet(
        pageNumber?: number,
        pageSize?: number,
        status?: 'PROCESSING' | 'UNPAID' | 'EXTEND' | 'OVERDUE' | 'PAY_OFF',
    ): CancelablePromise<Page_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/loan/records',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'status': status,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 提交订单
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitOrderLoanUsingPost(
        request: SubmitOrderLoanRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/loan/submit-order',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取用户信息接口
     * 获取用户信息接口
     * @returns LoginInfoResponse OK
     * @throws ApiError
     */
    public static getInfoUsingGet(): CancelablePromise<LoginInfoResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/login/info',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 直接发送短信验证码接口
     * 直接发送短信验证码接口
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static sendVerifyCodeUsingPost1(
        request: OTP_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/login/opt-code',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 短信登录／注册接口
     * 短信登录／注册接口
     * @param request request
     * @returns  OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginOrRegisterUsingPost(
        request: LoginOrRegisterRequest,
    ): CancelablePromise< | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/login/register',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 注销登录
     * 注销登录接口
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static logoutUsingPost(
        request: LoginInfoRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/login/user/logout',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 还款页
     * 还款页
     * @param appName appName
     * @param isLeng isLeng
     * @param orderNo orderNo
     * @param token token
     * @param version version
     * @returns string OK
     * @throws ApiError
     */
    public static refundUsingGet(
        appName?: string,
        isLeng?: boolean,
        orderNo?: string,
        token?: string,
        version?: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/payment/refund',
            query: {
                'appName': appName,
                'isLeng': isLeng,
                'orderNo': orderNo,
                'token': token,
                'version': version,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 還款證明
     * @param orderNo 訂單號
     * @returns ReceiptUploadResponse OK
     * @throws ApiError
     */
    public static getReceiptUsingGet(
        orderNo: string,
    ): CancelablePromise<ReceiptUploadResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/repay/receipt',
            query: {
                'orderNo': orderNo,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上傳還款證明
     * @param file 照片(optional)
     * @param orderNo 訂單號
     * @param receipt 明細
     * @returns ReceiptUploadResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static receiptUploadUsingPost(
        file?: Blob,
        orderNo?: string,
        receipt?: string,
    ): CancelablePromise<ReceiptUploadResponse | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/repay/receipt',
            formData: {
                'file': file,
                'orderNo': orderNo,
                'receipt': receipt,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 審核拒絕
     * @returns any OK
     * @throws ApiError
     */
    public static rejectedProcessUsingPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/review/rejected',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取绑定银行卡
     * 获取绑定银行卡
     * @returns BankAccountBindResponse OK
     * @throws ApiError
     */
    public static getBankUsingGet(): CancelablePromise<BankAccountBindResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/user/bank-card',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取用户审核记录
     * 获取用户审核记录
     * @returns  OK
     * @throws ApiError
     */
    public static getUserProcessUsingGet(): CancelablePromise<Array<>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/user/process',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
