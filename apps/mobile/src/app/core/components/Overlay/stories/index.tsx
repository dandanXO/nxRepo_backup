import React from "react";
import styled from "styled-components";
import Overlay from "../index";

// Global
const textContent =
    "尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先进行绑卡?!";
const longTextContent =
    "尊尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先";
const htmlContnet = `<span style="text-align: left">尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先<span style="cursor: pointer;color: #fff15b;text-decoration: underline;">进行绑卡</span>?!</span>`;
const content = `<span style="text-align: left">尊敬的用户，由于您尚未绑定银行卡，将无法获取活动赠送礼金，是否先<span cursor: pointer;color: #fff15b;text-decoration: underline;>进行绑卡</span>?!</span>`;
const longContent = content + content + content + content;

// Demo
const Button = styled.button`
    font-size: 30px;
    margin: 0 10px;
`;

const HelloButton = styled.button`
    background: pink;
    border-radius: 5px;
    width: 50px;
    color: red;
`;
const LinkedButton = styled.span`
    cursor: pointer;
    color: skyblue;
    text-decoration: underline;
`;

// Custom
const Popover = styled.div`
    background: pink;
    color: #fff;
    /* height: 500px; */
    width: 10000px;
`;

export {
    textContent,
    longTextContent,
    htmlContnet,
    content,
    longContent,
    Button,
    HelloButton,
    LinkedButton,
    Popover,
    // Modal
    Overlay,
};
