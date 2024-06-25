import { ChangeEvent } from 'react';

export default function handleChangeLogImgFileUpload(
  e: ChangeEvent<HTMLInputElement>,
  setImgUrl: any,
  // setFileName: any,
) {
  const files = e.target.files;
  const newFiles: File[] = [];
  // const newFileNames: string[] = [];

  if (files) {
    for (let i = 0; i < files.length; i++) {
      newFiles.push(files[i]); //서버에 보낼 파일 객체
      // newFileNames.push(files[i].name); // 유저가 볼 스크린샷 네임
    }

    setImgUrl((prevFiles: any) => [...prevFiles, ...newFiles]);
    // setFileName((prevFileNames: any) => [...prevFileNames, ...newFileNames]);
  }
}
