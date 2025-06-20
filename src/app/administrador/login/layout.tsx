export const metadata = {
  title: "Login | Comunidade Ágape",
  description: "Acesso restrito para administradores da Comunidade Católica Ágape.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      {children}
    </>
  );
}
