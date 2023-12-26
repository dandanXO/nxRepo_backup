import cx from 'classnames';
export const TabItem = (props: { active: boolean; icon?: string; name: string; onClick: () => void }) => {
  return (
    <div onClick={props.onClick} className={cx(`text-white text-xs lg:text-sm flex flex-row justify-center items-center  rounded-[100px] font-normal`,
      {
        'py-2.5 px-4': props?.icon !== undefined,
        'py-3 lg:py-2.5 px-8 lg:px-9': props?.icon === undefined,
        'shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] ': props.active,
        'bg-[#333]': !props.active
      })}>
      {props?.icon && <img className="w-[16px] lg:w-[20px] mr-2" src={props?.icon} alt="tab-icon" />}
      <div>{props.name}</div>
    </div>
  )
}
