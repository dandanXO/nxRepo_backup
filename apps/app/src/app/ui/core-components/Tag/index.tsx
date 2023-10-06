// // interface ITagProps {
// //     isActive: boolean;
// //     onClick: () => void;
// //     text: string | number;
// //     style?: string;
// // }
import cx from 'classnames';
import { useState } from 'react';

// // const Tag = ({ isActive, onClick, text ,style}: ITagProps) => {

// //     const tagStyle = isActive ? 'border-orange-500 bg-orange-200 text-orange-600' : 'border-slate-400 bg-slate-100 text-slate-400';

// //     return <div onClick={onClick} className={`border border-solid ${tagStyle} rounded-2xl py-0.5 px-3 grow text-center ${style}`}>
// //         {text}
// //     </div>
// // }

// // export default Tag;

interface ITag {
  layoutType?: number;
  text: string;
  active: boolean;
  onClick: () => void;
  style?: string;
}
// NOTE :atom design: atom always never change , but molecular, organize(?), template and page often change
const Tag = (props: ITag) => {
  const { layoutType = 1 } = props;

  return (
    <div
      onClick={props.onClick}
      className={cx(
        `font-sm grow border border-solid py-0.5 px-3 text-center ${props.style} `,
        {
          'rounded-xl': layoutType === 1,
          rounded: [2, 3].some((type) => type === layoutType),
          'border-cstate-disable-main bg-cbg-secondary text-cstate-disable-main':
            props.active === false,
          'border-primary-main bg-primary-assistant text-primary-main':
            props.active,
        }
      )}
    >
      {props.text}
    </div>
  );
};

export default Tag;

// <Tags items={[1,2,3]} onClick={(index) => { index}}>

// interface ITag {
//     layoutType?: number;
//     text: string;
//     onClick?: () => void;
//     active?: boolean;
//     style?: string;
// }

// // NOTE :atom design: atom always never change , but molecular, organize(?), template and page often change
// type TagEnum = "normal" | "active";

// const Tag = (props: ITag) => {
//     const { layoutType = 1, style = '', text } = props;
//     const [state, setState] = useState(props.active);

//     useEffect(() => {
//         setState(props.active);
//     }, [props.active])

//     const globalColorClass = {
//         primary: layoutType === 1 ? '#F58B10' : '#18A851',
//         secondary: layoutType === 1 ? '#BCBCBC' : '#B7BBC5',
//         auxiliary: layoutType === 1 ? '#FFFFFF' : '#B7BBC5',
//     }

//     const TagColorClass = {
//         active: layoutType === 1 ? '#F58B10' : '#18A851',
//         activeBackground: layoutType === 1 ? '#FFF0DE' : '#F4FEF8',
//         normal: layoutType === 1 ? '#BCBCBC' : '#B7BBC5',
//         normalBackground: layoutType === 1 ? '#FFFFFF' : '#FFFFFF',
//     }

//     // NOTE: color
//     const statusClass = {
//         "normal": `border-[${TagColorClass.normal}] text-[${TagColorClass.normal}] bg-[${TagColorClass.normalBackground}]`,
//         "active": `border-[${TagColorClass.active}] text-[${TagColorClass.active}] bg-[${TagColorClass.activeBackground}]`,
//     }[state ? 'active' : 'normal'];
//     return (
//         <div onClick={props.onClick}
//             className={cx(
//                 statusClass,
//                 "font-sm border border-solid py-0.5 px-3 grow text-center",
//                 style,
//                 {
//                     "rounded-2xl": layoutType === 1,
//                     "rounded-lg": [2, 3].some(type => type === layoutType),
//                 })}
//         >
//             {text}
//         </div>
//     )
// }

// export default Tag;

interface ITags {
  items?: string[];
  onClick?: any;
  layoutType?: number;
  style?: string;
}

export const Tags = (props: ITags) => {
  const { layoutType = 1, style = '' } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => {
    setActiveIndex(index);
    props.onClick && props.onClick(index);
  };
  return (
    <div className="flex grow">
      {props.items &&
        props.items.map((item, index) => {
          return (
            <Tag
              key={item}
              layoutType={layoutType}
              active={activeIndex === index}
              text={item}
              onClick={() => handleClick(index)}
              style={style}
            />
          );
        })}
    </div>
  );
};
