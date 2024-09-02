import useOutsideClick from "@/hooks/useOutsideClick";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  className?: React.HTMLProps<HTMLElement>["className"];
  onClose: () => void;
}

/**
 *
 * @param param
 * <Modal isOpen={isModal} onClose={() => setIsModal(false)} className="flex items-center justify-center">
 *   <ModalComponent closeModal={() => setIsModal(false)} />
 * </Modal>
 */

export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);
  useOutsideClick(ref, () => {
    onClose();
  });
  usePreventBodyScroll(isOpen);

  if (documentBody == null) return;
  if (isOpen === false) return;
  return createPortal(
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center"
      style={{ zIndex: "100" }}
    >
      <div className="absolute h-full w-full bg-black/30"> </div>
      <div
        ref={ref}
        className="flex h-full items-center justify-center pb-[1rem] pt-[6rem]"
      >
        {children}
      </div>
    </div>,
    documentBody,
  );
};
