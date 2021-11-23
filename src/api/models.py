from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
     __tablename__ = 'user'
     id_user = db.Column(db.Integer, primary_key=True)
     full_name= db.Column(db.String(50),unique=True, nullable=False)
     phone=  db.Column(db.Integer, unique=True,nullable=False)
     email = db.Column(db.String(50), unique=True, nullable=False)
     password = db.Column(db.String(16), unique=False, nullable=False)
     numero_apartment= db.Column(db.Integer)
     numero_bodega= db.Column(db.Integer,unique=True)
     id_building= db.Column(db.Integer, db.ForeignKey('building.id_building'))
     relacionmarketplace= db.relationship("Marketplace")
     relacionreservaspacio=db.relationship("SpaceReservation")     

     def serialize(self):
        return {
            "id_user": self.id_user,
            "full_name": self.full_name,
            "phone": self.phone,
            "email": self.email,
            "numero_apartment":self.numero_apartment,
            "numero_bodega":self.numero_bodega,
            "id_building": self.id_building            
           
        }
class Apartment(db.Model):
    __tablename__ = 'apartment'
    id_apartment = db.Column(db.Integer, primary_key=True)
    num_apartment= db.Column(db.Integer,unique=True,nullable=False)     
    floor_apartment= db.Column(db.Integer,nullable=False)    
    relacionbuilding= db.relationship("Building")

    def serialize(self):
        return {
            "id_apartment": self.id_apartment,
            "num_apartment": self.num_apartment,
            "floor_apartment": self.floor_apartment
            
        }
class Building(db.Model):
     __tablename__ = 'building'       
     id_building = db.Column(db.Integer, primary_key=True)
     name        = db.Column(db.String(50),nullable=False)
     adress      = db.Column(db.String(80),nullable= False)
     region = db.Column (db.String(50),nullable = False)
     comuna= db.Column(db.String(50),nullable = False)
     administrator_id= db.Column(db.Integer, db.ForeignKey('administrator.id_admin'))
     commonspace_id= db.Column(db.Integer,   db.ForeignKey('commonspace.id_commonspace'))
     apartment_id= db.Column(db.Integer, db.ForeignKey('apartment.id_apartment'))
     relacionuser= db.relationship("User")

     def serialize(self):
        return {
            "id_building": self.id_building,
            "name": self.name,
            "adress": self.adress,
            "region": self.region,
            "comuna": self.comuna,
            "administrator_id": self.administrator_id,
            "commonspace_id": self.commonspace_id,
            "apartment_id":self.apartment_id,
            
        }

class CommonSpace(db.Model):
    __tablename__ = 'commonspace'
    id_commonspace = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50),nullable=False,unique=True)
    aforo= db.Column(db.Integer,nullable=False)
    relacionbuilding= db.relationship("Building")
    relacionreservaspacio= db.relationship("SpaceReservation")
        
    def serialize(self):
        return {
            "id_commonspace": self.id_commonspace,
            "name": self.name,
            "aforo": self.aforo,
            
        }
class Administrator(db.Model):
    __tablename__ = 'administrator'   
    id_admin =db.Column(db.Integer,primary_key=True)      
    full_name= db.Column(db.String(50),unique=True, nullable=False)
    phone=  db.Column(db.Integer, unique=True,nullable=False)
    email= db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(16), unique=False, nullable=False)
    relacionbuilding= db.relationship("Building")
    relaciondiariomural=db.relationship("DiarioMural")
    relacionreservaspacio=db.relationship("SpaceReservation")

    def serialize(self):
        return {
            "id_admin": self.id_admin,
            "full_name": self.full_name,
            "phone": self.phone,
            "email": self.email,
            "password":self.password
            
        }

class DiarioMural(db.Model):
    __tablename__ = 'diariomural'
    id_diariomural= db.Column(db.Integer,primary_key=True)
    administrator_id= db.Column(db.Integer, db.ForeignKey('administrator.id_admin'))
    title_announcement=db.Column(db.String(50), nullable=False)
    announcement= db.Column(db.String(200),nullable=False)    

    def serialize(self):
        return {
            "id_diariomural": self.id_diariomural,
            "administrator_id":self.administrator_id,
            "title_announcement":self.title_announcement,
            "announcement": self.announcement  
        }  

class Marketplace(db.Model):
    __tablename__ = 'marketplace'
    id_marketplace= db.Column(db.Integer,primary_key=True)
    title_announcement=db.Column(db.String(50), nullable=False)
    announcement=db.Column(db.String(200),nullable=False) 
    user_id= db.Column(db.Integer,db.ForeignKey('user.id_user')) 

    def serialize(self):
        return {
            "id_marketplace": self.id_marketplace,
            "title_announcement":self.title_announcement,
            "announcement": self.announcement,
            "user_id": self.user_id
        }
class SpaceReservation (db.Model):
    __tablename__ = 'spacereservation'
    id_reservation= db.Column(db.Integer,primary_key=True)
    date_reservation= db.Column(db.Date,nullable=False)
    reservation_time= db.Column(db.Time,nullable=False)
    userid= db.Column(db.Integer,db.ForeignKey('user.id_user'))
    aproved_id= db.Column(db.Integer,db.ForeignKey('administrator.id_admin'))
    commonspace_id= db.Column(db.Integer,db.ForeignKey('commonspace.id_commonspace'))
   

    def serialize(self):
        return {
            "id_reservation":   self.id_reservation,
            "date_reservation": self.date_reservation,
            "reservation_time": str(self.reservation_time),
            "userid"         : self.userid,
            "aproved_id"      : self.aproved_id,
            "commonspace_id" : self.commonspace_id
        }

         




