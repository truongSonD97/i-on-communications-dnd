import clsx from "clsx";


interface Props {
    label:string;
    className?:string
}

export default function Paragraph({label,className}:Props){
    return <p className={clsx("text-black",className)}>{label}</p>
}