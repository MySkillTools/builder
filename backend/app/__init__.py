from flask import Flask, g, request, make_response
import user

def create_app():
    app = Flask(__name__)
    # Load configurations if needed
    # app.config.from_object('config.Config')

    @app.before_request
    def run_before_request():
        # Example function logic to get user ID
        user_id = user.get_user_id()
        
        # Store user ID in g (global context) if needed later in the request
        g.user_id = user_id

    @app.after_request
    def after_request(response):
        # Set the cookie after processing the request
        if hasattr(g, 'user_id'):
            response.set_cookie('user_id', g.user_id)
        return response

    @app.route('/')
    def home():
        return 'Hello, World!'

    return app
