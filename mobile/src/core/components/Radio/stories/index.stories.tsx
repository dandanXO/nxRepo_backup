import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import styled from "styled-components";
import Radio from "../index";
import { AppThemeProvider } from "../../index";
// import Body from "../../../Global/Body";
const Body = styled.div``;
const ContainerBase = styled.div`
    /* background-color: #f1e7bc; */
    //border: 1px solid gray;
    //margin-bottom: 20px;
`;
const Container = styled(ContainerBase)`
    /* width: 100%; */
`;
const FitWidthContainer = styled(ContainerBase)`
    width: 450px;
`;

storiesOf("Radio", module)
    .add("Special", () => {
        const [value, setValue] = useState(4);
        return (
            <AppThemeProvider>
                <Radio.Group
                    // size="small"
                    value={value}
                    onCheck={(value) => {
                        console.log("Radio.Group.onCheck.value", value);
                        setValue(value);
                    }}
                >
                    <Radio value={1}>Radio 1</Radio>
                    <Radio value={2}>Radio 2</Radio>
                    <Radio value={3}>Radio 3</Radio>
                    <Radio value={4}>Radio 4</Radio>
                </Radio.Group>
            </AppThemeProvider>
        );
    })
    // .add("Normal", () => {
    //     const [value, setValue] = useState(4);
    //     return (
    //         <Container>
    //             <Radio.Group
    //                 // size="small"
    //                 value={value}
    //                 onCheck={value => {
    //                     console.log("Radio.Group.onCheck.value", value);
    //                     setValue(value);
    //                 }}
    //             >
    //                 <Radio value={1}>Radio 1</Radio>
    //                 <Radio value={2}>Radio 2</Radio>
    //                 <Radio value={3}>Radio 3</Radio>
    //                 <Radio value={4}>Radio 4</Radio>
    //             </Radio.Group>
    //         </Container>
    //     )
    // })
    .add("Disabled", () => {
        const [value, setValue] = useState(4);
        return (
            <AppThemeProvider>
                <Radio.Group
                    value={value}
                    onCheck={(value) => {
                        console.log("Radio.Group.onCheck.value", value);
                        setValue(value);
                    }}
                >
                    <Radio disabled value={1}>
                        Radio 1
                    </Radio>
                    <Radio value={2}>Radio 2</Radio>
                    <Radio disabled value={3}>
                        Radio 3
                    </Radio>
                    <Radio value={4}>Radio 4</Radio>
                </Radio.Group>
            </AppThemeProvider>
        );
    });

