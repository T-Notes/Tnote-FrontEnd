import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyArchive, { SSemesterContainer } from '../components/Archive/MyArchive';
import SearchInput from '../components/common/SearchInput';
import { getSemesterSearchValue, removeSemester } from '../utils/lib/api';
import _debounce from 'lodash/debounce';
import {
  IcCheckedBox,
  IcDelete,
  IcGrayPen,
  IcPen,
  IcUncheckedBox,
} from '../assets/icons';
import Swal from 'sweetalert2';
import { useModal } from '../utils/useHooks/useModal';
import CustomModal from '../components/CustomModal';
import { useModals } from '../utils/useHooks/useModals';
import ClassModalTestVersion from '../components/ClassModalTestVersion';

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

const Sh1 = styled.h1`
  ${({ theme }) => theme.fonts.h2}
  margin-right: auto;
`;

interface SearchValue {
  id: number;
  semesterName: string;
}
const Archive = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueList, setSetSearchValueList] = useState<SearchValue[]>([]);
  const [reload, setReload] = useState<boolean>(false);
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
    console.log(2, getSearchValue.data.length);
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

  const handleSelectedSemester = (semesterId: number, semesterName: string) => {
    navigate(`/archiveContainer/${semesterId}`);
  };

  const handleDeletedCheck = (item: number) => {
    console.log(item);

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

  const { openModal } = useModals();

  const handleOnClick = () => {
    console.log(1);

    openModal(ClassModalTestVersion, { name: 'World' });
  };
  return (
    <SArchiveWrapper>
      <SArchiveHeader>
        <Sh1>내 아카이브</Sh1>
        <div onClick={handleOnClick}>모달라ㅏㅏㅏ</div>
        <SearchInput
          size="small"
          theme={{ background: 'blue400' }}
          handleSearchInputChange={handleChangeSearchValue}
          placeholder="텍스트를 입력하세요"
          value={searchValue}
        />
        {/* <SEdit>
          수정
          <IcGrayPen />
        </SEdit> */}
        {isDelete ? (
          <SDelete onClick={handleClickDelete}>
            삭제
            <IcDelete />
          </SDelete>
        ) : (
          <SDelete onClick={handleDeleteModeActivate}>
            삭제
            <IcDelete />
          </SDelete>
        )}
      </SArchiveHeader>

      {searchValueList.length > 0 ? (
        <SSearchValueContainer>
          {searchValueList.map((item) => (
            <>
              {isDelete ? (
                <>
                  <SSemesterContainer key={item.id}>
                    {isDeleteChecked === item.id ? (
                      <IcCheckedBox
                        onClick={() => handleDeletedCheck(item.id)}
                      />
                    ) : (
                      <IcUncheckedBox
                        onClick={() => handleDeletedCheck(item.id)}
                      />
                    )}

                    <div
                      onClick={() =>
                        handleSelectedSemester(item.id, item.semesterName)
                      }
                    >
                      {item.semesterName}
                    </div>
                  </SSemesterContainer>
                </>
              ) : (
                <>
                  <SSemesterContainer
                    key={item.id}
                    onClick={() =>
                      handleSelectedSemester(item.id, item.semesterName)
                    }
                  >
                    <div>{item.semesterName}</div>
                  </SSemesterContainer>
                </>
              )}
            </>
          ))}
        </SSearchValueContainer>
      ) : (
        <></>
      )}
      {!searchValue && (
        <MyArchive
          isDelete={isDelete}
          handleDeletedCheck={handleDeletedCheck}
          isDeleteChecked={isDeleteChecked}
        />
      )}
    </SArchiveWrapper>
  );
};

export default Archive;
