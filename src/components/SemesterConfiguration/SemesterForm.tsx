import React, { useEffect, useState } from 'react';

import DateRangePicker from '../common/DateRangePicker';

import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import {
  IcCloseDropdown,
  IcDatePicker,
  IcOpenDropdown,
} from '../../assets/icons';
import LastClassList from './LastClassList';
import styled from 'styled-components';

import { useNavigate, useParams } from 'react-router-dom';
import { useToggle } from '../../utils/useHooks/useToggle';

import {
  getSemesterData,
  removeSemester,
  updateSemester,
} from '../../utils/lib/api';
import DropdownInput from '../common/DropdownInput';
import Swal from 'sweetalert2';

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed; /* 고정 위치 */
  left: 500px;
  /* align-items: center; */
`;
const SSemesterBody = styled.div`
  margin-top: 25px;
  margin-bottom: 40px;
`;
const SLabel = styled.div`
  padding-top: 40px;
  padding-bottom: 20px;

  ${({ theme }) => theme.fonts.caption};
`;

const SDelete = styled(Button)`
  width: 245px;
  height: 50px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ theme }) => theme.fonts.caption};
`;
const SSave = styled(Button)`
  width: 245px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption};
`;
const SWarningText = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray000};
`;
const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h2}
  margin-top: 30px;
`;
const SDateIc = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
`;

const SButtons = styled.div`
  display: flex;
  margin-top: 15px;
`;
const SDropdownWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 8px;
  padding: 10px 10px 10px 16px;
  border: 1px solid #d5d5d5;
`;
const SInput = styled(Input)`
  width: 500px;
`;

const SLastClassInput = styled.input`
  width: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray100};
  }
`;

interface SemesterDataProps {
  id: number | null;
  semesterName: string;
  lastClass: string;
  email: string;
  subjects: null;
  startDate: Date;
  endDate: Date;
}

const SemesterForm = () => {
  const { scheduleId } = useParams(); // 베너에서 id값을 달아서 가져옴
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();

  const navigate = useNavigate();
  const [semesterData, setSemesterData] = useState<SemesterDataProps>({
    id: null, // 없는 값
    semesterName: '',
    lastClass: '',
    email: '',
    subjects: null, // 없는 값
    startDate: new Date(), // 왜 null?
    endDate: new Date(),
  });

  const handleChangeSemesterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const semesterName = e.target.value;
    setSemesterData((prev) => ({ ...prev, semesterName: semesterName }));
  };

  const handleClickLastClass = (session: string) => {
    setSemesterData((prev) => ({
      ...prev,
      lastClass: session,
    }));

    setIsToggle(false); // 마지막 교시 드롭다운 닫기
  };

  // 예상 문제 지점
  const handleParentStartDateChange = (startDate: Date, endDate: Date) => {
    // 받은 startDate 값을 부모 컴포넌트의 상태로 업데이트

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    // 뿌려줄 데이터
    setSemesterData((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
      // startDate: JSON.stringify(startDate),
      // endDate: JSON.stringify(endDate),
    }));
  };

  const getSemesterForm = async () => {
    const semesterData = await getSemesterData(scheduleId);

    const data = semesterData.data[0];

    setSemesterData((prev) => ({
      ...prev,
      semesterName: data.semesterName,
      lastClass: data.lastClass,
      startDate: data.startDate,
      endDate: data.endDate,
    }));
  };

  // 유저가 저장한 값 가져오기
  useEffect(() => {
    if (scheduleId) {
      getSemesterForm();
    }
  }, [scheduleId]);

  // 학기 수정하기
  // 여기서 받은 응답을 그대로 렌더링한다는 에러가 뜸.
  const handleUpdateSemester = async () => {
    const editSemester = await updateSemester(scheduleId, semesterData);
    const data = editSemester.data;

    setSemesterData((prev) => ({
      ...prev,
      semesterName: data.semesterName,
      lastClass: data.lastClass,
      startDate: data.startDate,
      endDate: data.endDate,
    }));
    localStorage.setItem('semesterName', data.semesterName);
    window.location.reload();
    // navigate(`/home/${scheduleId}`); // 여기서 객체 렌더링 문제가 나는 거였음 ㅜㅜ 페이지 이동을 하면서
  };

  // 학기 삭제하기
  const handleDeleteSemester = async () => {
    await removeSemester(scheduleId);
    navigate('/semesterSetup');
    window.location.reload();
  };

  return (
    <SWrapper>
      <SHeader>학기 설정</SHeader>
      <SSemesterBody>
        <SLabel>학기 이름</SLabel>
        <SInput
          placeholder="EX: 2024년 1학기"
          value={semesterData.semesterName}
          onChange={handleChangeSemesterName}
        />
        <SLabel>학기 기간 설정</SLabel>

        <DateRangePicker
          // serverStartDate={semesterData.startDate}
          onStartDateChange={handleParentStartDateChange}
        />
        {/* <div>{JSON.stringify(semesterData.startDate)}</div> */}
        <SLabel>마지막 교시</SLabel>

        <SDropdownWrapper>
          <SLastClassInput
            value={semesterData.lastClass}
            readOnly
            placeholder="교시를 선택해주세요"
          />
          {isToggle ? (
            <IcCloseDropdown onClick={handleChangeToggle} />
          ) : (
            <IcOpenDropdown onClick={handleChangeToggle} />
          )}
          {isToggle && (
            <LastClassList onSelectedSession={handleClickLastClass} />
          )}
        </SDropdownWrapper>
      </SSemesterBody>
      <SWarningText>
        학기 삭제 시 해당 학기 아카이브의 모든 문서 및 시간표 내용이 삭제됩니다.
      </SWarningText>
      <SButtons>
        <SDelete onClick={handleDeleteSemester}>학기 삭제</SDelete>
        <SSave onClick={handleUpdateSemester}>저장</SSave>
      </SButtons>
    </SWrapper>
  );
};

export default SemesterForm;
