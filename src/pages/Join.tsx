import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import instanceAxios from '../api/InstanceAxios';
import SchoolSearchModal from '../components/SchoolSearchModal';

interface InfoDate {
  name: string;
  subject: string;
  year: number | string;
  school: string;
}

const Join = (props: { name: string }) => {
  const navigate = useNavigate();
  //**상태관리**//
  const [infoFormData, setInfoFormData] = useState<InfoDate>({
    name: '',
    subject: '',
    year: '',
    school: '',
  });
  const [schoolSearchClick, setSchoolSearchClick] = useState<boolean>(false); //학교 검색 모달 열기용
  const [schoolName, setSchoolName] = useState<string>(''); // 학교이름 가져오기
  //**이벤트 핸들러**//

  const handleCancelBtn = () => {
    navigate(-1);
  };

  //학교 검색 모달 열기 함수
  const handleSchoolSearchClick = () => {
    setSchoolSearchClick(true);
  };
  // 학교 검색 모달 닫기 함수
  const handleCloseModal = () => {
    setSchoolSearchClick(false);
  };

  // 서버에 보내줄 값 함수
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

  // 유저의 입력값이 변할때 발생하는 함수 (InfoFormData에 해당값 업데이트)
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setInfoFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 학교 이름 가져오기
  // useEffect(() => {
  //   const schoolNameDate = async () => {
  //     try {
  //       const res = await instanceAxios.get('/학교이름 가져오기 엔드포인트');
  //       setSchoolName(res.data);
  //     } catch (err) {
  //       console.log('err', err);
  //     }
  //   };
  //   schoolNameDate();
  // });

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
        <p>학교</p>
        <div onClick={handleSchoolSearchClick}>
          {schoolName || '학교를 입력해주세요'}
        </div>
        {schoolSearchClick ? (
          <SchoolSearchModal onCloseModal={handleCloseModal} />
        ) : null}
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
