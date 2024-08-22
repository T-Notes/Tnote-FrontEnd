import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NotSearchArchive from '../components/Archive/NotSearchArchive';
import SearchInput from '../components/common/SearchInput';
import { removeSemester, searchArchiveLog } from '../utils/lib/api';
import _debounce from 'lodash/debounce';
import Swal from 'sweetalert2';
import DeleteButton from '../components/common/DeleteButton';
import DropdownInput from '../components/common/DropdownInput';
import ArchiveSearchFilterList from '../components/Archive/ArchiveSearchFilterList';
import ScheduleCalendarSearchValue from '../components/search/ScheduleCalendarSearchValue';
import Pagination from '../components/common/Pagination';

const SArchiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 20vw;
  padding-left: 30px;
  @media (max-width: 1400px) {
    padding-right: 10vw;
  }

  @media (max-width: 1200px) {
    padding-right: 5vw;
  }
`;

const SArchiveHeader = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  padding-bottom: 60px;
  @media (max-width: 890px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Sh1 = styled.h1`
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 38.19px;
  text-align: left;
  margin-right: auto;
  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 28px;
  }

  @media (max-width: 1200px) {
    font-size: 26px;
  }
`;
const SSearchInput = styled.div`
  width: 300px;
  height: auto;
  background-color: #f7f9fc;
  @media (max-width: 1080px) {
    width: 230px;
  }
  @media (max-width: 1023px) {
    width: 230px;
  }
`;
const SDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  background-color: #f7f9fc;

  padding: 10px 10px 10px 16px;
  border-radius: 4px;
  border: 1px solid #d5d5d5;
  opacity: 0px;
  margin-right: 8px;

  > input {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.09px;
    text-align: left;
    color: #a6a6a6;
    &::placeholder {
      color: #a6a6a6;
    }
  }
`;
const SSearch = styled.div`
  display: flex;
  @media (max-width: 890px) {
    margin-top: 20px;
    display: flex;
  }
`;
interface SearchValue {
  id: number;
  studentName: string;
  title: string;
  startDate: string;
  endDate: string;
  logType: string;
  color: string;
}
const Archive = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueList, setSetSearchValueList] = useState<SearchValue[]>([]);
  const [isDeleteChecked, setIsDeleteChecked] = useState<number | null>(null);
  const [isPeriodToggle, setIsPeriodToggle] = useState<boolean>(false);
  const [isTitleToggle, setIsTitleToggle] = useState<boolean>(false);
  const [periodOption, setPeriodOption] = useState<string>('');
  const [titleOption, setTitleOption] = useState<string>('');
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchType, setSearchType] = useState<string>('');
  const [dateType, setDateType] = useState<string>('');

  const handleChangePeriodToggle = () => {
    setIsPeriodToggle(!isPeriodToggle);
  };
  const handleChangeTitleToggle = () => {
    setIsTitleToggle(!isTitleToggle);
  };

  const handleClickPeriodSearchOption = (item: string) => {
    console.log(item);

    let selectedType = '';
    if (item === '전체 기간') {
      selectedType = 'ALL';
    }
    if (item === '1일') {
      selectedType = 'ONE_DAY';
    }
    if (item === '1주') {
      selectedType = 'ONE_WEEK';
    }
    if (item === '1개월') {
      selectedType = 'ONE_MONTH';
    }
    if (item === '6개월') {
      selectedType = 'SIX_MONTH';
    }
    if (item === '1년') {
      selectedType = 'ONE_YEAR';
    }
    setDateType(selectedType);
    setPeriodOption(item);
    setIsPeriodToggle(false);
  };

  const handleClickTitleSearchOption = (item: string) => {
    if (item === '일지 제목') {
      setSearchType('title');
    }
    if (item === '내용') {
      setSearchType('content');
    }
    if (item === '제목+내용') {
      setSearchType('titleAndContent');
    }
    setTitleOption(item);
    setIsTitleToggle(false);
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setSetSearchValueList([]);
    }
    setCurrentPage(0);
  };
  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const handleArchiveLogsSearch = async () => {
    const getSearchValue = await searchArchiveLog({
      dateType: dateType,
      searchType: searchType,
      keyword: searchValue,
      page: currentPage,
      size: 8,
    });

    setSetSearchValueList(getSearchValue.data.logs);
    setTotalLogs(getSearchValue.data.totalLog);
  };
  const debouncedSearch = _debounce(handleArchiveLogsSearch, 100);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [searchValue, currentPage]);

  const handleDeletedCheck = (item: number) => {
    setIsDeleteChecked((prevIsDeleteChecked) =>
      prevIsDeleteChecked === item ? null : item,
    );
  };

  const handleClickDelete = async () => {
    if (isDeleteChecked) {
      Swal.fire({
        text: '정말 삭제하시겠습니까?',
        cancelButtonText: '아니오',
        cancelButtonColor: '#E8E8E8',
        confirmButtonText: '네',
        confirmButtonColor: '#632CFA',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          removeSemester(String(isDeleteChecked)).then((res) => {
            Swal.fire('해당 학기가 삭제되었습니다.').then((result) => {
              window.location.reload();
            });
            navigate('/archive');
          });
        }
      });
    } else Swal.fire('삭제할 학기를 선택해주세요');
  };

  return (
    <SArchiveWrapper>
      <SArchiveHeader>
        <Sh1>내 아카이브</Sh1>
        <SSearch>
          <SDropdown>
            <DropdownInput
              placeholder="전체 기간"
              value={periodOption}
              handleChangeToggle={handleChangePeriodToggle}
              isToggle={isPeriodToggle}
              dropdownList={
                <ArchiveSearchFilterList
                  option={['전체기간', '1일', '1주', '1개월', '6개월', '1년']}
                  onSelectedOption={handleClickPeriodSearchOption}
                />
              }
            ></DropdownInput>
          </SDropdown>
          <SDropdown>
            <DropdownInput
              placeholder="일지 제목"
              value={titleOption}
              handleChangeToggle={handleChangeTitleToggle}
              isToggle={isTitleToggle}
              dropdownList={
                <ArchiveSearchFilterList
                  option={['일지 제목', '내용', '제목+내용']}
                  onSelectedOption={handleClickTitleSearchOption}
                />
              }
            ></DropdownInput>
          </SDropdown>
          <SSearchInput>
            <SearchInput
              handleSearchInputChange={handleChangeSearchValue}
              placeholder="검색어를 입력하세요"
              value={searchValue}
            />
          </SSearchInput>
          <DeleteButton
            onClick={handleClickDelete}
            isDeleteChecked={isDeleteChecked}
          />
        </SSearch>
      </SArchiveHeader>

      {searchValue && searchValueList.length > 0 ? (
        <>
          <ScheduleCalendarSearchValue
            searchValueList={searchValueList}
            searchValue={searchValue}
          />
          <Pagination
            totalLogs={totalLogs}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        !searchValue && (
          <NotSearchArchive
            handleDeletedCheck={handleDeletedCheck}
            isDeleteChecked={isDeleteChecked}
          />
        )
      )}
    </SArchiveWrapper>
  );
};

export default Archive;
