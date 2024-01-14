import styled from 'styled-components';

import { IcKakao } from '../../assets/icons';
//styled //
const SKakaoLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 297px;
  height: 50px;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.yellow200}; // active
  ${({ theme }) => theme.fonts.button}
  color: ${({ theme }) => theme.colors.black}; // active
`;
interface KakaoLoginProps {
  onClickLogin: React.MouseEventHandler;
}
const KakaoLoginBtn = ({ onClickLogin }: KakaoLoginProps) => {
  return (
    <SKakaoLoginBtn onClick={onClickLogin}>
      <IcKakao />
      카카오로 시작하기
    </SKakaoLoginBtn>
  );
};

export default KakaoLoginBtn;
