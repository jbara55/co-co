"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Apartment, Building, CommonSpace, Administrator, DiarioMural, Marketplace, SpaceReservation
from api.utils import generate_sitemap, APIException
from mailjet_rest import Client
import datetime
import os
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity 


api = Blueprint('api', __name__)

app = Flask(__name__)
jwt = JWTManager(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

    
@api.route('/user', methods=['GET','POST'])
def get_all_user():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla users
        all_users= User.query.all()
        all_users= list(map(lambda x: x.serialize(),all_users))
        return jsonify(all_users), 200
    else:
        body = request.get_json() # obtener el request body de la solicitud
        if body is None:
            return "The request body is null", 400
        if 'email' not in body:
            return 'Especificar email', 400
        if 'password' not in body:
            return 'Especificar password',400
        #estoy consultando si existe alguien con el email que mande en la api y consigo la primera coincidencia
        onePeople = User.query.filter_by(email=body["email"]).first()
        if onePeople:
            if (onePeople.password == body["password"] ):                 
                expira = datetime.timedelta(minutes=2)
                access_token = create_access_token(identity=onePeople.email, expires_delta=expira)
                data = {
                    "info_user": onePeople.serialize(),
                    "token": access_token,
                    "expires": expira.total_seconds()
                }
                
                return(
                    jsonify(data)
                    
                )
            else:
                return(jsonify({"mensaje":False}))
        else:
            return(jsonify({"mensaje":"mail no se encuentra registrado"}))
# GET ONE USER
@api.route('/administrator', methods=['GET','POST'])
def get_all_administrator():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla administrator
        all_administrator= Administrator.query.all()
        all_administrator= list(map(lambda x: x.serialize(), all_administrator))
        return jsonify(all_administrator), 200   
    else:
        body = request.get_json() # obtener el request body de la solicitud
        if body is None:
            return "The request body is null", 400
        if 'email' not in body:
            return 'Especificar email', 400
        if 'password' not in body:
            return 'Especificar password',400
        #estoy consultando si existe alguien con el email que mande en la api y consigo la primera coincidencia
        oneAdmin = Administrator.query.filter_by(email=body["email"]).first()
        if oneAdmin:
            if (oneAdmin.password == body["password"] ):                 
                expira = datetime.timedelta(minutes=2)
                access_token = create_access_token(identity=oneAdmin.email, expires_delta=expira)
                data = {
                    "info_user": oneAdmin.serialize(),
                    "token_admin": access_token,
                    "expires": expira.total_seconds()
                }
                
                return(
                    jsonify(data)
                    
                )
            else:
                return(jsonify({"mensaje":False}))
        else:
            return(jsonify({"mensaje":"mail no se encuentra registrado"}))   
@api.route('/user/<int:id>', methods=['GET'])
def get_one_user(id):
    if request.method =='GET':
       one_user= User.query.get(id)    

# DELETE UPDATE USER
api.route('/user/<int:id>', methods=['DELETE', 'PUT'])
def DelUpUser(id):
    if request.method =='DELETE':
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({"msg": "Usuario Eliminado"})
    else:
        user = User.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'email' not in body:
            return "Debe especificar el email",400
        if 'password' not in body:
            return "Debe especificar el password",400   
        user.email=body["email"]
        user.password=body["password"]
        db.session.commit() 
        response_body={
            "msg": "Usuario Actualizado"
        }
        return jsonify(response_body),200            



@api.route('/apartment', methods=['GET','POST'])
def get_all_apartment():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla apartment
        all_apartment= Apartment.query.all()
        all_apartment= list(map(lambda x: x.serialize(), all_apartment))
        return jsonify( all_apartment), 200
    else:  
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'num_apartment' not in body:
            return "Debe especificar Numero del Apartamento",400
        if 'floor_apartment' not in body:
            return "Debe especificar el piso del apartamento",400

        newApartment= Apartment(num_apartment=body['num_apartment'],floor_apartment=body['floor_apartment'])
        db.session.add(newApartment)
        db.session.commit()
        response_body={
            "msg": "Apartamento Registrado"
        }
        return jsonify(response_body),200    
# GET ONE APARTMENT
@api.route('/apartment/<int:id>', methods=['GET'])
def get_one_apartment(id):
    if request.method =='GET':
       one_apartment= Apartment.query.get(id)
    
       return jsonify(one_apartment.serialize()), 200    

# DELETE UPDATE APARTMENT
@api.route('/apartment/<int:id>', methods=['DELETE', 'PUT'])
def DelUpApartment(id):
    if request.method =='DELETE':
        apartment = Apartment.query.get(id)
        db.session.delete(apartment)
        db.session.commit()
        
        return jsonify({"msg": "Apartamento Eliminado"})
    else:
        apartment = Apartment.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'num_apartment' not in body:
            return "Debe especificar Numero del Apartamento",400
        if 'floor_apartment' not in body:
            return "Debe especificar el piso del edificio",400  

        apartment.num_apartment=body["num_apartment"]
        apartment.floor_apartment=body["floor_apartment"]
        db.session.commit() 
        response_body={
            "msg": "Apartamento Actualizado"
        }
        return jsonify(response_body),200   

        
@api.route('/building', methods=['GET','POST'])
def get_all_building():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla building
        all_building= Building.query.all()
        all_building= list(map(lambda x: x.serialize(), all_building))
        return jsonify(all_building), 200
    else: 
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'name' not in body:
            return "Debe especificar Nombre del Edificio",400
        if 'adress' not in body:
            return "Debe especificar la direccion del Edificio",400
        if 'region' not in body:
            return "Debe especificar la region donde se encuentra el Edificio",400  
        if 'comuna'not in body:
            return "Debe especificar la comuna donde se encuentra el Edificio",400
        
        newBuilding= Building(name=body['name'],adress=body['adress'],
        region=body['region'],comuna=body['comuna'])
        db.session.add(newBuilding)
        db.session.commit()
        response_body={
            "msg": "Edificio Registrado"
        }
        return jsonify(response_body),200   
# GET ONE BUILDING
@api.route('/building/<int:id>', methods=['GET'])
def get_one_building(id):
    if request.method =='GET':
       one_building= Building.query.get(id)
    
       return jsonify(one_building.serialize()), 200
        
# DELETE y UPDATE Building
@api.route('/building/<int:id>', methods=['DELETE', 'PUT'])
def DelUpBuilding(id):
    if request.method =='DELETE':
        building = Building.query.get(id)
        db.session.delete(building)
        db.session.commit()
        
        return jsonify({"msg": "Edificio Eliminado"})
    else:
        building = Building.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'name' not in body:
            return "Debe especificar Nombre del Edificio",400
        if 'adress' not in body:
            return "Debe especificar la direccion del Edificio",400
        if 'region' not in body:
            return "Debe especificar la region donde se encuentra el Edificio",400  
        if 'comuna'not in body:
            return "Debe especificar la comuna donde se encuentra el Edificio",400
          
        building.name=body["name"]
        building.adress=body["adress"]
        building.region=body["region"]
        building.comuna=body["comuna"]
        db.session.commit() 
        response_body={
            "msg": "Edificio Actualizado"
        }
        return jsonify(response_body),200      
     
@api.route('/commonSpace', methods=['GET','POST'])
def get_all_commonspace():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla commonspace
        all_common_space= CommonSpace.query.all()
        all_common_space= list(map(lambda x: x.serialize(), all_common_space))
        return jsonify(all_common_space), 200 
    else:    
        # POST COMMONSPACE
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'name' not in body:
            return "Debe especificar Nombre del Espacio Comun",400
        if 'aforo' not in body:
            return "Debe especificar aforo maximo",400

        newCommonSpace= CommonSpace(name=body['name'],aforo=body['aforo'])
        db.session.add(newCommonSpace)
        db.session.commit()
        response_body={
            "msg": "Espacio Comun Registrado"
        }
        return jsonify(response_body),200

# GET ONE COMMONSPACE
@api.route('/commonSpace/<int:id>', methods=['GET'])
def get_one_commonspace(id):
    if request.method =='GET':
       one_commonspace= CommonSpace.query.get(id)
    
       return jsonify(one_commonspace.serialize()), 200    
# DELETE UPDATE COMMONSPACE
@api.route('/commonSpace/<int:id>', methods=['DELETE','PUT'])
def DelUpCommonSpace(id):
    if request.method =='DELETE':
        commonSpace = CommonSpace.query.get(id)
        db.session.delete(commonSpace)
        db.session.commit()
        
        return jsonify({"msg": "Espacio Comun Eliminado"})
    else:
        commonSpace = CommonSpace.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'name' not in body:
            return "Debe especificar Nombre del Espacio Comun",400
        if 'aforo' not in body:
            return "Debe especificar el aforo",400
                  
        commonSpace.name=body["name"]
        commonSpace.aforo=body["aforo"]
        db.session.commit() 
        response_body={
            "msg": "Espacio Comun Actualizado"
        }
        return jsonify(response_body),200      

 
        
# GET ONE ADMINISTRATOR
@api.route('/administrator/<int:id>', methods=['GET'])
def get_one_administrator(id):
    if request.method =='GET':
       one_administrator= Administrator.query.get(id)
    
       return jsonify(one_administrator.serialize()), 200  

# DELETE UPDATE ADMINISTRATOR
@api.route('/administrator/<int:id>', methods=['DELETE','PUT'])
def DelUpAdministrator(id):
    if request.method =='DELETE':
        administrator = administrator.query.get(id)
        db.session.delete(administrator)
        db.session.commit()
        
        return jsonify({"msg": "Administrador Eliminado"})
    else:
        administrator = administrator.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'full_name' not in body:
            return "Debe especificar Nombre del Administrador",400
        if 'phone' not in body:
            return "Debe especificar el telefono",400
        if 'email' not in body:
            return "Debe especificar el email",400 
        if 'password' not in body:
            return "Debe especificar el password",400       
                  
        administrator.full_name=body["full_name"]
        administrator.phone=body["phone"]
        administrator.email=body["email"]
        administrator.password=body["password"]

        db.session.commit() 
        response_body={
            "msg": "Administrator Actualizado"
        }
        return jsonify(response_body),200      


@api.route('/diariomural', methods=['GET','POST'])
def get_all_diariomural():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla diairomural
        all_diariomural= DiarioMural.query.all()
        all_diariomural= list(map(lambda x: x.serialize(), all_diariomural))
        return jsonify(all_diariomural), 200
    else:      
        # POST diariomural
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'title_announcement' not in body:
            return "Debe especificar El Titulo del Anuncio",400
        
        if 'announcement' not in body:
            return "Debe especificar el anuncio",400
        
        newDiarioMural= DiarioMural(title_announcement=body['title_announcement'],announcement=body['announcement'])
        db.session.add(newDiarioMural)
        db.session.commit()        
        response_body={
            "msg": "Anuncio Registrado en el Diario Mural"        }
        return jsonify(response_body),200      

# GET ONE DIARIO MURAL
@api.route('/diariomural/<int:id>', methods=['GET'])
def get_one_diariomural(id):
    if request.method =='GET':
       one_diariomural= DiarioMural.query.get(id)
    
       return jsonify(one_diariomural.serialize()), 200  

# DELETE UPDATE DIARIO MURAL
@api.route('/diariomural/<int:id>', methods=['DELETE','PUT'])
def DelUpDiarioMural(id):
    if request.method =='DELETE':
        diariomural = DiarioMural.query.get(id)
        db.session.delete(diariomural)
        db.session.commit()
        
        return jsonify({"msg": "Diario Mural Eliminado"})
    else:
        diariomural = DiarioMural.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'title_announcement' not in body:
            return "Debe especificar el titulo",400
        if 'announcement' not in body:
            return "Debe especificar el anuncio",400 
           
        diariomural.title_announcement=body["title_announcement"]
        diariomural.announcement=body["announcement"]
       

        db.session.commit() 
        response_body={
            "msg": "Diario Mural Actualizado"
        }
        return jsonify(response_body),200 


@api.route('/marketplace', methods=['GET','POST'])
def get_all_marketplace():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla marketplace
        all_marketplace= Marketplace.query.all()
        all_marketplace= list(map(lambda x: x.serialize(), all_marketplace))
        return jsonify(all_marketplace), 200    
    else:    
       # POST marketplace
       # body va a recibir la info de la api y la va a transformar en formato json    
       body=request.get_json()
       #validamos que  lo que se traiga en el request no este vacio o null
       if body is None:
           return "The request body is null", 400
       if 'title_announcement' not in body:
           return "Debe especificar El Titulo del Anuncio",400     
       if 'announcement' not in body:
           return "Debe especificar el anuncio",400
    
       newMarketplace= Marketplace(title_announcement=body['title_announcement'],announcement=body['announcement'])
       db.session.add(newMarketplace)
       db.session.commit()
       response_body={
            "msg": "Anuncio Registrado en el Marketplace"
       }
       return jsonify(response_body),200   

# GET ONE MARKETPLACE
@api.route('/marketplace/<int:id>', methods=['GET'])
def get_one_marketplace(id):
    if request.method =='GET':
       one_marketplace= Marketplace.query.get(id)
    
       return jsonify(one_marketplace.serialize()), 200   

# DELETE UPDATE MARKETPLACE
@api.route('/marketplace/<int:id>', methods=['DELETE','PUT'])
def DelUpMarketplace(id):
    if request.method =='DELETE':
        marketplace = Marketplace.query.get(id)
        db.session.delete(marketplace)
        db.session.commit()
        
        return jsonify({"msg": "Marketplace Eliminado"})
    else:
        marketplace = Marketplace.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'title_announcement' not in body:
            return "Debe especificar el titulo",400
        if 'announcement' not in body:
            return "Debe especificar el anuncio",400 
           
                  
        
        marketplace.title_announcement=body["title_announcement"]
        marketplace.announcement=body["announcement"]
       

        db.session.commit() 
        response_body={
            "msg": "Marketplace Actualizado"
        }
        return jsonify(response_body),200 

              
@api.route('/spacereservation', methods=['GET','POST'])
def get_all_spacereservation():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla spacereservation
        all_reservation= SpaceReservation.query.all()
        all_reservation= list(map(lambda x: x.serialize(), all_reservation))
        return jsonify(all_reservation), 200 
    else:     
       #POST Spacereservation
       # body va a recibir la info de la api y la va a transformar en formato json    
       body=request.get_json()
       #validamos que  lo que se traiga en el request no este vacio o null
       if body is None:
           return "The request body is null", 400
       if 'date_reservation' not in body:
           return "Debe especificar la fecha de la reservacion",400
       if 'reservation_time' not in body:
           return "Debe especificar la cantidad de horas de reservacion",400 

       newSpacereservation=SpaceReservation(date_reservation=body['date_reservation'],reservation_time=body['reservation_time'])
       db.session.add(newSpacereservation)
       db.session.commit()
       response_body={
        "msg": "El espacio comun fue reservado con exito"
       }
       return jsonify(response_body),200   

# GET ONE spacereservation
@api.route('/spacereservation/<int:id>', methods=['GET'])
def get_one_spacereservation(id):
    if request.method =='GET':
       one_spacereservation= SpaceReservation.query.get(id)
       return jsonify(one_spacereservation.serialize()), 200         

# DELETE UPDATE SPACERESERVATION
@api.route('/spacereservation/<int:id>', methods=['DELETE','PUT'])
def DelUpSpaceReservation(id):
    if request.method =='DELETE':
        spacereservation = SpaceReservation.query.get(id)
        db.session.delete(spacereservation)
        db.session.commit()
        return jsonify({"msg": "Espacio Reservado Eliminado"})
    else:
        spacereservation= spacereservation.query.get(id)
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
           return "The request body is null", 400
        if 'date_reservation' not in body:
            return "Debe especificar la fecha de reservacion",400
        if 'reservation_time' not in body:
            return "Debe especificar la cantidad de horas reservadas",400

        spacereservation.date_reservation=body["date_reservation"]
        marketplace.reservation_time=body["reservation_time"]
        db.session.commit() 
        response_body={
            "msg": "Espacio Reservado Actualizado"
        }
        return jsonify(response_body),200

@api.route('/register', methods=['GET','POST'])
def post_user():
    if request.method =='GET':
        # esta varibale estoy consultando a la base de datos por todos los registros de la tabla user
        all_user= User.query.all()
        all_user= list(map(lambda x: x.serialize(), all_user))
        return jsonify(all_user), 200 
    else:     
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'full_name' not in body:
            return "Debe especificar Nombre Completo",400
        if 'phone' not in body:
            return "Debe especificar Numero de telefono",400
        if 'email' not in body:
            return "Debe especificar el email",400  
        if 'password'not in body:
            return "Debe especificar el paswword",400
        newUser= User(full_name=body['full_name'],phone=body['phone'],
        email=body['email'],password=body['password'])
        db.session.add(newUser)
        db.session.commit()
        response_body={
            "msg": "Usuario Registrado"
        }
        return jsonify(response_body),200
   
# GET ONE userregister
@api.route('/register/<int:id>', methods=['GET'])
def get_one_userregister(id):
    if request.method =='GET':
       one_userregister= User.query.get(id)
       return jsonify(one_userregister.serialize()), 200         

# DELETE UPDATE USER register
@api.route('/register/<int:id>', methods=['DELETE', 'PUT'])
def DelUpUserRegister(id):
    if request.method =='DELETE':
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({"msg": "Usuario Eliminado"})
    else:
        user = User.query.get(id)
        
        # body va a recibir la info de la api y la va a transformar en formato json    
        body=request.get_json()
        #validamos que  lo que se traiga en el request no este vacio o null
        if body is None:
            return "The request body is null", 400
        if 'full_name' not in body:
            return "Debe especificar Nombre Completo",400
        if 'phone' not in body:
            return "Debe especificar Numero de telefono",400
        if 'email' not in body:
            return "Debe especificar el email",400 
        if 'numero_apartment' not in body:
            return "Debe especificar el numero de depto",400       
          
        user.full_name=body["full_name"]
        user.phone=body["phone"]
        user.email=body["email"]
        user.numero_apartment=body["numero_apartment"]
        db.session.commit() 
        response_body={
            "msg": "Usuario Registrado Actualizado"
        }
        return jsonify(response_body),200            



#INICIO Reserva espacio comun

# @app.route('/logged', methods=['POST'])
# def SpaceReservation();

#     body=request.get_json()

#     if body is None:
#         return "The request body is null", 400
#     if date_reservation is None:
#         return "Especificar fecha de reserva", 400
#     if reservation_time is None:
#         return "Especificar hora de reserva", 400

#     newReservation= spacereservation(date_reservation=body['date_reservation'],
#     reservation_time=body['reservation_time'])
#     db.session.add(newReservation)
#     db.session.commit()
#     response_body={

#         "msg": "Reserva Exitosa"

#     }
#     return jsonify(response_body),200

# #FIN Reserva espacio comun

@api.route('/perfilprivado', methods = ['POST'])
@jwt_required()
def get_datos():     
    token = get_jwt_identity()
    checkUser = User.query.filter_by(email = token).first()    
    checkAdmin = Administrator.query.filter_by(email = token).first()

    if checkUser : 
        return jsonify(checkUser.serialize())
    if checkAdmin : 
        return jsonify(checkUser)



 # Post Enviar email Formulario contacto    
@api.route('/enviardatos', methods=['POST'])    
def enviardatos():
    #body va a recibir la info de la api y la va a transformar en formato json    
     body=request.get_json()
     send_email(body)  
     response_body={
         "msg": "Correo Enviado"
     }
     return jsonify(response_body),200 
   
def send_email(body):
    api_key = 'c2fe792c34a5abfc6bba23a9324a748e'
    api_secret = 'ab73d815217857ca0282562651fe916a'
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')
    if body:
        result = mailjet.send.create(data=body)
    else:
        data = {
         'Messages': [
             {
             "From": {
                 "Email":"appedificio@gmail.com",
                 "Name": body.name
             },
             "To": [
                 {
                 "Email": "appedificio@gmail.com",
                 "Name": "tuedificio"
                 }
             ],
             "Subject": "MAIL PREDEFINIDO .",
             "TextPart": body.text + body.email,
             "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
             "CustomID": "AppGettingStartedTest"
             }
         ]
         }
        result = mailjet.send.create(data=data)
    




