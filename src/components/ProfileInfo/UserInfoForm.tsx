import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getSchoolCode,
  getUserInfo,
  updateUserInfo,
} from '../../utils/lib/api';
import { IcSearch } from '../../assets/icons';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import UserSubjectForm from './UserSubjectForm';
import UserCareerForm from './UserCareerForm';
import UserSchoolModal from './UserSchoolModal';
import { useRecoilState } from 'recoil';
import { userDataState } from '../../utils/lib/recoil/userDataState';
import Swal from 'sweetalert2';
import { useModals } from '../../utils/useHooks/useModals';

const SFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SLabel = styled.label`
  margin-right: 520px;
  margin-top: 20px;
  margin-bottom: 10px;
  ${({ theme }) => theme.fonts.caption}
`;

const SCancel = styled(Button)`
  width: 270px;
  height: 50px;
  margin-right: 10px;
  ${({ theme }) => theme.fonts.caption};
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const SSubmit = styled(Button)`
  width: 270px;
  height: 50px;
  ${({ theme }) => theme.fonts.caption};
`;

const SSearchWrapper = styled.div<{ isEditMode: boolean }>`
  display: flex;
  width: 550px;
  height: 50px;
  align-items: center;
  z-index: 1;
  opacity: 1;
  border-radius: 8px;

  padding: 10px 10px 10px 16px;
  border: 1px solid #d5d5d5;
  background-color: ${({ isEditMode }) => (isEditMode ? '#F3F3F3' : 'white')};
`;
const SSearchInput = styled.input<{ isEditMode: boolean }>`
  width: 200px;
  padding-left: 10px;
  ${({ theme }) => theme.fonts.caption}
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray100};
  }
  color: ${({ isEditMode }) => (isEditMode ? '#A6A6A6' : '#000000')};
`;

const SButtonGroup = styled.div`
  display: flex;
  margin-top: 40px;
`;
export interface UserDataProps {
  schoolName: string;
  subject: string;
  career: string;
  alarm: boolean;
}
interface EditProps {
  isEditMode: boolean;
  closeEditModal: () => void;
}
const UserInfoForm = ({ isEditMode, closeEditModal }: EditProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useRecoilState(userDataState);

  const [userData, setUserData] = useState<UserDataProps>({
    schoolName: '',
    subject: '',
    career: '',
    alarm: false,
  });
  const { openModal, closeModal } = useModals();

  const isUserDataValid = () => {
    const { schoolName, subject, career } = userData;
    return (
      schoolName.trim() !== '' && subject.trim() !== '' && career.trim() !== ''
    );
  };

  const handleSubmit = async (
    schoolName: string,
    schoolType: string,
    code: string,
  ) => {
    closeModal(UserSchoolModal);
    setUserData((prevData) => ({ ...prevData, schoolName: schoolName }));

    const codeData = {
      code: code,
      schoolType: schoolType,
      schoolName: schoolName,
    };
    if (schoolName) {
      const res = await getSchoolCode(codeData);

      if (res.data) {
        localStorage.setItem('scheduleCode', res.data);
      }
    }
  };

  const handleOpenSchoolModal = () => {
    openModal(UserSchoolModal, { handleSubmit });
  };

  useEffect(() => {
    if (userId) {
      const getUserName = async () => {
        try {
          const response = await getUserInfo(userId);
          const userData = response.data;
          setUser({
            ...user,
            name: userData.name,
            email: userData.email,
          });
        } catch (err) {
          console.log('유저의 이름정보를 가져오는데 실패했습니다.', err);
        }
      };
      getUserName();
    }
    if (isEditMode) {
      const getEditUserInfo = async () => {
        const response = await getUserInfo(userId);

        setUserData({
          schoolName: response.data.school,
          subject: response.data.subject,
          career: String(response.data.career),
          alarm: response.data.alarm,
        });
      };
      getEditUserInfo();
    }
  }, [userId]);

  const handleUserInfoSubmit = async () => {
    try {
      const updatedUserData = {
        schoolName: userData.schoolName,
        subject: userData.subject,
        career: String(userData.career),
        alarm: userData.alarm,
      };

      await updateUserInfo(updatedUserData).then((res) => {
        if (isEditMode) {
          Swal.fire('수정되었습니다.').then(() => {
            window.location.reload();
          });
        } else {
          navigate(`/home`);
        }
      });
    } catch {}
  };

  return (
    <SFormWrapper>
      <SLabel htmlFor="userName">이름</SLabel>
      <Input placeholder="이름을 입력해주세요" value={user.name} readOnly />

      <SLabel htmlFor="subject">과목</SLabel>
      <UserSubjectForm userData={userData} setUserData={setUserData} />

      <SLabel htmlFor="seniority">연차</SLabel>
      <UserCareerForm userData={userData} setUserData={setUserData} />

      <SLabel htmlFor="school">학교</SLabel>
      <div>
        <SSearchWrapper isEditMode={isEditMode}>
          <IcSearch />
          <SSearchInput
            isEditMode={isEditMode}
            placeholder="학교를 입력해주세요"
            onClick={isEditMode ? () => {} : handleOpenSchoolModal}
            readOnly
            value={userData.schoolName || ''}
          />
        </SSearchWrapper>
      </div>
      <SButtonGroup>
        {isEditMode ? (
          <SCancel onClick={closeEditModal}>취소</SCancel>
        ) : (
          <Link to="/">
            <SCancel>취소</SCancel>
          </Link>
        )}

        <SSubmit
          onClick={handleUserInfoSubmit}
          style={{
            backgroundColor: isUserDataValid() ? '#632CFA' : '#F3F3F3',
            color: isUserDataValid() ? '#FFFFFF' : '#A6A6A6',
            cursor: isUserDataValid() ? 'pointer' : 'default',
          }}
        >
          확인
        </SSubmit>
      </SButtonGroup>
    </SFormWrapper>
  );
};

export default UserInfoForm;
