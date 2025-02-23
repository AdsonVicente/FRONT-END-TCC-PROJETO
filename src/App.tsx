import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Layout from "./componentes/layout/layout";
import "tailwindcss/tailwind.css";
import Historia from "./pages/sobre/Historia";
import ContactPage from "./pages/Contato/contato";
import SantaTerezinhaPage from "./pages/sobre/santos/terezinha";
import SaoFranciscoPage from "./pages/sobre/santos/francisco";
import Eventos from "./pages/Eventos/evento";
import RadioPlayer from "./pages/Radio/radio";
import Noticias from "./pages/Noticias/Noticias";
import Fundadores from "./pages/Fundadores/Fundadores";

import "aos/dist/aos.css"; // Importa o CSS do AOS

import CreateCategoryForm from "./Administrador/Gerenciamento/CadastrarCategoria/CadastrarCategoria"; //
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import Formacao from "./pages/Formacao/formacao";
import EditarConteudo from "./Administrador/Gerenciamento/GerenciarConteudos/EditarConteudos";
import PublicarConteudo from "./Administrador/Gerenciamento/GerenciarConteudos/PublicarConteudo";

import GerenciarConteudos from "./Administrador/Gerenciamento/GerenciarConteudos/GerenciarConteudos";

import Login from "./Administrador/Login/login";
import CadastrarAdministrador from "./Administrador/Gerenciamento/CadastrarAdministrador/CadastrarAdministrador";
import DetalheConteudo from "./pages/Noticias/DetalheConteudo";

import ProtectAdmGeralLayout from "./Administrador/layout/AdmGeralLayout";
import ProtectAdmConteudosLayout from "./Administrador/layout/AdmConteudosLayout";
import ProtectAdmLayout from "./Administrador/layout/AdmDashboardLayout";
import ProtectAdmEventosLayout from "./Administrador/layout/AdmEventosLayout";
import ProtectAdmLiturgiaLayout from "./Administrador/layout/AdmLiturgiaLayout";
import LiturgiaDiaria from "./pages/Liturgia-diaria/LiturgiaDiaria";
import EventosInscricaoForm from "./Formulario/inscrição";

import DetalheEvento from "./pages/Eventos/DetalheEvento";

import EditarEvento from "./Administrador/Gerenciamento/GerenciamentoEventos/EditarEvento";
import AdmNavbar from "./Administrador/layout/AdmNavbarLayout";
import EditarAdm from "./Administrador/EditarAdm";
import Dashboard from "./Administrador/Dashboard/Dashboard";

import EditarMeuPerfil from "./Administrador/mudardados";
import ListarAdministradoresPage from "./Administrador/ListarAdministradores";

import SearchResults from "./componentes/SearchResults";
import ConteudosModal from "./Administrador/ConteudosModal";
import { useState } from "react";
import PublicarLiturgia from "./Administrador/Gerenciamento/GerenciarLiturgia/PublicarLiturgia";
import GerenciarLiturgia from "./Administrador/Gerenciamento/GerenciarLiturgia/GerenciarLiturgiaa";
import EditarLiturgia from "./Administrador/Gerenciamento/GerenciarLiturgia/EditarLiturgia";
import GerenciarEventos from "./Administrador/Gerenciamento/GerenciamentoEventos/GerenciarEvento";
import ComunidadeAgape from "./pages/sobre/associacao";
import AgapeCasaisPage from "./pages/Casais/AgapeParaCasais";
import AgapeKidsPage from "./pages/Criancas/AgapeParaCriancas";
import LoadingWithLogo from "./pages/Home/LoadingWithLogo";
import MultimediaPage from "./multimidiaPage";
import Missoes from "./pages/Home/Componentes/missoes";
import Doacao from "./pages/doacao/doacao";


AOS.init(); 

