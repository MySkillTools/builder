from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

class User(Resource):

    """
        Handles GET requests to the user endpoint.

        This method requires a valid JWT token to access. It extracts the user's
        identity from the JWT token, specifically the email address, and returns
        a JSON response with a personalized greeting message. If the email is not
        present in the token, a default value 'User' is used.

        Returns:
            dict: A JSON response containing a personalized greeting message.
            int: HTTP status code 200 (OK) indicating successful retrieval.
    """
            
    @jwt_required()
    def get(self):

        # Extract user identity from JWT token
        current_user = get_jwt_identity()
        # Assume the identity contains the email
        email = current_user.get('email', 'User')
        
        # Return a personalized greeting
        return {'user': email}, 200
