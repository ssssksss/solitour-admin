import { MouseEventHandler, useCallback } from "react";
import Swal from "sweetalert2";

interface IConfirmButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  disabled?: boolean;
children?: React.ReactNode;
className?: string;
}

export const ConfirmButton: React.FC<IConfirmButtonProps> = ({
  onClick: _onClick,
  children = "button",
  ...props
}) => {
  const showSwal = (event: React.MouseEvent<HTMLButtonElement>) => {
    Swal.fire({
      titleText: props.text || "Do you want to continue",
      icon: props.icon || "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "승인",
      cancelButtonText: "취소",
      width: "30rem",
    }).then((res) => {
      if (res.isConfirmed) {
        _onClick?.(event);
      }
    });
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      showSwal(event);
      event.stopPropagation();
    },
    [_onClick, props.disabled],
  );

  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};
