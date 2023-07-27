import {
  createContext,
  type PropsWithChildren,
  ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ModalContextProps {
  closeModal: () => void;
  showModal: (content: ReactElement) => void;
}

const ModalContext = createContext<ModalContextProps>({
  closeModal: () => {},
  showModal: () => {},
});

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalContent, setModalContent] = useState<Nullable<ReactNode>>(null);

  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);

  const showModal = useCallback((content: ReactNode) => {
    setModalContent(content);
  }, []);

  const value = useMemo(
    () => ({
      showModal,
      closeModal,
    }),
    [closeModal, showModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {modalContent}
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
