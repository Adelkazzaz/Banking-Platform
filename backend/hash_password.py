from app.core.security import get_password_hash

password = "fSvl06Ev"
hashed_password = get_password_hash(password)

print(hashed_password)
