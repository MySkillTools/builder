from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import OperationalError, SQLAlchemyError

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/root/MSB/db/msb.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    #with app.app_context():
        #try:
        #    # Establish a connection and execute a test query
        #    with db.engine.connect() as connection:
        #        result = connection.execute("SELECT 1")
        #        print(result.scalar())  # This will print '1' if successful
        #except (OperationalError, SQLAlchemyError) as e:
        #    raise RuntimeError(f"Failed to connect to the database: {e}")

    from app.resources.SkillList import SkillList
    from flask_restful import Api
    api = Api(app)
    api.add_resource(SkillList, '/skills')

    return app
