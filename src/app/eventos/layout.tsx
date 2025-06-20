import Navbar from "@/app/componentes/navbar/Navbar";
import Footer from "@/app/componentes/footer/page";

export const metadata = {
    title: "Eventos",
    description: "Acesso restrito para administradores da Comunidade Católica Ágape.",
};

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
