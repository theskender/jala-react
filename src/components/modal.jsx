import React, {useEffect} from 'react';

const Modal = ({ open, setOpen, children }) => {

  useEffect(
    () => {
      const onKeyup = (e) => {
        if (e.key === 'Escape') {
          setOpen(false);
        }
      };

      document.addEventListener('keyup', onKeyup);
      return () => { document.removeEventListener('keyup', onKeyup); }
    },
    [setOpen]
  )

  const closeModal = () => setOpen(false)

  return (
    <>
      {open && (
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

