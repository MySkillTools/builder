#from flask import Flask, request, jsonify, send_from_directory, make_response
#import shortuuid
#from datetime import datetime, timedelta

#app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')



# API route example
#@app.route('/api/hello', methods=['GET'])
#def hello_api():
#    return jsonify(message="Hello from Flask API!")

# Serve React App
#@app.route('/')
#def index():

    #user_id = request.cookies.get('user_id')
    #if not user_id:
    #    user_id = shortuuid.uuid()
    
    #print(user_id)

    #return send_from_directory(app.static_folder, 'index.html')
    # TODO SEND COOkIE

#    resp = make_response(send_from_directory(app.static_folder, 'index.html'))
#    expires = get_expiration_date()  # 1-year expiration date
#    resp.set_cookie('user_id', user_id, expires=expires)
#    print(f"User ID: {user_id}")  # Log user ID to console

#    return resp

#@app.route('/<path:path>')
#def static_proxy(path):
#    # If the path is a valid file, serve it
#    if path != "" and path.startswith("api/"):
#        return jsonify(error="API route not found"), 404
#    return send_from_directory(app.static_folder, path)

# Catch-all for serving React app for all other routes
#@app.errorhandler(404)
#def not_found(e):
#    return send_from_directory(app.static_folder, 'index.html')

from app import create_app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
