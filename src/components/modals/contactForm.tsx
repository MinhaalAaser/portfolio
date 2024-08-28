import { useDispatch, useSelector } from 'react-redux';
import { closeContactModal } from '../redux/contactModalSlice';
import Modal from 'react-modal';

const isOpen = useSelector((state: any) => state.contactModal.isOpen);
const dispatch = useDispatch();
const handleCloseModal = () => {
  dispatch(closeContactModal());
};

const contactForm = () => {
  return (
    <Modal
      style={{
        overlay: {
          position: 'fixed',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: '300px',
          width: '500px',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
      }}
      onRequestClose={handleCloseModal}
      isOpen={isOpen}
      ariaHideApp={false}
    >
      Hi there.
    </Modal>
  );
};

export default contactForm;
