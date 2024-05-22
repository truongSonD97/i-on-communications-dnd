import { COMPONENT_DATA } from "@/components/admin/type";
import { ReactNode, createContext, useState } from "react";

export const AdminContext = createContext<{
  addedComponents: COMPONENT_DATA[];
  onUpdateComponents: (components: COMPONENT_DATA[]) => void;
}>({
  addedComponents: [],
  onUpdateComponents: (components: COMPONENT_DATA[]) => {},
});

export default function AdminProvider({ children }: { children: ReactNode }) {
  const [addedComponents, setAddedComponents] = useState<COMPONENT_DATA[]>([]);

  const handleUpdateComponents = (updateComponents: COMPONENT_DATA[]) => {
    setAddedComponents(updateComponents);
  };

  return (
    <AdminContext.Provider
      value={{
        addedComponents,
        onUpdateComponents: handleUpdateComponents,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
