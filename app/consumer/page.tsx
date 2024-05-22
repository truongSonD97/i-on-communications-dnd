// "use client"
import { COMPONENT_DATA, COMPONENT_TYPE } from "@/components/admin/type";
import Button from "@/components/common/Button";
import Paragraph from "@/components/common/Paragrap";
import { LOCAL_STORAGE_KEY } from "@/utils/constant";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Consumer() {
  const data = cookies().get(LOCAL_STORAGE_KEY.TEMPLATE_DATA);
  let componentData: COMPONENT_DATA[] = [];
  if (data && data?.value) {
    componentData = JSON.parse(data.value) as COMPONENT_DATA[];
  }
  const renderComponent = (c: COMPONENT_DATA) => {
    switch (c.type) {
      case COMPONENT_TYPE.BUTTON:
        return (
          <Button
            label={c.label}
            alertMsg={c.alertMsg}
            key={c.id}
            className="text-black block mt-4"
          />
        );
      case COMPONENT_TYPE.IMAGE:
        return (
          <Image
            width={200}
            height={200}
            className="w-[200px] h-[200px]"
            alt=""
            src={c?.url || ""}
            key={c.id}
          />
        );

      default:
        return <Paragraph label={c.label} key={c.id} className="mt-4" />;
    }
  };

  return (
    <div className="h-screen bg-white overflow-auto flex flex-col items-center">
      {!!data && !!componentData?.length
        ? componentData.map((c) => renderComponent(c))
        : "Nothing to Show"}
    </div>
  );
}
