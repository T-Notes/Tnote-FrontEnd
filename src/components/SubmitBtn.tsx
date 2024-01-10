import { ReactEventHandler } from 'react';
import styled from 'styled-components';

// 스타일드 컴포넌트에서 사용되는 속성만 정의
interface StyledButtonProps {
  size?: 'small' | 'large';
  color?: string;
}

// ** style **//
const SSubmitBtn = styled.button<StyledButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 60px;
  border-radius: 8px;
  border: none;
  width: ${(props) => {
    switch (props.size) {
      case 'small':
        return '270px';
      case 'large':
        return '420px';
    }
  }};
  background-color: ${(props) => {
    switch (props.theme.background) {
      case 'lightGray':
        return '#E8E8E8';
      case 'gray':
        return '#A6A6A6';
      case 'purple':
        return '#632CFA';
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case 'black':
        return '#000000';
      case 'white':
        return '#FFFFFF';
      case 'gray':
        return '#A6A6A6';
    }
  }};
  //text
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
`;

interface SubmitProps {
  onClick: ReactEventHandler;
  label: string;
  size?: 'small' | 'large';
  background?: string;
  color?: string;
}

const SubmitBtn = ({
  color,
  background,
  size,
  onClick,
  label,
}: SubmitProps) => {
  return (
    <SSubmitBtn
      theme={{ background }}
      color={color}
      size={size}
      onClick={onClick}
    >
      {label}
    </SSubmitBtn>
  );
};

export default SubmitBtn;
