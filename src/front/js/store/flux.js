const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//logged: false,
			espacio_comun: [], // arrglo de objeto
			diario_mural: [],
			edificio: [],
			departamento: [],
			marketplace: [],
			usuarios: [],
			token: null,
			token_admin: null,
			current_user: "",
			user: "",
			admin: ""
		},

		actions: {
			clearToken: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			},
			clearToken_admin: () => {
				localStorage.removeItem("token_admin");
				setStore({ token_admin: null });
			},
			registraredificio: (NameBuilding, Address, Region, Comuna) => {
				console.log("flux edificio", NameBuilding, Address, Region, Comuna);
				var raw = JSON.stringify({
					name: NameBuilding,
					adress: Address,
					region: Region,
					comuna: Comuna
				});
				var requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/building", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getedificio(); // para que muestre lo que registro en listar
					})
					.catch(error => console.log("error", error));
			}, // fin de registrar edificio
			getedificio: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/building")
					.then(response => response.json())
					.then(result => {
						setStore({ edificio: result });
					})
					.catch(error => console.log("error", error));
			}, // fin de get edificio
			getunedificio: id => {
				console.log("flux un edificio" + id);
				fetch(process.env.BACKEND_URL + id)
					.then(response => response.json())
					.then(result => {
						setStore({ edificio: result });
					})
					.catch(error => console.log("error", error));
			}, // fin funcion getunedificio
			registrarapartamento: (NumApartment, FloorApartment) => {
				console.log("flux apartamento", NumApartment, FloorApartment);
				var raw = JSON.stringify({
					num_apartment: NumApartment,
					floor_apartment: FloorApartment
				});
				var requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/apartment", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getdepartamento(); // para que muestre lo que registro en listar
					})
					.catch(error => console.log("error", error));
			}, // fin de registrar apartamento
			getdepartamento: () => {
				const store = getStore();
				fetch("https://3001-purple-wildfowl-tcgwqyqw.ws-us18.gitpod.io/api/apartment")
					.then(response => response.json())
					.then(result => {
						setStore({ departamento: result });
						console.log(store.departamento);
					})
					.catch(error => console.log("error", error));
			}, //fin getdepartamento
			//getundepartamento
			getunDepartamento: id => {
				console.log("flux un apartamento" + id);
				fetch(process.env.BACKEND_URL + "/api/apartment/" + id)
					.then(response => response.json())
					.then(result => {
						setStore({ departamento: result });
					})
					.catch(error => console.log("error", error));
			}, // fin funcion getundepartamento

			registrarespaciocomun: (CommonSpace, Aforo) => {
				console.log("flux registrar espacio comun", CommonSpace, Aforo);
				var raw = JSON.stringify({
					name: CommonSpace,
					aforo: Aforo
				});
				var requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/commonSpace", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getespaciocomun(); // para que muestre lo que registro en listar
					})
					.catch(error => console.log("error", error));
			}, //fin de regitrar espacio comun
			getespaciocomun: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/commonSpace")
					.then(response => response.json())
					.then(result => {
						setStore({ espacio_comun: result });
						//console.log(store.espacio_comun);
					})
					.catch(error => console.log("error", error));
			}, //fin de espacio comun
			registrardiariomural: (Titulo, Anuncio) => {
				console.log("flux registrar diario mural", Titulo, Anuncio);
				var raw = JSON.stringify({
					title_announcement: Titulo,

					announcement: Anuncio
				});
				var requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/diariomural", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getdiariomural(); // para que muestre lo que registro en listar
					})
					.catch(error => console.log("error", error));
			}, //fin de registrardiariomural
			getdiariomural: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/diariomural")
					.then(response => response.json())
					.then(result => {
						setStore({ diario_mural: result });
						//console.log(store.espacio_comun);
					})
					.catch(error => console.log("error", error));
			}, //fin de getdirariomural

			registrarmarketplace: (Titulo, Anuncio) => {
				console.log("flux registrar maretplace", Titulo, Anuncio);
				var raw = JSON.stringify({
					title_announcement: Titulo,
					announcement: Anuncio
				});
				var requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};

				fetch("https://3001-kumquat-constrictor-3l9qbkha.ws-us18.gitpod.io/api/marketplace", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getmarketplace(); // para que muestre lo que registro en listar
					})
					.catch(error => console.log("error", error));
			}, //fin de registrarmarketplace
			getmarketplace: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/marketplace")
					.then(response => response.json())
					.then(result => {
						setStore({ marketplace: result });
						console.log(store.marketplace);
					})
					.catch(error => console.log("error", error));
			}, //fin de getmarketplace

			registrarespacioreservado: () => {
				console.log("flux registrar espacio reservado", startDate, cantidadhoras);
				var raw = JSON.stringify({
					date_reservation: startDate,
					reservation_time: cantidadhoras
				});
				var requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/spacereservation", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},
			//function borrar edificio
			borrarEdificio: elemento => {
				const store = getStore();

				console.log(elemento);
				var requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/building/" + elemento.id_building, requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getedificio();
					})
					.catch(error => console.log("error", error));
			}, //fin de borrar edificio
			//function borrar apartamento
			borrarApartamento: elemento => {
				const store = getStore();

				console.log(elemento);
				var requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/apartment/" + elemento.id_apartment, requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getdepartamento();
					})
					.catch(error => console.log("error", error));
			}, //fin de borrar  un apartamento
			borrarEspacioComun: elemento => {
				const store = getStore();

				console.log(elemento);
				var requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/commonSpace/" + elemento.id_commonspace, requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getespaciocomun();
					})
					.catch(error => console.log("error", error));
			}, //fin de borrar  un espacio comun
			borrarDiarioMural: elemento => {
				const store = getStore();

				console.log(elemento);
				var requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/diariomural/" + elemento.id_diariomural, requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getdiariomural();
					})
					.catch(error => console.log("error", error));
			}, //fin de borrar  un diario mural
			borrarMarketPlace: elemento => {
				const store = getStore();

				console.log(elemento);
				var requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/marketplace/" + elemento.id_marketplace, requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getmarketplace();
					})
					.catch(error => console.log("error", error));
			}, //fin de borrar  un marketplace
			actualizarEdificio: (id, NameBuilding, Address, Region, Comuna) => {
				const store = getStore();
				console.log("flux actualizarEdificio", NameBuilding, Address, Region, Comuna);
				var raw = JSON.stringify({
					name: NameBuilding,
					adress: Address,
					region: Region,
					comuna: Comuna
				});
				var requestOptions = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/building/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			}, // fin function actualizar edificio
			actualizarApartamento: (id, NumApartment, FloorApartment) => {
				const store = getStore();
				console.log("flux actualizarApartamento", NumApartment, FloorApartment);
				var raw = JSON.stringify({
					num_apartment: NumApartment,
					floor_apartment: FloorApartment
				});
				var requestOptions = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/apartment/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			}, // fin function actualizar apartamento
			actualizarEspaciosComunes: (id, CommonSpace, Aforo) => {
				const store = getStore();
				console.log("flux actualizarEspacioComun", CommonSpace, Aforo);
				var raw = JSON.stringify({
					name: CommonSpace,
					aforo: Aforo
				});
				var requestOptions = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/commonSpace/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			}, //fin de funcion actualizar espacios comunes
			actualizarDiarioMural: (id, Titulo, Anuncio) => {
				const store = getStore();
				console.log("flux actualizar Diario Mural", Titulo, Anuncio);
				var raw = JSON.stringify({
					title_announcement: Titulo,
					announcement: Anuncio
				});
				var requestOptions = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/diariomural/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			}, //fin de actualizar diario mural
			actualizarMarketplace: (id, Titulo, Anuncio) => {
				const store = getStore();
				console.log("flux actualizar MarketPlace", Titulo, Anuncio);
				var raw = JSON.stringify({
					title_announcement: Titulo,
					announcement: Anuncio
				});
				var requestOptions = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/marketplace/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			}, //fin de actualizar marketplace

			enviaremail: (name, email, text) => {
				console.log("flux", name, email, text);
				var data = {
					Messages: [
						{
							/* Quién envía el mail, estos valores
			 							salen del formulario*/

							From: {
								Email: "appedificio@gmail.com",
								Name: name
							},
							/*no se cambia*/
							To: [
								{
									Email: "appedificio@gmail.com",
									Name: "tuedificio"
								}
							] /*hasta aca*/,
							/* Este es el asunto del mail */

							Subject: "Correo enviado desde el Formulario",
							/* Este es el cuerpo del mail */

							TextPart: text + email,

							/* aca es un html que puedes poner lindo para el mail */

							HTMLPart:
								"<h5> El usuario:</h5>" +
								email +
								"  envió el siguiente mensaje: " +
								text +
								"<br/> TuEdificio © 2021",
							CustomID: "AppGettingStartedTest"
						}
					]
				};
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				console.log(data, "prueba");

				var raw = JSON.stringify(data);
				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch("https://3001-purple-wildfowl-tcgwqyqw.ws-us18.gitpod.io/api/enviardatos", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						//alert("Mensaje enviado exitosamente.");
					})
					.catch(error => console.log("error", error));
			}, //fin de enviar email
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},

			loginUser: (emailLogin, passLogin) => {
				const store = getStore();
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				var raw = JSON.stringify({ email: emailLogin, password: passLogin });

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/user", requestOptions)
					.then(response => response.json())
					.then(res => {
						localStorage.setItem("token", res.token);
						setStore({ token: res.token });
						setStore({ user: res.info_user });
						setStore({ current_user: "user" });
						alert("Bienvenido: " + store.user.full_name);
						location = "/inicio";
					})
					.catch(error => {
						console.log("error", error);
						alert("Email y/o contraseña no coinciden.");
					});
			}, // fin loginUser

			loginAdmin: (emailLogin, passLogin) => {
				const store = getStore();
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				var raw = JSON.stringify({ email: emailLogin, password: passLogin });

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/administrator", requestOptions)
					.then(response => response.json())
					.then(res => {
						localStorage.setItem("token_admin", res.token_admin);

						setStore({ current_user: "admin" });
						console.log(store.current_user);
						alert("Bienvenido");
						location = "/admin";
					})
					.catch(error => console.log("error", error));
			}, // fin loginAdministrador

			userRegister: (email, pass, phone, name) => {
				console.log(email, pass, phone, name);
				//var myHeaders = new Headers();
				//myHeaders.append("Content-Type", "application/json");
				var raw = JSON.stringify({
					full_name: name,
					email: email,
					password: pass,
					phone: phone,
					numero_apartment: null,
					id_building: null,
					numero_bodega: null
				});

				var requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/register", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						location = "/login";
					})
					.catch(error => console.log("error", error));
			},
			getUserRegistrado: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/register")
					.then(response => response.json())
					.then(result => {
						setStore({ usuarios: result });
						console.log(store.usuarios);
					})
					.catch(error => console.log("error", error));
			}, // fin de getUserRegistrado
			actualizarUsuarioregistrado: (id, name, phone, email, dpto) => {
				const store = getStore();
				console.log("flux actualizar Usuario Registrado", name, phone, email, dpto);
				var raw = JSON.stringify({
					full_name: name,
					phone: phone,
					email: email,
					numero_apartment: dpto
				});
				var requestOptions = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: raw,
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + "/api/register/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			}, //fin de actualizar usuario registrado
			borrarUsuarioRegistrado: elemento => {
				const store = getStore();

				console.log(elemento);
				var requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + "/api/register/" + elemento.id_user, requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						getActions().getUserRegistrado();
					})
					.catch(error => console.log("error", error));
			}, //fin de borrar  un marketplace

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		} // fin de actions
	}; // fin de return
}; // fin de const getstate

export default getState;
