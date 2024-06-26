import styled from 'styled-components';
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

import { useParams } from 'react-router-dom';
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

const SClassAddFormInput = styled.input`
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid #cccccc;
`;

const SClass = styled.div<{ selected: boolean; $isActive: boolean }>`
  background-color: ${(props) => (props.selected ? '#632CFA' : '#ffff')};
  border-radius: 35px;
  color: ${(props) => (props.selected ? '#ffff' : '#000000')};
  padding: 7px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;

  cursor: ${(props) => (props.$isActive ? 'pointer' : 'default')};
  opacity: ${(props) => (props.$isActive ? 1 : 0.2)};
`;

const SSaveClassBtn = styled(Button)`
  width: 100%;
  font-family: Pretendard;
  line-height: 24px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  &.activeSubmit {
    background-color: #632cfa;
    color: white;
  }
  &.inactiveSubmit {
    background-color: #e8e8e8;
    color: #000000;
    cursor: default;
  }
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
  subjectId,
}: IsClassAddProps) => {
  const { scheduleId } = useParams();

  const [subjectName, setSubjectName] = useState<string>('');
  const [classTime, setClassTime] = useState<string>('');
  const [classDay, setClassDay] = useState<string>('');
  const [classLocation, setClassLocation] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const [isClassDayDropdownToggle, setIsClassDayDropdownToggle] =
    useState(false);

  const [enDay, setEnDay] = useState<string>('');

  const lastClass = localStorage.getItem('lastClass');

  const handleChangeClassDayToggle = () => {
    setIsClassDayDropdownToggle(!isClassDayDropdownToggle);
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

  const classColor = [
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

    setEnDay(enDay);
    setClassDay(day);

    handleChangeClassDayToggle();
  };

  const handleChangeClassLocation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setClassLocation(e.target.value);
  };

  const handleClickColor = (color: string) => {
    setSelectedColor(color);
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
      classTime: `${classTime}교시`,
      classDay: enDay,
      classLocation: classLocation,
      memo: memo,
      color: selectedColor,
      scheduleId: scheduleId,
    };
    if (isEditMode) {
      await editSubject(subjectId, pathData);
      setReloadTrigger((prev) => !prev);
      onCloseAddClass();
    } else {
      await crateSubject(scheduleId, postData);
      setReloadTrigger((prev) => !prev);
      onCloseAddClass();
    }
  };

  /**
 한국어를 영어로 변환하는 함수
*/
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

        setSubjectName(data.subjectName);
        setClassTime(data.classTime.replace('교시', ''));

        const enDay = handleChangeKoreanToEnglishDay(data.classDay);
        setEnDay(enDay);
        setClassDay(data.classDay);
        setClassLocation(data.classLocation);
        setSelectedColor(data.color);
        setMemo(data.memo);
      };
      selectedSubjectData();
    }
  }, []);

  const isActiveSubmitBtn =
    !!subjectName &&
    !!classTime &&
    !!enDay &&
    !!classLocation &&
    !!selectedColor;

  console.log(1, isActiveSubmitBtn);
  return (
    <SClassAddFormWrapper>
      <SClassAddFormLayout>
        <SHeader>
          <div>수업추가</div>
          <IcClose onClick={onCloseAddClass} />
        </SHeader>
        <SClassAddFormBody>
          <div>
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
              {classNum.map((classNum) => {
                const isActive = Number(classNum.class) <= Number(lastClass);
                return (
                  <SClass
                    key={classNum.id}
                    onClick={() =>
                      isActive && handleSelectedClass(classNum.class)
                    }
                    selected={classTime === classNum.class}
                    $isActive={isActive}
                  >
                    <p>{classNum.class}</p>
                  </SClass>
                );
              })}
            </SClassNum>
            <SClassDays>
              <SLabel>수업 요일</SLabel>
              <DropdownInput
                size="mini"
                theme={{ background: 'white' }}
                placeholder="수업 요일을 선택해주세요"
                value={classDay}
                isToggle={isClassDayDropdownToggle}
                handleChangeToggle={handleChangeClassDayToggle}
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
          </div>
          <SLabel>색상 선택</SLabel>
          <SClassColor>
            {classColor.map((colors) => (
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

          <SSaveClassBtn
            onClick={() => isActiveSubmitBtn && handleSaveClassForm()}
            className={isActiveSubmitBtn ? 'activeSubmit' : 'inactiveSubmit'}
          >
            수업 저장
          </SSaveClassBtn>
        </SClassAddFormBody>
      </SClassAddFormLayout>
    </SClassAddFormWrapper>
  );
};

export default ClassAddForm;
