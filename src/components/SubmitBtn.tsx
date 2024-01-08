import { ReactEventHandler } from 'react';
import styled from 'styled-components';
interface StyledButtonProps {
  size?: 'small' | 'large';
}
// ** style **//
const SSubmitBtn = styled.button<StyledButtonProps>`
  width: ${(props) => {
    switch (props.size) {
      case 'small':
        return '270px';
      case 'large':
        return '420px';
    }
  }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 60px;
  border-radius: 8px;
  background-color: #632cfa;
  color: #ffffff;

  //text
  color: var(--Inverse-Content-contentInversePrimary, #fff);
  text-align: center;

  /* Font/Web_Body */
  font-family: 'Pretendard';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
`;

interface SubmitProps {
  onClick: ReactEventHandler;
  label: string;
  size?: 'small' | 'large';
}
const SubmitBtn = ({ size, onClick, label }: SubmitProps) => {
  return (
    <SSubmitBtn size={size} onClick={onClick}>
      {label}
    </SSubmitBtn>
  );
};

export default SubmitBtn;
