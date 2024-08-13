from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

# API route example
@app.route('/api/hello', methods=['GET'])
def hello_api():
    return jsonify(message="Hello from Flask API!")

# Serve React App
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    # If the path is a valid file, serve it
    if path != "" and path.startswith("api/"):
        return jsonify(error="API route not found"), 404
    return send_from_directory(app.static_folder, path)

# Catch-all for serving React app for all other routes
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
