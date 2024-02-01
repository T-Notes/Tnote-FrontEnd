import { useState } from 'react';
import styled from 'styled-components';

import { IcKakao } from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';

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

interface LoginProps {
  onWarning: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: boolean;
}
const KakaoLoginBtn = ({ onWarning, isChecked }: LoginProps) => {
  const [token, setToken] = useState<string>('');

  const handleLogin = () => {
    if (isChecked) {
      const goLogin = async () => {
        try {
          await instanceAxios.get('/oauth2/authorization/kakao').then((res) => {
            setToken(res.data);
          });
        } catch (err) {
          console.log('err', err);
        }
      };
      goLogin();
    } else {
      onWarning(true);
    }
  };

  return (
    <SKakaoLoginBtn onClick={handleLogin}>
      <IcKakao />
      카카오로 시작하기
    </SKakaoLoginBtn>
  );
};

export default KakaoLoginBtn;
