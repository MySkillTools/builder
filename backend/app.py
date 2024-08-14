from flask import Flask, g, send_from_directory
import user

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
            expiration_date = user.renew_cookie(365)  # 1 year
            max_age = user.get_max_age(expiration_date)
            response.set_cookie('user_id', g.user_id, max_age=max_age)
        return response

    @app.route('/')
    def home():
        return send_from_directory(app.static_folder, 'index.html')

    # Catch-all for serving React app for all other routes
    @app.errorhandler(404)
    def not_found(e):
        return send_from_directory(app.static_folder, 'index.html')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
