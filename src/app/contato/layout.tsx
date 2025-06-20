import Navbar from "@/app/componentes/navbar/Navbar";
import Footer from "@/app/componentes/footer/page";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
