from flask_restful import Resource
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return {'access_token': new_access_token}, 200
