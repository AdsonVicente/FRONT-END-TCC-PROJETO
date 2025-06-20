import NavbarAdmin from "@/app/administrador/navbar-admin/NavbarAdmin";

export const metadata = {
  title: "Gerencair Eventos",
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
