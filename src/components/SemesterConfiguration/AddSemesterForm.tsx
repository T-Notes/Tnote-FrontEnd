import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import DateRangePicker from '../common/DateRangePicker';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';
import LastClassList from './LastClassList';
import styled from 'styled-components';

import { createSemester } from '../../utils/lib/api';
import { userDataState } from '../../utils/lib/recoil/userDataState';

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
// 학기 추가하기 페이지
const AddSemesterForm = () => {
  // ** 상태 관리
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [lastClass, setLastClass] = useState<string>('');
  const [semesterName, setSemesterName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { email } = useRecoilValue(userDataState);

  // ** 이벤트 핸들러

  const handleParentStartDateChange = (startDate: Date, endDate: Date) => {
    // 받은 startDate 값을 부모 컴포넌트의 상태로 업데이트

    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleClickDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleClickLastClass = (per: string) => {
    setLastClass(per);
    setIsDropdown(false); // 마지막 교시 드롭다운 닫기
  };

  const handleChangeSemesterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemesterName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const semesterData = {
        semesterName: semesterName,
        lastClass: lastClass,
        email: email,
        startDate: startDate,
        endDate: endDate,
      };
      const postSemester = await createSemester(semesterData);
      console.log(1, 'postSemester:', postSemester);
      // 저장 후 현재 페이지의 값 비우기
      setSemesterName('');
      setStartDate(new Date());
      setEndDate(new Date());
      setLastClass('');
    } catch (err) {
      console.log('학기 저장에 실패했습니다.:', err);
    }
  };

  return (
    <SWrapper>
      <label>학기 이름</label>
      <Input
        placeholder="EX: 2024년 1학기"
        onChange={handleChangeSemesterName}
        value={semesterName}
      />
      <label>학기 기간 설정</label>
      <DateRangePicker onStartDateChange={handleParentStartDateChange} />

      <label>마지막 교시</label>
      {isDropdown ? (
        <IcCloseDropdown onClick={handleClickDropdown} />
      ) : (
        <IcOpenDropdown onClick={handleClickDropdown} />
      )}
      {isDropdown && <LastClassList onSelectedPeriod={handleClickLastClass} />}
      <Input value={lastClass} readOnly placeholder="교시를 선택해주세요" />
      <SWarningText>
        학기 삭제 시 해당 학기 아카이브의 모든 문서 및 시간표 내용이 삭제됩니다.
      </SWarningText>
      <SDelete>학기 삭제</SDelete>
      <SSave onClick={handleSubmit}>저장</SSave>
    </SWrapper>
  );
};

export default AddSemesterForm;
