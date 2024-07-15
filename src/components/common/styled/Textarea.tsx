import styled from 'styled-components';

const STextarea = styled.textarea`
  width: 100%;
  height: 20vh;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  padding: 20px;
  margin-top: 16px;
  margin-bottom: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
  color: #a6a6a6;
`;
interface LogTextarea {
  logValue: string | undefined;
}
export const Textarea = ({ logValue }: LogTextarea) => {
  return <STextarea value={logValue} readOnly></STextarea>;
};
