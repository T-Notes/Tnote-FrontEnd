import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const ModalNoBlackBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;
export const WarningModalLayout = styled.div`
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const ModalLayout = styled.div`
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

// ReactModal styled
export const policyCustomStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9,
  },
  content: {
    width: '700px',
    height: '627px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    border: '1px solid #D5D5D5',
    borderRadius: '20px',
    zIndex: 10,
  },
};

export const searchCustomStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9,
  },
  content: {
    width: '460px',
    height: '420px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '1px solid #D5D5D5',
    borderRadius: '8px',
    zIndex: 10,
  },
};

export const writeFormCustomStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: '680px',
    height: '600px',
    padding: '20px',
    border: '1px solid #D5D5D5',
    borderRadius: '20px',
  },
};
