from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_restful import Api

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/steven/MSB/db/msb.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with a secure key

    db.init_app(app)
    jwt.init_app(app)

    api = Api(app)

    # Import and add resources here
    from resources.SkillList import SkillList
    api.add_resource(SkillList, '/skillList')

    # Import and add login resource here
    from resources.Login import Login
    api.add_resource(Login, '/login')

    from resources.ProtectedResource import ProtectedResource
    api.add_resource(ProtectedResource, '/protected')

    from resources.TokenRefresh import TokenRefresh
    api.add_resource(TokenRefresh, '/refresh')

    return app
