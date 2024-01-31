import { IcClose, IcMoveRight } from '../../assets/icons';

interface SettingUserDataProps {
  email: string;
  name: string;
  career: number;
  subject: string;
  alarm: boolean;
  onDeleteAccount: () => void;
  onLogout: () => void;
  onUpdate: () => void;
}

const SettingData = ({
  email,
  name,
  career,
  subject,
  alarm,
  onDeleteAccount,
  onLogout,
  onUpdate,
}: SettingUserDataProps) => {
  return (
    <>
      <IcClose />
      <h1>Setting</h1>
      <div>내 설정</div>
      <br />
      <label>연동된 이메일</label>
      <p>{email}</p>
      <button onClick={onLogout}>로그아웃</button>
      <label>이름</label>
      <p>{name}</p>
      <label>연차</label>
      <span>{career}</span>
      <label>담당과목</label>
      <span>{subject}</span>
      <button onClick={onUpdate}>수정</button>
      <label>알람받기</label>
      <p>교사 업무관리 앱에서 제공하는 알림을 끄거나 켤 수 있습니다.</p>
      <button>알람 버튼</button>
      <label>계정 삭제</label>
      <p>계정을 영구적으로 삭제하고 모든 데이터를 지웁니다.</p>
      <IcMoveRight onClick={onDeleteAccount} />
      <br />
      <button>개인정보 정책</button>
    </>
  );
};

export default SettingData;
