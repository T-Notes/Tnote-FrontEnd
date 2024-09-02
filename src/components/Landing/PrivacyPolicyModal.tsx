import styled from 'styled-components';
import ReactModal from 'react-modal';
import { ReactEventHandler, ReactNode, useEffect, useState } from 'react';

import { Button } from '../common/styled/Button';
import { policyCustomStyles } from '../common/styled/ModalLayout';
import privacyPolicyContent from '../../utils/privacyPolicyContent';
import { IcCancel, IcCheckedBox, IcUncheckedBox } from '../../assets/icons';
import serviceTermsContent from '../../utils/serviceTermsContent';
import { el } from 'date-fns/locale';

// styled //
const SPrivacyPolicyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SPolicyContentBox = styled.section`
  transform: skew(-0.05deg);
  > div {
    max-height: 317px;
    overflow-y: scroll;
    display: flex;
    padding: 10px 10px 10px 10px;
    justify-content: center;
    align-items: flex-start;
    border-radius: 8px;
    border: 1px solid var(--Black-Black50, #d5d5d5);
    background-color: ${({ theme }) => theme.colors.blue400};
  }
`;
const SPrivacyAgreementBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

const SPrivacyAgreementBtn = styled(Button)<{ selected: boolean }>`
  margin-top: 30px;
  padding: 18px 20px 18px 20px;
  width: 420px;
  height: 60px;
  gap: 8px;
  background-color: ${(props) => (props.selected ? '#632CFA' : '#F3F3F3')};

  color: ${(props) => (props.selected ? '#FFFFFF' : '#A6A6A6')};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;

const SPrivacyPolicyTitle = styled.h1`
  ${({ theme }) => theme.fonts.h2}
  margin-bottom: 7px;
`;

const SPrivacyPolicyCation = styled.p`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  text-align: left;
  color: #171717;
`;
const SPrivacyPolicyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SCancelIcon = styled.div`
  cursor: pointer;
`;
const SType = styled.div`
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 16px;
  margin-top: 24px;
  display: flex;
`;
const STypeBtn = styled.button<{ selected: boolean }>`
  padding: 8px;
  margin-right: 24px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  text-align: center;

  color: ${(props) => (props.selected ? '#000000' : '#000000')};
  border-bottom: ${(props) => (props.selected ? '2px solid #000000' : null)};
`;
const SAgreementBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SAllAgreementBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 10px 12px;
  border-bottom: 1px solid #d5d5d5;
  p {
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 27px;
    text-align: left;
    color: #000000;
  }
`;
const SChildAgreementBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const SFlex = styled.div`
  padding: 10px 0px;
  display: flex;
  gap: 10px;
  padding-left: 12px;
  align-items: center;
`;
const STextColor = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  color: #707070;
`;
const SGrayColor = styled(STextColor)`
  color: #a9a9a9;
