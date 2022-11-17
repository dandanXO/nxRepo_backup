import styled from 'styled-components';
import DefaultThemeConfig from '../global/skin/default/DefaultThemeConfig';

const { color } = DefaultThemeConfig;

// NOTICE: Need to be refactor 不能牽扯到業務邏輯
const tagStatusProps: {
  [key: string]: object;
} = {
  EXTEND: {
    color: color.black,
    background: color.lightYellow,
  },
  OVERDUE: {
    color: color.white,
    background: color.red,
  },
  PAY_OFF: {
    border: `solid 1px ${color.gray200}`,
    color: color.gray200,
    background: color.white,
  },
  PROCESSING: {
    color: color.gray500,
    background: color.gray200,
  },
  UNPAID: {
    color: color.black,
    background: color.yellow,
  },
};
interface tagPropsStyle {
  status: 'EXTEND' | 'OVERDUE' | 'PAY_OFF' | 'PROCESSING' | 'UNPAID';
}
export default styled.div<tagPropsStyle>`
  padding: 2px 12px;
  font-size: ${({ theme }) => theme.fontSize[12]};
  ${(props) => ({ ...tagStatusProps[props.status] })}
`;
