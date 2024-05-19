export const formatDate = (LogDate: string) => {
  const date = new Date(LogDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${year}-${month}-${day}(${
    date.toString().split(' ')[0]
  }) ${hours}:${minutes}`;
};
