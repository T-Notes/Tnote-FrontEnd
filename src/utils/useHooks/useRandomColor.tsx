const useRandomColor = () => {
  const colors = ['#FEF5E6', '#FFD9D9', '#D2F0FF', '#F0EBFF'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return getRandomColor;
};

export default useRandomColor;
