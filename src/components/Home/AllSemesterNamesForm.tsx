import { useEffect, useState } from 'react';
import { Dropdown } from '../common/Dropdown';
import { getAllSemesterNames } from '../../utils/lib/api';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownInput from '../common/DropdownInput';
import SemesterDropdownList from './SemesterDropdownList';
import { useRecoilState } from 'recoil';
import { scheduleIdState } from '../../utils/lib//recoil/scheduleIdState';

interface Semester {
  id: string;
  name: string;
}

const AllSemesterNamesForm = () => {
  const navigate = useNavigate();
  const [semesterOptions, setSemesterOptions] = useState<any[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [isDropdownSemester, setIsDropdownSemester] = useState<boolean>(false);
  const [scheduleId, setScheduleId] = useRecoilState(scheduleIdState);
  const openDropdownSemester = () => {
    setIsDropdownSemester(true);
  };
  const closeDropdownSemester = () => {
    setIsDropdownSemester(false);
  };

  useEffect(() => {
    const getSemesterNames = async () => {
      try {
        const response = await getAllSemesterNames();
        setSemesterOptions(response);
      } catch {}
    };
    getSemesterNames();
  }, []);

  // 선택된 학기값
  const handleClickSemester = (semester: string, semesterId: string) => {
    const selectedSemesterId = semesterOptions.find((s) => s.id === semesterId);
    // 선택한 스케줄 id url에 담기
    if (selectedSemesterId) {
      navigate(`/home/${selectedSemesterId.id}`);
    }
    setScheduleId(selectedSemesterId.id); // 전역에 스케줄아이디 저장
    localStorage.setItem('selectedSemester', semester); // 선택된 학기값을 로컬 스토리지에 저장
    setSelectedSemester(semester);
    closeDropdownSemester();
  };

  useEffect(() => {
    const storedSemester = localStorage.getItem('selectedSemester');
    if (storedSemester) {
      setSelectedSemester(storedSemester); // 페이지가 로드될 때 로컬 스토리지에서 선택된 학기값을 가져와 상태에 설정
    }
  }, []);

  return (
    <>
      <DropdownInput
        placeholder="학기를 추가해주세요"
        value={selectedSemester}
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
