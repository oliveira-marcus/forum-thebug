import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
  isSidebarVisible: true,
  toggleSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setisSidebarVisible] = useState(false);
  const toggleSidebar = () => setisSidebarVisible((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>  
  );
}