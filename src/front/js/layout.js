import React, { useContext } from "react";
import { Context } from "./store/appContext";

import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Marketplace } from "./pages/marketplace";
import { RegistryForm } from "./pages/registry";
import injectContext from "./store/appContext";
import { UpdateBuilding } from "./pages/actualizar_edificio";
import { UpdateApartment } from "./pages/actualizar_apartamento";
import { UpdateCommonSpace } from "./pages/actualizar_espaciocomun";
import { UpdateDiarioMural } from "./pages/actualizar_diariomural";
import { UpdateMarketPlace } from "./pages/actualizar_marketplace";
import { DiarioMural } from "./pages/diariomural";
import { HomeOne } from "./pages/HomeOne";
import GlobalStyle from "./globalstyle";
import { Footer } from "./component/Footer";
import { SidebarUser } from "./component/SidebarUser/SidebarUser";
import { SidebarAdmin } from "./component/SidebarAdmin/SidebarAdmin";
import { LoginManager } from "./pages/LoginManager";
import { Servicios } from "./pages/Servicios";
import { NavbarLanding } from "./component/NavbarLanding/NavbarLanding";
import { Proyectos } from "./pages/Proyectos";
import { Contacto } from "./pages/Contacto";
import { MensajeAdmin } from "./component/MensajeAdmin";
import { MarketplaceUser } from "./component/MarketplaceUser";
import { Redificio } from "./pages/Redificio";
import { Rdepto } from "./pages/Rdepto";
import { RECadmin } from "./pages/RECadmin";
import { DmuralAdmin } from "./pages/DmuralAdmin";
import { Equipo } from "./pages/Equipo";
import acceso from "../img/noacceso.png";
import { ListaUsuariosReg } from "./pages/ListarUsuariosReg";
import { UpdateUsuariosReg } from "./pages/actualizar_usuario";

const Layout = () => {
	const { store, actions } = useContext(Context);
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<GlobalStyle />
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<NavbarLanding />
							<HomeOne />
							<Footer />
						</Route>
						<Route exact path="/servicios">
							<NavbarLanding />
							<Servicios />
							<Footer />
						</Route>
						<Route exact path="/proyectos">
							<NavbarLanding />
							<Proyectos />
							<Footer />
						</Route>
						<Route exact path="/equipo">
							<NavbarLanding />
							<Equipo />
							<Footer />
						</Route>
						<Route exact path="/contacto">
							<Contacto />
						</Route>
						<Route exact path="/login">
							<NavbarLanding />
							<RegistryForm />
							<Footer />
						</Route>
						<Route exact path="/loginadmin">
							<LoginManager />
							<Footer />
						</Route>
						<Route exact path="/admin">
							<SidebarAdmin />
							<Redificio />
						</Route>
						<Route exact path="/registrodepartamento">
							<SidebarAdmin />
							<Rdepto />
						</Route>
						<Route exact path="/registroecomunes">
							<SidebarAdmin />
							<RECadmin />
						</Route>
						<Route exact path="/diariomuraladmin">
							<SidebarAdmin />
							<DmuralAdmin />
						</Route>
						<Route exact path="/listausuarios">
							<SidebarAdmin />
							<ListaUsuariosReg />
						</Route>
						<Route exact path="/actualizar_edificio/:id">
							<UpdateBuilding />
						</Route>
						<Route exact path="/actualizar_apartamento/:id">
							<UpdateApartment />
						</Route>
						<Route exact path="/actualizar_espaciocomun/:id">
							<UpdateCommonSpace />
						</Route>
						<Route exact path="/actualizar_diariomural/:id">
							<UpdateDiarioMural />
						</Route>
						<Route exact path="/actualizar_marketplace/:id">
							<UpdateMarketPlace />
						</Route>
						<Route exact path="/actualizar_usuario/:id">
							<UpdateUsuariosReg />
						</Route>
						<Route exact path="/registrodepartamento">
							<SidebarAdmin />
							<Rdepto />
						</Route>
						<Route exact path="/registroecomunes">
							<SidebarAdmin />
							<RECadmin />
						</Route>
						<Route exact path="/diariomuraladmin">
							<SidebarAdmin />
							<DmuralAdmin />
						</Route>
						<Route exact path="/actualizar_edificio/:id">
							<UpdateBuilding />
						</Route>
						<Route exact path="/actualizar_apartamento/:id">
							<UpdateApartment />
						</Route>
						<Route exact path="/actualizar_espaciocomun/:id">
							<UpdateCommonSpace />
						</Route>
						<Route exact path="/actualizar_diariomural/:id">
							<UpdateDiarioMural />
						</Route>
						<Route exact path="/actualizar_marketplace/:id">
							<UpdateMarketPlace />
						</Route>
						;{/* Condiciones para permitir acceso a usuarios */}
						{localStorage.getItem("token") != null ? (
							<>
								<Route exact path="/inicio">
									<SidebarUser />
									<DiarioMural />
								</Route>
								<Route exact path="/mensajes">
									<SidebarUser />
									<MensajeAdmin />
								</Route>
								<Route exact path="/marketplace">
									<SidebarUser />
									<MarketplaceUser />
								</Route>
								<Route exact path="/vistamarket">
									<SidebarUser />
									<Marketplace />
								</Route>
								<Route exact path="/reservas">
									<SidebarUser />
									<DiarioMural />
								</Route>
							</>
						) : (
							<>
								<NavbarLanding />
								<h1 className="permiso">Debes registrarte para inicar session.</h1>
								<img className="acceso" src={acceso} alt="fotoAcceso" />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />

								<Footer />
							</>
						)}
						;
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
