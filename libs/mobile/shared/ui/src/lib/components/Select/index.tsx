import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {withTheme} from "styled-components";
import {Placement} from "popper.js";

import {ThemeModuleSkinType} from "../type/module";
import SelectTooltip from "../Tooltip";
import InfiniteScroll from "../InfiniteScroll";

import Container from "./Container";

import InfiniteScrollContainer from "./InfiniteScrollContainer";
import ButtonArrow from "./ButtonArrow";
import {IListItemType} from "./IListItemType";

import ListItem from "./ListItem/ListItem";
import ListItem2 from "./ListItem2";
import {SelectButtonArrowUpSVGICON} from "./Icon/SelectButtonArrowUpSVGICON";
import {SelectButtonArrowDownSVGICON} from "./Icon/SelectButtonArrowDownSVGICON";
import {SelectButtonArrowRightSVGICON} from "./Icon/SelectButtonArrowRightSVGICON";
import {getArrowIconColor} from "./getArrowIconColor";

import SelectButton from "./layoutSkin/Button/XuJieStyledSelectButton";
import ButtonText from "./layout/ButtonText/XujieButtonText";
import {XuJieInfiniteScrollContent} from "./layoutSkin/InfiniteScrollContent/XuJieInfiniteScrollContent";


export type ISelection  = {
    id: number;
    name: string;
    component: () => React.ReactNode;
    subChildren?: ISelection[]; // for now, only support 2 layer
    [others: string]: any; // fixme: id should support number and string, this place use random attribute to workaround.
}


const checkDropdownContent = (dropdownRef: React.MutableRefObject<HTMLDivElement | null>, target: any) => {
    if (dropdownRef.current && dropdownRef.current.contains(target)) {
        return true;
    }

    const selectTooltipSelector = "div.select-tooltip";
    if ((target as Element).closest(selectTooltipSelector)) {
        return true;
    }

    return false;
};

interface IRenderTooltip {
  listItemComponents: JSX.Element[];
  targetDomRef: React.RefObject<HTMLElement> | null;
  placement?: Placement;
  showArrow?: boolean;
  source?: ISelection[];
}

// NOTE: DropdownState
type DropdownState = {
    show: boolean;
    status: IListItemType;
    currentSelection: React.ReactNode | string;
};

const initDropdownState = {
  show: false,
  status: "normal",
  currentSelection: "",
};

// NOTE: DropdownProps
export interface DropdownProps {
  showComponent?: boolean;
  placeHolder?: string;
  dataSource: Array<React.ReactNode> | ISelection[];
  defaultIndex: number;
  subDefaultIndex?: number;
  currentSelect?: number;
  disabled?: boolean;
  fixButtonWidth?: number;
  maxItemCount?: number;
  onSelect?: (index: number, subIndex?: number) => void;
  tree?: boolean;
  theme: {
    mode: ThemeModuleSkinType;
  };
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
    const target = useRef(null);
    const infiniteScrollRef = useRef();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [state, setState] = useState<DropdownState>(initDropdownState);

    const onMouseOver = useCallback(() => state.status != "open" && setState({...state, status: "hover"}), [state.status]);

    const onMouseOut = useCallback(() => state.status != "open" && setState({...state, status: "normal"}), [state.status]);

    const onClickSelectButton = useCallback(
        () => {
          setState({
            ...state,
            status: state.status == "open" ? "normal" : "open",
            show: !state.show
          })
        },
        [state.status]
    );

    // When dataSource changed from outside, then the index should be init as default index.
    // useEffect(() => {
    // console.log("useEffect.props", props)
    // const currentSelection = props.defaultIndex === -1 ? props.placeHolder : props.dataSource[props.defaultIndex];
    // console.log("currentSelection", currentSelection);
    // REFACTORING
    // const end = {...state, currentSelection};
    // console.log("end", end);
    // setState(end);
    // }, [props.dataSource, props.defaultIndex, props.placeHolder]);

