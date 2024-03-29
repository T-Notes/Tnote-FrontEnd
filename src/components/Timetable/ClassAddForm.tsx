import styled from 'styled-components';
import { useToggle } from '../../utils/useHooks/useToggle';

import {
  IcClose,
  IcSelectedIcon,
  IcBlueColor,
  IcYellowColor,
  IcPinkColor,
  IcRedColor,
  IcGreenColor,
  IcGrayColor,
  IcPurpleColor,
} from '../../assets/icons';
import ClassDayList from './ClassDayList';
import { useEffect, useState } from 'react';
import { Button } from '../common/styled/Button';
import instanceAxios from '../../utils/InstanceAxios';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownInput from '../common/DropdownInput';
import {
  crateSubject,
  editSubject,
  getSelectedSubjectData,
} from '../../utils/lib/api';

const SClassAddFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray1100};
  width: 300px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
`;
const SClassAddFormLayout = styled.div`
  box-shadow: 0px 9px 16px 0px #00000017;
  width: 250px;
  height: 80%;
  background-color: #ffff;
`;
const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.gray1100};
  font-size: 18px;
  font-weight: 500;
`;
const STitle = styled.div`
  display: flex;
  flex-direction: column;
`;
const SLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const SClassAddForm = styled.div`
  /* display: flex;
  flex-direction: column; */
`;
const SClassAddFormInput = styled.input`
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid #cccccc;
`;

const SClass = styled.div<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#632CFA' : '#ffff')};
  border-radius: 35px;
  color: ${(props) => (props.selected ? '#ffff' : '#000000')};
  padding: 7px;
  font-size: 14px;
  font-weight: 500;
