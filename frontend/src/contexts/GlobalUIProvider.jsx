import { createContext, useState } from 'react';

export const GlobalContext = createContext();

function GlobalUIProvider({ children }) {
  const [openMenuId, setOpenMenuId] = useState('');
  const [openModalId, setOpenModalId] = useState('');
  const closeMenu = () => setOpenMenuId('');
  const openMenu = setOpenMenuId;
  const closeModal = () => setOpenModalId('');
  const openModal = setOpenModalId;
  return (
    <GlobalContext.Provider
      value={{
        openMenuId,
        closeMenu,
        openMenu,
        openModalId,
        closeModal,
        openModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalUIProvider;
