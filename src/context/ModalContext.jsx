import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function openModal(item) {
    setCurrentItem(item);
    setIsModalOpen(true);
  }
  function closeModal() {
    setCurrentItem(null);
    setIsModalOpen(false);
  }
  return (
    <AppContext.Provider
      value={{ currentItem, isModalOpen, openModal, closeModal }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(AppContext);
};
