from flask_restful import Resource
from . import user

class UserResource(Resource):
    def get(self):
        """Retrieve user ID and its expiration date."""
        user_id = user.get_user_id()
        expiration_date = user.renew_cookie(365)  # Set expiration to 1 year
        
        response = {
            'user_id': user_id,
            'expires_at': expiration_date.isoformat()  # ISO format for easier readability
        }

        return response, 200