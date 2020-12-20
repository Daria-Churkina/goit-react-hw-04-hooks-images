import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal({ onClose, largeImage }) {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  const clickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      onClose();
    }
  };

  return (
    <div onClick={clickOverlay} className="Overlay">
      <div className="Modal">
        <img src={largeImage} alt="modalImg" className="modalImg" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
