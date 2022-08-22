// import { storiesOf } from "@storybook/react";
// import styled from "styled-components";
// import React, { useState } from "react";
// // import Body from "../../../Global/Body";
// const Body = styled.div``;
//
// import { InputGroup, Input } from "../";
// import {AppThemeProvider} from "../../index";
//
// const CustomContainer = styled.div`
//     width: 500px;
//     background: lightblue;
// `;
//
// const Property = () => (
//     <div>
//         <div>Properties</div>
//         <div>
//             <div>value: 目前值</div>
//             <div>value: 預設值</div>
//             <div>placeholder: 提示字串</div>
//             <div>onChange: 目前值改變</div>
//             <div>disabled: 禁用</div>
//         </div>
//     </div>
// );
//
// storiesOf("開發中/InputGroup(Dev)", module).add("Dev", () => <div>Ing</div>);
// // .add("Demo", () => (
// //     <Body>
// //         <CustomContainer>
// //             <InputGroup>
// //                 <Input
// //                     placeholder="text"
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                 />
// //             </InputGroup>
// //             <InputGroup>
// //                 <Input.Password
// //                     placeholder="password"
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                 />
// //             </InputGroup>
// //         </CustomContainer>
// //     </Body>
// // ));
//
// storiesOf("開發中/Input(Controlled)", module)
//     .add("Special", () => {
//         const [value, setValue] = useState("");
//         return (
//             <AppThemeProvider>
//                 <Input
//                     labelType="top"
//                     placeholder="text"
//                     value={value}
//                     onChange={event => {
//                         console.log("event", event.target.value);
//                         setValue(event.target.value);
//                     }}
//                     onFocus={() => {
//                         console.log("onFocus");
//                     }}
//                     onBlur={() => {
//                         console.log("onBlur");
//                     }}
//                     onKeyDown={event => {
//                         console.log("onKeyDown", event.target.value);
//                     }}
//                     onKeyUp={event => {
//                         console.log("onKeyUp", event.target.value);
//                     }}
//                 />
//                 <Input
//                     placeholder="text"
//                     value={value}
//                     onChange={event => {
//                         console.log("event", event.target.value);
//                         setValue(event.target.value);
//                     }}
//                     onFocus={() => {
//                         console.log("onFocus");
//                     }}
//                     onBlur={() => {
//                         console.log("onBlur");
//                     }}
//                     onKeyDown={event => {
//                         console.log("onKeyDown", event.target.value);
//                     }}
//                     onKeyUp={event => {
//                         console.log("onKeyUp", event.target.value);
//                     }}
//                 />
//             </AppThemeProvider>
//         )
//     })
//     .add("Demo", () => {
//         const [value, setValue] = useState("");
//         const [value2, setValue2] = useState("");
//         return (
//             <Body>
//                 <CustomContainer>
//                     <Input
//                         placeholder="text"
//                         value={value}
//                         onChange={event => {
//                             console.log("event", event.target.value);
//                             setValue(event.target.value);
//                         }}
//                         onFocus={() => {
//                             console.log("onFocus");
//                         }}
//                         onBlur={() => {
//                             console.log("onBlur");
//                         }}
//                         onKeyDown={event => {
//                             console.log("onKeyDown", event.target.value);
//                         }}
//                         onKeyUp={event => {
//                             console.log("onKeyUp", event.target.value);
//                         }}
//                     />
//                     {/*<Input.Password*/}
//                     {/*    placeholder="password"*/}
//                     {/*    value={value2}*/}
//                     {/*    onChange={event => {*/}
//                     {/*        console.log("event", event.target.value);*/}
//                     {/*        setValue2(event.target.value);*/}
//                     {/*    }}*/}
//                     {/*/>*/}
//                 </CustomContainer>
//
//                 {/*<CustomContainer>*/}
//                 {/*    <Input.Text disabled value="text" />*/}
//                 {/*    <Input.Password disabled value="password" />*/}
//                 {/*</CustomContainer>*/}
//             </Body>
//         );
//     })
//     .add("Controlled Input", () => {
//         const [value, setValue] = useState("unistar-design");
//         const [value2, setValue2] = useState("");
//         return (
//             <Body>
//                 <CustomContainer>
//                     <div>Controlled Input</div>
//                     <Input
//                         placeholder="text"
//                         value={value}
//                         onChange={event => {
//                             setValue(event.target.value);
//                             console.log("[Controlled Input] event", event.target.value);
//                         }}
//                         onFocus={() => {
//                             console.log("[Controlled Input] onFocus");
//                         }}
//                         onBlur={() => {
//                             console.log("[Controlled Input] onBlur");
//                         }}
//                         onKeyDown={event => {
//                             console.log("[Controlled Input] onKeyDown", event.target.value);
//                         }}
//                         onKeyUp={event => {
//                             console.log("[Controlled Input] onKeyUp", event.target.value);
//                         }}
//                     />
//                     <Input
//                         placeholder="text"
//                         value={value2}
//                         onChange={event => {
//                             setValue2(event.target.value);
//                             console.log("[Controlled Input] event", event.target.value);
//                         }}
//                     />
//                 </CustomContainer>
//
//                 {/*<CustomContainer>*/}
//                 {/*    <Input.Text disabled value="text" />*/}
//                 {/*    <Input.Password disabled value="password" />*/}
//                 {/*</CustomContainer>*/}
//             </Body>
//         );
//     })
//     .add("Disabled", () => (
//         <Body>
//             <CustomContainer>
//                 <Input.Text disabled value="text" />
//                 <Input.Password disabled value="password" />
//             </CustomContainer>
//         </Body>
//     ))
//     // .add("Properties", () => (
//     //     <Property/>
//     // ))
//     .add("Type", () => (
//         <Body>
//             <Input
//                 placeholder="text"
//                 onChange={event => {
//                     console.log("event", event.target.value);
//                 }}
//             />
//             <Input
//                 type="password"
//                 placeholder="password"
//                 onChange={event => {
//                     console.log("event", event.target.value);
//                 }}
//             />
//             <Input
//                 type="email"
//                 placeholder="email"
//                 onChange={event => {
//                     console.log("event", event.target.value);
//                 }}
//             />
//             <Input.Password
//                 placeholder="password"
//                 onChange={event => {
//                     console.log("event", event.target.value);
//                 }}
//             />
//             {/*<Property />*/}
//         </Body>
//     ))
//     // .add("Text", () => (
//     //     <Body>
//     //         <div>Input Component</div>
//     //         <InputGroup>
//     //             <Input
//     //                 placeholder="text"
//     //                 onChange={event => {
//     //                     console.log("event", event.target.value);
//     //                 }}
//     //             />
//     //             <Input disabled value="text" />
//     //         </InputGroup>
//     //         <div>Input.Text Component</div>
//     //         <InputGroup>
//     //             <Input.Text
//     //                 placeholder="text"
//     //                 onChange={event => {
//     //                     console.log("event", event.target.value);
//     //                 }}
//     //             />
//     //             <Input.Text disabled value="text" />
//     //         </InputGroup>
//     //
//     //         <div style={{ marginBottom: 10 }}>Input Component === Input.Text Component</div>
//     //         <Property />
//     //     </Body>
//     // ))
//     // .add("Password", () => (
//     //     <Body>
//     //         <div>Input.Password Component </div>
//     //         <InputGroup>
//     //             <Input.Password
//     //                 placeholder="password"
//     //                 onChange={event => {
//     //                     console.log("event", event.target.value);
//     //                 }}
//     //             />
//     //             <Input.Password disabled value="password" />
//     //         </InputGroup>
//     //         <Property />
//     //     </Body>
//     // ))
//     // .add("Status-Single", () => {
//     //     const [value, setValue] = useState("");
//     //     const [valid, setValid] = useState(false);
//     //     return (
//     //         <Body>
//     //             <div style={{ width: 200 }}>
//     //                 <Input
//     //                     placeholder="請輸入包含2020字串"
//     //                     value={value}
//     //                     runValid
//     //                     onChange={event => {
//     //                         // console.log("[Story][Input] onChange.value", value);
//     //                         setValue(event.target.value);
//     //                         if (value.indexOf("2020") > -1) {
//     //                             setValid(true);
//     //                         } else {
//     //                             setValid(false);
//     //                         }
//     //                     }}
//     //                     valid={valid}
//     //                     errorMessage="登录帳號必須包含 2020 字串"
//     //                     // NOTICE: experiment
//     //                     // onInit={value => {
//     //                     //     // console.log("onInit - value", value);
//     //                     //     if (value.indexOf("2020") > -1) {
//     //                     //         setValid(true);
//     //                     //     } else {
//     //                     //         setValid(false);
//     //                     //     }
//     //                     // }}
//     //                 />
//     //                 <br></br>
//     //             </div>
//     //         </Body>
//     //     );
//     // });
// // .add("Status-Demo", () => {
// //     const ErrorMessage = () => {
// //         return <span>Email 必须由字母和@组成</span>;
// //     };
// //     return (
// //         <Body>
// //             <div style={{ width: 200 }}>
// //                 <Input
// //                     disabled
// //                     placeholder="account"
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                     runValid
// //                     valid={true}
// //                     errorMessage="登录帳號必须由字母和数字组成"
// //                 />
// //                 <br></br>
// //
// //                 <Input
// //                     disabled
// //                     placeholder="account"
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                     runValid
// //                     valid={true}
// //                     errorMessage="登录帳號必须由字母和数字组成"
// //                 />
// //                 <br></br>
// //
// //                 <Input
// //                     disabled
// //                     placeholder="account"
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                     runValid
// //                     valid={false}
// //                     errorMessage="登录帳號必须由字母和数字组成"
// //                 />
// //                 <br></br>
// //
// //                 <div>status: idle</div>
// //                 <Input
// //                     placeholder="Please input account"
// //                     value=""
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                     runValid
// //                     valid={true}
// //                     errorMessage="登录帳號必须由字母和数字组成"
// //                 />
// //                 <br></br>
// //
// //                 <div>status: idle</div>
// //                 <Input
// //                     placeholder="account"
// //                     value="UnistarDesign2020"
// //                     runValid
// //                     valid={true}
// //                     errorMessage="登录帳號必须由字母和数字组成"
// //                 />
// //                 <br></br>
// //
// //                 <div>status: error</div>
// //                 <div>errorMessage: text</div>
// //                 <Input.Password
// //                     placeholder="password"
// //                     value="UnistarDesign"
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                     runValid
// //                     valid={false}
// //                     errorMessage="登录密码必须由字母和数字组成"
// //                 />
// //                 <br></br>
// //
// //                 <div>status: error</div>
// //                 <div>errorMessage: Component</div>
// //                 <Input
// //                     placeholder="email"
// //                     value="UnistarDesign"
// //                     onChange={event => {
// //                         console.log("event", event.target.value);
// //                     }}
// //                     runValid
// //                     valid={false}
// //                     errorMessage={<ErrorMessage />}
// //                 />
// //             </div>
// //         </Body>
// //     );
// // });
// // .add("Other", () => (
// //     <Body>
// //         <InputGroup>
// //             <Input
// //                 dev={true}
// //                 type="email"
// //                 name="email"
// //                 placeholder="email"
// //                 onChange={event => {
// //                     console.log("event", event.target.value);
// //                 }}
// //             />
// //             <Input dev={true} disabled type="email" name="email" value="email" />
// //         </InputGroup>
// //
// //         <InputGroup>
// //             <Input
// //                 dev={true}
// //                 type="tel"
// //                 name="tel"
// //                 placeholder="tel"
// //                 onChange={event => {
// //                     console.log("event", event.target.value);
// //                 }}
// //             />
// //             <Input dev={true} disabled type="tel" name="tel" value="tel" />
// //         </InputGroup>
// //
// //         <InputGroup>
// //             <Input
// //                 dev={true}
// //                 type="url"
// //                 name="url"
// //                 placeholder="url"
// //                 onChange={event => {
// //                     console.log("event", event.target.value);
// //                 }}
// //             />
// //             <Input dev={true} disabled type="url" name="url" value="url" />
// //         </InputGroup>
// //
// //         <InputGroup>
// //             <Input
// //                 dev={true}
// //                 type="search"
// //                 name="search"
// //                 placeholder="search"
// //                 onChange={event => {
// //                     console.log("event", event.target.value);
// //                 }}
// //             />
// //             <Input dev={true} disabled type="search" name="search" value="search" />
// //         </InputGroup>
// //
// //         <div>
// //             <label htmlFor="button">button</label>
// //             <Input
// //                 dev={true}
// //                 type="button"
// //                 name="number"
// //                 value="Click"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="radio">radio</label>
// //             <Input
// //                 dev={true}
// //                 type="radio"
// //                 name="radio"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="checkbox">checkbox</label>
// //             <Input
// //                 dev={true}
// //                 type="checkbox"
// //                 name="checkbox"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="range">range</label>
// //             <Input
// //                 dev={true}
// //                 type="range"
// //                 name="range"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="number">Number</label>
// //             <Input
// //                 dev={true}
// //                 type="number"
// //                 name="number"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="file">file</label>
// //             <Input
// //                 dev={true}
// //                 type="file"
// //                 name="file"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="color">color</label>
// //             <Input
// //                 dev={true}
// //                 type="color"
// //                 name="color"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="month">month</label>
// //             <Input
// //                 dev={true}
// //                 type="month"
// //                 name="month"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="week">week</label>
// //             <Input
// //                 dev={true}
// //                 type="week"
// //                 name="week"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="date">date</label>
// //             <Input
// //                 dev={true}
// //                 type="date"
// //                 name="date"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="time">time</label>
// //             <Input
// //                 dev={true}
// //                 type="time"
// //                 name="time"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //
// //         <div>
// //             <label htmlFor="datetime-local">datetime-local</label>
// //             <Input
// //                 dev={true}
// //                 type="datetime-local"
// //                 name="datetime-local"
// //                 onChange={event => {
// //                     console.log("event", event);
// //                 }}
// //             />
// //         </div>
// //     </Body>
// // ));
