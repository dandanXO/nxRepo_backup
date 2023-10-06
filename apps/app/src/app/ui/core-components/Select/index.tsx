import { useState } from 'react';
import Select, { GroupBase, Props as SelectProps } from 'react-select';

interface IReactSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends SelectProps<Option, IsMulti, Group> {
  containerClassNames?: string;
  errorMessage?: string;
}

export const ReactSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: IReactSelect<Option, IsMulti, Group>
) => {
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);

  return (
    <div
      className={props.containerClassNames}
      onTouchStart={(e) => {
        const clickedElement = e.target as any;
        if (!clickedElement?.classList[0]?.includes('option')) {
          setSelectMenuOpen(!selectMenuOpen);
        } else {
          setSelectMenuOpen(true);
        }
      }}
    >
      <Select
        {...props}
        styles={props.styles}
        onChange={(item: any, IsMulti) => {
          props.onChange && props.onChange(item, IsMulti);
          setSelectMenuOpen(false);
        }}
        onFocus={(item: any) => {
          props.onFocus && props.onFocus(item);
          setSelectMenuOpen(true);
        }}
        onBlur={(item: any) => {
          props.onBlur && props.onBlur(item);
          setSelectMenuOpen(false);
        }}
        menuIsOpen={selectMenuOpen}
        isSearchable={props.isSearchable || false}
      />
      {props.errorMessage && (
        <div className="text-cstate-error-main pt-2 font-normal">
          {props.errorMessage}
        </div>
      )}
    </div>
  );
};

export default ReactSelect;
