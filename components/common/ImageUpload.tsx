import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";


interface Props {
  onChange: (base64:string) => void
  initValue?:string
}
export default function ImageUpload({onChange,initValue}:Props) {
  const key = new Date().getTime();
  const [base64, setBase64] = useState<string>(initValue || "");
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader?.result as string);
        if(reader?.result){
          onChange(reader?.result as string)
        }
        
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <label
        className={clsx(
          "block border w-[200px] h-[200px] flex items-center justify-center border-dashed",
          { hidden: !!base64 }
        )}
        htmlFor={`upload-img-${key}`}
      >
        Upload Your Image
      </label>
      <input
        id={`upload-img-${key}`}
        type="file"
        className="invisible hidden"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {!!base64 && (
        <Image
          src={base64}
          alt="img"
          width={200}
          height={200}
          className="w-[200px] h-[200px]"
          onClick={()=> inputRef?.current?.click()}
        />
      )}
    </div>
  );
}
