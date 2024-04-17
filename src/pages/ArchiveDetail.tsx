import { useEffect } from 'react';
import styled from 'styled-components';
import ArchiveContainer from '../components/Archive/ArchiveContainer';

const SArchiveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 230px;
  right: 300px;
  bottom: 0;
`;
const ArchiveDetail = () => {
  return (
    <SArchiveWrapper>
      <ArchiveContainer />
    </SArchiveWrapper>
  );
};

export default ArchiveDetail;
