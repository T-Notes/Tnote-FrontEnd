import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import DateRangePicker from '../common/DateRangePicker';

import { lastClassState } from '../../lib/atom';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';
import LastClassList from './LastClassList';
import styled from 'styled-components';
import instanceAxios from '../../utils/InstanceAxios';

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

const SemesterSetupForm = () => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  //   const [lastClass, setLastClass] = useState<string>(''); // 고민: 얘도 시간표 만들때 필요한 값인데, 전역 관리해줘야할까
  const [lastClass, setLastClass] = useRecoilState(lastClassState);
  const [semesterName, setSemesterName] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date());

  const handleParentStartDateChange = (startDate: any, endDate: any) => {
    // 받은 startDate 값을 부모 컴포넌트의 상태로 업데이트
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleClickDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleClickLastClass = (per: string) => {
    setLastClass(per);
    setIsDropdown(false);
  };

  const handleChangeSemesterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemesterName(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      await instanceAxios
        .post('/schedule', {
          semesterName,
          lastClass,
          startDate,
          endDate,
        })
        .then((res) => {
          const getData = res.data.data;
          console.log('getData:', getData);
          //고민: 여기서 받아온 학기 정보(semesterName)를 전역관리 해주는 것이 어떨까?
          // 이 값을 메인 홈에서 써야한다.
        });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <label>학기 이름</label>
      <Input
        placeholder="EX: 3학년 2학기"
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
    </>
  );
};

export default SemesterSetupForm;
