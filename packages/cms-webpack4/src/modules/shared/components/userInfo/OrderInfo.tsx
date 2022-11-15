import React, { useEffect, useState } from "react";
import { Card, Image, Descriptions, Tag } from 'antd';
const { Item } = Descriptions;
import { useGetUserDetailQuery } from "../../api/UserInfoApi";
import { GetUserDetailResponse } from "../../api/types/userInfoTypes/getUserDetail";
import { UserId } from "../../../../types/UserId";
import moment from "moment";
const CardStyle = (props: { title: string, children }) => {
    const { title, children } = props
    return (
        <Card title={title} type="inner" size="small" headStyle={{ fontWeight: 'bold' }} bodyStyle={{ padding: 0 }} style={{ marginTop: '24px' }}>
            {children}
        </Card>
    );
}

const OrderInfo = ({ userId }: UserId) => {

    const { currentData } = useGetUserDetailQuery({ userId });
    const imgError = "data:image/png;base64,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"

    const [userDetail, setUserDetail] = useState<GetUserDetailResponse>({ emergencyContacts: [], personaInfoVo: {}, userDevice: {}, userImage: {}, userKycInfoVo: {}, userThirdInfo: {} });
    useEffect(() => {
        if (currentData !== undefined) {
            setUserDetail(currentData)
        }
    }, [currentData]);
    const statusEnum = {
        '': { text: '不限' },
        '6': { text: '审核中', color: 'blue' },
        '7': { text: '审核拒绝', color: 'red' },
        '8': { text: '放款中', color: 'purple' },
        '9': { text: '还款中', color: 'blue' },
        '10': { text: '已完成', color: 'green' },
        '11': { text: '放款失败', color: 'red' },
        '12': { text: '已逾期', color: 'orange' },
    };
    const { personaInfoVo, userImage, userKycInfoVo, userDevice, emergencyContacts } = userDetail;
    const { channelName = "", phoneNo = "", appName = "", nameTrue = "", gender = "", idcardNo = "", fatherName = "", birth = "", panId = "", email = "", education = "", marriageStatus = "", position = "", salaryRange = "", address = "", bankCardNo = "", ifscCode = "",addTime="" } = personaInfoVo;
    const { idcardBackPhoto = "", idcardFrontPhoto = "", idcardPortraitPhoto = "", panPhoto = "" } = userImage;
    const { pan = "", idcard = "", isAuth = "", emergency = "", liveness = "", bank = "", kycFinishTime = "" } = userKycInfoVo;
    const { appVersion, deviceModel, osPlatform, osVersion } = userDevice;
    return currentData !== undefined && <div style={{ margin: '16px' }}>
        <CardStyle title="订单信息">
            <Descriptions size="small" bordered >
                <Item label="订单编号">{userDetail.userId || ""}</Item>
                <Item label="手机号">{channelName || ""}</Item>
                <Item label="申請渠道">{appName || ""}</Item>
                <Item label="APP名称">{phoneNo || ""}</Item>
                <Item label="申请产品">{phoneNo || ""}</Item>
                <Item label="订单状态">{phoneNo?<Tag color={statusEnum[6].color}>{statusEnum[6].text}</Tag>:''}</Item>
                <Item label="老客下单">{idcard ? "是" : "否"}</Item>
                <Item label="空放订单">{idcard ? "是" : "否"}</Item>
                <Item label="借款期限">{phoneNo || ""}</Item>
                <Item label="申请金额">{phoneNo || ""}</Item>
                <Item label="到帐金额">{phoneNo || ""}</Item>
                <Item label="应还金额">{phoneNo || ""}</Item>
                <Item label="申请时间">{moment(addTime).format('YYYY-MM-DD HH:mm:ss')}</Item>
                <Item label="审核时间">{moment(addTime).format('YYYY-MM-DD HH:mm:ss')}</Item>
                <Item label="放款时间">{moment(addTime).format('YYYY-MM-DD HH:mm:ss')}</Item>
                <Item label="到期时间">{moment(addTime).format('YYYY-MM-DD HH:mm:ss')}</Item>
                <Item label="逾期天数">{phoneNo || ""}</Item>
                <Item label="逾期金额">{phoneNo || ""}</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="还款证明" >
            <Descriptions size="small" bordered>
                <Item label="UTR" labelStyle={{width:150}} span={3}>{phoneNo || ""}</Item>
                <Item label="还款证明单据" labelStyle={{width:150}} span={3}><Image width={200} src={idcardPortraitPhoto || ""} fallback={imgError} /></Item>
            </Descriptions>
        </CardStyle>
    </div>
}

export default OrderInfo;
