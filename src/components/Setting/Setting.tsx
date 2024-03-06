import {
  ModalLayout,
  ModalBackground,
} from '../../components/common/styled/ModalLayout';
import instanceAxios from '../../utils/InstanceAxios';
import { useEffect, useState } from 'react';
import { getUserInfo, logout } from '../../utils/lib/api';
import styled from 'styled-components';
import {
  IcClose,
  IcMoveRight,
  IcOnToggle,
  IcProfileLarge,
} from '../../assets/icons';

const SSettingWrapper = styled.div`
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;

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
const SToggleIcon = styled(IcOnToggle)`
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
const SMoveRightIcon = styled(IcMoveRight)`
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
  career: number;
  alarm: boolean;
}

interface SettingProps {
  closeSettingModal: () => void;
}
const Setting = ({ closeSettingModal }: SettingProps) => {
  // const [email, setEmail] = useState<string>('');
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    school: '',
    subject: '',
    career: 0,
    alarm: false,
  });
  const handleClickLogout = async () => {
    await logout().then((res) => {
      window.alert('로그아웃되셨습니다.');
    });
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
  });

  const handleLogout = () => {
    try {
      instanceAxios.post('/tnote/user/logout').then((res) => {
        console.log('로그아웃 성공!');
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const handleDeleteAccount = () => {
  //   try {
  //     instanceAxios.delete('/tnote/user', {
  //       data: {
  //         email: email,
  //       },
  //     });
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };
  // onUpdate={() => {}}
  // 고민 사항 1. 모달위에 모달이 페이지 형식으로 겹쳐지는게 가능..?
  return (
    <ModalBackground onClick={closeSettingModal}>
      <SSettingWrapper onClick={(e: any) => e.stopPropagation()}>
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
            <SButton>수정</SButton>
          </SUserInfoContainer>
          <SAlarmContainer>
            <SColumn>
              <SLabel>알람받기</SLabel>
              <SCaption>
                교사 업무관리 앱에서 제공하는 알림을 끄거나 켤 수 있습니다.
              </SCaption>
            </SColumn>
            <SToggleIcon />
          </SAlarmContainer>
          <SDeletedAccountContainer>
            <SColumn>
              <SLabel>계정 삭제</SLabel>
              <SCaption>
                계정을 영구적으로 삭제하고 모든 데이터를 지웁니다.
              </SCaption>
            </SColumn>
            <SMoveRightIcon />
          </SDeletedAccountContainer>
          <SVersion>버전: vwer12.3</SVersion>
          <SInfoButtonContainer>
            <SInfoButton>개인정보 정책</SInfoButton>
          </SInfoButtonContainer>
        </>
      </SSettingWrapper>
    </ModalBackground>
  );
};
export default Setting;