`;
interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleIsCheckedTrue: ReactEventHandler;
  isToggle: boolean;
}
interface SaveContents {
  개인정보처리방침: string;
  이용약관: string;
  빈값: string;
}
const PrivacyPolicyModal = ({
  isOpen,
  onClose,
  handleIsCheckedTrue,
  isToggle,
}: PrivacyPolicyModalProps) => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isPrivacyConsentChecked, setIsPrivacyConsentChecked] =
    useState<boolean>(false);
  const [isServiceTermsAgreementChecked, setIsServiceTermsAgreementChecked] =
    useState<boolean>(false);
  const [contentType, setContentType] =
    useState<keyof SaveContents>('개인정보처리방침');
  const handleContentTypeChange = (type: keyof SaveContents) => {
    setContentType(type);
  };
  // 모두 동의
  const handleChangeAllCheckBox = () => {
    setIsAllChecked(true);
    setIsPrivacyConsentChecked(true);
    setIsServiceTermsAgreementChecked(true);
  };

  const handleChangeAllUnCheckBox = () => {
    setIsAllChecked(false);
    setIsPrivacyConsentChecked(false);
    setIsServiceTermsAgreementChecked(false);
  };
  // 개인정보 처리 방침
  const handleChangePrivacyConsentCheckBox = () => {
    setIsPrivacyConsentChecked(true);
    if (isServiceTermsAgreementChecked) {
      setIsAllChecked(true);
    }
  };
  const handleChangePrivacyConsentUnCheckBox = () => {
    setIsPrivacyConsentChecked(false);
    setIsAllChecked(false);
  };
  // 이용 약관
  const handleChangeServiceTermsAgreementCheckBox = () => {
    setIsServiceTermsAgreementChecked(true);
    if (isPrivacyConsentChecked) {
      setIsAllChecked(true);
    }
  };
  const handleChangeServiceTermsAgreementUnCheckBox = () => {
    setIsServiceTermsAgreementChecked(false);
    setIsAllChecked(false);
  };

  useEffect(() => {
    if (isToggle) {
      setIsAllChecked(true);
      setIsPrivacyConsentChecked(true);
      setIsServiceTermsAgreementChecked(true);
    } else {
      setIsAllChecked(false);
      setIsPrivacyConsentChecked(false);
      setIsServiceTermsAgreementChecked(false);
    }
  }, [isToggle]);
  const isActivation =
    isPrivacyConsentChecked && isServiceTermsAgreementChecked;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={policyCustomStyles}
    >
      <SPrivacyPolicyHeader>
        <SPrivacyPolicyCation>
          아래 약관에 동의하시고, 다음단계로 이동하세요!
        </SPrivacyPolicyCation>
        <SCancelIcon>
          <IcCancel onClick={onClose} />
        </SCancelIcon>
      </SPrivacyPolicyHeader>
      <SType>
        <STypeBtn
          selected={contentType === '개인정보처리방침'}
          onClick={() => handleContentTypeChange('개인정보처리방침')}
        >
          개인정보 처리 방침
        </STypeBtn>
        <STypeBtn
          selected={contentType === '이용약관'}
          onClick={() => handleContentTypeChange('이용약관')}
        >
          이용 약관
        </STypeBtn>
      </SType>
      <SPrivacyPolicyBox>
        <SPolicyContentBox>
          <div>
            {contentType === '개인정보처리방침'
              ? privacyPolicyContent
              : serviceTermsContent}
          </div>
        </SPolicyContentBox>
        <SAgreementBox>
          <SAllAgreementBox>
            {isAllChecked ? (
              <IcCheckedBox onClick={handleChangeAllUnCheckBox} />
            ) : (
              <IcUncheckedBox onClick={handleChangeAllCheckBox} />
            )}

            <p>모든 약관에 동의합니다.</p>
          </SAllAgreementBox>
          <SChildAgreementBox>
            <SFlex>
              {isPrivacyConsentChecked ? (
                <IcCheckedBox onClick={handleChangePrivacyConsentUnCheckBox} />
              ) : (
                <IcUncheckedBox onClick={handleChangePrivacyConsentCheckBox} />
              )}
              <STextColor>
                개인정보 처리 방침
                <SGrayColor>(필수)</SGrayColor>
              </STextColor>
            </SFlex>
            <SFlex>
              {isServiceTermsAgreementChecked ? (
                <IcCheckedBox
                  onClick={handleChangeServiceTermsAgreementUnCheckBox}
                />
              ) : (
                <IcUncheckedBox
                  onClick={handleChangeServiceTermsAgreementCheckBox}
                />
              )}
              <STextColor>
                이용약관 동의
                <SGrayColor>(필수)</SGrayColor>
              </STextColor>
            </SFlex>
          </SChildAgreementBox>
        </SAgreementBox>
        <SPrivacyAgreementBtnBox>
          <SPrivacyAgreementBtn
            onClick={isActivation ? handleIsCheckedTrue : () => {}}
            selected={isActivation}
          >
            동의함
          </SPrivacyAgreementBtn>
        </SPrivacyAgreementBtnBox>
      </SPrivacyPolicyBox>
    </ReactModal>
  );
};

export default PrivacyPolicyModal;
