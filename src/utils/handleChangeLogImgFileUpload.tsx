import { ChangeEvent } from 'react';

export default function handleChangeLogImgFileUpload(
  e: ChangeEvent<HTMLInputElement>,
  setImgUrl: any,
  setFileName: any,
) {
  console.log('e:', e);

  const files = e.target.files;
  const newFiles: File[] = [];
  const newFileNames: string[] = [];

  if (files) {
    for (let i = 0; i < files.length; i++) {
      newFiles.push(files[i]);
      newFileNames.push(files[i].name);
    }

    setImgUrl((prevFiles: any) => [...prevFiles, ...newFiles]);
    setFileName((prevFileNames: any) => [...prevFileNames, ...newFileNames]);
  }
}
