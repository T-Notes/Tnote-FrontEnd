import { useState } from 'react';
import styled from 'styled-components';
import { IcKakao } from '../../assets/icons';
import { useModals } from '../../utils/useHooks/useModals';
import { WarningModal } from '../common/WarningModal';

//styled //
const SKakaoLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 50px;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.yellow200}; // active
  ${({ theme }) => theme.fonts.caption2}
  color: ${({ theme }) => theme.colors.black}; // active
`;

const SKaKao = styled(IcKakao)`
  margin-right: 5.5%;
`;
interface LoginProps {
  isChecked: boolean;
}
const KakaoLoginBtn = ({ isChecked }: LoginProps) => {
  const { openModal } = useModals();
  const handleLogin = async () => {
    if (isChecked) {
      window.location.assign('https://j9972.kr/oauth2/authorization/kakao');
    } else {
      openModal(WarningModal, {});
    }
  };

  return (
    <SKakaoLoginBtn onClick={handleLogin}>
      <SKaKao />
      카카오로 시작하기
    </SKakaoLoginBtn>
  );
};

export default KakaoLoginBtn;
