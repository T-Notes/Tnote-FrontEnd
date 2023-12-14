interface TodayButtonProps {
  onClickToday: () => void;
}

const TodayBtn = ({ onClickToday }: TodayButtonProps) => {
  return (
    <div>
      <button onClick={onClickToday}>오늘</button>
    </div>
  );
};

export default TodayBtn;
