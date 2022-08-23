// import Popup from "../Popup";
// Modal.Header = styled.div`
//     background: pink;
//     height: 50px;
// `;
// Modal.Body = styled.div`
//     background: gray;
//     height: 100%;
// `;
// Modal.Footer = styled.div`
//     background: skyblue;
//     height: 50px;
// `;

// .add("Custom", () =>
//     <Modal
//         show={true}
//         mask={true}
//         // mode="custom"
//         custom="true"
//         content={(
//             <Popover>Show</Popover>
//         )}
//     ></Modal>
// )
// }
/*
    Modal.Custom -> React.Portal
    Modal.Popup -> CSS: center, background, min-height, width
    Modal.Header,Body, Footer
*/
// .add("Custom3", () =>
//     <Modal.Custom>
//         <Modal.Popup style={{ width: 1000 }}>
//             {/* <Modal.Header>Header</Modal.Header>
//             <Modal.Body>Body</Modal.Body>
//             <Modal.Footer>Footer</Modal.Footer> */}
//         </Modal.Popup>
//     </Modal.Custom>
// )
// .add("Custom2", () =>
//     <Modal.Custom show={true} mask={false}>
//         <Modal.Popup width={1000} height={500}>

//         </Modal.Popup>
//     </Modal.Custom>
// )

// NOTE:
// const TriggerOuterModalDemo = () => {
//     const [show, setShow] = useState(false);
//     const [maskClosable, setMaskClosable] = useState(true);

//     return (
//         <div>
//             <div>Property: maskClosable</div>
//             <div>Value: false</div>

//             <div>
//                 <label>
//                     <input
//                         type="checkbox"
//                         name="maskClosable"
//                         checked={maskClosable}
//                         onChange={(event) => {
//                             setMaskClosable(event.value);
//                         }}
//                     ></input>
//                     maskClosable
//                 </label>
//             </div>

//             <Button onClick={() => {
//                 setShow(true);
//             }}>Show Modal</Button>

//             <Modal
//                 show={show}
//                 maskClosable={maskClosable}
//                 mode="confirm"
//                 type="confirm"
//                 title="注意"
//                 content={textContent}
//                 confirmText="好哦"
//                 onConfirm={() => {
//                     setShow(false);
//                     alert("confirm")
//                 }}
//                 cancelText="你決定就好"
//                 onCancel={() => {
//                     setShow(false);
//                     alert("cancel");
//                 }}
//             ></Modal>
//         </div>
//     )
// }
