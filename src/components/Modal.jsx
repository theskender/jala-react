import React, {useEffect} from 'react';

const Modal = ({ isOpen, closeModal, children }) => {

  useEffect(
    () => {
      const onKeyup = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
      };

      document.addEventListener('keyup', onKeyup);
      return () => { document.removeEventListener('keyup', onKeyup); }
    },
    [closeModal]
  )

  return (
    <>
      {isOpen && (
        <>
          <div className="overlay" onClick={closeModal} />
          <div className="modal">
            {children}
          </div>
        </>
      )}
    </>
  );
}
export default Modal;

