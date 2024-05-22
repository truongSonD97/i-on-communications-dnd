"use client"
import clsx from "clsx";

interface Props {
  label: string;
  alertMsg?: string;
  className?: string;
}

export default function Button({
  label = "Button",
  alertMsg,
  className,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alertMsg && alert(alertMsg);
  };
  return (
    <button
      type="button"
      className={clsx("border px-4 py-1 rounded", className)}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
