```typescript jsx

// <Tags items={[1,2,3]} onClick={(index) => { index}}>

import {renderByCountry} from "./renderByCountry";

interface ITags {
  items?: [];
  onClick?: () => void;
}

const Tags = (props) => {
  const [activeIndex, setActiveIndex] = useState();
  const onClick = (index: number) => {
    setActive(index);
    props.onClick(index);
  }
  return (
    <div>
      {
        props.items.map((item, index) => {
          return (
            <Tag active={activeIndex === index} text={item} onClick={onClick(index)}/>
          )
        })}
      }
    </div>
  )
}

interface ITag {
  layoutType: number;
  text: string;
  onClick?: () => void;
}

// NOTE :atom design: atom always never change , but molecular, organize(?), template and page often change
type TagEnum = "normal" | "active";

const globalColorClass = {
  primary: "red",
  secondary: "green",
  auxiliary: "blue",
}

// NOTE: 色系與結構分離
// 色系分離global
// 結構會變:
//
// const Opions = () => {
//   return renderByCountry({
//     "india": {
//   <div>
//     <a>
//       <b>
//   </div>
// "pk": {
//     <div>
//       <b>
//         <a>
//     </div>
//   },
//   })
// };
//    
// const ChangeOpions = () => {
//   return renderByCountry({
//     "india": {
//         <div>
//           <a>
//           <b>
//         </div>
//     "pk": {
//       <div>
//         <b>
//         <a>
//       </div>
//     },
//   })
// }
//            

const Tag = (props: ITag) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(props.active);
  }, [props.active])

  // NOTE: color
  const statusClass = {
    "normal": `text-[${globalColorClass.primary}] border-[${globalColorClass.auxiliary}]`,
    "active": `bg-[${globalColorClass.secondary}] border-[${globalColorClass.auxiliary}]`,
  }[state];


  return (
    <div onClick={() => {
      props.onClick();
    }} className={cx(
      statusClass,
      `text-[${globalColorClass.primary}]`,
      `bg-[${globalColorClass.secondary}]`,
      "font-sm",
      {
        "rounded-lg": props.layoutType === 1,
        "rounded-md": [2, 3].some(type => type === props.layoutType),
      })}>

      <div className={cx("font-sm", {
        "rounded-lg": props.layoutType === 1,
        "rounded-md": [2, 3].some(type => type === props.layoutType),
      }, statusClass)}>

        <div className={cx("font-sm", {
          "rounded-lg": props.layoutType === 1,
          "rounded-md": [2, 3].some(type => type === props.layoutType),
        }, statusClass)}>
          <div className={""}>
            {props.text}
          </div>
        </div>

      </div>

    </div>
  )
}

/*
const Template = (type) => {
    1:
    <Header>
      {a}
      <Notice/>
      {b}
      <Message/>

    2:    
      <Header>
        <Message/>
        <Notice/>
        {a}
        {b}
}
*/

const TagLayout = {
  1: {
    active: "bg-[red]",
    normal: ""
  },
  2: {
    active: "bg-[red]",
    normal: ""
  }
}



const Optional = {
  "india": <div>1</div>;
  "usa": <div>2</<div>;
}

const BindCardPageTemplate = (Optional, PamentContnet, ConfrimButton) => {
  return (
    <div>
      {Optional}
      {PamentContnet}
      {ConfrimButton}
    </div>
  )
  return (
    <div>
      {PamentContnet}
      {Optional}
      {ConfrimButton}
    </div>
  )
}

Tags:

  Optional:
    IndiaOptional
UsaIndiaOptional

Page
A
India
USA




<BindCardPageTemplate Optional={IndiaOptional} PamentContnet={IndiaPamentContnet}>
  <BindCardPageTemplate Optional={UsaIndiaOptional} PamentContnet={IndiaPamentContnet}>

```


