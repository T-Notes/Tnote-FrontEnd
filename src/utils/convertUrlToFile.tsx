export const convertUrlToFile = async (
  url: string,
  originalFileName: string,
): Promise<File> => {
  try {
    const response = await fetch(url);
    const data = await response.blob();

    const ext = url.split('.').pop();
    const metadata = { type: `image/${ext}` };

    // Blob 데이터를 File 객체로 변환하여 반환
    return new File([data], originalFileName, metadata);
  } catch (error) {
    throw new Error(`Failed to convert URL to File`);
  }
};