`;

const SColorPreview = styled.div`
  background-color: ${({ color }) => color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const SSaveClassBtn = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
`;
const SClassAddFormBody = styled.div`
  padding: 10px;
`;
const SClassNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SClassDays = styled.div`
  display: flex;
  flex-direction: column;
`;
const SClassColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SColor = styled.div`
  padding-right: 7px;
`;

const SDropdownInput = styled(DropdownInput)`
  font-size: 14px;
  font-weight: 500;
`;
interface IsClassAddProps {
  onCloseAddClass: () => void;
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  subjectId: string;
}

const ClassAddForm = ({
  onCloseAddClass,
  setReloadTrigger,
  isEditMode,
  setIsEditMode,
  subjectId,
}: IsClassAddProps) => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState<string>('');
  const [classTime, setClassTime] = useState<string>('');
  const [classDay, setClassDay] = useState<string>(''); //  유저에게 보여질 상태
  const [classLocation, setClassLocation] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const { currentDate } = useCurrentDate();
  const date = currentDate;
  const [isClassDayDropdownOpen, setIsClassDayDropdownOpen] = useState(false);
  // const [reloadTrigger, setReloadTrigger] = useState(false); // 화면 reload 추가
  const [enDay, setEnDay] = useState<string>(''); // 서버에 보낼 상태

  const openClassDayDropdown = () => {
    setIsClassDayDropdownOpen(true);
  };
  const closeClassDayDropdown = () => {
    setIsClassDayDropdownOpen(false);
  };
  const classNum = [
    { id: 1, class: '1' },
    { id: 2, class: '2' },
    { id: 3, class: '3' },
    { id: 4, class: '4' },
    { id: 5, class: '5' },
    { id: 6, class: '6' },
    { id: 7, class: '7' },
    { id: 8, class: '8' },
    { id: 9, class: '9' },
  ];

  const ClassColor = [
    { id: 1, color: '파란색', code: '#0EA5E91A' },
    { id: 2, color: '보라색', code: '#E5E6FE' },
    { id: 3, color: '노란색', code: '#FEF5E6' },
    { id: 4, color: '빨간색', code: '#FEE6E6' },
    { id: 5, color: '초록색', code: '#E6FEE7' },
    { id: 6, color: '분홍색', code: '#FEE6F9' },
    { id: 7, color: '회색', code: '#D9D9D9' },
  ];

  const handleChangeSubjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectName(e.target.value);
  };
  const handleSelectedClass = (per: any) => {
    setClassTime(per);
  };

  const handleSelectedClassDay = (day: any) => {
    const enDay = handleChangeKoreanToEnglishDay(day);

    setEnDay(enDay); // 서버에 보낼 상태
    setClassDay(day); // 유저에게 보여질 상태

    closeClassDayDropdown();
  };

  const handleChangeClassLocation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setClassLocation(e.target.value);
  };

  const handleClickColor = (color: string) => {
    setSelectedColor(color);
    setColor(color);
  };
  const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const handleSaveClassForm = async () => {
    const postData = {
      subjectName: subjectName,
      classTime: `${classTime}교시`,
      classDay: enDay,
      classLocation: classLocation,
      memo: memo,
      color: selectedColor,
    };
    const pathData = {
      subjectName: subjectName,
      classTime: classTime,
      classDay: enDay,
      classLocation: classLocation,
      memo: memo,
      color: selectedColor,
      scheduleId: scheduleId,
    };
    if (isEditMode) {
      // 수정 요청
      await editSubject(subjectId, pathData);
      setReloadTrigger((prev) => !prev);
      onCloseAddClass(); // 저장 후 추가 툴팁 닫아주기
    } else {
      // post 요청
      await crateSubject(scheduleId, postData);
      setReloadTrigger((prev) => !prev);
      onCloseAddClass(); // 저장 후 추가 툴팁 닫아주기
    }
  };

  // 한국어를 영어로 변환하는 함수
  const handleChangeKoreanToEnglishDay = (ko: string) => {
    let enDay = '';
    if (ko === '월요일') {
      enDay = 'MONDAY';
    } else if (ko === '화요일') {
      enDay = 'TUESDAY';
    } else if (ko === '수요일') {
      enDay = 'WEDNESDAY';
    } else if (ko === '목요일') {
      enDay = 'THURSDAY';
    } else if (ko === '금요일') {
      enDay = 'FRIDAY';
    } else if (ko === '토요일') {
      enDay = 'SATURDAY';
    } else if (ko === '일요일') {
      enDay = 'SUNDAY';
    }
    return enDay;
  };
  useEffect(() => {
    if (isEditMode) {
      const selectedSubjectData = async () => {
        const response = await getSelectedSubjectData(scheduleId, subjectId);
        const data = response.data;

        // 수정하는 상황일때
        setSubjectName(data.subjectName);
        setClassTime(data.classTime);

        const enDay = handleChangeKoreanToEnglishDay(data.classDay);

        setEnDay(enDay); // 서버에 보내는 상태
        setClassDay(data.classDay); // 유저에게 보여지는 상태

        setClassLocation(data.classLocation);
        // setSelectedColor(data) // 색깔이 안옴
        setMemo(data.memo);
      };
      selectedSubjectData();
    }
  }, []);

  return (
    <SClassAddFormWrapper>
      <SClassAddFormLayout>
        <SHeader>
          <div>수업추가</div>
          <IcClose onClick={onCloseAddClass} />
        </SHeader>
        <SClassAddFormBody>
          <SClassAddForm>
            <STitle>
              <SLabel>과목 이름</SLabel>
              <SClassAddFormInput
                placeholder="과목명 작성"
                onChange={handleChangeSubjectName}
                value={subjectName}
              ></SClassAddFormInput>
            </STitle>

            <SLabel>수업 교시</SLabel>
            <SClassNum>
              {classNum.map((classNum) => (
                <SClass
                  key={classNum.id}
                  onClick={() => handleSelectedClass(classNum.class)}
                  selected={classTime === classNum.class}
                >
                  <p>{classNum.class}</p>
                </SClass>
              ))}
            </SClassNum>
            <SClassDays>
              <SLabel>수업 요일</SLabel>
              <DropdownInput
                size="mini"
                theme={{ background: 'white' }}
                placeholder="수업 요일을 선택해주세요"
                value={classDay} // 유저에게 보여질 상태
                isDropdown={isClassDayDropdownOpen}
                openDropdown={openClassDayDropdown}
                closeDropdown={closeClassDayDropdown}
                dropdownList={
                  <ClassDayList handleClickDay={handleSelectedClassDay} />
                }
              />
            </SClassDays>
            <STitle>
              <SLabel>수업 위치 작성</SLabel>
              <SClassAddFormInput
                placeholder="학년 반 작성"
                onChange={handleChangeClassLocation}
                value={classLocation}
              ></SClassAddFormInput>
            </STitle>
          </SClassAddForm>
          <SLabel>색상 선택</SLabel>
          <SClassColor>
            {ClassColor.map((colors) => (
              <SColor
                key={colors.id}
                onClick={() => handleClickColor(colors.color)}
              >
                {selectedColor === colors.color ? (
                  <IcSelectedIcon />
                ) : (
                  <>
                    {colors.color === '파란색' && <IcBlueColor />}
                    {colors.color === '보라색' && <IcPurpleColor />}
                    {colors.color === '노란색' && <IcYellowColor />}
                    {colors.color === '빨간색' && <IcRedColor />}
                    {colors.color === '초록색' && <IcGreenColor />}
                    {colors.color === '분홍색' && <IcPinkColor />}
                    {colors.color === '회색' && <IcGrayColor />}
                  </>
                )}
              </SColor>
            ))}
          </SClassColor>
          <STitle>
            <SLabel>메모</SLabel>
            <SClassAddFormInput
              placeholder="메모작성"
              onChange={handleChangeMemo}
              value={memo}
            ></SClassAddFormInput>
          </STitle>

          <SSaveClassBtn onClick={handleSaveClassForm}>수업 저장</SSaveClassBtn>
        </SClassAddFormBody>
      </SClassAddFormLayout>
    </SClassAddFormWrapper>
  );
};

export default ClassAddForm;
