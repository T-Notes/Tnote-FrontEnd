import styled from 'styled-components';
import { ReactComponent as ImgCloud } from '../images/imgCloud.svg';
import { ReactComponent as ImgDownArrow } from '../images/imgDownArrow.svg';

const SArrowCloud = styled.div`
  position: relative;
  width: 193.083px; /* ImgCloud의 너비 */
  height: 138.118px; /* ImgCloud의 높이 */

  .downArrow {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1; /* ImgCloud 위에 표시되도록 설정 */
  }
`;
const ArrowCloud = () => {
  return (
    <SArrowCloud>
      <ImgCloud />
      <ImgDownArrow className="downArrow" />
    </SArrowCloud>
  );
};

export default ArrowCloud;
