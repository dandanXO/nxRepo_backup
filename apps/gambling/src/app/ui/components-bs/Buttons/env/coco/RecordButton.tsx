import styled from "styled-components";
import { ImageTab } from "../../../../components/TabItem/ImageTab";

export const RecordButton = styled(ImageTab) <{
  active: boolean;
  color?: string;
}>`
  ${props =>
    !props.active &&
    `
    color: var(--text-tertiary);
    border: 1px solid var(--white-20);
    background: var(--background-textfields);
    `}
`;

