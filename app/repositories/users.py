from app.services.auth import get_password_hash

users_db = {
    "admin": {
        "username": "admin",
        "hashed_password": get_password_hash("password123")
    }
}

def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    if not user:
        return None
    from app.services.auth import verify_password
    if not verify_password(password, user["hashed_password"]):
        return None
    return user