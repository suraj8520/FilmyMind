import { createPortal } from 'react-dom';
import { RiCloseFill } from 'react-icons/ri';
import useGlobalContext from '../../contexts/useGlobalContext';
import useOutsideClick from '../../hooks/useOutsideClick';
import { cloneElement } from 'react';
function Modal({ children }) {
  return children;
}

function Button({ id, children }) {
  const { openModalId, openModal } = useGlobalContext();
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (openModalId === '' || id !== openModalId) openModal(id);
  }

  return cloneElement(children, { onClick: handleClick });
}

function Window({ id, children }) {
  const { openModalId, closeModal } = useGlobalContext();
  const { ref } = useOutsideClick(closeModal);
  if (id !== openModalId) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-[1000] flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div
        className="relative  rounded-xl bg-neutral-50 p-8 shadow-full"
        ref={ref}
      >
        <button className="absolute right-2 top-2" onClick={() => closeModal()}>
          <RiCloseFill size={32} className="text-neutral-800" />
        </button>

        {cloneElement(children, { onCloseModal: closeModal })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Button = Button;
Modal.Window = Window;
export default Modal;
