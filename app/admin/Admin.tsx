import ComponentCategories from "@/components/admin/ComponentCategories";
import ComponentsResult from "@/components/admin/ComponentsResult";
import useAdminContext from "@/contexts/useAdminContext";
import { ROUTES } from "@/utils/constant";
import { LOCAL_STORAGE_KEY } from "@/utils/constant/dataKeys";
import { ChangeEvent } from "react";
import Cookies from 'js-cookie';

export default function Admin() {
  const { addedComponents, onUpdateComponents } = useAdminContext();

  const exportData = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(addedComponents)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "Components_template";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const showFile = async (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const text = (e?.target?.result) as string;
      const importData = JSON.parse(text);
      onUpdateComponents(importData)
    };
    if(e?.target?.files?.[0]){
        reader.readAsText(e.target.files[0]);
    }
  };

  const ACTIONS = [
    {
      name: "Save",
      onClick: () => {
        if (!addedComponents?.length) {
          alert("Not thing to save");
          return;
        }
        Cookies.set(
          LOCAL_STORAGE_KEY.TEMPLATE_DATA,
          JSON.stringify(addedComponents)
        );
        // open new tab
        window.open(ROUTES.consumer);
      },
    },
    {
      name: "Undo",
      onClick: () => alert("Coming Soon")
    },
    {
      name: "Redo",
      onClick: () => alert("Coming Soon")
    },
    {
      name: "Export",
      onClick: () => exportData(),
    },
    {
      component: (
        <div className="w-full">
          <label htmlFor="select-file" className="text-center cursor-pointer">Select the file</label>
          <input
            id="select-file"
            className="hidden invisible"
            type="file"
            onChange={(e) => showFile(e)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="bg-white text-black h-screen flex flex-col">
      <div className="flex gap-2 justify-center p-4">
        {ACTIONS.map((a, key) => (
          <div
            className="cursor-pointer bg-orange-600 text-white w-[150px] text-center"
            key={key}
            onClick={() => a?.onClick?.()}
          >
            {a.component ? a.component : a.name}
          </div>
        ))}
      </div>
      <div className="border-t flex grow">
        <div className="w-fit px-[20px] py-[10px]">
          <ComponentCategories />
        </div>
        <ComponentsResult />
      </div>
    </div>
  );
}
