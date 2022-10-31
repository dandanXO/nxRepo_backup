import React from 'react';
import styled from 'styled-components';
// import styledTypescript from 'styled-components-ts'

interface StyledlessButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  color?: string;
}
const StyledlessButton = (props: StyledlessButtonProps) => (
  <div className={props.className} onClick={props.onClick}>
    {props.children}
  </div>
);

type ButtonProps = StyledlessButtonProps;

const ConfirmButton = styled(StyledlessButton)<ButtonProps>`
  /* Display */
  flex: 1;

  /* Margin */
  //margin-right: 5px;

  /* Border */
  border-radius: 10px;

  //width: 113px;
  height: 48px;

  /* Text */
  line-height: 48px;
  text-align: center;
  font-weight: 600;
  /* Other */
  cursor: pointer;
  padding: 0 20px;
`;

ConfirmButton.displayName = 'ConfirmButton';


const NotificationButton = styled(ConfirmButton)<ButtonProps>`
  background: ${(props) => props.theme.button.primary.main};
`;
NotificationButton.displayName = 'NotificationButton';

const CancelButton = styled(ConfirmButton)<ButtonProps>`

`;
CancelButton.displayName = 'CancelButton';

const CustomColorButton = styled(ConfirmButton)<ButtonProps>`

`;

export { ConfirmButton, NotificationButton, CancelButton, CustomColorButton };
