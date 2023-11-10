import styled from 'styled-components';

export const NotificationItemContainer = styled.div.attrs((props) => ({
  className: 'text-lg',
}))<{
  last?: boolean;
  first?: boolean;
  expand?: boolean;
}>`
  //opacity: calc(0.12);

  //background: red;
  //border-radius: 10px;

  ${(props) =>
    (props.first || props.expand) &&
    `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `};

  ${(props) =>
    (props.last || props.expand) &&
    `
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `};

  ${(props) =>
    !props.first &&
    props.expand &&
    `
    margin-top: 14px;
  `}};


  ${(props) =>
    props.expand &&
    `
    margin-bottom: 14px;
  `}};

  box-shadow: inset 0 0 36px 5px rgba(255,255,255,.11) !important;

`;

export const NotificationItemTitle = styled.div<{
  last?: boolean;
  first?: boolean;
  expand?: boolean;
}>`
  padding: 12px 14px;
  box-shadow: inset 0 0 36px 5px var(--main) !important;

  ${(props) =>
      (props.expand || !props.first) && `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-width: 1px;
    border-color: rgba(88, 220, 199, 1);
  `};

  border-bottom: ${(props) =>
      !props.expand
          ? '1px rgba(88, 220, 199, 1) solid'
          : props.last
              ? '1px rgba(88, 220, 199, 1) solid' // 如果是最後一個，也應用底部邊框
              : 'none'};

  border-bottom-left-radius: ${(props) => !props.expand ? '10px' : '0'};
  border-bottom-right-radius: ${(props) => !props.expand ? '10px' : '0'};
  margin-bottom: ${(props) => !props.expand ? '10px' : '0'};
`;

export const NotificationItemExpandable = styled.div`
  font-size: 14px;
  color: rgba(88, 220, 199, 1);
  //background: purple;
  padding: 14px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: none;
  border-width: 1px;
  border-color: rgba(88, 220, 199, 1);
`;

export const NotificationItemRedDot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #FF7777;
  border-radius: 3px;
  display: inline-block;
  margin-right: 6px;
`;
