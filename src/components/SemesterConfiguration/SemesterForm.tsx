import React, { useEffect, useState } from 'react';

import DateRangePicker from '../common/DateRangePicker';

import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import { IcCloseDropdown, IcOpenDropdown } from '../../assets/icons';
import LastClassList from './LastClassList';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useToggle } from '../../utils/useHooks/useToggle';

import {
  getSemesterData,
  removeSemester,
  updateSemester,
} from '../../utils/lib/api';

const SWrapper = styled.div`
  margin-left: 7rem;
`;

const SDelete = styled(Button)`
  width: 270px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ theme }) => theme.fonts.button1};
`;
const SSave = styled(Button)`
  width: 270px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button1};
`;
const SWarningText = styled.p`
  ${({ theme }) => theme.fonts.button1};
  color: ${({ theme }) => theme.colors.gray000};
`;
const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h3}
`;

interface SemesterDataProps {
  id: number | null;
  semesterName: string;
  lastClass: string;
  email: string;
  subjects: null;
  startDate: Date | null;
  endDate: Date | null;
}
const SemesterForm = () => {
  const { scheduleId } = useParams();
  console.log('scheduleId', scheduleId);
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();

  const [semesterData, setSemesterData] = useState<SemesterDataProps>({
    id: null, // 없는 값
    semesterName: '',
    lastClass: '',
    email: '',
    subjects: null, // 없는 값
    startDate: null,
    endDate: null,
  });

  const handleChangeSemesterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateSemesterName = e.target.value;
    setSemesterData((prev) => ({ ...prev, semesterName: updateSemesterName }));
  };
  const handleClickLastClass = (per: string) => {
    setSemesterData((prev) => ({
      ...prev,
      lastClass: per,
    }));

    setIsToggle(false); // 마지막 교시 드롭다운 닫기
  };

  const handleParentStartDateChange = (startDate: Date, endDate: Date) => {
    // 받은 startDate 값을 부모 컴포넌트의 상태로 업데이트
    setSemesterData((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
    }));
  };
  // 유저가 저장한 값 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        await getSemesterData(scheduleId);
        setSemesterData((prev) => ({
          ...prev,
          semesterName: semesterData.semesterName,
          lastClass: semesterData.lastClass,
          startDate: semesterData.startDate,
          endDate: semesterData.endDate,
        }));
        getData();
      } catch {}
    };
  }, []);

  // 학기 수정하기
  const handleUpdateSemester = async () => {
    try {
      await updateSemester(scheduleId, semesterData);
      setSemesterData((prev) => ({
        ...prev,
        semesterName: semesterData.semesterName,
        lastClass: semesterData.lastClass,
        startDate: semesterData.startDate,
        endDate: semesterData.endDate,
      }));
    } catch (error) {
      console.log('학기 수정에 실패했습니다.', error);
    }
  };

  // 학기 삭제하기
  const handleDeleteSemester = async () => {
    await removeSemester(scheduleId);
  };

  return (
    <SWrapper>
      <SHeader>학기 설정</SHeader>
      <label>학기 이름</label>
      <Input
        placeholder="EX: 2024년 1학기"
        value={semesterData.semesterName}
        onChange={handleChangeSemesterName}
      />
      <label>학기 기간 설정</label>
      <DateRangePicker onStartDateChange={handleParentStartDateChange} />

      <label>마지막 교시</label>
      {isToggle ? (
        <IcCloseDropdown onClick={handleChangeToggle} />
      ) : (
        <IcOpenDropdown onClick={handleChangeToggle} />
      )}
      {isToggle && <LastClassList onSelectedPeriod={handleClickLastClass} />}

      <Input
        value={semesterData.lastClass}
        readOnly
        placeholder="교시를 선택해주세요"
      />
      <SWarningText>
        학기 삭제 시 해당 학기 아카이브의 모든 문서 및 시간표 내용이 삭제됩니다.
      </SWarningText>
      <SDelete onClick={handleDeleteSemester}>학기 삭제</SDelete>
      <SSave onClick={handleUpdateSemester}>저장</SSave>
    </SWrapper>
  );
};

export default SemesterForm;
