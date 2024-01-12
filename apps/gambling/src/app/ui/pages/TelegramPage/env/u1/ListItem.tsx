
export const ListItem = (props: { count: string; text: string; }) => {
  return (
    <li className="leading-5 lg:leading-7 space-x-2 flex ">
      <div className=" text-xl ">{props.count}</div>
      <div className="">{props.text}</div>
    </li>
  )
}