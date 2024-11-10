import React, { ReactNode } from "react";
import AdminNavbar from "../componentes/navbar/navbar";



interface LayoutProps {
  children: ReactNode;
}

const AdmNavbar: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        <AdminNavbar />
      {children}
    </div>
  );
};

export default AdmNavbar;
