import axios from 'axios';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { IcClip, IcImageDelete } from '../../assets/icons';
import { downloadFile } from '../../utils/downloadFile';

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
  display: none;

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
const SFileNames = styled.div`
  white-space: nowrap;

  > div {
    display: flex;
    border-radius: 8px;
    margin-right: 10px;
    padding: 5px;
    background-color: #e8e8e8;
    color: #a6a6a6;
    font-size: 12px;
    font-weight: 500;
  }
  .fileDelete {
    display: flex;
    padding-left: 10px;
  }
`;
const SShowInput = styled.div`
  display: flex;
  overflow: auto;
  overflow-y: scroll;
  ${({ theme }) => theme.fonts.caption3}
  margin-left: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  width: 400px;

  .placeholder {
    color: #a6a6a6;
  }
`;
const FileUpload = (props: any) => {
  const { imgUrl, setImgUrl } = props;

  const handleChangeFileImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxFileSize = 1073741824; // 1GB 파일 사이즈
    const allowedExtensions = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'pdf',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
    ]; // 허용할 확장자 목록
    const newFiles: File[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
          window.alert('지원하지 않는 형식의 파일입니다.');
          continue;
        }

        if (file.size > maxFileSize) {
          window.alert('1GB 이하의 파일만 첨부 가능합니다.');
          continue;
        }

        newFiles.push(file);
      }

      setImgUrl((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDeleteFileImg = (fileName: string) => {
    setImgUrl((prevFiles: File[]) =>
      prevFiles.filter((file) => file.name !== fileName),
    );
  };

  const handleFileClick = (file: File) => {
    console.log('logFile', file);

    downloadFile(file);
  };
  console.log('imgUrl', imgUrl);

  return (
    <>
      <SFileWrapper>
        <IcClip />
        <SFileText>파일 첨부</SFileText>
        <SFileUploadInput
          placeholder="1GB 이하의 이미지파일(jpg,png), 문서파일(Excel,PPT) 업로드 가능합니다."
          readOnly
        />
        <SShowInput>
          {imgUrl.length > 0 ? (
            <>
              {imgUrl.map((file: any, index: number) => (
                <SFileNames key={index}>
                  <div>
                    <span onClick={() => handleFileClick(file)}>
                      {file.name || file.originalFileName}
                    </span>
                    <div className="fileDelete">
                      <IcImageDelete
                        onClick={() => handleDeleteFileImg(file.name)}
                      />
                    </div>
                  </div>
                </SFileNames>
              ))}
            </>
          ) : (
            <div className="placeholder">
              1GB 이하의 이미지파일(jpg,png), 문서파일(Excel,PPT) 업로드
              가능합니다.
            </div>
          )}
        </SShowInput>

        <SUploadBtn htmlFor="uploadImg" className="pointer">
          업로드
        </SUploadBtn>
        <input type="file" id="uploadImg" onChange={handleChangeFileImg} />
      </SFileWrapper>
    </>
  );
};

export default FileUpload;
