import { useNavigate } from 'react-router-dom';

const Join = (props: { name: string }) => {
  const navigate = useNavigate();

  const handleCancelBtn = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>가입이 완료되었어요!</h1>
      <p>{props.name} 선생님, 정보를 적어주세요.</p>
      <div>
        <p>이름</p>
        <input></input>
      </div>
      <div>
        {' '}
        <p>과목</p>
        <input></input>
      </div>
      <div>
        {' '}
        <p>년차(숫자만)</p>
        <input></input>
      </div>
      <div>
        {' '}
        <p>학교(검색)</p>
        <input></input>
      </div>
      <div>
        <button>확인</button>
        <button onClick={handleCancelBtn}>취소</button>
      </div>
    </div>
  );
};

export default Join;
