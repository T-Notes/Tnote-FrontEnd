import styled from 'styled-components';
import ModalPortal from '../../utils/ModalPortal';

import { IcWarning } from '../../assets/icons';
import WarningModalBtn from './styled/WarningModalBtn';
import ReactModal from 'react-modal';

const SWarningModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SWarningContent = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  ${({ theme }) => theme.fonts.caption1}
`;

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '10',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: '328px',
    border: '1px solid var(--Black-Black50, #d5d5d5)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: '9',
  },
};

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const WarningModal = ({ isOpen, onClose }: WarningModalProps) => {
  const handleClickConfirm = () => {
    onClose();
  };
  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
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
    </ReactModal>
  );
};
