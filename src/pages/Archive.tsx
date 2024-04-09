import { ChangeEvent, ReactEventHandler, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyArchive, { SSemesterContainer } from '../components/Archive/MyArchive';
import SearchInput from '../components/common/SearchInput';
import { getSemesterSearchValue } from '../utils/lib/api';
import _debounce from 'lodash/debounce';
import { IcDelete, IcGrayPen, IcPen } from '../assets/icons';
import WriteButton from '../components/Write/WriteButton';

const SArchiveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 230px;
  right: 300px;
  bottom: 0;
`;
const SSearchValueContainer = styled.div`
  margin-top: 40px;
`;
const SArchiveHeader = styled.div`
  padding-top: 70px;
  display: flex;
  align-items: center;
`;
const SEdit = styled.button`
  display: flex;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid #a6a6a6;
  border-radius: 50px;
  color: #a6a6a6;
  margin-left: 20px;

  font-size: 16px;
  font-weight: 500;
`;
const SDelete = styled(SEdit)``;

const SSearchInput = styled(SearchInput)`
  margin-left: auto;
`;
const Sh1 = styled.h1`
  ${({ theme }) => theme.fonts.h2}
  margin-right: auto;
`;
// 사용 api
//  학기 검색 부분 o
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
  const [reload, setReload] = useState<boolean>(false);

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
      <SArchiveHeader>
        <Sh1>내 아카이브</Sh1>
        <SearchInput
          size="small"
          theme={{ background: 'blue400' }}
          handleSearchInputChange={handleChangeSearchValue}
          placeholder="텍스트를 입력하세요"
          value={searchValue}
        />
        <SEdit>
          수정
          <IcGrayPen />
        </SEdit>
        <SDelete>
          삭제
          <IcDelete />
        </SDelete>
      </SArchiveHeader>

      {searchValueList.length > 0 ? (
        <>
          <SSearchValueContainer>
            {searchValueList.map((item) => (
              <SSemesterContainer
                key={item.id}
                onClick={() =>
                  handleSelectedSemester(item.id, item.semesterName)
                }
              >
                <div>{item.semesterName}</div>
              </SSemesterContainer>
            ))}
          </SSearchValueContainer>
        </>
      ) : (
        <MyArchive />
      )}
      <WriteButton setReload={setReload} />
    </SArchiveWrapper>
  );
};

export default Archive;
