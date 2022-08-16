
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

storiesOf("Modal", module)    
    .add("Defalut", () => <DefaultModalDemo></DefaultModalDemo>)
    .add("By Call Method", () => (
        <div>
            <Button onClick={() => Modal.alert({                        
                mask: true,
                title: "Call Method",
                content: "Content",
                confirmText: "Confirm",                                
                onConfirm: () => {
                    alert("confirm");
                }
            })}>
                Show Alert Modal
            </Button>
            <Button onClick={() => Modal.confirm({            
                mask: true,
                title: "Call Method",
                content: "Content",
                confirmText: "Confirm",
                cancelText: "Cancel",
                onConfirm: () => {
                    alert("confirm");
                },
                onCancel: () => {
                    alert("cancel");
                },                
            })}>
                Show Confirm Modal
            </Button>
            <Button onClick={() => Modal.show({            
                mask: true,                
                content: (hide) => <CustomModal hide={hide}></CustomModal>,                
            })}>
                Show Custom Modal
            </Button>
        </div>            
    ))
    .add("Mask", () => <MaskModalDemo></MaskModalDemo>)
    .add("Default Mode", () => <ModalModeDemo></ModalModeDemo>)
    .add("Custom Mode", () => <CustomModalDemo></CustomModalDemo>)
    .add("Type", () => <ModalTypeDemo></ModalTypeDemo>)
    // .add("Trigger Outer Close", () => <TriggerOuterModalDemo></TriggerOuterModalDemo>)

    .add("Modify Button Text", () => (
        <div>
            <div>Property: confirmText, cancelText</div>       
            <div>Value: string</div>            
            <Modal 
                show={true}             
                mode="confirm"
                type="confirm"
                title="注意"
                content={textContent}
                confirmText="好哦"            
                onConfirm={() => {
                    alert("confirm")
                }}
                cancelText="你決定就好"
                onCancel={() => {
                    alert("cancel")
                }}
            ></Modal>
        </div>
    ))
    .add("Modify Button Color 1", () => (
        <div>
            <div>Property: confirmColor, cancelColor</div>
            <div>Value: red, green, gray</div>
            <Modal 
                show={true}             
                mode="confirm"
                type="confirm"
                title="注意"
                content={textContent}
                confirmText="好哦"            
                confirmColor="green"
                onConfirm={() => {
                    alert("confirm")
                }}
                cancelText="你決定就好"
                cancelColor="green"
                onCancel={() => {
                    alert("cancel")
                }}
            ></Modal>
        </div>
    ))
    .add("Modify Button Color 2", () => (
        <div>
            <div>Property: confirmColor, cancelColor</div>
            <div>Value: red, green, gray</div>  
            <div>Only Change Cancel Button Color</div>          
            <Modal 
                show={true}             
                mode="confirm"
                type="confirm"
                title="注意"
                content={textContent}
                confirmText="好哦"                
                onConfirm={() => {
                    alert("confirm")
                }}
                cancelText="你決定就好"                
                cancelColor="red"
                onCancel={() => {
                    alert("cancel")
                }}
            ></Modal>
        </div>
    ))
    .add("Modify Content: Text", () =>
        <Modal 
            show={true}             
            mode="alert"
            type="confirm"
            title="注意"
            content={textContent}
            onConfirm={() => {
                alert("confirm")
            }}
            onCancel={() => {
                alert("cancel")
            }}
        ></Modal>
    )
    .add("Modify Content: HTML", () =>
        <Modal 
            show={true}             
            mode="confirm"
            type="confirm"            
            title="注意"
            content={longContent}
            onConfirm={() => {
                alert("confirm")
            }}
            onCancel={() => {
                alert("cancel")
            }}
        ></Modal>
    )    
    .add("Modify Content: Component", () =>
        <Modal 
            show={true} 
            mask={true}             
            mode="alert"
            type="money"            
            title="金额"
            content={<CustomComponent></CustomComponent>}
            onConfirm={() => {
                alert("confirm")
            }}
        ></Modal>
    )
    .add("Change Width", () =>     
        <Modal 
            show={true} 
            mask={false}
            width={1000}      
            mode="alert"
            type="money"            
            title="金额"
            content={content}
            onConfirm={() => {
                alert("confirm")
            }}
        ></Modal>
    )
    .add("[Custom] Button", () =>
        <ModelDemo></ModelDemo>
    )
    .add("[Custom] Modal Body", () =>
        <Button onClick={() => Modal.show({
            mask: true,
            content: (hide) => <CustomModal hide={hide}></CustomModal>,
        })}>
            Show Custom Modal
        </Button>
    )
    .add("[Situation] Long Text Content" , () => {
        return (
            <div>
                <div>Long Content</div>
                <Modal
                    show={true}             
                    mode="confirm"
                    type="confirm"            
                    title="注意"
                    content={longTextContent}
                    onConfirm={() => {
                        alert("confirm")
                    }}
                    onCancel={() => {
                        alert("cancel")
                    }}
                ></Modal>
            </div>    
        )
    })
    .add("[Situation][Fix] Long Text Content - Set width", () =>
        {
            return (
                <div>
                    <div>To use width to resolved Long Content</div>
                    <Modal 
                        show={true}             
                        mode="confirm"
                        type="confirm"            
                        title="注意"
                        width={1000}
                        content={longTextContent}
                        onConfirm={() => {
                            alert("confirm")
                        }}
                        onCancel={() => {
                            alert("cancel")
                        }}
                    ></Modal>
                </div>
            )
        }        
    )
    .add("[Situation][FIX] Long Text Content - Component", () =>
        {
            return (
                <div>
                    <div>Use Custom Content Component to resolved Long Content</div>
                    <Modal 
                        show={true}             
                        mode="confirm"
                        type="confirm"            
                        title="注意"
                        content={<FixedLongContentComponent></FixedLongContentComponent>}
                        onConfirm={() => {
                            alert("confirm")
                        }}
                        onCancel={() => {
                            alert("cancel")
                        }}
                    ></Modal>
                </div>
            )
        }        
    )
    .add("[Modal Stack] All from Render", () =>
        <div>
            <Modal 
                show={true} 
                mask={true}             
                mode="confirm"
                type="money"
                title="A Component"                    
                content={(
                    <div>
                        <div style={{ color: "pink" }}> Type: Alert</div>
                    </div>
                )}
                confirmColor="red"
                cancelColor="red"   
            ></Modal>
            <Modal 
                show={true} 
                mask={true}             
                mode="alert"
                type="error"            
                title="B Component"
                confirmColor="gray"
                content={(
                    <div>
                        <div style={{ color: "red" }}> Status: Done</div>
                    </div>
                )}
            ></Modal>
            <Modal 
                show={true} 
                mask={true}             
                mode="confirm"
                type="question"            
                title="C Component"
                content={(
                    <div>
                        <div style={{ color: "skyblue" }}> Mask: None</div>
                    </div>
                )}
                confirmColor="green"
                cancelColor="green"                
            ></Modal>
        </div>
    )
    .add("[Modal Stack] All from Calling Method", () => <AllCallMethodModal></AllCallMethodModal>)
    .add("[Modal Stack] From Render and Call Method", () => <RenderAndCallMethodModal></RenderAndCallMethodModal>)
