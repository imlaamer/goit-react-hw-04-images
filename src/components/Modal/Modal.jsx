import { useEffect } from 'react';
import css from './Modal.module.css';
import disableScroll from 'disable-scroll';

function Modal({ handleCloseModalImage, modalImage }) {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseModalImage();
    }
  };

  const handleKeyPress = e => {
    if (e.code === 'Escape') {
      handleCloseModalImage();
    }
  };

  useEffect(() => {
    disableScroll.on();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      disableScroll.off();
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); //handleKeyPress??

  const { Overlay, Modal } = css;
  const { largeImageURL, tags } = modalImage;

  return (
    <div className={Overlay} onClick={handleOverlayClick}>
      <div className={Modal}>
        <img src={largeImageURL} alt={tags} width="900" />
      </div>
    </div>
  );
}

export default Modal;
