import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DateRangePicker from '../common/DateRangePicker';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import { IcCloseDropdown, IcOpenDropdown } from '../../assets/icons';
import LastClassList from './LastClassList';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useToggle } from '../../utils/useHooks/useToggle';
import {
  createSemester,
  getSemesterData,
  removeSemester,
  updateSemester,
} from '../../utils/lib/api';

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 36vw;

  @media (max-width: 1040px) {
    left: 40vw;
  }
  @media (max-width: 720px) {
    left: 45vw;
  }
`;
const SSemesterBody = styled.div`
  margin-top: 25px;
  margin-bottom: 40px;
`;
const SLabel = styled.div`
  padding-top: 40px;
  padding-bottom: 20px;

  //styleName: Font/Web_Body;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
`;

const SDelete = styled(Button)`
  width: 245px;
  height: 50px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.colors.gray200};

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;
const SSave = styled(Button)<{ disabled: boolean }>`
  width: 245px;
  height: 50px;
  background-color: ${(props) => (props.disabled ? '#E8E8E8' : '#632CFA')};
  color: ${(props) => (props.disabled ? '#11111' : '#ffff')};

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;
const SWarningText = styled.p`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #5b5b5b;
`;
const SHeader = styled.div`
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 600;
  line-height: 38.19px;
  text-align: left;
  margin-top: 30px;
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
  id: string | undefined;
}
const SemesterForm = ({ setReload, reload, id }: SetupProps) => {
  const { scheduleId } = useParams();
  const [isActiveDateColor, setIsActiveDateColor] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();
  const currentUrl = window.location.pathname;
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

  useEffect(() => {
    if (currentUrl.includes('home')) {
      setUrl('/semesterSetup/home');
    } else if (currentUrl.includes('timetable')) {
      setUrl('/semesterSetup/timetable');
    } else if (currentUrl.includes('archive')) {
      setUrl('/semesterSetup/archive');
    }
  }, [currentUrl]);

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
    const semesterData = await getSemesterData(id ? id : scheduleId);

    const data = semesterData.data[0];

    if (data.startDate && data.endDate) {
      setIsActiveDateColor(true);
    } else {
      setIsActiveDateColor(false);
    }

    setSemesterData((prev) => ({
      ...prev,
      semesterName: data.semesterName,
      lastClass: data.lastClass,
    }));

    setStartDate(data.startDate ? new Date(data.startDate) : new Date());
    setEndDate(data.endDate ? new Date(data.endDate) : new Date());
  };

  useEffect(() => {
    if (scheduleId || id) {
      getSemesterForm();
    }
  }, [scheduleId, reload, id]);

  const handleUpdateSemester = async () => {
    if (scheduleId || id) {
      const patchData = {
        semesterName: semesterData.semesterName,
        lastClass: semesterData.lastClass,
        startDate: startDate?.toISOString().slice(0, 10),
        endDate: endDate?.toISOString().slice(0, 10),
      };

      const editSemester = await updateSemester(
        id ? id : scheduleId,
        patchData,
      );
      const data = editSemester.data;

      setSemesterData((prev) => ({
        ...prev,
        semesterName: data.semesterName,
        lastClass: data.lastClass,
      }));

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
    } else {
      const createData = {
        semesterName: semesterData.semesterName,
        lastClass: semesterData.lastClass,
        email: '',
        startDate: startDate?.toISOString().slice(0, 10),
        endDate: endDate?.toISOString().slice(0, 10),
      };

      const response = await createSemester(createData);
      const data = response.data;

      setSemesterData((prev) => ({
        ...prev,
        semesterName: data.semesterName,
        lastClass: data.lastClass,
      }));

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
    }
  };

  const handleDeleteSemester = async () => {
    await Swal.fire({
      title: '학기 삭제',
      text: '해당학기를 삭제할 시 해당 학기의 모든 데이터가 삭제되며 되돌릴 수없습니다. 학기를 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((res) => {
      if (res.isConfirmed) {
        removeSemester(id ? id : scheduleId);
        navigate(url);
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

  const isFormValid =
    semesterData.semesterName && semesterData.lastClass && startDate && endDate;
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
          isActiveDateColor={isActiveDateColor}
        />

        <SLabel>마지막 교시</SLabel>

        <SDropdownWrapper onClick={handleChangeToggle}>
          <SLastClassInput
            value={semesterData.lastClass}
            readOnly
            placeholder="교시를 선택해주세요"
          />
          {isToggle ? (
            <IcCloseDropdown onClick={handleChangeToggle} />
          ) : (
            <IcOpenDropdown />
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
        <SSave onClick={handleUpdateSemester} disabled={!isFormValid}>
          저장
        </SSave>
      </SButtons>
    </SWrapper>
  );
};

export default SemesterForm;
