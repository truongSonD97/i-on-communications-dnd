import { DragEvent, useCallback, useState } from "react";
import { COMPONENT_DATA, COMPONENT_TYPE } from "./type";
import Button from "../common/Button";
import Paragraph from "../common/Paragrap";
import clsx from "clsx";
import Input from "../common/Input";
import { findIndex } from "lodash";
import useAdminContext from "@/contexts/useAdminContext";
import ImageUpload from "../common/ImageUpload";

export default function ComponentsResult() {
  const { onUpdateComponents, addedComponents } = useAdminContext();

  const [mouseLocation, setMouseLocation] = useState({
    x: 0,
    y: 0,
  });
  
  const [componentProps, setComponentProp] = useState({
    label: "",
    alertMsg: "",
    id: "",
    type: "",
  });

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("data");
      if (!!data) {
        onUpdateComponents([...addedComponents, JSON.parse(data)]);
      }
      setMouseLocation({ x: e.clientX, y: e.clientY });
    },
    [addedComponents]
  );

  const handleSelectComponent = (c: COMPONENT_DATA) => {
    setComponentProp({ id: c.id, label: c.label, alertMsg: "", type: c.type });
  };

  const handleEditComponentProp = (name: string, value: string) => {
    const selectedCIdx: any = findIndex(
      addedComponents,
      (c) => c.id === componentProps.id
    );
    if (selectedCIdx < 0) return;
    addedComponents[selectedCIdx] = {
      ...addedComponents[selectedCIdx],
      [name]: value,
    };

    onUpdateComponents([...addedComponents]);
  };

  const renderComponent = useCallback(
    (c: COMPONENT_DATA) => {
      switch (c.type) {
        case COMPONENT_TYPE.BUTTON:
          return (
            <Button
              className={clsx({ "bg-neutral-400": c.id === componentProps.id })}
              label={c.label}
              alertMsg={c.alertMsg}
            />
          );

        case COMPONENT_TYPE.IMAGE:
          return (
            //base64 is to large to save cookie, then i will use the hardcode image 
            <ImageUpload initValue={c.url} onChange={base64 => handleEditComponentProp("url","https://cdn.mos.cms.futurecdn.net/ifZxgpjqTS8Dp7AuozUcSG-1200-80.jpg")} />
          )

        default:
          return (
            <Paragraph
              className={clsx({ "bg-neutral-400": c.id === componentProps.id })}
              label={c.label}
            />
          );
      }
    },
    [addedComponents, componentProps]
  );

  const renderForm = useCallback(() => {
    if (!componentProps.type) {
      return;
    }
    switch (componentProps.type) {
      case COMPONENT_TYPE.BUTTON:
        return (
          <div>
            <Input
              value={componentProps.label}
              onChange={(e) => {
                setComponentProp({ ...componentProps, label: e.target.value });
                handleEditComponentProp("label", e.target.value);
              }}
              label="Button Text"
            />
            <Input
              value={componentProps.alertMsg}
              onChange={(e) => {
                handleEditComponentProp("alertMsg", e.target.value);
                setComponentProp({
                  ...componentProps,
                  alertMsg: e.target.value,
                });
              }}
              label="Alert Text"
              className="mt-4"
            />
          </div>
        );

      case COMPONENT_TYPE.PARAGRAPH:
        return (
          <Input
            value={componentProps.label}
            onChange={(e) => {
              setComponentProp({
                ...componentProps,
                label: e.target.value,
              });
              handleEditComponentProp("label", e.target.value);
            }}
            label="Paragraph Text"
          />
        );
      default:
        return null
    }
  }, [componentProps]);

  return (
    <div className="border-l grow flex flex-col">
      <div
        className=" grow flex p-4"
        // onMouseMove={(e) => {
        //   setMouseLocation({ x: e.clientX, y: e.clientY });
        // }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-1/2">
          <p>{`Mouse: (${mouseLocation.x}, ${mouseLocation.y})`}</p>
          <p className="mt-2 p-2">{`Instance: ${
            addedComponents?.length || ""
          }`}</p>
        </div>
        <div className="gap-2">
          {addedComponents.map((c, index) => (
            <div
              key={index}
              className={clsx("p-2 text-center cursor", { "mt-2": index > 0 })}
              onClick={() => handleSelectComponent(c)}
            >
              {renderComponent(c)}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 pb-[60px] border-t">{renderForm()}</div>
    </div>
  );
}
