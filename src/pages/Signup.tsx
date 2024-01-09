import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import instanceAxios from '../api/InstanceAxios';
import { ReactComponent as ImgDropdownOpen } from '../assets/images/imgDropdownOpen.svg';
import { ReactComponent as ImgDropdownClose } from '../assets/images/imgDropdownClose.svg';
import SchoolSearchModal from '../components/modals/SchoolSearchModal';
import Header from '../components/Header';
import SubmitBtn from '../components/SubmitBtn';

//styled //
const SSignupContainer = styled.div`
  .signUpText {
    color: var(--Black-Black, #000);
    text-align: center;

    /* Font/Web_Header_4_semibold */
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 38px; /* 135.714% */
  }
  .mt90 {
    margin-top: 90px;
  }
`;
const SInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #000;
    /* Font/Web_Body */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 133.333% */
  }

  > input {
    display: flex;
    width: 516px;
    height: 40px;
    padding: 10px 10px 10px 24px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--Black-Black50, #d5d5d5);
    background: #fff;
  }
  .infoInput {
    display: flex;
    width: 516px;
    height: 40px;
    padding: 10px 10px 10px 24px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--Black-Black50, #d5d5d5);
    background: #fff;
  }
`;
const SignUpBtnBox = styled.div`
  display: flex;
  margin-top: 50px;
`;

interface InfoDate {
  name: string;
  subject: string;
  year: number | string;
  school: string;
}

const Signup = () => {
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
  const [dropdown, setDropdown] = useState<boolean>(false);

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

  const handleClickDropdown = () => {
    setDropdown(!dropdown);
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
    <SSignupContainer>
      <Header />
      <div className="signUpText mt90">티노트에서 사용할</div>
      <div className="signUpText">세부 정보를 입력해주세요!</div>
      <SInfoBox>
        <>
          <p>이름</p>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            maxLength={10}
            name="name"
            value={infoFormData.name}
            onChange={handleInfoChange}
          ></input>
        </>
        <>
          {' '}
          <p>과목</p>
          <div className="infoInput">
            과목을 선택해주세요{' '}
            {dropdown ? (
              <ImgDropdownClose onClick={handleClickDropdown} />
            ) : (
              <ImgDropdownOpen onClick={handleClickDropdown} />
            )}
          </div>
          {dropdown ? (
            <ul>
              <li>과학</li>
              <li>생물</li>
              <li>사회</li>
              <li>체육</li>
              <li>세계지리</li>
              <li>선택안함</li>
            </ul>
          ) : null}
          {/* <select
            className="infoInput"
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
          </select> */}
        </>
        <>
          {' '}
          <p>연차</p>
          <input
            type="number"
            name="year"
            value={infoFormData.year}
            placeholder="연차를 입력해주세요."
            onChange={handleInfoChange}
          ></input>
        </>
        <>
          {' '}
          <p>학교</p>
          <div className="infoInput" onClick={handleSchoolSearchClick}>
            {schoolName || '학교를 입력해주세요'}
          </div>
          {schoolSearchClick ? (
            <SchoolSearchModal onCloseModal={handleCloseModal} />
          ) : null}
        </>
        <SignUpBtnBox>
          <SubmitBtn
            backgroundcolor="gray"
            textcolor="black"
            size="small"
            onClick={handleCancelBtn}
            label={'취소'}
          ></SubmitBtn>
          <SubmitBtn
            backgroundcolor="lightGray"
            textcolor="gray"
            size="small"
            onClick={handleInfoConfirmBtn}
            label={'확인'}
          ></SubmitBtn>
        </SignUpBtnBox>
      </SInfoBox>
    </SSignupContainer>
  );
};

export default Signup;
