import data from "../../data/components.json";
import clsx from "clsx";
import { DragEvent, DragEventHandler, useState } from "react";
import { COMPONENT_DATA } from "./type";

export default function ComponentCategories() {
  const [dragging, setDragging] = useState({
    isMoving: false,
    id: "",
  });

  const handleDragStart = (e: DragEvent<HTMLDivElement>, data:COMPONENT_DATA) => {
    e.dataTransfer.setData("data", JSON.stringify({...data, id:`${data.id}-${(new Date()).getTime()}`}));
    setDragging({
      isMoving: !dragging.isMoving,
      id: data.id,
    });
  };

  const handleDragEnd = () => {
    setDragging({
      isMoving: !dragging.isMoving,
      id: "",
    });
  };

  return (
    <div>
      {(data.categories as COMPONENT_DATA[]).map((c, index) => (
        <div
          className={clsx("cursor-pointer p-3", {
            "mt-4": index > 0,
            "bg-slate-400": dragging.isMoving && dragging.id === c.id,
          })}
          key={c.id}
          draggable
          onDragStart={(e) => handleDragStart(e, c)}
          onDragEnd={(e) => handleDragEnd()}
        >
          <div className="w-[50px] h-[50px] border m-auto"></div>
          <p className="text-center">{c.name}</p>
        </div>
      ))}
    </div>
  );
}
