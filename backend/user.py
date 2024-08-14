from flask import request
import shortuuid
from datetime import datetime, timedelta

# Function to calculate the expiration date
#def renew_cookie(days):
#    return datetime.utcnow() + timedelta(days=days)

def renew_cookie(days):
    expiration_date = datetime.utcnow() + timedelta(days=days)
    #return int((expiration_date - datetime.utcnow()).total_seconds())
    return expiration_date

def get_max_age(expiration_date):
    return int((expiration_date - datetime.utcnow()).total_seconds())

# Function to get or create a user ID
def get_user_id():
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = shortuuid.uuid()
    return user_id
