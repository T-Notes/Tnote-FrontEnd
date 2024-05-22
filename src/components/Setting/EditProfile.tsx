import styled from 'styled-components';
import { IcBefore } from '../../assets/icons';
import UserInfoForm from '../ProfileInfo/UserInfoForm';

const SBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SModalLayout = styled.div`
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 600px;
  height: 607px;
`;
const SSettingHeader = styled.div`
  display: flex;
  align-items: center;
`;
const SH1 = styled.h1`
  ${({ theme }) => theme.fonts.h4}
  padding-left: 10px;
`;

interface CloseEditModal {
  closeEditModal: () => void;
  isEditMode: boolean;
}
const EditProfile = ({ closeEditModal, isEditMode }: CloseEditModal) => {
  return (
    <>
      <SBackground>
        <SModalLayout>
          <SSettingHeader>
            <IcBefore onClick={closeEditModal} className="pointer" />
            <SH1>프로필 수정</SH1>
          </SSettingHeader>

          <UserInfoForm
            isEditMode={isEditMode}
            closeEditModal={closeEditModal}
          />
        </SModalLayout>
      </SBackground>
    </>
  );
};

export default EditProfile;
