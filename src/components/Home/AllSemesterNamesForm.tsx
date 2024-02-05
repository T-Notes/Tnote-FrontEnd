import { useEffect, useState } from 'react';
import { Dropdown } from '../common/Dropdown';
import { getAllSemesterNames } from '../../utils/lib/api';
import { useNavigate, useParams } from 'react-router-dom';

interface Semester {
  id: string;
  name: string;
}

const AllSemesterNamesForm = () => {
  const navigate = useNavigate();

  const [semesterOptions, setSemesterOptions] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');

  //임시 데이터
  const data = [
    { id: '1', name: '3학년2학기' },
    { id: '2', name: '3학년1학기' },
    { id: '3', name: '2학년 2학기' },
  ];
  // 1. 추가한 학기의 값을 받아온다 (학기 고유 id가 있어야 한다.)
  // 추가학기명 전체 조회
  useEffect(() => {
    const getSemesterNames = async () => {
      try {
        // 배포 후 주석풀기
        // const response = await getAllSemesterNames();
        // setSemesterOptions(response);
        const res = data;
        setSemesterOptions(res);
      } catch {}
    };
    getSemesterNames();
  }, []);

  // 2. 학기를 클릭하면 해당 학기에 해당하는 id값이 url에 추가된다.
  const handleSelectSemester = (selectedName: string) => {
    const selectedSemester = data.find((s) => s.name === selectedName);
    if (selectedSemester) {
      navigate(`/home/${selectedSemester.id}`);
    }
    setSelectedValue(selectedName);
  };

  return (
    <>
      <Dropdown
        options={semesterOptions.map((s) => ({ id: s.id, name: s.name }))}
        selectedValue={selectedValue}
        onSelect={handleSelectSemester}
      />
    </>
  );
};

export default AllSemesterNamesForm;
