import styled from 'styled-components';
import { css } from 'styled-components';
import { Button } from './Button';

export const SLogsSubmitBtn = styled(Button)<{ disabled: boolean }>`
  display: flex;
  margin-left: 40%;
  width: 150px;
  height: 40px;
  padding: 18px 20px;
  background-color: ${(props) => (props.disabled ? '#E8E8E8' : '#632CFA')};
  color: ${(props) => (props.disabled ? '#000000' : '#ffff')};
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
  ${({ theme }) => theme.fonts.caption3};
`;
