import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NotSearchArchive, {
  SSemesterContainer,
} from '../components/Archive/NotSearchArchive';
import SearchInput from '../components/common/SearchInput';
import { getSemesterSearchValue, removeSemester } from '../utils/lib/api';
import _debounce from 'lodash/debounce';
import { IcCheckedBox, IcDelete, IcUncheckedBox } from '../assets/icons';
import Swal from 'sweetalert2';
import DeleteButton from '../components/common/DeleteButton';

const SArchiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 21.25vw;
`;

const SArchiveHeader = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  padding-bottom: 60px;
`;
const SDelete = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 12px 10px 12px;
  gap: 8px;
  border: 1px solid #a6a6a6;
  border-radius: 50px;
  margin-left: 20px;
  .text {
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 23.87px;
    text-align: center;
    color: #a6a6a6;
  }

  @media (max-width: 767px) {
    .text {
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .text {
      font-size: 16px;
    }
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
`;
const SSearchInput = styled.div`
  width: 300px;
  height: auto;
  background-color: #f7f9fc;
  @media (max-width: 1023px) {
    width: 230px;
  }
`;
const SDeleteIcon = styled.div`
  width: 24px;
  height: 24px;

  @media (min-width: 481px) and (max-width: 767px) {
    width: 18px;
    height: 18px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20px;
    height: 20px;
  }
`;
interface SearchValue {
  id: number;
  semesterName: string;
}
const Archive = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueList, setSetSearchValueList] = useState<SearchValue[]>([]);

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isDeleteChecked, setIsDeleteChecked] = useState<number | null>(null);

  const handleDeleteModeActivate = () => {
    setIsDelete(true);
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setSetSearchValueList([]);
    }
  };

  const handleSemesterSearch = async () => {
    const getSearchValue = await getSemesterSearchValue(searchValue);
    setSetSearchValueList(getSearchValue.data);
  };

  const debouncedSearch = _debounce(handleSemesterSearch, 500);

  useEffect(() => {
    if (searchValue) {
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [searchValue]);

  const handleSelectedSemester = (semesterId: number) => {
    navigate(`/archiveSemesterDetail/${semesterId}`);
  };

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
        <SSearchInput>
          <SearchInput
            handleSearchInputChange={handleChangeSearchValue}
            placeholder="검색어를 입력하세요"
            value={searchValue}
          />
        </SSearchInput>
        <DeleteButton
          onClick={isDelete ? handleClickDelete : handleDeleteModeActivate}
        />
      </SArchiveHeader>

      {searchValueList.length > 0 && (
        <div>
          {searchValueList.map((item, index) => (
            <SSemesterContainer
              key={index}
              onClick={() => handleSelectedSemester(item.id)}
            >
              {isDelete && (
                <>
                  {isDeleteChecked === item.id ? (
                    <IcCheckedBox onClick={() => handleDeletedCheck(item.id)} />
                  ) : (
                    <IcUncheckedBox
                      onClick={() => handleDeletedCheck(item.id)}
                    />
                  )}
                </>
              )}
              <div>{item.semesterName}</div>
            </SSemesterContainer>
          ))}
        </div>
      )}
      {!searchValue && (
        <NotSearchArchive
          isDelete={isDelete}
          handleDeletedCheck={handleDeletedCheck}
          isDeleteChecked={isDeleteChecked}
        />
      )}
    </SArchiveWrapper>
  );
};

export default Archive;
