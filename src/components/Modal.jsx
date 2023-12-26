import css from '../css/modal.module.css';
const Modal = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) {
    return null;
  }

  const handleClickOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClickOverlay}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt="" />
      </div>
    </div>
  );
};

export { Modal };
