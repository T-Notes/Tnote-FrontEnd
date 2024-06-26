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

export default SemesterSetup;
