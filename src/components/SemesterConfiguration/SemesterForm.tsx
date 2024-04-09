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
}
interface SetupProps {
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
}
const SemesterForm = ({ setReload, reload }: SetupProps) => {
  const { scheduleId } = useParams();
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();

  const navigate = useNavigate();
  const [semesterData, setSemesterData] = useState<SemesterDataProps>({
    id: null,
    semesterName: '',
    lastClass: '',
    email: '',
    subjects: null,
  });

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleChangeSemesterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const semesterName = e.target.value;
    setSemesterData((prev) => ({ ...prev, semesterName: semesterName }));
  };

  const handleClickLastClass = (session: string) => {
    setSemesterData((prev) => ({
      ...prev,
      lastClass: session,
    }));

    setIsToggle(false);
  };

  const getSemesterForm = async () => {
    const semesterData = await getSemesterData(scheduleId);

    const data = semesterData.data[0];

    setSemesterData((prev) => ({
      ...prev,
      semesterName: data.semesterName,
      lastClass: data.lastClass,
    }));
    setStartDate(new Date(data.startDate));
    setEndDate(new Date(data.endDate));
  };

  // 유저가 저장한 값 가져오기
  useEffect(() => {
    if (scheduleId) {
      getSemesterForm();
    }
  }, [scheduleId, reload]);

  const handleUpdateSemester = async () => {
    const patchData = {
      semesterName: semesterData.semesterName,
      lastClass: semesterData.lastClass,
      startDate: startDate,
      endDate: endDate,
    };
    const editSemester = await updateSemester(scheduleId, patchData);
    const data = editSemester.data;

    setSemesterData((prev) => ({
      ...prev,
      semesterName: data.semesterName,
      lastClass: data.lastClass,
    }));
    localStorage.setItem('semesterName', data.semesterName);
    setReload((prev) => !prev);
    Swal.fire({
      title: '저장되었습니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#632CFA',
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.reload();
      }
    });
  };

  // 학기 삭제하기
  const handleDeleteSemester = async () => {
    await Swal.fire({
      title: '학기 삭제',
      text: '해당학기를 삭제할 시 해당 학기의 모든 데이터가 삭제되며 되돌릴 수없습니다. 학기를 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((res) => {
      if (res.isConfirmed) {
        removeSemester(scheduleId);
        navigate('/semesterSetup');
        setReload((prev) => !prev);
        Swal.fire({
          title: '삭제되었습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#632CFA',
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      }
    });
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
          setStartDate={setStartDate}
          startDate={startDate}
          setEndDate={setEndDate}
          endDate={endDate}
        />

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
