import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcCheckedBox, IcUncheckedBox } from '../../assets/icons';
import { getAllSemesterNames } from '../../utils/lib/api';

export const SSemesterContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #e8e8e8;
  color: #5b5b5b;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
  margin-bottom: 20px;
  border-radius: 8px;
  gap: 8px;
  cursor: pointer;

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;
  }
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
  handleDeletedCheck: (item: number) => void;
  isDeleteChecked: number | null;
}

const NotSearchArchive = ({ handleDeletedCheck, isDeleteChecked }: Archive) => {
  const navigate = useNavigate();
  const [allSemester, setAllSemester] = useState<Semester[]>([]);

  const handleSelectedSemester = (selectedSemesterId: number) => {
    navigate(`/archiveSemesterDetail/${selectedSemesterId}`);
  };

  useEffect(() => {
    const getAllSemesterData = async () => {
      const response = await getAllSemesterNames();
      setAllSemester(response);
    };
    getAllSemesterData();
  }, []);

  return (
    <>
      {allSemester.map((item) => (
        <SSemesterContainer key={item.id}>
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
        </SSemesterContainer>
      ))}
    </>
  );
};

export default NotSearchArchive;