// .add("Size", () => (
//     <div>
//         <div>Radio - Size: default</div>
//         <Container>
//             <Radio.Group
//                 value={2}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>Radio 1</Radio>
//                 <Radio value={2}>Radio 2</Radio>
//                 <Radio value={3}>Radio 3</Radio>
//             </Radio.Group>
//         </Container>
//
//         <div>Radio - Size: Big</div>
//         <Container>
//             <Radio.Group
//                 size="big"
//                 value={2}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>Radio 1</Radio>
//                 <Radio value={2}>Radio 2</Radio>
//                 <Radio value={3}>Radio 3</Radio>
//             </Radio.Group>
//         </Container>
//     </div>
// ));
// .add("DEMO-Layout", () => (
//     <div>
//         <div>
//             <div>水平</div>
//             <Container>
//                 <Radio.Group
//                     value={2}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>Radio 1</Radio>
//                     <Radio value={2}>Radio 2</Radio>
//                     <Radio value={3}>Radio 3</Radio>
//                 </Radio.Group>
//             </Container>
//
//             <Container>
//                 <Radio.Group
//                     size="big"
//                     value={2}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>Radio 1</Radio>
//                     <Radio value={2}>Radio 2</Radio>
//                     <Radio value={3}>Radio 3</Radio>
//                 </Radio.Group>
//             </Container>
//
//             <Container>
//                 <Radio.Group
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </Container>
//
//             <Container>
//                 <Radio.Group
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </Container>
//         </div>
//
//         <div>
//             <div>固定寬度-水平</div>
//             <FitWidthContainer>
//                 <Radio.Group
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </FitWidthContainer>
//
//             <FitWidthContainer>
//                 <Radio.Group
//                     size="big"
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </FitWidthContainer>
//
//             <div>Different Size</div>
//             <FitWidthContainer>
//                 <Radio.Group
//                     size="big"
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}> 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}> 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </FitWidthContainer>
//         </div>
//
//         <div>
//             <div>垂直</div>
//             <Container>
//                 <Radio.Group
//                     verticle={true}
//                     value={2}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>Radio 1</Radio>
//                     <Radio value={2}>Radio 2</Radio>
//                     <Radio value={3}>Radio 3</Radio>
//                 </Radio.Group>
//             </Container>
//
//             <Container>
//                 <Radio.Group
//                     verticle={true}
//                     size="big"
//                     value={2}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>Radio 1</Radio>
//                     <Radio value={2}>Radio 2</Radio>
//                     <Radio value={3}>Radio 3</Radio>
//                 </Radio.Group>
//             </Container>
//
//             <Container>
//                 <Radio.Group
//                     verticle={true}
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </Container>
//
//             <Container>
//                 <Radio.Group
//                     verticle={true}
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </Container>
//         </div>
//
//         <div>
//             <div>固定寬度-垂直</div>
//             <FitWidthContainer>
//                 <Radio.Group
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </FitWidthContainer>
//
//             <FitWidthContainer>
//                 <Radio.Group
//                     size="big"
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </FitWidthContainer>
//
//             <div>Different Size</div>
//             <FitWidthContainer>
//                 <Radio.Group
//                     size="big"
//                     value={1}
//                     onCheck={value => {
//                         console.log("Radio.Group.onCheck.value", value);
//                     }}
//                 >
//                     <Radio value={1}> 1</Radio>
//                     <Radio value={2}>選項選項選項選項選項選項選項選項選項 2</Radio>
//                     <Radio value={3}> 3</Radio>
//                     <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//                 </Radio.Group>
//             </FitWidthContainer>
//         </div>
//     </div>
// ))
// .add("Container-width: 100%", () => (
//     <div>
//         <div>Container - width: 100%</div>
//         <div>Radio - Size: default</div>
//         <Container>
//             <Radio.Group
//                 value={2}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>Radio 1</Radio>
//                 <Radio value={2}>Radio 2</Radio>
//                 <Radio value={3}>Radio 3</Radio>
//             </Radio.Group>
//         </Container>
//
//         <div>Container width: 100%</div>
//         <div>Radio - Size: Big</div>
//         <Container>
//             <Radio.Group
//                 size="big"
//                 value={2}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>Radio 1</Radio>
//                 <Radio value={2}>Radio 2</Radio>
//                 <Radio value={3}>Radio 3</Radio>
//             </Radio.Group>
//         </Container>
//
//         <div>Container width: 100%</div>
//         <div>Radio - Size: Default</div>
//         <div>Radio - Content: Long Option Name</div>
//         <Container>
//             <Radio.Group
//                 value={1}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                 <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                 <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                 <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//             </Radio.Group>
//         </Container>
//
//         <div>Container width: 100%</div>
//         <div>Radio - Size: Big</div>
//         <div>Radio - Content: Long Option Name</div>
//         <Container>
//             <Radio.Group
//                 value={1}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                 <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                 <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                 <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//             </Radio.Group>
//         </Container>
//     </div>
// ))
// .add("Container-width:Custom px;", () => (
//     <div>
//         <div>Container width: 450px</div>
//         <div>Radio - Size: Default</div>
//         <div>Radio - Content: Long Option Name</div>
//         <FitWidthContainer>
//             <Radio.Group
//                 value={1}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                 <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                 <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                 <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//             </Radio.Group>
//         </FitWidthContainer>
//
//         <div>Container width: 450px</div>
//         <div>Radio - Size: Big</div>
//         <div>Radio - Content: Long Option Name</div>
//         <FitWidthContainer>
//             <Radio.Group
//                 size="big"
//                 value={1}
//                 onCheck={value => {
//                     console.log("Radio.Group.onCheck.value", value);
//                 }}
//             >
//                 <Radio value={1}>選項選項選項選項選項選項選項選項選項選項選項 1</Radio>
//                 <Radio value={2}>選項選項選項選項選項選項選項選項選項選項選項 2</Radio>
//                 <Radio value={3}>選項選項選項選項選項選項選項選項選項選項選項 3</Radio>
//                 <Radio value={4}>選項選項選項選項選項選項選項選項選項選項選項 4</Radio>
//             </Radio.Group>
//         </FitWidthContainer>
//     </div>
// ));
