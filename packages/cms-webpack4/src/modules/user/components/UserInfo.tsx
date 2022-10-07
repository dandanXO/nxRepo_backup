import React, { Children, ReactComponentElement } from "react";
import { Card, Col, Form, Input, Modal, Row, Select, Tabs, Image, Descriptions } from 'antd';
const { Item } = Descriptions;
import { useGetUserDetailQuery } from "../api/UserApi";
import { useParams } from "react-router-dom";
import { GetUserDetailRequestQuerystring } from '../api/types/getUserDetail';
import { GetUserId } from "../api/types/getUserId";
const CardStyle = (props: { title: string, children }) => {
    const { title, children } = props
    return (
        <Card title={title} type="inner" size="small" headStyle={{ fontWeight: 'bold' }} bodyStyle={{ padding: 0 }} style={{ marginTop: '24px' }}>
            {children}
        </Card>
    );
}

const UserInfo = ({userId}:GetUserId) => {

    const { currentData } = useGetUserDetailQuery({ userId });
    const imgError = "data:image/png;base64,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"
    
    // console.log('currentData',userId)
    return <div style={{ margin: '16px' }}>
        <CardStyle title="注册信息">
            <Descriptions size="small" bordered >
                <Item label="用户ID">764764</Item>
                <Item label="注册渠道">Android orginal install</Item>
                <Item label="注册包名">APP name</Item>
                <Item label="手机号">9641766099</Item>
                <Item label="注册时间">2022-08-19 08:03:12</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="身份信息">
            <Descriptions size="small" bordered layout="vertical" column={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
                <Item label="PAN card"><Image width={200} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" fallback={imgError} /></Item>
                <Item label="Aadhaar card 正面"><Image width={200} src="" fallback={imgError} /></Item>
                <Item label="Aadhaar card 反面"><Image width={200} src="" fallback={imgError} /></Item>
                <Item label="人像"><Image width={200} src="" fallback={imgError} /></Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="认证状态">
            <Descriptions size="small" bordered layout="vertical" column={{ sm: 4, md: 8 }}>
                <Item label="税卡">是</Item>
                <Item label="身份证">是</Item>
                <Item label="个人信息">否</Item>
                <Item label="联系人">否</Item>
                <Item label="活体">是</Item>
                <Item label="银行卡">是</Item>
                <Item label="认证完成时间">2022-08-19 08:03:12</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="个人信息">
            <Descriptions size="small" bordered >
                <Item label="姓名">Saurabh Singdh</Item>
                <Item label="性别">Male</Item>
                <Item label="身份证号">543661819999</Item>
                <Item label="父亲姓名">Father NameNameName</Item>
                <Item label="出生日期">1991-09-09</Item>
                <Item label="税务证号">FTASP0909Q</Item>
                <Item label="教育程度">University Degree</Item>
                <Item label="婚姻状况">unmarried</Item>
                <Item label="小孩个数">0</Item>
                <Item label="职业">Worker</Item>
                <Item label="薪资范围">15,000 - 30,000</Item>
                <Item label="Email">mail@mail.com</Item>
                <Item label="家庭地址">Regional Head Quarter, Galphadevi Temple Ro Worli Colony P.o, Prabhadevi</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="设备信息">
            <Descriptions size="small" bordered >
                <Item label="手机型号">samsungSM-J810</Item>
                <Item label="操作系统版本">12.5</Item>
                <Item label="客户端平台">Android</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="紧急联络人">
            <Descriptions size="small" bordered layout="vertical" column={{ xs: 2, md: 4 }}>
                <Item label="与本人关系">Father<br /><hr /> Mother</Item>
                <Item label="联络人姓名">Father NameNameName</Item>
                <Item label="联络人电话">6609996417</Item>
                <Item label="上传时间">2022-08-19 08:03:12</Item>
            </Descriptions>
        </CardStyle>
        <CardStyle title="银行卡信息">
            <Descriptions size="small" bordered >
                <Item label="姓名">Saurabh Singdh</Item>
                <Item label="卡号">20236613333</Item>
                <Item label="IFSC Code">98729102948</Item>
            </Descriptions>
        </CardStyle>
    </div>
}

export default UserInfo;
