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
  background-color: #f8f8f8;
  width: 384px; // 20vw
  height: 100vh;
  padding-left: 18px;
  padding-right: 22px;
  position: fixed;
  right: 0;
  top: 0;
`;
const SClassAddFormLayout = styled.div`
  box-shadow: 0px 9px 16px 0px #00000017;
  width: 100%;
  height: 80vh;
  background-color: #ffff;
  @media (max-height: 970px) {
    height: 90vh;
  }
`;
const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 20px 30px;
  background-color: #f8f8f8;

  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  line-height: 28.64px;
  text-align: left;
`;
const STitle = styled.div`
  display: flex;
  flex-direction: column;
`;
const SLabel = styled.label`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
  padding: 30px 20px 10px 20px;
`;

const SClassAddFormInput = styled.input`
  margin: 0px 20px 0px 20px;
  border-bottom: 1px solid #cccccc;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #2f2f2f;
  &::placeholder {
    color: #a6a6a6;
  }
`;
const SClassNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 10px 0px 10px;
`;
const SClass = styled.div<{ selected: boolean; $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? '#632CFA' : '#ffff')};
  border-radius: 10px;
  color: ${(props) => (props.selected ? '#ffff' : '#000000')};
  padding: 4px 10px 4px 10px;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;

  cursor: ${(props) => (props.$isActive ? 'pointer' : 'default')};
  opacity: ${(props) => (props.$isActive ? 1 : 0.2)};
`;

const SSaveClassBtn = styled(Button)`
  margin-top: 4vh;
  margin-left: 10px;
  margin-right: 10px;
  width: 95%;
  font-family: Pretendard;
  line-height: 24px;
  font-size: 18px;
  font-weight: 500;
  padding: 15px;

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

const SClassDays = styled.div`
  display: flex;
  flex-direction: column;
`;
const SClassColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 0px 20px;
`;
const SColor = styled.div`
  /* border: 1px solid red; */
  /* width: 30px;
  height: 30px; */
`;

const SDropdownClassDay = styled.div`
  margin: 0px 20px 0px 20px;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 4px;
  padding: 9px 12px 9px 12px;
  border: 1px solid #d9d9d9;
  > input {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    text-align: left;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &::placeholder {
      color: #a6a6a6;
    }

    @media (max-width: 1380px) {
      font-size: 14px;
    }

    @media (max-width: 1023px) {
      font-size: 14px;
    }

    @media (max-width: 879px) {
      font-size: 14px;
    }
  }
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
            <STitle>
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
            </STitle>

            <SClassDays>
              <SLabel>수업 요일</SLabel>
              <SDropdownClassDay>
                <DropdownInput
                  placeholder="수업 요일을 선택해주세요"
                  value={classDay}
                  isToggle={isClassDayDropdownToggle}
                  handleChangeToggle={handleChangeClassDayToggle}
                  dropdownList={
                    <ClassDayList handleClickDay={handleSelectedClassDay} />
                  }
                />
              </SDropdownClassDay>
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
          <STitle>
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
          </STitle>

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
