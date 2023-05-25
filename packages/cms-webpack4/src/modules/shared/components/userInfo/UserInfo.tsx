import React, { useEffect, useState } from "react";
import { Card, Image, Descriptions, Table,Modal, Tooltip } from 'antd';
const { Item } = Descriptions;
import { useGetUserDetailQuery } from "../../api/UserInfoApi";
import { GetUserDetailResponse } from "../../api/userInfoTypes/getUserDetail";
import { UserId } from "../../domain/UserId";
import moment from "moment";
import { WaterMark } from '@ant-design/pro-components';
import { getAdminUser } from "../../storage/getUserInfo";
import { Typography } from 'antd';

const { Paragraph } = Typography;
const CardStyle = (props: { title: string, children }) => {
    const { title, children } = props;
    return (
        <Card title={title} type="inner" size="small" headStyle={{ fontWeight: 'bold' }} bodyStyle={{ padding: 0 }} style={{ marginTop: '24px' }}>
            {children}
        </Card>
    );
};

type UserInfoProps = {
    type?: string
} & UserId



const UserInfo = ({ userId, type }: UserInfoProps) => {

    const adminUserInfo = getAdminUser();
    const collector = adminUserInfo.data.phoneNo;

    const { currentData } = useGetUserDetailQuery({ userId });
    const imgError = "data:image/png;base64,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";

    const columns = [
        { title: '与本人关系', dataIndex: 'relationShip', key: 'relationShip', },
        { title: '联络人姓名', dataIndex: 'name', key: 'name', },
        { title: '联络人电话', dataIndex: 'phoneNr', key: 'phoneNr', },
        { title: '上传时间', dataIndex: 'updateTime', key: 'updateTime' , render(text) {
            return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss");
        } }
    ];
    const [userDetail, setUserDetail] = useState<GetUserDetailResponse>({
        emergencyContacts: [], personaInfoVo: {}, userDevice: {}, userImage: {}, userKycInfoVo: {}, userThirdInfo: {}, userRiskControlInfo: {}, userRiskControlInfos: []
    });
    useEffect(() => {
        if (currentData !== undefined) {
            setUserDetail(currentData);
        }
    }, [currentData]);

    const { personaInfoVo, userImage, userKycInfoVo, userDevice, emergencyContacts, userThirdInfo, userRiskControlInfo ,userRiskControlInfos } = userDetail;
    const { channelName = "", phoneNo = "", appName = "", nameTrue = "", gender = "", idcardNo = "", fatherName = "", birth = "", panId = "", email = "", education = "", marriageStatus = "", position = "", salaryRange = "", address = "", bankCardNo = "", ifscCode = "", addTime = "", userSource = "" } = personaInfoVo;
    const { idcardBackPhoto = "", idcardFrontPhoto = "", idcardPortraitPhoto = "", panPhoto = "" } = userImage;
    const { pan = "", idcard = "", isAuth = "", emergency = "", liveness = "", bank = "", kycFinishTime = "" } = userKycInfoVo;
    const { similarity = "" } = userThirdInfo;
    const { appVersion, deviceModel, osPlatform, osVersion } = userDevice;
    const [modal, contextHolder] = Modal.useModal();
    const warterMarkColor = appInfo.COUNTRY !== 'Pakistan' ? 'rgba(0,0,0,.6)' : 'rgba(244,133,78,.6)';
    const showImage = (img) => {
        if (!img) return;
        modal.info({
            icon: <></>,
            bodyStyle: { padding: '0' },
            closable: true,
            maskClosable: true,
            width: '60%',
            content: <WaterMark width={250} zIndex={100} content={[collector, moment().format('YYYY-MM-DD-HH:mm:ss')]}
                fontSize={32} fontColor={warterMarkColor} fontFamily={'Arial Black'}>
                <img src={img || "-"} width={'100%'} onContextMenu={(e) => e.preventDefault()} />
            </WaterMark>,
            className: 'modalImg'
        });

    };

    const renderImage = (img) => {
        return <WaterMark height={0} width={200} gapX={10} gapY={100} offsetLeft={0} offsetTop={100} content={`${collector} - ${moment().format('YYYY-MM-DD-HH:mm:ss')}`}  fontSize={12} fontColor={warterMarkColor} fontFamily={'Arial Black'}>
            <Image width={250} src={img || "-"} fallback={imgError} onClick={() => showImage(img)} preview={{ visible: false }} onContextMenu={(e)=> e.preventDefault()}/>
        </WaterMark>;
    };
    return currentData !== undefined && <div style={{ margin: '16px' }}>
        <CardStyle title="注册信息">
            <Descriptions size="small" bordered>
                <Item label="用户ID">{userDetail.userId || "-"}</Item>
                <Item label="注册渠道">{channelName || "-"}</Item>
                <Item label="注册包名">{appName || "-"}</Item>
                <Item label="手机号">{phoneNo || "-"}</Item>
                <Item label="注册时间">{addTime ? moment(addTime).format('YYYY-MM-DD HH:mm:ss') : "-"}</Item>
                <Item label="用户来源" >
                    {userSource ?
                        <Tooltip title={userSource}>
                            <Paragraph style={{ width: '150px' }} copyable={{ text: userSource }} ellipsis={true}>{userSource}</Paragraph>
                        </Tooltip> : '-'}
                </Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="身份信息">
            {contextHolder}
            <Descriptions size="small" bordered layout="vertical" column={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
                <Item label="PAN card" >{renderImage(panPhoto)}</Item>
                <Item label="Aadhaar card 正面">{renderImage(idcardFrontPhoto)}</Item>
                <Item label="Aadhaar card 反面">{renderImage(idcardBackPhoto)}</Item>
                <Item label="人像">{renderImage(idcardPortraitPhoto)}</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="认证状态">
            <Descriptions size="small" bordered layout="vertical" column={{ sm: 4, md: 8 }}>
                <Item label="税卡">{pan ? "是" : "否"}</Item>
                <Item label="身份证">{idcard ? "是" : "否"}</Item>
                <Item label="个人信息">{isAuth ? "是" : "否"}</Item>
                <Item label="联系人">{emergency ? "是" : "否"}</Item>
                <Item label="活体">{liveness ? "是" : "否"}</Item>
                <Item label="银行卡">{bank ? "是" : "否"}</Item>
                <Item label="人脸识别相似值">{similarity ? similarity : "-"}</Item>
                <Item label="认证完成时间">{kycFinishTime ? moment(kycFinishTime).format('YYYY-MM-DD HH:mm:ss') : "-"}</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="个人信息">
            <Descriptions size="small" bordered >
                <Item label="姓名">{nameTrue || "-"}</Item>
                <Item label="性别">{gender || "-"}</Item>
                <Item label="身份证号">{idcardNo || "-"}</Item>
                <Item label="父亲姓名">{fatherName || "-"}</Item>
                <Item label="出生日期">{birth || "-"}</Item>
                <Item label="税务证号">{panId || "-"}</Item>
                <Item label="教育程度">{education || "-"}</Item>
                <Item label="婚姻状况">{marriageStatus || "-"}</Item>
                <Item label="Email">{email || "-"}</Item>
                <Item label="职业">{position || "-"}</Item>
                <Item span={2} label="薪资范围">{salaryRange || "-"}</Item>
                <Item label="家庭地址">{address || "-"}</Item>
            </Descriptions>
        </CardStyle>
        {type === 'order' && userRiskControlInfos && <CardStyle title="风控信息">
            <Descriptions size="small" bordered >
                {
                    userRiskControlInfos.map((i, index) => {
                        return <>
                            <Item label={`风控应用 ${Number(index) + 1}`}>{i?.rcProvider || "-"}</Item>
                            <Item label="风控等級">{i?.riskRank || "-"}</Item>
                            <Item label="风控分数">{i?.riskScore === 0 || i?.riskScore ? i?.riskScore : "-"}</Item>
                            <Item label="可借款订单数">{i?.maxLoanApplyCount === 0 || i?.maxLoanApplyCount ? i?.maxLoanApplyCount : "-"}</Item>
                            <Item label="可借建议金额">{i?.maxAmount === 0 || i?.maxAmount ? i?.maxAmount : "-"}</Item>
                            <Item label="订单风控更新时间">{i?.orderReviewUpdateTime ? moment(i?.orderReviewUpdateTime).format('YYYY-MM-DD HH:mm:ss') : "-"}</Item>
                        </>;
                    })
                }
            </Descriptions>
        </CardStyle>}
        <CardStyle title="设备信息">
            <Descriptions size="small" bordered >
                <Item label="手机型号">{deviceModel || "-"}</Item>
                <Item label="操作系统版本">{osVersion || "-"}</Item>
                <Item label="客户端平台">{osPlatform || "-"}</Item>
                <Item label="安裝APP版本">{appVersion || "-"}</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="紧急联络人" >
            <Table dataSource={emergencyContacts} columns={columns} pagination={false} />
        </CardStyle>
        <CardStyle title="银行卡信息">
            <Descriptions size="small" bordered >
                <Item label="姓名">{nameTrue || "-"}</Item>
                <Item label="卡号">{bankCardNo || "-"}</Item>
                <Item label="IFSC Code">{ifscCode || "-"}</Item>
            </Descriptions>
        </CardStyle>
    </div>;
};

export default UserInfo;
