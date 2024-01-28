import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import DateRangePicker from '../common/DateRangePicker';

import { lastClassState, semesterNameState } from '../../utils/lib/atom';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';
import LastClassList from './LastClassList';
import styled from 'styled-components';
import instanceAxios from '../../utils/InstanceAxios';
import { useParams } from 'react-router-dom';

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
const SemesterForm = () => {
  const { id } = useParams();
  console.log('id', id);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [semesterName, setSemesterName] = useState('');
  const [lastClass, setLastClass] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClickDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleClickLastClass = (per: string) => {
    setLastClass(per);
    setIsDropdown(false); // 마지막 교시 드롭다운 닫기
  };

  const handleParentStartDateChange = (startDate: Date, endDate: Date) => {
    // 받은 startDate 값을 부모 컴포넌트의 상태로 업데이트
    setStartDate(startDate);
    setEndDate(endDate);
  };
  // 유저가 저장한 값 가져오기
  useEffect(() => {
    try {
      instanceAxios.get(`/schedule/${id}`).then((res) => {
        const getData = res.data;
        setSemesterName(getData.semesterName);
        setLastClass(getData.lastClass);
        setStartDate(getData.startDate);
        setEndDate(getData.endDate);
      });
    } catch (err) {
      console.log('저장한 학기를 가져오는데 실패했습니다.', err);
    }
  }, []);

  const handleSemesterSetupModify = async () => {
    try {
      await instanceAxios.patch(`/schedule/${id}`, {
        semesterName,
        lastClass,
        startDate,
        endDate,
      });
    } catch (err) {
      console.log('학기 수정에 실패했습니다.', err);
    }
  };
  return (
    <SWrapper>
      <label>학기 이름</label>
      <Input placeholder="EX: 2024년 1학기" value={semesterName} readOnly />
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
      <SSave onClick={handleSemesterSetupModify}>저장</SSave>
    </SWrapper>
  );
};

export default SemesterForm;
