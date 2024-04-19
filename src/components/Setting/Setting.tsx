import Swal from 'sweetalert2';

import {
  ModalLayout,
  ModalBackground,
} from '../../components/common/styled/ModalLayout';
import instanceAxios from '../../utils/InstanceAxios';
import { useEffect, useState } from 'react';
import {
  deletedAccount,
  getUserInfo,
  logout,
  updateAlarmToggle,
  updateUserInfo,
} from '../../utils/lib/api';
import styled from 'styled-components';
import {
  IcAfter,
  IcClose,
  IcOffToggle,
  IcOnToggle,
  IcProfileLarge,
  IcWarning,
} from '../../assets/icons';
import EditProfile from './EditProfile';
import ModalPortal from '../../utils/ModalPortal';
import { result } from 'lodash';
import { useNavigate } from 'react-router-dom';
import PrivacyPolicyModal from '../Landing/PrivacyPolicyModal';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

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
  display: flex; /* 내부 요소를 가로로 정렬하기 위해 flex 사용 */
  align-items: center; /* 수직 가운데 정렬 */
  padding-top: 30px;
`;
const SLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray000};
  /* padding-top: 30px; */
  padding-bottom: 10px;
`;
const SCaption = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};
  /* padding-bottom: 10px; */
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
const SOnToggleIcon = styled(IcOnToggle)`
  margin-left: auto;
  cursor: pointer;
`;
const SOffToggleIcon = styled(IcOffToggle)`
  margin-left: auto;
  cursor: pointer;
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
  const oauthAccessToken = localStorage.getItem('oauthAccessToken');
  const accessToken = localStorage.getItem('accessToken');
  // 수정 폼 모달
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isPolicyModal, setIsPolicyModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    school: '',
    subject: '',
    career: undefined,
    alarm: false,
  });
  const code = localStorage.getItem('code');

  // 수정 폼 모달 제어함수
  const openEditModal = () => {
    setIsOpenEditModal(true);
    setIsEditMode(true);
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  // 알람 제어 함수
  const handleOnAlarm = async () => {
    await updateAlarmToggle(true);
    setUserData((prev) => ({ ...prev, alarm: true }));
  };
  const handleOffAlarm = async () => {
    await updateAlarmToggle(false);
    setUserData((prev) => ({ ...prev, alarm: false }));
  };

  const handleClickPolicyModal = () => {
    setIsPolicyModal(true);
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
  useEffect(() => {
    console.log(1);

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

  // 계정 탈퇴
  const handleClickDeleteAccount = () => {
    Swal.fire({
      title: '계정 삭제',
      html: '계정을 삭제할 시 모든 데이터가 지워지며<br>해당 작업을 복구 할 수 없습니다.<br>정말 탈퇴를 원하시면 이메일을 입력해주세요.',
      input: 'email', // 이메일 입력란 추가
      inputPlaceholder: 'abcde@gmail.com', // 입력란 placeholder 설정
      showCancelButton: true,
      confirmButtonText: '계정 영구 삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        // 계정 영구 삭제 버튼 클릭 시
        const email = result.value; // 입력된 이메일 값 가져오기
        // deletedAccount(code); // 계정탈퇴 요청
        axios
          .delete('https://j9972.kr/tnote/user', {
            headers: {
              oauthAccessToken: oauthAccessToken,
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
                <SLabel>알람받기</SLabel>
                <SCaption>
                  교사 업무관리 앱에서 제공하는 알림을 끄거나 켤 수 있습니다.
                </SCaption>
              </SColumn>
              {userData.alarm ? (
                <SOnToggleIcon onClick={handleOffAlarm} />
              ) : (
                <SOffToggleIcon onClick={handleOnAlarm} />
              )}
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
      {isPolicyModal && (
        <PrivacyPolicyModal
          isOpen={isPolicyModal}
          onRequestClose={() => setIsPolicyModal(false)}
          onPrivacyAgreement={() => setIsPolicyModal(false)}
        />
      )}
    </ModalPortal>
  );
};
export default Setting;
