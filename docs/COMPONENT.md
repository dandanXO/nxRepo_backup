```typescript jsx
interface ITag {
  layoutType: number;
  text: string;
}
// NOTE :atom design: atom always never change , but molecular, organize(?), template and page often change
const Tag = (props: ITag) => {
  return (
    <div className={cx("font-sm", {
      "rounded-lg": props.layoutType === 1,
      "rounded-md": [2, 3].some(type => type === props.layoutType),
    }, "bg-[red]", "text-[red]", window["theme"]?.primary?.text, window["theme"]?.primary?.bg)}>
      {props.text}
    </div>
  )
}
```
