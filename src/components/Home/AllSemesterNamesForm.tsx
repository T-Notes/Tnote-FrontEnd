import { useEffect, useState } from 'react';
import { Dropdown } from '../common/Dropdown';
import { getAllSemesterNames, getSemesterData } from '../../utils/lib/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DropdownInput from '../common/DropdownInput';
import SemesterDropdownList from './SemesterDropdownList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { scheduleIdState } from '../../utils/lib//recoil/scheduleIdState';
import { lowerFirst } from 'lodash';

interface Semester {
  id: string;
  name: string;
}

const AllSemesterNamesForm = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const user = localStorage.getItem('userId');
  const [semesterOptions, setSemesterOptions] = useState<any[]>([]); // 조회된 학기 리스트 가져오기
  const [selectedSemester, setSelectedSemester] = useState<string>(''); // 유저가 클릭한 학기
  const [isDropdownSemester, setIsDropdownSemester] = useState<boolean>(false); // 드롭다운
  const [defaultSemester, setDefaultSemester] = useState<string>('');

  const currentUrl = useLocation();
  // 드롭다운 제어 함수
  const openDropdownSemester = () => {
    setIsDropdownSemester(true);
  };
  const closeDropdownSemester = () => {
    setIsDropdownSemester(false);
  };

  // 조회리스트 가져오기
  // 예상 문제 발생시점: 조회할 것이 없을때 에러를 낼듯
  useEffect(() => {
    if (user) {
      const getSemesterNames = async () => {
        try {
          const response = await getAllSemesterNames();
          setSemesterOptions(response);
          console.log(semesterOptions);
        } catch {}
      };
      getSemesterNames();
    }
  }, [user]); // 의존성 배열 넣기

  // 선택된 학기값
  const handleClickSemester = (semesterName: string, semesterId: string) => {
    const selectedSemesterId = semesterOptions.find((s) => s.id === semesterId);
    // 선택한 스케줄 id url에 담기
    console.log(4, currentUrl.pathname);

    if (selectedSemesterId) {
      // 현재 페이지에 따라서, navigate 달라짐
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
  // url에 학기 Id가 있다면 해당 학기 정보 조회 후 value에 값 넣기
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
