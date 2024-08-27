from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token
from models.User import User

class Login(Resource):

    """
    Resource for handling user login.

    This class provides a login endpoint where users can authenticate themselves
    by providing their email and password. Upon successful authentication,
    a JSON Web Token (JWT) is returned which can be used to access protected
    endpoints in the API.

    Methods
    -------
    post():
        Authenticates a user based on the provided email and password.
        If authentication is successful, returns an access token.
        If authentication fails, returns an error message.

    Error Responses
    ----------------
    401 Unauthorized:
        Returned if the email or password is incorrect.

    Expected Input
    ---------------
    - `email` (string): The email of the user attempting to log in.
    - `password` (string): The password associated with the email.
    """

    """
        API Testing Endpoints for the UserLogin Resource
        Base URL: http://localhost:5000/login

        1. User Login
        - URL: POST http://localhost:5000/login
        - Description: Authenticates a user based on the provided email and password. On successful authentication, an access token is returned. If authentication fails, an error message is returned.

        Example Request:
        POST /login
        {
            "email": "example_user",
            "password": "example_password"
        }

        Example Response on Success:
        {
            "message": "success",
            "access_token": "your_jwt_token_here"
        }

        Example Response on Failure:
        {
            "message": "Invalid credentials",
            "access_token": null
        }

        2. User Login with Invalid Credentials
        - URL: POST http://localhost:5000/login
        - Description: Attempts to authenticate a user with incorrect email or password. Returns an error message if the credentials are invalid.

        Example Request:
        POST /login
        {
            "email": "wrong_user",
            "password": "wrong_password"
        }

        Example Response:
        {
            "message": "Invalid credentials",
            "access_token": null
        }
    """

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True, help="email cannot be blank")
        parser.add_argument('password', required=True, help="Password cannot be blank")
        args = parser.parse_args()

        user = User.query.filter_by(email=args['email']).first()

        # Login successful
        if user and user.check_password(args['password']):
            access_token = create_access_token(identity={'email': user.email})
            return {
                'user': args['email'],
                'message': 'success',
                'access_token': access_token
            }, 200
        
        # Login failed
        else:
            return {
                'user': None,
                'message': 'Invalid credentials',
                'access_token': None
            }, 401
