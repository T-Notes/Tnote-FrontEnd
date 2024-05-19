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
        isToggle={isDropdownSemesterToggle}
        handleChangeToggle={handleChangeSemesterToggle}
      ></DropdownInput>
    </>
  );
};

export default AllSemesterNamesForm;
