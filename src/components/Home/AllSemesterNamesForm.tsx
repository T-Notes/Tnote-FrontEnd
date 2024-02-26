import { useEffect, useState } from 'react';
import { Dropdown } from '../common/Dropdown';
import { getAllSemesterNames } from '../../utils/lib/api';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownInput from '../common/DropdownInput';
import SemesterDropdownList from './SemesterDropdownList';

interface Semester {
  id: string;
  name: string;
}

const AllSemesterNamesForm = () => {
  const navigate = useNavigate();
  const [semesterOptions, setSemesterOptions] = useState<any[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [isDropdownSemester, setIsDropdownSemester] = useState<boolean>(false);

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
    console.log(semester);

    const selectedSemesterName = semesterOptions.find(
      (s) => s.id === semesterId,
    );

    if (selectedSemesterName) {
      navigate(`/home/${selectedSemesterName.id}`);
    }
    setSelectedSemester(semester);
    closeDropdownSemester();
  };

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
