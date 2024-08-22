from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        # Extract user identity from JWT token
        current_user = get_jwt_identity()
        # Assume the identity contains the username
        email = current_user.get('email', 'User')
        
        # Return a personalized greeting
        return {'message': f'Hello, {email}!'}, 200
