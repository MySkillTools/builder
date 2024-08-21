from app import create_app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        from app import db
        db.create_all()  # This ensures models are loaded in the context
        app.run(debug=True)
