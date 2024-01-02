import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import instanceAxios from '../api/InstanceAxios';

interface InfoDate {
  name: string;
  subject: string;
  year: number | string;
  school: string;
}

const Join = (props: { name: string }) => {
  const navigate = useNavigate();
  const [selectedGubun, setSelectedGubun] = useState(''); // 초등학교, 중학교, 고등학교 중 선택된 값
  const [infoFormData, setInfoFormData] = useState<InfoDate>({
    name: '',
    subject: '',
    year: '',
    school: '',
  });
  const [searchResults, setSearchResults] = useState<any[]>([]); //검색결과를 저장할 상태

  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const apiUrl: string | undefined =
    'http://www.career.go.kr/cnet/openapi/getOpenApi.json';

  const handleCancelBtn = () => {
    navigate(-1);
  };

  const handleInfoConfirmBtn = () => {
    if (
      infoFormData.name &&
      infoFormData.subject &&
      infoFormData.year &&
      infoFormData.school
    ) {
      navigate('/home'); // 아래 코드 주석 풀면 삭제하기
      //   instanceAxios
      //     .post('/api/endpoint', infoFormData)
      //     .then(() => {
      //       navigate('/home');
      //     })
      //     .catch((error) => {
      //       if (error.response) {
      //         // 서버 응답이 2xx 상태 코드가 아닌 경우
      //         console.error(
      //           'Server responded with an error:',
      //           error.response.data,
      //         );
      //         console.error('Status code:', error.response.status);
      //       } else if (error.request) {
      //         // 요청은 성공했지만 응답을 받지 못한 경우
      //         console.error('No response received from the server');
      //       } else {
      //         // 요청 자체에서 문제가 발생한 경우
      //         console.error('Request failed:', error.message);
      //       }
      //     });
      // } else {
      //   alert('내용을 모두 입력해주세요');
    }
  };
  //학교정보 받아오기
  const handleSchoolSearch = async () => {
    if (infoFormData.school && selectedGubun) {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            apiKey: apiKey,
            svcType: 'api',
            svcCode: 'SCHOOL',
            gubun: selectedGubun,
            searchSchulNm: infoFormData.school,
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
        console.error('Error searching school information:', error);
      }
    }
  };
  const debouncedSearch = _debounce(handleSchoolSearch, 300);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [infoFormData.school, selectedGubun]);

  const handleGubunButtonClick = (selectedValue: string) => {
    // 사용자가 버튼을 클릭할 때 해당 버튼의 값을 설정
    setSelectedGubun(selectedValue);
  };

  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setInfoFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1>가입이 완료되었어요!</h1>
      <p>{props.name} 선생님, 정보를 적어주세요.</p>
      <div>
        <p>이름</p>
        <input
          type="text"
          placeholder="이름을 입력해주세요."
          maxLength={10}
          name="name"
          value={infoFormData.name}
          onChange={handleInfoChange}
        ></input>
      </div>
      <div>
        {' '}
        <p>과목</p>
        <select
          name="subject"
          value={infoFormData.subject}
          required
          onChange={handleInfoChange}
        >
          <option value="" disabled>
            과목을 선택해주세요.
          </option>
          <option value="science">과학</option>
          <option value="biology">생물</option>
          <option value="social studies">사회</option>
          <option value="physical education">체육</option>
          <option value="world Geography">세계지리</option>
          <option value="">선택안함</option>
        </select>
      </div>
      <div>
        {' '}
        <p>연차</p>
        <input
          type="number"
          name="year"
          value={infoFormData.year}
          placeholder="연차를 입력해주세요."
          onChange={handleInfoChange}
        ></input>
      </div>
      <div>
        {' '}
        <p>학교(검색)</p>
        <input
          type="text"
          name="school"
          value={infoFormData.school}
          placeholder="학교를 입력해주세요."
          onChange={handleInfoChange}
        ></input>
        <button type="button" onClick={handleSchoolSearch}>
          학교 검색
        </button>
        <div>
          <button
            type="button"
            onClick={() => handleGubunButtonClick('elem_list')}
          >
            초등학교
          </button>

          <button
            type="button"
            onClick={() => handleGubunButtonClick('midd_list')}
          >
            중학교
          </button>

          <button
            type="button"
            onClick={() => handleGubunButtonClick('high_list')}
          >
            고등학교
          </button>
        </div>
      </div>
      {/* 검색 결과 표시 */}
      <div>
        <h2>검색 결과</h2>
        <ul>
          {searchResults.map((result) => (
            <li key={result.seq}>
              <span>{result.schoolName}</span>
              <p>{result.adres}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button type="submit" onClick={handleInfoConfirmBtn}>
          확인
        </button>
        <button type="button" onClick={handleCancelBtn}>
          취소
        </button>
      </div>
    </div>
  );
};

export default Join;
