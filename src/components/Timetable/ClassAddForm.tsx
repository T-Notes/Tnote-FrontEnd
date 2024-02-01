import styled from 'styled-components';
import { useToggle } from '../../utils/useHooks/useToggle';

import { IcCloseDropdown, IcOpenDropdown, IcClose } from '../../assets/icons';
import ClassDayList from './ClassDayList';
import { useState } from 'react';
import { Button } from '../common/styled/Button';
import instanceAxios from '../../utils/InstanceAxios';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import { useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

const SClassAddForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const SClassAddFormInput = styled.input`
  border-radius: 0;
  border-bottom: 1px solid black;
`;
interface SClassProps {
  isSelected: boolean;
}
const SClass = styled.div<SClassProps>`
  background-color: ${(props) =>
    props.isSelected ? '#632CFA' : 'transparent'};
`;

const SColorPreview = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const SSaveClassBtn = styled(Button)`
  width: 357px;
  height: 58px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button1};
`;

interface IsClassAddProps {
  onCloseAddClass: () => void;
}

const ClassAddForm = ({ onCloseAddClass }: IsClassAddProps) => {
  const { id } = useParams();
  const [subjectName, setSubjectName] = useState<string>('');
  const [classTime, setClassTime] = useState<number>();
  const [classDay, setClassDay] = useState<string>('');
  const [classLocation, setClassLocation] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const { isToggle, handleChangeToggle } = useToggle();
  const { currentDate } = useCurrentDate();
  const date = currentDate;
  const scheduleId = id;

  const classNum = [
    { id: 1, class: 1 },
    { id: 2, class: 2 },
    { id: 3, class: 3 },
    { id: 4, class: 4 },
    { id: 5, class: 5 },
    { id: 6, class: 6 },
    { id: 7, class: 7 },
    { id: 8, class: 8 },
    { id: 9, class: 9 },
  ];

  const ClassColor = [
    { id: 1, color: '파란색', code: 'rgba(14, 165, 233, 0.10)' },
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
    setClassDay(day);
    handleChangeToggle();
  };

  const handleChangeClassLocation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setClassLocation(e.target.value);
  };

  const handleClickColor = (color: string) => {
    console.log('color:', color);
    setColor(color);
  };
  const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const handleSaveClassForm = () => {
    instanceAxios
      .post('/tnote/subjects', {
        subjectName,
        classTime,
        classLocation,
        memo,
        color,
        date,
        scheduleId,
      })
      .then((res) => {
        console.log('수업 과목 저장에 성공했습니다!');
      });
  };
  return (
    <>
      <div>
        <div>수업추가</div>
        <IcClose onClick={onCloseAddClass} />
        <SClassAddForm>
          <label>과목 이름</label>
          <SClassAddFormInput
            placeholder="과목명 작성"
            onChange={handleChangeSubjectName}
            value={subjectName}
          ></SClassAddFormInput>
          <label>수업 교시</label>
          {'<'}
          {classNum.map((per) => (
            <div
              key={per.id}
              onClick={() => handleSelectedClass(per.class)}
              style={{
                backgroundColor:
                  per.class === classTime ? '#632CFA' : 'transparent',
              }}
            >
              <p>{per.class}</p>
            </div>
          ))}
          {'>'}
          <label>수업 요일</label>
          <SClassAddFormInput
            value={classDay || ''} // value 속성
            placeholder="요일 선택"
            readOnly // 읽기 전용 필드로 설정
          ></SClassAddFormInput>
          {isToggle ? (
            <IcCloseDropdown onClick={handleChangeToggle} />
          ) : (
            <IcOpenDropdown onClick={handleChangeToggle} />
          )}
          {isToggle && <ClassDayList handleClickDay={handleSelectedClassDay} />}
          <label>수업 위치 작성</label>
          <SClassAddFormInput
            placeholder="학년 반 작성"
            onChange={handleChangeClassLocation}
            value={classLocation}
          ></SClassAddFormInput>
        </SClassAddForm>
        <label>색상 선택</label>
        {ClassColor.map((colors) => (
          <div key={colors.id} onClick={() => handleClickColor(colors.color)}>
            <SColorPreview style={{ backgroundColor: colors.code }} />
          </div>
        ))}
        <br />
        <label>메모</label>
        <SClassAddFormInput
          placeholder="메모작성"
          onChange={handleChangeMemo}
          value={memo}
        ></SClassAddFormInput>
        <SSaveClassBtn onClick={handleSaveClassForm}>수업 저장</SSaveClassBtn>
      </div>
    </>
  );
};

export default ClassAddForm;