    // REFACTORING: 集中管理
    const handleClickOutside = (event: MouseEvent) => {
        event.target instanceof Node &&
            !checkDropdownContent(dropdownRef, event.target) &&
            setState({...state, show: false, status: "normal"});
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // NOTICE: ITEM_HEIGHT
    const ITEM_HEIGHT = 49;

    const getHeight = useCallback((itemSize: number, maxItemCount = 10) => {
        let height;
        if (itemSize < maxItemCount + 1) {
            height = itemSize * ITEM_HEIGHT;
        } else {
            height = ITEM_HEIGHT * maxItemCount;
        }
        return height;
    }, []);

    const onItemClick = useCallback(
        (index: number, subIndex = -1) => {
            setState({...state, show: false, status: "normal"});
            props.onSelect && props.onSelect(index, subIndex);
        },
        [props]
    );

    const listItemComponents = useMemo(() => {
        return (props.dataSource as React.ReactNode[]).map((item: React.ReactNode, index: number) => {
            return (
                <ListItem
                    key={index}
                    index={index}
                    select={props.defaultIndex === index}
                    // state={uiState}
                    // NOTE: Cannot listen onClick
                    // onClick={onClickSelectButton}
                    onItemClick={onItemClick}
                >
                    {item}
                </ListItem>
            );
        });
    }, [props.dataSource, props.defaultIndex, onItemClick]);

    const getTextButton = (
        dataSource: React.ReactNode[] | ISelection[],
        defaultIndex: number,
        subDefaultIndex = -1,
        showComponent?: boolean
    ) => {
        if (dataSource.length === 0) return "";
        // old one use string as datasource, refactor it later;
        const firstItem = (dataSource as React.ReactNode[])[0];
        if (typeof firstItem === "string") {
            return dataSource[defaultIndex];
        }
        // NOTICE: withdrawapply use element in datasource, refactor it later.
        if (firstItem && Object.keys(firstItem).indexOf("type") > -1) {
            return dataSource[defaultIndex];
        }
        const parentItem = (dataSource as ISelection[]).find(item => item.id === defaultIndex) as ISelection;
        if (parentItem.subChildren && subDefaultIndex !== -1) {
            const item = parentItem.subChildren.find(item => item.id === subDefaultIndex);
            return item?.name;
        }
        return showComponent ? parentItem.component() : parentItem.name;
    };

    const calculateDataSourceLength = (dataSource: any, isTree = false) => {
        if (isTree) {
            return dataSource.reduce((curr: number, item: any) => {
                curr++;
                curr += item.subChildren ? item.subChildren.length : 0;
                return curr;
            }, 0);
        }
        return dataSource.length;
    };
    // NOTICE: renderTooltip
    const renderTooltip = (tooltipProps: IRenderTooltip) => {
        const {
            disabled,
            theme: {mode},
            maxItemCount,
            fixButtonWidth,
            dataSource,
            tree,
        } = props;
        const {listItemComponents, targetDomRef, placement = "bottom", showArrow = false, source} = tooltipProps;
        return (
            <SelectTooltip
                className="select-tooltip"
                zIndex={9999}
                target={targetDomRef}
                show={!disabled && state.show}
                placement={placement}
                // customStyle={true}
                // backgroundColor={mode === "early" ? "#2d3b58" : "#2e3e68"}
                // NOTICE: Xujie
                backgroundColor={"#fff"}
                borderWidth={0}
                noContentPadding
                showArrow={showArrow}
            >
                <InfiniteScrollContainer
                    mode={mode}
                    // itemSize={props.dataSource.length}
                    height={getHeight(calculateDataSourceLength(source ? source : dataSource, tree), maxItemCount)}
                    width={fixButtonWidth ? fixButtonWidth : 70}
                >
                    {/*TODO: Need to bind Full Window Change Scroll */}
                    <InfiniteScroll
                        ref={infiniteScrollRef}
                        overScroll
                        width="100%"
                        height={getHeight(calculateDataSourceLength(source ? source : dataSource, tree), maxItemCount) + "px"}
                        barWidth="9px"
                    >
                        <XuJieInfiniteScrollContent>{listItemComponents}</XuJieInfiniteScrollContent>
                    </InfiniteScroll>
                </InfiniteScrollContainer>
            </SelectTooltip>
        );
    };

    const [showSub, setShowSub] = useState(false);
    const [subChildren, setSubChildren] = useState<ISelection[] | undefined>(undefined);
    const [subRef, setSubRef] = useState<React.RefObject<HTMLLIElement> | null>(null);
    const [parentIndex, setParentIndex] = useState<number | null>(null);

    const initArrowListItemState = () => {
        setShowSub(false);
        setSubChildren(undefined);
        setSubRef(null);
    };
    const setArrowListItemState = (
        subChildren: ISelection[] | undefined,
        targetDomRef: React.RefObject<HTMLLIElement>,
        parentIndex: number
    ) => {
        setShowSub(true);
        setSubChildren(subChildren);
        setSubRef(targetDomRef);
        setParentIndex(parentIndex);
    };

    const checkSelected = (defaultIndex: number, subDefaultIndex = -1, index: number, subIndex = -1) => {
        return defaultIndex === index && subDefaultIndex === subIndex;
    };
    const renderArrowListItem = (dataSource: ISelection[], showArrow = false, isFirstLayer = true) => {
        return dataSource.map(item => {
            const index = isFirstLayer ? item.id : (parentIndex as number);
            const subIndex = isFirstLayer ? -1 : item.id;
            return (
                <ListItem2
                    key={item.id}
                    index={index}
                    subIndex={subIndex}
                    // select={props.defaultIndex === item.id}
                    select={checkSelected(props.defaultIndex, props.subDefaultIndex, index, subIndex)}
                    onItemClick={onItemClick}
                    onMouseOverHandler={(targetDomRef: React.RefObject<HTMLLIElement>) => {
                        isFirstLayer && setArrowListItemState(item.subChildren, targetDomRef, item.id);
                    }}
                    onMouseOutHandler={() => {
                        // initArrowListItemState();
                    }}
                >
                    {item.component()}
                    {showArrow && item.subChildren && <SelectButtonArrowRightSVGICON />}
                </ListItem2>
            );
        });
    };

    // NOTE: renderSubLayerTooltip
    const renderSubLayerTooltip = (): any => {
        const param = {
            listItemComponents: renderArrowListItem(subChildren, !props.tree, false),
            targetDomRef: subRef && subRef,
            placement: "right-start" as Placement,
            showArrow: false,
            source: subChildren,
        };
        return renderTooltip(param);
    };

    // NOTE: renderLayerTooltip
    const renderLayerTooltip = (dataSource: ISelection[], targetDomRef: React.RefObject<HTMLElement>) => {
        const listItemComponents = renderArrowListItem(dataSource, !props.tree);
        return renderTooltip({listItemComponents, targetDomRef, source: dataSource});
    };

    // NOTE: renderTreeList
    const renderTreeList = (dataSource: ISelection[], depth = 0, parentIndex = -1) => {
        return dataSource.map(item => {
            const index = depth === 0 ? item.id : (parentIndex as number);
            const subIndex = depth === 0 ? -1 : item.id;
            return (
                <React.Fragment key={item.id}>
                    <ListItem2
                        key={item.id}
                        index={index}
                        subIndex={subIndex}
                        // select={props.defaultIndex === item.id}
                        select={checkSelected(props.defaultIndex, props.subDefaultIndex, index, subIndex)}
                        onItemClick={onItemClick}
                        subChildren={item.subChildren}
                        depth={depth}
                    >
                        {item.component()}
                    </ListItem2>
                    {item.subChildren && renderTreeList(item.subChildren, depth + 1, item.id)}
                </React.Fragment>
            );
        });
    };

    const renderTreeTooltip = (dataSource: ISelection[], targetDomRef: React.RefObject<HTMLElement>) => {
        const listItemComponents = renderTreeList(dataSource);
        return renderTooltip({listItemComponents, targetDomRef, source: dataSource});
    };

    // NOTE: renderMultiLayerTooltip
    const renderMultiLayerTooltip = () => {
        const { dataSource, tree } = props;
        const firstItem = dataSource[0];
        if (!firstItem) return;
        // NOTE: Tree
        if (tree) {
            return renderTreeTooltip(props.dataSource as ISelection[], target);
        } else if (Object.keys(firstItem as ISelection).indexOf("id") > -1) {
            return renderLayerTooltip(props.dataSource as ISelection[], target);
        } else {
            return renderTooltip({listItemComponents, targetDomRef: target});
        }
    };
    return (
        <Container ref={dropdownRef}>
            <SelectButton
                ref={target}
                state={state.status}
                disabled={props.disabled ? props.disabled : false}
                fixButtonWidth={props.fixButtonWidth ? props.fixButtonWidth : 10}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClickSelectButton}
                // onBlur={() => {
                //     setState({...state, show: false, status: "normal"});
                // }}
            >
                {/*NOTE: 文字按鈕*/}
                <ButtonText disabled={props.disabled} status={state.status}>
                    {/*{state.currentSelection}*/}
                    <>
                      {props.defaultIndex === -1
                        ? props.placeHolder
                        : getTextButton(props.dataSource, props.defaultIndex, props.subDefaultIndex, props.showComponent)}
                    </>
                </ButtonText>

                {/*NOTE: 下拉式列表箭頭*/}
                <ButtonArrow>
                    {!props.disabled && state.show ? (
                        <SelectButtonArrowUpSVGICON
                            fill={getArrowIconColor(state.status, props.disabled ? props.disabled : false, props.theme.mode)}
                        />
                    ) : (
                        <SelectButtonArrowDownSVGICON
                            fill={getArrowIconColor(state.status, props.disabled ? props.disabled : false, props.theme.mode)}
                        />
                    )}
                </ButtonArrow>
            </SelectButton>

            {/* NOTE: renderMultiLayerTooltip*/}
            {!props.disabled && renderMultiLayerTooltip()}

            {/* NOTE: renderSubLayerTooltip*/}
            {showSub && subChildren && subRef?.current && renderSubLayerTooltip()}
        </Container>
    );
};

export const Select = withTheme(Dropdown);
