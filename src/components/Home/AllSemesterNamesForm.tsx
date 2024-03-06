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
// 정상적인 흐름
// 유저가 처음 진입
// 모든 서비스를 조회 가능
// 새로운 학기를 추가하면
// 해당 학기가 폼에 뜨고,
// 해당학기를 바탕으로 서비스를 이용할 수 있어야 한다.

// 지금 흐름
// 유저가 처음 진입
// 모든 서비스를 조회 가능
// 새로운 학기를 추가하면 학기를 클릭하기 전까지 해당 학기를 가지고 서비스를 이용할 수 없음
// 학기를 삭제해도 해당 학기가 params에 달려있어서 조회에러가 나면서 서비스가 죽어버림

// 기존 회원 유저인 경우
// 등록해 놓은 학기가 가장먼저 폼에 떠야한다.
// 학기 아이디가 Params에 담겨야한다

// 새 회원인 경우
// 모든 서비스를 처음 이용하도록 초기화 상태여야 한다.

//해결책
// 스케줄 아이디는 모든 컴포넌트에서 공통적으로 사용해야하니까
// useParams가 아닌 전역 상태관리를 해주자!

const AllSemesterNamesForm = () => {
  const navigate = useNavigate();
  const storedSemester = localStorage.getItem('selectedSemester'); // 유저가 학기를 설정해놓았다면 로컬스토리지에서 가져오기

  const [semesterOptions, setSemesterOptions] = useState<any[]>([]); // 조회된 학기 리스트 가져오기
  const [selectedSemester, setSelectedSemester] = useState<string>(''); // 유저가 클릭한 학기
  const [isDropdownSemester, setIsDropdownSemester] = useState<boolean>(false); // 드롭다운
  const [scheduleId, setScheduleId] = useRecoilState(scheduleIdState); // 전역 스케줄 아이디

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
    if (storedSemester) {
      const getSemesterNames = async () => {
        try {
          const response = await getAllSemesterNames();
          setSemesterOptions(response);
        } catch {}
      };
      getSemesterNames();
    }
  }, []); // 의존성 배열 넣기

  // 선택된 학기값
  const handleClickSemester = (semester: string, semesterId: string) => {
    const selectedSemesterId = semesterOptions.find((s) => s.id === semesterId);
    // 선택한 스케줄 id url에 담기
    if (selectedSemesterId) {
      navigate(`/home/${selectedSemesterId.id}`);
    }
    setScheduleId(selectedSemesterId.id); // 전역에 스케줄아이디 저장
    // localStorage.setItem('selectedSemester', semester); // 선택된 학기값을 로컬 스토리지에 저장
    setSelectedSemester(semester);
    closeDropdownSemester();
  };

  useEffect(() => {
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
