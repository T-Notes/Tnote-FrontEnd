import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcCheckedBox, IcUncheckedBox } from '../../assets/icons';
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
const SCheckDiv = styled.div`
  display: flex;
  align-items: center;
  > div {
    padding-left: 10px;
  }
`;
interface Semester {
  id: number;
  semesterName: string;
}
interface Archive {
  isDelete: boolean;
  handleDeletedCheck: (item: number) => void;
  isDeleteChecked: number | null;
}

const MyArchive = ({
  isDelete,
  handleDeletedCheck,
  isDeleteChecked,
}: Archive) => {
  const navigate = useNavigate();
  const [allSemester, setAllSemester] = useState<Semester[]>([]);

  const handleSelectedSemester = (selectedSemesterId: number) => {
    navigate(`/archiveContainer/${selectedSemesterId}`);
  };

  useEffect(() => {
    const getAllSemesterData = async () => {
      const response = await getAllSemesterNames();
      setAllSemester(response);
    };
    getAllSemesterData();
  }, []);

  return (
    <SArchiveListWrapper>
      {allSemester.map((item) => (
        <SSemesterContainer key={item.id}>
          {isDelete ? (
            <SCheckDiv>
              {isDeleteChecked === item.id ? (
                <IcCheckedBox onClick={() => handleDeletedCheck(item.id)} />
              ) : (
                <IcUncheckedBox onClick={() => handleDeletedCheck(item.id)} />
              )}
              <div onClick={() => handleSelectedSemester(item.id)}>
                {item.semesterName}
              </div>
            </SCheckDiv>
          ) : (
            <div onClick={() => handleSelectedSemester(item.id)}>
              {item.semesterName}
            </div>
          )}
        </SSemesterContainer>
      ))}
    </SArchiveListWrapper>
  );
};

export default MyArchive;
