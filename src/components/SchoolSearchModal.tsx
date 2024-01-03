import { useState, useEffect } from 'react';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import axios from 'axios';
import instanceAxios from '../api/InstanceAxios';

const SSchoolSearchModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const SSchoolSearchModal = styled.div`
  border-radius: 8px;
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;

  width: 420px;
  height: 391px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SRegionalList = styled.ul`
  list-style: none;
  overflow-y: auto;
  max-height: 200px;
  border: 1px solid #ccc;
  position: absolute; /* 절대 위치 설정 */
  width: 296px; /* 가로폭 100%로 설정 */
  margin-top: 0; /* 상단 마진을 0으로 설정 */
  background-color: #fff; /* 배경색 설정 */
`;
const SRegionalListItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e6f6fc; /* hover 시 배경색 변경 */
  }
`;
const SRegionalOptionValue = styled.div`
  border: 1px solid black;
  width: 300px;
  height: 44px;
`;
const SSearchValue = styled.div`
  &:hover {
    background-color: #e6f6fc;
  }
`;

//**인터페이스**/
interface SchoolSearchModalProps {
  onCloseModal: () => void;
}
const SchoolSearchModal = ({ onCloseModal }: SchoolSearchModalProps) => {
  //**상태관리**//
  const [selectedGubun, setSelectedGubun] = useState<string>(''); // 초등학교, 중학교, 고등학교 드롭다운 목록에 보여질 값
  const [selectedGubunCode, setSelectedGubunCode] = useState<string>(''); // api에 넘길 초,중,고 코드값
  const [searchResults, setSearchResults] = useState<any[]>([]); //검색결과를 저장할 상태
  const [schoolNameInput, setSchoolNameInput] = useState<string>(''); // 유저가 입력한 학교명 (input란)
  const [schoolOptionClick, setSchoolOptionClick] = useState<boolean>(false); //학교 지역 옵션 열고 닫기
  const [regionalOptionCode, setRegionalOptionCode] = useState<string>(''); //api에 넘길 지역 코드값
  const [regionalOption, setRegionalOption] = useState<string>(''); //드롭다운 목록에 보여질 지역값
  const [schoolClassificationClick, setSchoolClassificationClick] =
    useState<boolean>(false); // 학교 분류 옵션 열고 닫기
  const [searchValue, setSearchValue] = useState<string>(''); // 결과값 드롭다운 목록에서 유저가 선택한 값 저장
  //**이벤트 핸들러**//

  // 학교 지역 열고닫기 함수
  const handleSchoolOptionClick = () => {
    setSchoolOptionClick(!schoolOptionClick);
  };
  //학교 분류 열고닫기 함수
  const handleSchoolClassificationClick = () => {
    setSchoolClassificationClick(!schoolClassificationClick);
  };

  // 학교 지역 선택값 넘겨주는 함수 (open api, 드롭다운 목록)
  const handleRegionalOption = (regionalCode: string, regionalName: string) => {
    setRegionalOption(regionalName);
    setRegionalOptionCode(regionalCode);
    setSchoolOptionClick(false);
  };

  //학교 분류 선택값 넘겨주는 함수 (open api, 드롭다운 목록)
  const handleSchoolClassification = (
    schoolClassification: string,
    schoolClassificationCode: string,
  ) => {
    setSelectedGubun(schoolClassification);
    setSelectedGubunCode(schoolClassificationCode);
    setSchoolClassificationClick(false); //선택했다면 드롭다운 닫기.
  };

  //학교검색 모달 닫기 함수
  const handleCloseModal = () => {
    onCloseModal();
  };

  //유저가 입력한 학교이름값 받아오기 함수
  const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolNameInput(e.target.value);
  };

  // 유저가 선택한 결과값 받아오기 함수
  const handleSearchValue = (result: string) => {
    setSearchValue(result);
  };

  // 학교정보 api
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const apiUrl: string | undefined =
    'http://www.career.go.kr/cnet/openapi/getOpenApi.json';

  //학교정보 받아오기 (Open Api)
  const handleSchoolSearch = async () => {
    if (schoolNameInput && selectedGubunCode) {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            apiKey: apiKey,
            svcType: 'api',
            svcCode: 'SCHOOL',
            gubun: selectedGubunCode,
            region: regionalOptionCode,
            searchSchulNm: schoolNameInput,
          },
        });

        //응답들어오는 XML 형식에서 특정 데이터 추출하기
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'application/xml');

        //검색결과를 처리하는 함수 추가
        const schools = Array.from(xmlDoc.querySelectorAll('content')).map(
          (contentNode) => {
            return {
              seq: contentNode.querySelector('seq')?.textContent || '',
              schoolName:
                contentNode.querySelector('schoolName')?.textContent || '',
              adres: contentNode.querySelector('adres')?.textContent || '',
            };
          },
        );
        setSearchResults(schools);
      } catch (error) {
        console.error('학교 정보 검색 중 오류가 발생했습니다.', error);
      }
    }
  };
  // lodash 라이브러리에서 debounce 함수 사용(모든 검색 동작에서 api호출을 하는 것을 막아줌.)
  const debouncedSearch = _debounce(handleSchoolSearch, 300);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [schoolNameInput, selectedGubunCode, regionalOptionCode]);

  // 선택한 검색 결과가 변경될 때마다 입력창에 표시
  useEffect(() => {
    if (searchValue) {
      setSchoolNameInput(searchValue);
    }
  }, [searchValue]);

  //**서버에 전송**/

  const handleSearchValueSend = () => {
    handleCloseModal();
    // instanceAxios
    //   .post('/학교검색결과post', {
    //     region: regionalOption,
    //     gubun: selectedGubun,
    //     schoolName: searchValue,
    //   })
    //   .then((res)=> handleCloseModal());
  };
  return (
    <SSchoolSearchModalBackground>
      <SSchoolSearchModal>
        <div>학교검색</div>
        <div onClick={handleCloseModal}>&times;</div>
        <div>
          <p>시/도*</p>
          <SRegionalOptionValue>
            <div>
              {regionalOption || '옵션을 선택해주세요'}
              <div onClick={handleSchoolOptionClick}>
                {schoolOptionClick ? '⌃' : '⌄'}
              </div>
            </div>
          </SRegionalOptionValue>

          {schoolOptionClick ? (
            <SRegionalList>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100260', '서울특별시')}
              >
                서울특별시
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100267', '부산광역시')}
              >
                부산광역시
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100269', '인천광역시')}
              >
                인천광역시
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100272', '대구광역시')}
              >
                대구광역시
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100275', '광주광역시')}
              >
                광주광역시
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100271', '대전광역시')}
              >
                대전광역시
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100273', '울산광역시')}
              >
                울산광역시
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100276', '경기도')}
              >
                경기도
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100278', '강원도')}
              >
                강원특별자치도
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100281', '충청남도')}
              >
                충청남도
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100280', '충청북도')}
              >
                충청북도
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100285', '경상북도')}
              >
                경상북도
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100291', '경상남도')}
              >
                경상남도
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100282', '전라북도')}
              >
                전라북도
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() => handleRegionalOption('100292', '제주특별자치도')}
              >
                제주특별자치도
              </SRegionalListItem>
            </SRegionalList>
          ) : null}

          <p>학교분류*</p>
          <SRegionalOptionValue>
            {selectedGubun || '옵션을 선택하세요'}
            <div onClick={handleSchoolClassificationClick}>
              {schoolClassificationClick ? '⌃' : '⌄'}
            </div>
          </SRegionalOptionValue>
          {schoolClassificationClick ? (
            <SRegionalList>
              <SRegionalListItem
                onClick={() =>
                  handleSchoolClassification('초등학교', 'elem_list')
                }
              >
                초등학교
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() =>
                  handleSchoolClassification('중학교', 'midd_list')
                }
              >
                중학교
              </SRegionalListItem>
              <SRegionalListItem
                onClick={() =>
                  handleSchoolClassification('고등학교', 'high_list')
                }
              >
                고등학교
              </SRegionalListItem>
            </SRegionalList>
          ) : null}

          <p>학교명*</p>
          <input
            type="text"
            name="school"
            onChange={handleSchoolNameChange}
            placeholder="학교를 입력해주세요"
            value={schoolNameInput}
          >
            {/* 학교명 입력 */}
          </input>
          {/* 검색결과 */}
          {schoolNameInput !== '' && (
            <ul className="listStyleNone">
              {searchResults.map((result) => (
                <li key={result.seq}>
                  <SSearchValue
                    onClick={() => handleSearchValue(result.schoolName)}
                  >
                    <span>{result.schoolName}</span>
                    <p>{result.adres}</p>
                  </SSearchValue>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button onClick={handleSearchValueSend}>확인</button>
        </div>
      </SSchoolSearchModal>
    </SSchoolSearchModalBackground>
  );
};

export default SchoolSearchModal;
