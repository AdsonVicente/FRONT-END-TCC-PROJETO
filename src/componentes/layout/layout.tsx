import React, { ReactNode } from "react";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/Navbar";
import { Analytics } from "@vercel/analytics/react"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Analytics />
      <Footer />
    </div>
  );
};

export default Layout;
