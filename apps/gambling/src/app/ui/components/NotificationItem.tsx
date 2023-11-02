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
  box-shadow: inset 0 0 36px 5px rgba(255, 255, 255, 0.08) !important;

  ${(props) =>
    props.expand &&
    `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `};

  border-bottom: ${(props) =>
    !props.expand && !props.last ? '1px rgba(255,255,255,0.2) solid' : 'none'};
`;

export const NotificationItemExpandable = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  //background: purple;
  padding: 14px;
`;

export const NotificationItemRedDot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #ed1c24;
  border-radius: 3px;
  display: inline-block;
  margin-right: 6px;
`;
