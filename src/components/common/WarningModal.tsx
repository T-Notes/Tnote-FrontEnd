import styled from 'styled-components';
import ModalPortal from '../../utils/ModalPortal';

import { ModalBackground, WarningModalLayout } from './styled/ModalLayout';
import { IcWarning } from '../../assets/icons';
import WarningModalBtn from './styled/WarningModalBtn';

const SWarningModalWrapper = styled(WarningModalLayout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 328px;
`;

const SWarningContent = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  ${({ theme }) => theme.fonts.caption1}
`;

interface WarningModalProps {
  onClose: () => void;
}
export const WarningModal = ({ onClose }: WarningModalProps) => {
  // warning modal 닫기
  const handleClickConfirm = () => {
    onClose();
  };
  return (
    <ModalPortal>
      <ModalBackground>
        <SWarningModalWrapper>
          <IcWarning />
          <SWarningContent>
            개인 정보 보호 정책에
            <br />
            동의 후 로그인이 가능합니다.
          </SWarningContent>
          <WarningModalBtn
            confirm={true}
            yesNo={false}
            onClickWarningBtn={handleClickConfirm}
          />
        </SWarningModalWrapper>
      </ModalBackground>
    </ModalPortal>
  );
};