const App = () => {
  const [isConteudosModalOpen, setIsConteudosModalOpen] = useState(false);
  const [conteudos, _setConteudos] = useState([]);

  const handleCloseConteudosModal = () => {
    setIsConteudosModalOpen(false);
  };

  return (
    <div className="App">
      <LoadingWithLogo />
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  {" "}
                  <Home />{" "}
                </Layout>
              }
            />

            <Route
              path="/liturgia-diaria"
              element={
                <Layout>
                  {" "}
                  <LiturgiaDiaria />{" "}
                </Layout>
              }
            />

            <Route
              path="/Multimidia"
              element={
                <Layout>
                  {" "}
                  <MultimediaPage />{" "}
                </Layout>
              }
            />
            <Route
              path="/AgapeKids"
              element={
                <Layout>
                  {" "}
                  <AgapeKidsPage />{" "}
                </Layout>
              }
            />

            <Route
              path="/AgapeParaCasais"
              element={
                <Layout>
                  {" "}
                  <AgapeCasaisPage />{" "}
                </Layout>
              }
            />
            <Route
              path="/historia"
              element={
                <Layout>
                  {" "}
                  <Historia />{" "}
                </Layout>
              }
            />
            <Route
              path="/noticias"
              element={
                <Layout>
                  {" "}
                  <Noticias />{" "}
                </Layout>
              }
            />
            <Route
              path="/doacao"
              element={
                <Layout>
                  {" "}
                  <Doacao />{" "}
                </Layout>
              }
            />
            <Route
              path="/fundadores"
              element={
                <Layout>
                  {" "}
                  <Fundadores />{" "}
                </Layout>
              }
            />
            <Route
              path="/contato"
              element={
                <Layout>
                  {" "}
                  <ContactPage />{" "}
                </Layout>
              }
            />
            <Route
              path="/formacao"
              element={
                <Layout>
                  {" "}
                  <Formacao />{" "}
                </Layout>
              }
            />
            <Route
              path="/terezinha"
              element={
                <Layout>
                  {" "}
                  <SantaTerezinhaPage />{" "}
                </Layout>
              }
            />
            <Route
              path="/francisco"
              element={
                <Layout>
                  {" "}
                  <SaoFranciscoPage />{" "}
                </Layout>
              }
            />
            <Route
              path="/eventos"
              element={
                <Layout>
                  {" "}
                  <Eventos />{" "}
                </Layout>
              }
            />
            <Route
              path="/conteudos/:id"
              element={
                <Layout>
                  {" "}
                  <DetalheConteudo />{" "}
                </Layout>
              }
            />

            <Route
              path="/eventos/:id"
              element={
                <Layout>
                  {" "}
                  <DetalheEvento />{" "}
                </Layout>
              }
            />

            <Route
              path="/associacao"
              element={
                <Layout>
                  {" "}
                  <ComunidadeAgape />
                </Layout>
              }
            />

            <Route
              path="/inscricao"
              element={
                <Layout>
                  {" "}
                  <EventosInscricaoForm />{" "}
                </Layout>
              }
            />

            <Route
              path="/radio"
              element={
                <Layout>
                  {" "}
                  <RadioPlayer />
                </Layout>
              }
            />

            <Route
              path="/search"
              element={
                <Layout>
                  <SearchResults />
                </Layout>
              }
            />


            <Route
              path="/missoes"
              element={
                <Layout>
                  <Missoes />
                </Layout>
              }
            />

            {/* Administrativas */}
            <Route
              path="/conteudos/editar/:id"
              element={
                <ProtectAdmConteudosLayout>
                  <EditarConteudo />
                </ProtectAdmConteudosLayout>
              }
            />



            <Route
              path="/gerenciarcategoria"
              element={
                <AdmNavbar>
                  <ProtectAdmConteudosLayout>
                    <CreateCategoryForm />
                  </ProtectAdmConteudosLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/conteudo/publicar"
              element={
                <AdmNavbar>
                  <ProtectAdmConteudosLayout>
                    <PublicarConteudo />
                  </ProtectAdmConteudosLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/gerenciarevento"
              element={
                <AdmNavbar>
                  <ProtectAdmEventosLayout>
                    <GerenciarEventos />
                  </ProtectAdmEventosLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="eventos/editar/:id"
              element={
                <ProtectAdmEventosLayout>
                  <EditarEvento />
                </ProtectAdmEventosLayout>
              }
            />

            <Route
              path="/Dashboard"
              element={
                <AdmNavbar>
                  <ProtectAdmLayout>
                    <Dashboard />
                  </ProtectAdmLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/GerenciarConteudo"
              element={
                <AdmNavbar>
                  <ProtectAdmConteudosLayout>
                    <GerenciarConteudos />
                  </ProtectAdmConteudosLayout>
                </AdmNavbar>
              }
            />
            <Route
              path="/administradores"
              element={
                <ProtectAdmGeralLayout>
                  <CadastrarAdministrador />
                </ProtectAdmGeralLayout>
              }
            />

            <Route
              path="gerenciarusuarios"
              element={
                <AdmNavbar>
                  <ProtectAdmGeralLayout>
                    <ListarAdministradoresPage />
                  </ProtectAdmGeralLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/administradores/:id"
              element={
                <AdmNavbar>
                  <ProtectAdmGeralLayout>
                    <EditarAdm />
                  </ProtectAdmGeralLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/publicarliturgia"
              element={
                <AdmNavbar>
                  <ProtectAdmLiturgiaLayout>
                    <PublicarLiturgia />
                  </ProtectAdmLiturgiaLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/gerenciarliturgia"
              element={
                <AdmNavbar>
                  <ProtectAdmLiturgiaLayout>
                    <GerenciarLiturgia />
                  </ProtectAdmLiturgiaLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/liturgias/editar/:id"
              element={
                <AdmNavbar>
                  <ProtectAdmLiturgiaLayout>
                    <EditarLiturgia />
                  </ProtectAdmLiturgiaLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/perfil"
              element={
                <AdmNavbar>
                  <ProtectAdmLayout>
                    <EditarMeuPerfil />
                  </ProtectAdmLayout>
                </AdmNavbar>
              }
            />

            <Route
              path="/conteudosadm"
              element={
                <ProtectAdmLayout>
                  <ConteudosModal
                    isOpen={isConteudosModalOpen}
                    onClose={handleCloseConteudosModal}
                    conteudos={conteudos}
                  />
                </ProtectAdmLayout>
              }
            />

            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
