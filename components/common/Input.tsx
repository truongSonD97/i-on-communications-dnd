import clsx from "clsx";
import { ChangeEvent, ChangeEventHandler } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?:string
}

export default function Input({ value, onChange, className ,label}: Props) {
  return (
    <div className={className}>
    {!!label && <p>{label}</p>}
    <input value={value} onChange={onChange} className={clsx("border mt-2 h-[40px] p-2 min-w-[400px]")} />
    </div>
  );
}
