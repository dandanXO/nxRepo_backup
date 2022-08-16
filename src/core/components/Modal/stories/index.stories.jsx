
import React, { useState, useCallback } from "react";
import {
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
    Modal,
} from "./index";

import { storiesOf } from "@storybook/react";

import CustomModal from "./CustomModal";
import CustomComponent from "./CustomComponent";
import FixedLongContentComponent from "./FixedLongContentComponent";
import ModalModeDemo from "./ModalModeDemo";
import CustomModalDemo from "./CustomModalDemo";
import ModalTypeDemo from "./ModalTypeDemo";
import DefaultModalDemo from "./DefaultModalDemo";
import ModelDemo from "./ModelDemo";
import MaskModalDemo from "./MaskModalDemo";
import AllCallMethodModal from "./AllCallMethodModal";
import RenderAndCallMethodModal from "./RenderAndCallMethodModal";
import {AppThemeProvider} from "../../index";
import styled from "styled-components";

const unistarTheme = {
    custom: {
        text: {
            primary: "#fff",
            secondary: "#fff",
        },
        // fontfamily: "Rubik",
        font: {

        },
        background: {
            primary: "rgba(45, 59, 88, 0.85)"
        },
        button: {
            primary: {
                background: "#f58b10",
                text: "f58b10",
            },
            secondary: {
                background: "",
                text: "",
            },
            alert: {
                background: "#f58b10",
                text: "f58b10",
            }
        }
    }
}
storiesOf("Modal", module)
    .add("特製版", () => {
        const Paragraph = styled.div`
            margin-bottom: 10px;
        `;
        return (
            <AppThemeProvider>
                <div>
                    <div>Property: confirmText, cancelText</div>
                    <div>Value: string</div>
                    <Modal
                        show={true}
                        mode="alert"
                        type="confirm"
                        title="Notice"
                        content={(
                            <div>
                                <Paragraph>Dear customer, thank you for your trust and prompt repayment.</Paragraph>
                                <Paragraph>We have received your loan application again, and we will process it as soon as possible.</Paragraph>
                                <Paragraph>After you have completed the repayment, you can return to APP and check all the loan history on the Loan Record page.</Paragraph>
                            </div>
                        )}
                        confirmText="Repay"
                        onConfirm={() => {
                            alert("confirm")
                        }}
                        cancelText="你決定就好"
                        onCancel={() => {
                            alert("cancel")
                        }}
                        // NOTE: 特製版
                        enableClose={false}
                        enableIcon={false}
                        enableTitleHorizontal={true}
                    ></Modal>
                </div>
            </AppThemeProvider>
        )
    })
    // .add("Defalut", () => <AppThemeProvider theme={unistarTheme}><DefaultModalDemo></DefaultModalDemo></AppThemeProvider>)
    // .add("By Call Method", () => (
    //     <AppThemeProvider theme={unistarTheme}>
    //         <Button onClick={() => Modal.alert({
    //             mask: true,
    //             title: "Call Method",
    //             content: "Content",
    //             confirmText: "Confirm",
    //             onConfirm: () => {
    //                 alert("confirm");
    //             },
    //             theme: unistarTheme,
    //         })}>
    //             Show Alert Modal
    //         </Button>
    //         <Button onClick={() => Modal.confirm({
    //             mask: true,
    //             title: "Call Method",
    //             content: "Content",
    //             confirmText: "Confirm",
    //             cancelText: "Cancel",
    //             onConfirm: () => {
    //                 alert("confirm");
    //             },
    //             onCancel: () => {
    //                 alert("cancel");
    //             },
    //         })}>
    //             Show Confirm Modal
    //         </Button>
    //         <Button onClick={() => Modal.show({
    //             mask: true,
    //             content: (hide) => <CustomModal hide={hide}></CustomModal>,
    //         })}>
    //             Show Custom Modal
    //         </Button>
    //     </AppThemeProvider>
    // ))
    // .add("Mask", () => <AppThemeProvider theme={unistarTheme}><MaskModalDemo></MaskModalDemo></AppThemeProvider>)
    // .add("Default Mode", () => <AppThemeProvider theme={unistarTheme}><ModalModeDemo></ModalModeDemo></AppThemeProvider>)
    //     .add("Custom Mode", () => <AppThemeProvider theme={unistarTheme}><CustomModalDemo></CustomModalDemo></AppThemeProvider>)
    //     .add("Type", () => <AppThemeProvider theme={unistarTheme}><ModalTypeDemo></ModalTypeDemo></AppThemeProvider>)
    //     // .add("Trigger Outer Close", () => <AppThemeProvider theme={unistarTheme}><TriggerOuterModalDemo></TriggerOuterModalDemo></AppThemeProvider>)
    //
    //
    //
    // .add("Modify Button Text", () => (
    //     <AppThemeProvider theme={unistarTheme}>
    //         <div>
    //             <div>Property: confirmText, cancelText</div>
    //             <div>Value: string</div>
    //             <Modal
    //                 show={true}
    //                 mode="confirm"
    //                 type="confirm"
    //                 title="注意"
    //                 content={textContent}
    //                 confirmText="好哦"
    //                 onConfirm={() => {
    //                     alert("confirm")
    //                 }}
    //                 cancelText="你決定就好"
    //                 onCancel={() => {
    //                     alert("cancel")
    //                 }}
    //             ></Modal>
    //         </div>
    //     </AppThemeProvider>
    //
    // ))
    // .add("Modify Button Color 1", () => (
    //     <AppThemeProvider theme={unistarTheme}>
    //         <div>Property: confirmColor, cancelColor</div>
    //         <div>Value: red, green, gray</div>
    //         <Modal
    //             show={true}
    //             mode="confirm"
    //             type="confirm"
    //             title="注意"
    //             content={textContent}
    //             confirmText="好哦"
    //             confirmColor="green"
    //             onConfirm={() => {
    //                 alert("confirm")
    //             }}
    //             cancelText="你決定就好"
    //             cancelColor="green"
    //             onCancel={() => {
    //                 alert("cancel")
    //             }}
    //         ></Modal>
    //     </AppThemeProvider>
    // ))
    // .add("Modify Button Color 2", () => (
    //     <AppThemeProvider theme={unistarTheme}>
    //         <div>Property: confirmColor, cancelColor</div>
    //         <div>Value: red, green, gray</div>
    //         <div>Only Change Cancel Button Color</div>
    //         <Modal
    //             show={true}
    //             mode="confirm"
    //             type="confirm"
    //             title="注意"
    //             content={textContent}
    //             confirmText="好哦"
    //             onConfirm={() => {
    //                 alert("confirm")
    //             }}
    //             cancelText="你決定就好"
    //             cancelColor="red"
    //             onCancel={() => {
    //                 alert("cancel")
    //             }}
    //         ></Modal>
    //     </AppThemeProvider>
    // ))
    // .add("Modify Content: Text", () =>
    //     <AppThemeProvider theme={unistarTheme}>
    //         <Modal
    //             show={true}
    //             mode="alert"
    //             type="confirm"
    //             title="注意"
    //             content={textContent}
    //             onConfirm={() => {
    //                 alert("confirm")
    //             }}
    //             onCancel={() => {
    //                 alert("cancel")
    //             }}
    //         ></Modal>
    //     </AppThemeProvider>
    // )
    // .add("Modify Content: HTML", () =>
    //     <AppThemeProvider theme={unistarTheme}>
    //         <Modal
    //             show={true}
    //             mode="confirm"
    //             type="confirm"
    //             title="注意"
    //             content={longContent}
    //             onConfirm={() => {
    //                 alert("confirm")
    //             }}
    //             onCancel={() => {
    //                 alert("cancel")
    //             }}
    //         ></Modal>
    //     </AppThemeProvider>
    // )
    // .add("Modify Content: Component", () =>
    //     <AppThemeProvider theme={unistarTheme}>
    //         <Modal
    //             show={true}
    //             mask={true}
    //             mode="alert"
    //             type="money"
    //             title="金额"
    //             content={<CustomComponent></CustomComponent>}
    //             onConfirm={() => {
    //                 alert("confirm")
    //             }}
    //         ></Modal>
    //     </AppThemeProvider>
    // )
    // .add("Change Width", () =>
    //     <AppThemeProvider theme={unistarTheme}>
    //         <Modal
    //             show={true}
    //             mask={false}
    //             width={1000}
    //             mode="alert"
    //             type="money"
    //             title="金额"
    //             content={content}
    //             onConfirm={() => {
    //                 alert("confirm")
    //             }}
    //         ></Modal>
    //     </AppThemeProvider>
    // )
    // .add("[Custom] Button", () =>
    //     <AppThemeProvider theme={unistarTheme}><ModelDemo></ModelDemo></AppThemeProvider>
    // )
    // .add("[Custom] Modal Body", () =>
    //     <AppThemeProvider>
    //         <Button onClick={() => Modal.show({
    //             mask: true,
    //             content: (hide) => <CustomModal hide={hide}></CustomModal>,
    //         })}>
    //             Show Custom Modal
    //         </Button>
    //     </AppThemeProvider>
    // )
    // .add("[Situation] Long Text Content" , () => {
    //     return (
    //         <AppThemeProvider theme={unistarTheme}>
    //             <div>Long Content</div>
    //             <Modal
    //                 show={true}
    //                 mode="confirm"
    //                 type="confirm"
    //                 title="注意"
    //                 content={longTextContent}
    //                 onConfirm={() => {
    //                     alert("confirm")
    //                 }}
    //                 onCancel={() => {
    //                     alert("cancel")
    //                 }}
    //             ></Modal>
    //         </AppThemeProvider>
    //     )
    // })
    // .add("[Situation][Fix] Long Text Content - Set width", () =>
    //     {
    //         return (
    //             <AppThemeProvider theme={unistarTheme}>
    //                 <div>To use width to resolved Long Content</div>
    //                 <Modal
    //                     show={true}
    //                     mode="confirm"
    //                     type="confirm"
    //                     title="注意"
    //                     width={1000}
    //                     content={longTextContent}
    //                     onConfirm={() => {
    //                         alert("confirm")
    //                     }}
    //                     onCancel={() => {
    //                         alert("cancel")
    //                     }}
    //                 ></Modal>
    //             </AppThemeProvider>
    //         )
    //     }
    // )
    // .add("[Situation][FIX] Long Text Content - Component", () =>
    //     {
    //         return (
    //             <AppThemeProvider theme={unistarTheme}>
    //                 <div>Use Custom Content Component to resolved Long Content</div>
    //                 <Modal
    //                     show={true}
    //                     mode="confirm"
    //                     type="confirm"
    //                     title="注意"
    //                     content={<FixedLongContentComponent></FixedLongContentComponent>}
    //                     onConfirm={() => {
    //                         alert("confirm")
    //                     }}
    //                     onCancel={() => {
    //                         alert("cancel")
    //                     }}
    //                 ></Modal>
    //             </AppThemeProvider>
    //         )
    //     }
    // )
    // .add("[Modal Stack] All from Render", () =>
    //     <AppThemeProvider theme={unistarTheme}>
    //         <Modal
    //             show={true}
    //             mask={true}
    //             mode="confirm"
    //             type="money"
    //             title="A Component"
    //             content={(
    //                 <div>
    //                     <div style={{ color: "pink" }}> Type: Alert</div>
    //                 </div>
    //             )}
    //             confirmColor="red"
    //             cancelColor="red"
    //         ></Modal>
    //         <Modal
    //             show={true}
    //             mask={true}
    //             mode="alert"
    //             type="error"
    //             title="B Component"
    //             confirmColor="gray"
    //             content={(
    //                 <div>
    //                     <div style={{ color: "red" }}> Status: Done</div>
    //                 </div>
    //             )}
    //         ></Modal>
    //         <Modal
    //             show={true}
    //             mask={true}
    //             mode="confirm"
    //             type="question"
    //             title="C Component"
    //             content={(
    //                 <div>
    //                     <div style={{ color: "skyblue" }}> Mask: None</div>
    //                 </div>
    //             )}
    //             confirmColor="green"
    //             cancelColor="green"
    //         ></Modal>
    //     </AppThemeProvider>
    // )
    // .add("[Modal Stack] All from Calling Method", () => <AppThemeProvider theme={unistarTheme}><AllCallMethodModal></AllCallMethodModal></AppThemeProvider>)
    // .add("[Modal Stack] From Render and Call Method", () => <AppThemeProvider theme={unistarTheme}><RenderAndCallMethodModal></RenderAndCallMethodModal></AppThemeProvider>)
