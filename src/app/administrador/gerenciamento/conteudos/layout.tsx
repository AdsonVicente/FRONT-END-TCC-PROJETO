import NavbarAdmin from "@/app/administrador/navbar-admin/NavbarAdmin";
import "@/styles/tiptap.css";

export const metadata = {
  title: "Gerenciar Cotéudos",
  description: "Acesso restrito para administradores da Comunidade Católica Ágape.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarAdmin />
      {children}
    </>
  );
}
