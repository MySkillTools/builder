from flask_restful import Resource
import user
import config
#from datetime import datetime

class UserResource(Resource):
    def get(self):
        """Retrieve user ID and its expiration date."""
        user_id = user.get_user_id()
        expiration_date = user.renew_cookie(config.COOKIE_LIFESPAN)  # Set expiration to 1 year
        
        response = {
            'user_id': user_id,
            'cookie_expires': expiration_date.strftime('%Y-%m-%d %H:%M:%S')
        }

        return response, 200