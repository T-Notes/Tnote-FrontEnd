import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllSemesterNames } from '../../utils/lib/api';

const SSemesterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
interface Semester {
  id: number;
  semesterName: string;
}
interface Archive {
  handleSelectedSemester: (selectedSemesterId: number) => void;
}
const ArchiveList = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [allSemester, setAllSemester] = useState<Semester[]>([]);
  const [semesterId, setSemesterId] = useState<number>();

  const handleSelectedSemester = (selectedSemesterId: number) => {
    console.log(1, selectedSemesterId);
    navigate(`/archiveContainer/${selectedSemesterId}`);
  };
  useEffect(() => {
    if (scheduleId) {
      const getAllSemesterData = async () => {
        const response = await getAllSemesterNames();
        setAllSemester(response);
      };
      getAllSemesterData();
    }
  }, [scheduleId]);
  return (
    <>
      {allSemester.map((item) => (
        <SSemesterContainer
          key={item.id}
          onClick={() => handleSelectedSemester(item.id)}
        >
          <div>{item.semesterName}</div>
        </SSemesterContainer>
      ))}
    </>
  );
};

export default ArchiveList;
