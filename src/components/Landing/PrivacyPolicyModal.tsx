import styled from 'styled-components';
import ReactModal from 'react-modal';
import { ReactEventHandler, ReactNode } from 'react';

import { Button } from '../common/styled/Button';
import { policyCustomStyles } from '../common/styled/ModalLayout';

// styled //
const SPrivacyPolicyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SPolicyContentBox = styled.section`
  width: auto;
  height: 380px;
  overflow: scroll;

  display: flex;
  padding: 10px 10px 10px 10px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  margin-top: 30px;
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: ${({ theme }) => theme.colors.blue400};
  ${({ theme }) => theme.fonts.caption}
`;

const SPrivacyAgreementBtnBox = styled(Button)`
  margin-top: 30px;
  width: 420px;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.purple100}; // active
  color: ${({ theme }) => theme.colors.white}; // active
`;

const SPrivacyPolicyTitle = styled.h1`
  ${({ theme }) => theme.fonts.h2}
  margin-bottom: 7px;
`;

const SPrivacyPolicyCation = styled.p`
  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.gray000};
`;

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  content: ReactNode;
  onPrivacyAgreement: ReactEventHandler;
}

const PrivacyPolicyModal = ({
  isOpen,
  onRequestClose,
  title,
  content,
  onPrivacyAgreement,
}: PrivacyPolicyModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={policyCustomStyles}
      contentLabel={title}
    >
      <SPrivacyPolicyTitle>{title}</SPrivacyPolicyTitle>
      <SPrivacyPolicyCation>
        아래 약관에 동의하시고, 다음단계로 이동하세요!
      </SPrivacyPolicyCation>
      <SPrivacyPolicyBox>
        <SPolicyContentBox>{content}</SPolicyContentBox>
        <SPrivacyAgreementBtnBox onClick={onPrivacyAgreement}>
          동의함
        </SPrivacyAgreementBtnBox>
      </SPrivacyPolicyBox>
    </ReactModal>
  );
};

export default PrivacyPolicyModal;
