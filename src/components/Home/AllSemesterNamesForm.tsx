import { useEffect, useState } from 'react';
import { getAllSemesterNames, getSemesterData } from '../../utils/lib/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DropdownInput from '../common/DropdownInput';
import SemesterDropdownList from './SemesterDropdownList';

const AllSemesterNamesForm = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const user = localStorage.getItem('userId');
  const [semesterOptions, setSemesterOptions] = useState<any[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [isDropdownSemester, setIsDropdownSemester] = useState<boolean>(false);
  const [defaultSemester, setDefaultSemester] = useState<string>('');

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

  const handleClickSemester = (semesterName: string, semesterId: string) => {
    const selectedSemesterId = semesterOptions.find((s) => s.id === semesterId);

    if (selectedSemesterId) {
      if (
        currentUrl.pathname === '/home' ||
        currentUrl.pathname === `/home/${scheduleId}`
      ) {
        navigate(`/home/${selectedSemesterId.id}`);
      } else if (
        currentUrl.pathname === '/timetable' ||
        currentUrl.pathname === `/timetable/${scheduleId}`
      ) {
        navigate(`/timetable/${selectedSemesterId.id}`);
      }
    }

    setSelectedSemester(semesterName);
    closeDropdownSemester();
  };

  useEffect(() => {
    if (scheduleId) {
      const getSemesterName = async () => {
        const response = await getSemesterData(scheduleId);
        const defaultSemesterName = response.data[0].semesterName;
        setDefaultSemester(defaultSemesterName);
      };
      getSemesterName();
    }
  }, [scheduleId]);

  return (
    <>
      <DropdownInput
        placeholder="학기를 추가해주세요"
        value={defaultSemester || selectedSemester}
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
