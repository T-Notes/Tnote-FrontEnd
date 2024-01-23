import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import DateRangePicker from '../common/DateRangePicker';

import { lastClassState, semesterNameState } from '../../lib/atom';
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
  const [semesterName, setSemesterName] = useRecoilState(semesterNameState);
  //   const [semesterName, setSemesterName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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

  const handleSubmit = () => {
    // 1. 왼쪽 학기 리스트에 설정한 이름이 추가되어야 한다.
    //2. 현재페이지의 값은 비어져야 한다.
    //3. 1의 리스트를 클릭했을때 적은 값이 그대로 있어야 한다. //get
    // 문제: 값이 비어지면 전역으로 관리하던 값도 비어지게 된다. (다른 곳에서 해당 값을 쓸수가 없음.)
    // 문제: 해당 아이디의 학기설정 값을 조회할 기능이 있는가?

    // 전역으로 관리하려던 값: 학기 이름, 마지막교시
    setSemesterName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setLastClass('');
  };
  //   const handleSubmit = async () => {
  //     try {
  //       await instanceAxios
  //         .post('/schedule', {
  //           semesterName,
  //           lastClass,
  //           startDate,
  //           endDate,
  //         })
  //         .then((res) => {
  //           const getData = res.data.data;
  //           console.log('getData:', getData);
  //           // 학기 추가 후 값 비우기 // => 예상 문제: 전역에서 관리하는 last class, SemesterName값이 비어지지 않나?
  //           setSemesterName('');
  //           setStartDate(new Date());
  //           setEndDate(new Date());
  //           setLastClass('');

  //           //고민: 여기서 받아온 학기 정보(semesterName)를 전역관리 해주는 것이 어떨까?
  //           // 이 값을 메인 홈에서 써야한다.
  //         });
  //     } catch (err) {
  //       console.log('err:', err);
  //     }
  //   };

  return (
    <>
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
    </>
  );
};

export default SemesterSetupForm;
