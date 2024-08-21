from flask import Flask, g, send_from_directory
#from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

import user
#import UserResource
import config

from resources import UserResource
from resources import SkillList

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

    @app.before_request
    def run_before_request():
        # Example function logic to get user ID
        user_id = user.get_user_id()
        
        # Store user ID in g (global context) if needed later in the request
        g.user_id = user_id

    @app.after_request
    def after_request(response):
        # Set the cookie with expiration
        if hasattr(g, 'user_id'):
            expiration_date = user.renew_cookie(config.COOKIE_LIFESPAN)  # 1 year
            max_age = user.get_max_age(expiration_date)
            response.set_cookie('user_id', g.user_id, max_age=max_age)
        return response

    return app



if __name__ == '__main__':
    app = create_app()
    #CORS(app, supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///skills.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app)


    api = Api(app)
    

    api.add_resource(UserResource.UserResource, '/user')
    api.add_resource(SkillList.SkillList, '/skillList')

    with app.app_context():
        db.create_all()
        app.run(debug=True)
