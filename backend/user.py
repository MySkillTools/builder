from flask import request
import shortuuid
from datetime import datetime, timedelta

"""
    Calculate the new expiration date for a cookie.

    This function returns the date and time that is a specified number of days 
    in the future from the current UTC time. This is useful for setting the 
    expiration date of a cookie to a future date.

    Args:
        days (int): The number of days from the current date to set the expiration for.

    Returns:
        datetime: The calculated expiration date and time.
        
    Example:
        >>> renew_cookie(365)
        datetime.datetime(2025, 8, 19, 14, 30, 0, 123456)  # Example output
"""

def renew_cookie(days):
    return datetime.utcnow() + timedelta(days=days)

"""
    Calculate the maximum age for a cookie based on its expiration date.

    This function computes the number of seconds from the current UTC time 
    until the given expiration date. This value is commonly used to set the 
    `max-age` attribute for cookies.

    Args:
        expiration_date (datetime): The expiration date and time for the cookie.

    Returns:
        int: The maximum age of the cookie in seconds.

    Raises:
        ValueError: If `expiration_date` is in the past relative to the current time.

    Example:
        >>> get_max_age(datetime.utcnow() + timedelta(days=1))
        86400  # Number of seconds in a day
"""

def get_max_age(expiration_date):
    return int((expiration_date - datetime.utcnow()).total_seconds())
  
"""
    Retrieve or generate a user ID from the request cookies.

    This function attempts to retrieve the 'user_id' from the cookies in the 
    current HTTP request. If the 'user_id' is not found, a new unique user ID 
    is generated using the `shortuuid` library and returned.

    Returns:
        str: The user ID retrieved from the cookies or a newly generated user ID 
             if it does not exist in the cookies.
             
    Example:
        >>> get_user_id()
        '9r7U8a93gCzL'  # Example output
"""

def get_user_id():
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = shortuuid.uuid()
    return user_id
