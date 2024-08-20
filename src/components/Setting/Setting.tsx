import Swal from 'sweetalert2';
import { ModalBackground } from '../../components/common/styled/ModalLayout';
import { useEffect, useState } from 'react';
import { getUserInfo, logout, updateAlarmToggle } from '../../utils/lib/api';
import styled from 'styled-components';
import { IcAfter, IcClose, IcProfileLarge } from '../../assets/icons';
import EditProfile from './EditProfile';
import ModalPortal from '../../utils/ModalPortal';
import { useNavigate } from 'react-router-dom';
import PrivacyPolicyModal from '../Landing/PrivacyPolicyModal';
import axios from 'axios';
import { useModals } from '../../utils/useHooks/useModals';
import ToggleButton from '../common/ToggleButton';

const SSettingWrapper = styled.div`
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  position: relative;
  width: 600px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const SSettingHeader = styled.div`
  display: flex;
  align-items: center;
`;
const SH1 = styled.h1`
  ${({ theme }) => theme.fonts.h4}
  padding-left: 20px;
`;
const SMySetting = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #a6a6a6;
`;
const SEmailContainer = styled.div`
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  padding-top: 30px;
`;
const SLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray000};
  padding-bottom: 10px;
`;
const SCaption = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};
`;
const SButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple100};
  margin-left: auto;
  cursor: pointer;
`;
const SColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const SUserInfoContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray300};
  align-items: center;
  border-radius: 12px;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SUserInfoData = styled.div`
  display: flex;
  flex-direction: column;
`;

const SRowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SNameCaption = styled(SCaption)`
  margin-right: 3px;
  margin-left: 10px;
`;

const SCareerCaption = styled(SCaption)`
  margin-right: 3px;
  margin-left: 10px;
`;

const SSubjectCaption = styled(SCaption)`
  margin-right: 3px;
  margin-left: 10px;
`;
const SAlarmContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const SDeletedAccountContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #a6a6a6;
`;
const SAfterIcon = styled(IcAfter)`
  margin-left: auto;
  cursor: pointer;
`;
const SInfoButton = styled.button`
  width: 300px;
  margin-top: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray200};
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
`;
const SInfoButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SVersion = styled.p`
  font-size: 12px;
  font-weight: 500;
  padding-top: 10px;
`;

interface UserData {
  email: string;
  name: string;
  school: string;
  subject: string;
  career: number | undefined;
  alarm: boolean;
}

interface SettingProps {
  closeSettingModal: () => void;
}
const Setting = ({ closeSettingModal }: SettingProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const oauthRefreshToken = localStorage.getItem('oauthRefreshToken');
  const accessToken = localStorage.getItem('accessToken');

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    school: '',
    subject: '',
    career: undefined,
    alarm: false,
  });
  const { openModal, closeModal } = useModals();

  const openEditModal = () => {
    setIsOpenEditModal(true);
    setIsEditMode(true);
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handleIsCheckedTrue = () => {
    closeModal(PrivacyPolicyModal);
  };

  const handleClickPolicyModal = () => {
    openModal(PrivacyPolicyModal, { handleIsCheckedTrue });
  };

  const handleClickLogout = async () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      confirmButtonText: '로그아웃',
      confirmButtonColor: '#632CFA',
    }).then((res) => {
      if (res.isConfirmed) {
        logout().then((res) => {
          navigate('/');
        });
      }
    });
  };

  const handleSetAlarm = (alarm: boolean) => {
    setUserData((prev) => ({ ...prev, alarm }));
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserInfo(userId);
        setUserData({
          email: response.data.email,
          name: response.data.name,
          school: response.data.school,
          subject: response.data.subject,
          career: response.data.career,
          alarm: response.data.alarm,
        });
      } catch {}
    };
    getUserData();
  }, [userId]);

  const handleClickDeleteAccount = () => {
    Swal.fire({
      title: '계정 삭제',
      html: '계정을 삭제할 시 모든 데이터가 지워지며<br>해당 작업을 복구 할 수 없습니다.<br>정말 탈퇴를 원하시면 이메일을 입력해주세요.',
      input: 'email',
      inputPlaceholder: 'abcde@gmail.com',
      confirmButtonText: '계정 영구 삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value;

        axios
          .delete('https://j9972.kr/tnote/v1/user', {
            headers: {
              oauthRefreshToken: oauthRefreshToken,
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            localStorage.clear();
            navigate('/');
          });
      }
    });
  };
  return (
    <ModalPortal>
      <ModalBackground>
        <SSettingWrapper>
          <>
            <SSettingHeader>
              <IcClose onClick={closeSettingModal} className="pointer" />
              <SH1>Setting</SH1>
            </SSettingHeader>

            <SMySetting>내 설정</SMySetting>
            <SEmailContainer>
              <SColumn>
                <SLabel>연동된 이메일</SLabel>
                <SCaption>{userData.email}</SCaption>
              </SColumn>
              <SButton onClick={handleClickLogout}>로그아웃</SButton>
            </SEmailContainer>
            <SUserInfoContainer>
              <IcProfileLarge />

              <SUserInfoData>
                <SRowContainer>
                  <SNameCaption>이름:</SNameCaption>
                  <SCaption>{userData.name}</SCaption>
                </SRowContainer>
                <br />
                <SRowContainer>
                  <SRowContainer>
                    <SCareerCaption>연차:</SCareerCaption>
                    <SCaption>{userData.career}</SCaption>
                  </SRowContainer>
                  <SRowContainer>
                    <SSubjectCaption>담당과목:</SSubjectCaption>
                    <SCaption>{userData.subject}</SCaption>
                  </SRowContainer>
                </SRowContainer>
              </SUserInfoData>
              <SButton onClick={openEditModal}>수정</SButton>
            </SUserInfoContainer>
            <SAlarmContainer>
              <SColumn>
                <SLabel>이메일 수신 여부</SLabel>
                <SCaption>
                  Tonte 관련 정보를 이메일로 받아보실 수 있습니다.
                </SCaption>
              </SColumn>
              <ToggleButton alarm={userData.alarm} setAlarm={handleSetAlarm} />
            </SAlarmContainer>
            <SDeletedAccountContainer>
              <SColumn>
                <SLabel>계정 삭제</SLabel>
                <SCaption>
                  계정을 영구적으로 삭제하고 모든 데이터를 지웁니다.
                </SCaption>
              </SColumn>
              <SAfterIcon onClick={handleClickDeleteAccount} />
            </SDeletedAccountContainer>
            <SVersion>버전: vwer12.3</SVersion>
            <SInfoButtonContainer>
              <SInfoButton onClick={handleClickPolicyModal}>
                개인정보 정책
              </SInfoButton>
            </SInfoButtonContainer>
          </>
          {isOpenEditModal && (
            <EditProfile
              closeEditModal={closeEditModal}
              isEditMode={isEditMode}
            />
          )}
        </SSettingWrapper>
      </ModalBackground>
    </ModalPortal>
  );
};
export default Setting;
