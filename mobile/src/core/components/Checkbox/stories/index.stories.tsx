// import { storiesOf } from "@storybook/react";
// import * as React from "react";
// import styled from "styled-components";
// import Checkbox from "../index";
//
// const Body = styled.div`
// `;
// const Container = styled.div`
//     background: pink;
//     height: 300px;
// `;
// storiesOf("Checkbox", module)
//     .add("Demo", () => (
//         <Container>
//             <Body>
//                 <div>Normal</div>
//                 <Checkbox
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//
//                 <Checkbox
//                     size="big"
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//
//                 <div>Default Check</div>
//                 <Checkbox
//                     defaultCheck={true}
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//
//                 <Checkbox
//                     size="big"
//                     defaultCheck={true}
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//
//                 <div>Disabled: false</div>
//
//                 <Checkbox
//                     disabled
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//
//                 <Checkbox
//                     size="big"
//                     disabled
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//
//                 <div>Disabled: true</div>
//                 <Checkbox
//                     disabled
//                     defaultCheck={true}
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//
//                 <Checkbox
//                     size="big"
//                     disabled
//                     defaultCheck={true}
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//             </Body>
//         </Container>
//     ))
//     .add("Size", () => (
//         <Container>
//             <Body>
//                 <div>Small</div>
//                 <Checkbox
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//                 <div>Big</div>
//                 <Checkbox
//                     size="big"
//                     onCheck={event => {
//                         console.log("onCheck", event.target);
//                     }}
//                 >
//                     中奖后停止
//                 </Checkbox>
//             </Body>
//         </Container>
//     ));
