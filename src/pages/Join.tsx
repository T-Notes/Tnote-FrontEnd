import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import instanceAxios from '../api/InstanceAxios';

interface InfoDate {
  name: string;
  subject: string;
  year: number | string;
  school: string;
}

const Join = (props: { name: string }) => {
  const navigate = useNavigate();
  const [infoFormData, setInfoFormData] = useState<InfoDate>({
    name: '',
    subject: '',
    year: '',
    school: '',
  });

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
