export type IOverlay = {
  close: () => void;
  children: React.ReactNode;
}

export const Overlay = (props: IOverlay) => {
  return (
    <div
      className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full"}
      onClick={(event) => {
        props.close();
      }}
    >
      {props.children}
    </div>
  )
}
