import { useEffect, useState } from 'react';
import { Dropdown } from '../common/Dropdown';
import { getAllSemesterNames } from '../../utils/lib/api';

const AllSemesterNamesForm = () => {
  const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  console.log('selectedValue', selectedValue);
  //임시 데이터
  const data = ['3학년2학기', '3학년1학기', '2학년 2학기'];

  const handleSelectSemester = (value: string) => {
    setSelectedValue(value);
  };

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
  return (
    <>
      <Dropdown
        options={semesterOptions}
        selectedValue={selectedValue}
        onSelect={handleSelectSemester}
      />
    </>
  );
};

export default AllSemesterNamesForm;
