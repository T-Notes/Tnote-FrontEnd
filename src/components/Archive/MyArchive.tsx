import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllSemesterNames } from '../../utils/lib/api';

const SArchiveListWrapper = styled.div`
  margin-top: 40px;
`;
export const SSemesterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #e8e8e8;
  color: #5b5b5b;
  font-size: 14px;
  margin-bottom: 20px;
  border-radius: 8px;
  cursor: pointer;
`;
interface Semester {
  id: number;
  semesterName: string;
}
interface Archive {
  handleSelectedSemester: (selectedSemesterId: number) => void;
}
const MyArchive = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [allSemester, setAllSemester] = useState<Semester[]>([]);
  const [semesterId, setSemesterId] = useState<number>();

  const handleSelectedSemester = (selectedSemesterId: number) => {
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
    <SArchiveListWrapper>
      {allSemester.map((item) => (
        <SSemesterContainer
          key={item.id}
          onClick={() => handleSelectedSemester(item.id)}
        >
          <div>{item.semesterName}</div>
        </SSemesterContainer>
      ))}
    </SArchiveListWrapper>
  );
};

export default MyArchive;
