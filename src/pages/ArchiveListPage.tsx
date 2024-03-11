import { ChangeEvent, ReactEventHandler, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ArchiveList from '../components/Archive/ArchiveList';
import SearchInput from '../components/common/SearchInput';
import { getSemesterSearchValue } from '../utils/lib/api';
import _debounce from 'lodash/debounce';

const SArchiveWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SSearchValueContainer = styled.div`
  border: 1px solid red;
`;
// 사용 api
//  학기 검색 부분
// 학기 삭제
// 학기 수정
interface SearchValue {
  id: number;
  semesterName: string;
}
const Archive = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueList, setSetSearchValueList] = useState<SearchValue[]>([]);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setSetSearchValueList([]); // 검색어가 비어있을 때 검색 결과를 초기화
    }
  };

  const handleSemesterSearch = async () => {
    const getSearchValue = await getSemesterSearchValue(searchValue);
    setSetSearchValueList(getSearchValue.data);
    console.log(2, getSearchValue.data.length);
  };

  const debouncedSearch = _debounce(handleSemesterSearch, 1000);

  useEffect(() => {
    if (searchValue) {
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [searchValue]);

  const handleSelectedSemester = (semesterId: number, semesterName: string) => {
    console.log(1, semesterId);
    navigate(`/archiveContainer/${semesterId}`);
  };
  return (
    <SArchiveWrapper>
      <div>내 아카이브</div>
      <SearchInput
        size="small"
        theme={{ background: 'blue400' }}
        handleSearchInputChange={handleChangeSearchValue}
        placeholder="텍스트를 입력하세요"
        value={searchValue}
      />
      <button>수정</button>
      <button>삭제</button>
      {searchValueList.length > 0 ? (
        <>
          <SSearchValueContainer>
            {searchValueList.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  handleSelectedSemester(item.id, item.semesterName)
                }
              >
                <div>{item.semesterName}</div>
              </div>
            ))}
          </SSearchValueContainer>
        </>
      ) : (
        <ArchiveList />
      )}

      {/* 전체학기 리스트 */}
    </SArchiveWrapper>
  );
};

export default Archive;
