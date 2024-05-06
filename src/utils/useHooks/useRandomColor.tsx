import { useState } from 'react';

const useRandomColor = () => {
  const colors = ['#FEF5E6', '#FFD9D9', '#D2F0FF', '#F0EBFF'];
  const [index, setIndex] = useState(0);

  const getRandomColor = (() => {
    const colors = ['#FEF5E6', '#FFD9D9', '#D2F0FF', '#F0EBFF'];
    let index = 0;

    return () => {
      const color = colors[index];
      index = (index + 1) % colors.length;

      return color;
    };
  })();

  return getRandomColor;
};

export default useRandomColor;
