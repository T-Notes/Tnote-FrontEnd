import styled from 'styled-components';
import { IcClip } from '../../assets/icons';

const SFileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 25px;

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;
const SFileText = styled.p`
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 5px;
`;

const SFileUploadInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  margin-left: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  width: 400px;
  &::placeholder {
    color: #a6a6a6;
  }
`;
const SUploadBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 80px;
  height: 38px;
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ theme }) => theme.fonts.caption3}
`;

const FileUpload = (props: any) => {
  const { fileName, handleChangeImg, inputId } = props;
  return (
    <>
      <SFileWrapper>
        <IcClip />
        <SFileText>파일 첨부</SFileText>
        <SFileUploadInput
          placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다."
          value={fileName || ''}
          readOnly
        />
        <SUploadBtn htmlFor={inputId} className="pointer">
          업로드
        </SUploadBtn>
        <input type="file" id={inputId} onChange={handleChangeImg} />
      </SFileWrapper>
    </>
  );
};

export default FileUpload;
