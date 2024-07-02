import { useEffect, useState } from 'react';
import {
  getAllSemesterNames,
  getUserInfo,
  updateUserInfo,
} from '../../utils/lib/api';
import { useLocation, useNavigate } from 'react-router-dom';
import DropdownInput from '../common/DropdownInput';
import SemesterDropdownList from './SemesterDropdownList';
import styled from 'styled-components';

const SSemesterInputWrapper = styled.div`
  width: 19.8vw;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 8px;
  padding: 14px 18px 14px 16px;
  border: 1px solid #d5d5d5;
  @media (max-width: 1023px) {
    padding: 6px 10px;
  }
  > input {
    font-family: Pretendard;
    font-size: 28px;
    font-weight: 600;
    line-height: 33.41px;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &::placeholder {
      color: #a6a6a6;
    }

    @media (max-width: 1380px) {
      font-size: 22px;
    }

    @media (max-width: 1023px) {
      font-size: 20px;
    }

    @media (max-width: 879px) {
      font-size: 16px;
    }
  }
`;
interface SemesterData {
  id: string;
  semesterName: string;
}
const AllSemesterNamesForm = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem('userId');
  const [semesterOptions, setSemesterOptions] = useState<SemesterData[]>([]);
  const [isDropdownSemesterToggle, setIsDropdownSemesterToggle] =
    useState<boolean>(false);
  const [defaultSemester, setDefaultSemester] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);
  const currentUrl = useLocation();

  const handleChangeSemesterToggle = () => {
    setIsDropdownSemesterToggle(!isDropdownSemesterToggle);
  };

  useEffect(() => {
    if (user) {
      const getSemesterNames = async () => {
        try {
          const response = await getAllSemesterNames();

          setSemesterOptions(response);
        } catch {}
      };
      getSemesterNames();
    }
  }, [user]);

  const handleClickSemester = async (
    semesterName: string,
    scheduleId: string,
  ) => {
    const userData = {
      scheduleId: scheduleId,
      semesterName: semesterName,
    };
    await updateUserInfo(userData);

    handleChangeSemesterToggle();
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const getSemesterId = async () => {
      const response = await getUserInfo(user);

      const scheduleId = response.data.scheduleId;
      const semesterName = response.data.semesterName;
      if (semesterName) {
        setDefaultSemester(semesterName);
      }

      if (scheduleId && scheduleId !== 0) {
        currentUrl.pathname.includes('home')
          ? navigate(`/home/${scheduleId}`)
          : navigate(`/timetable/${scheduleId}`);
      } else {
        currentUrl.pathname.includes('home')
          ? navigate(`/home`)
          : navigate(`/timetable`);
      }
    };
    getSemesterId();
  }, [reload]);

  return (
    <SSemesterInputWrapper>
      <DropdownInput
        placeholder="학기를 추가해 주세요"
        value={defaultSemester}
        dropdownList={
          semesterOptions.length > 0 ? (
            <SemesterDropdownList
              options={semesterOptions.map((option) => ({
                id: option.id,
                semesterName: option.semesterName,
              }))}
              onSelectedSemester={handleClickSemester}
            />
          ) : null
        }
        isToggle={isDropdownSemesterToggle}
        handleChangeToggle={handleChangeSemesterToggle}
      ></DropdownInput>
    </SSemesterInputWrapper>
  );
};

export default AllSemesterNamesForm;
