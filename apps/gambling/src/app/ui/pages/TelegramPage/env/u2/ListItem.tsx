
export const ListItem = (props: { count: string; text: string; }) => {
  return (
    <li className="leading-5 lg:leading-7 flex">
      <div className="">{props.count} {props.text}</div>
    </li>
  )
}