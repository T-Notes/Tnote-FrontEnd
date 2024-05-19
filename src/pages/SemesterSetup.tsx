import { useState } from 'react';
import SemesterForm from '../components/SemesterConfiguration/SemesterForm';
import SemesterSetupBanner from '../components/SemesterConfiguration/SemesterSetupBanner';

const SemesterSetup = () => {
  const [reload, setReload] = useState<boolean>(false);
  return (
    <>
      <SemesterSetupBanner />
      <SemesterForm setReload={setReload} reload={reload} />
    </>
  );
};
// 배너에서 학기 추가가 이루어지면 부모에게 해당 id와 함께 추가 사실을 알림
// 부모 컴포넌트는 해당 값을 폼에 전달
// 폼은 해당 id를
export default SemesterSetup;
