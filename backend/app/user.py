from flask import request
import shortuuid
from datetime import datetime, timedelta

# Set expiration to 1 year from now
def renew_cookie(days):
    return datetime.utcnow() + timedelta(days)

def get_user_id():
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = shortuuid.uuid()