import { ReactEventHandler } from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  size?: 'small' | 'large';
  backgroundcolor?: string;
  textcolor?: string;
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
    switch (props.backgroundcolor) {
      case 'lightGray':
        return '#E8E8E8';
      case 'gray':
        return '#A6A6A6';
      case 'purple':
        return '#632CFA';
    }
  }};
  color: ${(props) => {
    switch (props.textcolor) {
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
  backgroundcolor?: string;
  textcolor?: string;
}

const SubmitBtn = ({
  textcolor,
  backgroundcolor,
  size,
  onClick,
  label,
}: SubmitProps) => {
  return (
    <SSubmitBtn
      backgroundcolor={backgroundcolor}
      textcolor={textcolor}
      size={size}
      onClick={onClick}
    >
      {label}
    </SSubmitBtn>
  );
};

export default SubmitBtn;
