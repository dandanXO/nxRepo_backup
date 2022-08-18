import styled from "styled-components";

const sizeProps: {
    [key: string]: string
} = {
    small: '4px 12px',
    large: '14px'

}
interface buttonPropsStyle {
    styleType?: "primary" | "secondary" | "link",
    size?: string
}
export default styled.button<buttonPropsStyle>`
    color: ${(props) => props.styleType ? props.theme[props.styleType].text : props.theme.color.white};
    background: ${(props) => props.styleType ? props.theme[props.styleType].main : props.theme.primary.main};
    padding: ${(props) => props.styleType === 'link' ? 0 : sizeProps[props.size ? props.size : 'large']};
    border:none;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.fontSize[16]};
`;

