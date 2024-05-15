import { useEffect, useState } from 'react';
import {
  getAllSemesterNames,
  getUserInfo,
  updateUserInfo,
} from '../../utils/lib/api';
import { useLocation, useNavigate } from 'react-router-dom';
import DropdownInput from '../common/DropdownInput';
import SemesterDropdownList from './SemesterDropdownList';

interface SemesterData {
  id: string;
  semesterName: string;
}
const AllSemesterNamesForm = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem('userId');
  const [semesterOptions, setSemesterOptions] = useState<SemesterData[]>([]);
  const [isDropdownSemester, setIsDropdownSemester] = useState<boolean>(false);
  const [defaultSemester, setDefaultSemester] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);
  const currentUrl = useLocation();

  const openDropdownSemester = () => {
    setIsDropdownSemester(true);
  };
  const closeDropdownSemester = () => {
    setIsDropdownSemester(false);
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

    closeDropdownSemester();
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const getSemesterId = async () => {
      const response = await getUserInfo(user);
      const scheduleId = response.data.scheduleId;
      const semesterName = response.data.semesterName;
      if (semesterName !== undefined) {
        setDefaultSemester(semesterName);
      }

      if (scheduleId !== undefined) {
        currentUrl.pathname.includes('home')
          ? navigate(`/home/${scheduleId}`)
          : navigate(`/timetable/${scheduleId}`);
      }
    };
    getSemesterId();
  }, [reload]);

  return (
    <>
      <DropdownInput
        placeholder="학기를 추가해주세요"
        value={defaultSemester}
        size="small"
        theme={{ background: 'white' }}
        dropdownList={
          <SemesterDropdownList
            options={semesterOptions.map((option) => ({
              id: option.id,
              semesterName: option.semesterName,
            }))}
            onSelectedSemester={handleClickSemester}
          />
        }
        isDropdown={isDropdownSemester}
        openDropdown={openDropdownSemester}
        closeDropdown={closeDropdownSemester}
      ></DropdownInput>
    </>
  );
};

export default AllSemesterNamesForm;
