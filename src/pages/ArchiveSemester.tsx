import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcGoBack } from '../assets/icons';
import { getSemesterData } from '../utils/lib/api';
import ArchiveRecentLogs from '../components/Archive/ArchiveRecentLogs';
import ArchiveFilteredLogs from '../components/Archive/ArchiveFilteredLogs';

const SArchiveContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding-right: 21.3vw;
  padding-left: 30px;
`;
const SArchiveTitle = styled.div`
  display: flex;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 38.19px;
  text-align: left;
  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 28px;
  }
`;
const STitle = styled.h1`
  padding-left: 16px;
`;
const SGobackIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

// const SArchiveDateContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 10px;
// `;

// const SSelectDateButton = styled.button`
//   color: #5b5b5b;
//   font-size: 12px;
//   font-weight: 500;
//   width: 90px;
//   border: 1px solid #e8e8e8;
//   border-radius: 8px;
//   padding-left: 20px;
//   padding-right: 20px;
//   padding-top: 5px;
//   padding-bottom: 5px;
//   margin-right: 15px;
// `;
const ArchiveSemester = () => {
  const { scheduleId } = useParams();
  // const navigate = useNavigate();
  const [semesterName, setSemesterName] = useState<string>('');
  // const { year, month, day } = useCurrentDate();

  useEffect(() => {
    if (scheduleId) {
      const getSemesterName = async () => {
        const response = await getSemesterData(scheduleId);
        const data = response.data[0];
        setSemesterName(data.semesterName);
      };
      getSemesterName();
    }
  }, [scheduleId]);

  // const handleNoFeature = async (dateRange: string) => {
  //   let startDate = '';
  //   let endDate = '';
  //   if (dateRange === 'TODAY') {
  //     startDate = `${year}-${month}-${day}`;
  //     endDate = `${year}-${month}-${day}`;
  //   }

  //   const response = await instanceAxios.get(
  //     `tnote/home/${scheduleId}/dateLogs?startDate=${startDate}&endDate=${endDate}&page=0&size=8&logType=`,
  //   );
  //   console.log(response);
  // };
  return (
    <SArchiveContainerWrapper>
      <SArchiveTitle>
        <Link to={`/archive/${scheduleId}`}>
          <SGobackIconContainer>
            <IcGoBack className="pointer" />
          </SGobackIconContainer>
        </Link>

        <STitle> {`${semesterName} 아카이브`}</STitle>
      </SArchiveTitle>
      {/* <SArchiveDateContainer>
        <SArchiveCurrentDate>{`${year}년 ${month}월 ${day}일`}</SArchiveCurrentDate>
        <SSelectDateButton onClick={() => handleNoFeature('TODAY')}>
          오늘
        </SSelectDateButton>
        <SSelectDateButton onClick={() => handleNoFeature('WEEK')}>
          일주일
        </SSelectDateButton>
        <SSelectDateButton onClick={() => handleNoFeature('MONTH')}>
          한달
        </SSelectDateButton>
        <SSelectDateButton onClick={() => handleNoFeature('TODAY')}>
          직접지정
        </SSelectDateButton>
      </SArchiveDateContainer> */}
      <ArchiveRecentLogs scheduleId={scheduleId} />
      <ArchiveFilteredLogs scheduleId={scheduleId} />
    </SArchiveContainerWrapper>
  );
};

export default ArchiveSemester;
