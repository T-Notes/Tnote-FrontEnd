interface LastClassListProps {
  onSelectedPeriod: (per: string) => void;
}
const LastClassList = ({ onSelectedPeriod }: LastClassListProps) => {
  const lastClassList = [
    { id: 1, period: '1교시' },
    { id: 2, period: '2교시' },
    { id: 3, period: '3교시' },
    { id: 4, period: '4교시' },
    { id: 5, period: '5교시' },
    { id: 6, period: '6교시' },
    { id: 7, period: '7교시' },
    { id: 8, period: '8교시' },
    { id: 9, period: '9교시' },
  ];
  return (
    <>
      {lastClassList.map((per) => (
        <ul key={per.id}>
          <li onClick={() => onSelectedPeriod(per.period)}>{per.period}</li>
        </ul>
      ))}
    </>
  );
};

export default LastClassList;
