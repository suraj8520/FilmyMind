import { RiCloseFill } from 'react-icons/ri';
import useGlobalContext from '../../contexts/useGlobalContext';
import useOutsideClick from '../../hooks/useOutsideClick';
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

  return <button onClick={handleClick}>{children}</button>;
}

function Window({ id, children }) {
  const { openModalId, closeModal } = useGlobalContext();
  const { ref } = useOutsideClick(closeModal);
  if (id !== openModalId) return null;

  return (
    <div className="fixed left-0 top-0 z-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div
        className="z-100 relative rounded-xl bg-neutral-50 p-8 shadow-full"
        ref={ref}
      >
        <button className="absolute right-2 top-2" onClick={() => closeModal()}>
          <RiCloseFill size={32} className="text-neutral-800" />
        </button>
        <div className="border border-red-200">{children}</div>
      </div>
    </div>
  );
}

Modal.Button = Button;
Modal.Window = Window;
export default Modal;
