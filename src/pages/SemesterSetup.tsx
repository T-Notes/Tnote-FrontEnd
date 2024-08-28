import { useState } from 'react';
import SemesterForm from '../components/SemesterConfiguration/SemesterForm';
import SemesterSetupBanner from '../components/SemesterConfiguration/SemesterSetupBanner';

const SemesterSetup = () => {
  const [reload, setReload] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>();
  return (
    <>
      <SemesterSetupBanner setId={setId} id={id} />
      <SemesterForm setReload={setReload} reload={reload} id={id} />
    </>
  );
};

export default SemesterSetup;
