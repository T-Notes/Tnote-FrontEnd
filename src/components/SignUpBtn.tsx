import styled from 'styled-components';

const SSignUpBtn = styled.button`
  display: flex;
  width: 270px;
  height: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #e8e8e8;
  border-radius: 8px;
  border: none;
  margin: 10px;
  //text//
  color: var(--Black-Black, #000);
  text-align: center;

  /* Font/Web_Body */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
`;

interface BtnProps {
  text: string;
  onClick: () => void;
}
const SignUpBtn = ({ text, onClick }: BtnProps) => {
  return <SSignUpBtn onClick={onClick}>{text}</SSignUpBtn>;
};

export default SignUpBtn;
