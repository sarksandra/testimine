from flask import Flask, jsonify, request
import uuid, time

app = Flask(__name__)

USERS = {
    "alice@example.com": { "password": "pass123", "role": "user"},
    "admin@example.com": {"password":"admin123","role":"admin"}
}

TOKENS = {

}

ORDERS = {

}


def require_bearer(req):
    auth = req.headers.get("Authorization","")
    if not auth.startswith("Bearer "):
        return None
    token = auth.split(" ",1)[1].strip()
    return TOKENS.get(token)


@app.get("/health")
def health():
    return jsonify({"ok":True})

@app.post("/login")
def login():
    data = request.get_json() or {}
    email = data.get("email")
    print(data)
    password = data.get("password")
    user = USERS.get(email)
    if not user or user["password"] != password:
        return jsonify({"error":"Credentials are bad"}), 401
    tok = str(uuid.uuid4())
    TOKENS[tok] = {'email':email, 'role': user['role']}
    time.sleep(0.15)
    return jsonify({'token':tok, 'role': user['role']})

@app.get("/me")
def me():
    princincipal  = require_bearer(request)
    if not princincipal:
        return jsonify({"error": "unauthorized"}),401
    return jsonify({"email":princincipal["email"], "role":princincipal["role"]})

@app.get("/admin")
def admin():
    princincipal  = require_bearer(request)
    if not princincipal:
        return jsonify({"error": "unauthorized"}),401
    if princincipal["role"] != "admin":
        return jsonify({"error": "forbidden"}),403
    return jsonify({"ok": True, "secret": "flag-123"})

@app.post("/logout")
def logout():
    princincipal  = require_bearer(request)
    if not princincipal:
        return jsonify({"error": "unauthorized"}),401
    token = request.headers.get("Authorization").split(" ",1)[1]
    TOKENS.pop(token, None)
    return jsonify({"ok": True})

@app.post("/register")
def register():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not email or "@" not in email:
        return jsonify({"error": "invalid email"}), 400
    if not password or len(password) < 6:
        return jsonify({"error": "invalid password"}), 400
    if email in USERS:
        return jsonify({"error": "email already registered"}), 409
    USERS[email] = {"password": password, "role": "user"}
    token = str(uuid.uuid4())
    TOKENS[token] = {"email": email, "role": "user"}
    return jsonify({
        "token": token,
        "email": email,
        "role": "user"
    }), 201

@app.post("/change-password")
def change_password():
    principal = require_bearer(request)
    if not principal:
        return jsonify({"error": "unauthorized"}), 401
    data = request.get_json() or {}
    old_password = data.get("old_password")
    new_password = data.get("new_password")
    email = principal["email"]
    user = USERS.get(email)
    if not old_password or not new_password:
        return jsonify({"error": "invalid input"}), 400
    if user["password"] != old_password:
        return jsonify({"error": "old password does not match"}), 400
    if len(new_password) < 6:
        return jsonify({"error": "new password too short"}), 400
    if new_password == old_password:
        return jsonify({"error": "new password must differ"}), 400
    USERS[email]["password"] = new_password
    old_token = request.headers.get("Authorization").split(" ", 1)[1]
    TOKENS.pop(old_token, None)
    new_token = str(uuid.uuid4())
    TOKENS[new_token] = {"email": email, "role": principal["role"]}
    return jsonify({"token": new_token}), 200

@app.get("/orders/<order_id>")
def get_order(order_id):
    principal = require_bearer(request)
    if not principal:
        return jsonify({"error": "unauthorized"}), 401
    order = ORDERS.get(order_id)
    if not order:
        return jsonify({"error": "not found"}), 404
    if order["owner"] != principal["email"] and principal["role"] != "admin":
        return jsonify({"error": "forbidden"}), 403
    return jsonify(order), 200

@app.get("/orders")
def list_orders():
    principal = require_bearer(request)
    if not principal:
        return jsonify({"error": "unauthorized"}), 401
    email = principal["email"]
    try:
        page = int(request.args.get("page", 1))
        page_size = int(request.args.get("page_size", 10))
    except ValueError:
        return jsonify({"error": "invalid pagination params"}), 400
    if page < 1:
        page = 1
    if page_size < 1:
        page_size = 10
    if page_size > 50:
        page_size = 50
    all_orders = [o for o in ORDERS.values() if o["owner"] == email]
    total = len(all_orders)
    start = (page - 1) * page_size
    end = start + page_size
    items = all_orders[start:end]
    return jsonify({
        "items": items,
        "page": page,
        "page_size": page_size,
        "total": total
    }), 200

@app.post("/orders")
def orders():
    principal = require_bearer(request)
    if not principal:
        return jsonify({"error": "unauthorized"}), 401
    data = request.get_json() or {}
    item_id = data.get("item_id")
    qty = data.get("qty")
    if not item_id or not isinstance(item_id, str) or item_id.strip() == "":
        return jsonify({"error": "invalid item_id"}), 400
    if not isinstance(qty, int) or qty < 1 or qty > 10:
        return jsonify({"error": "invalid qty"}), 400
    order_id = str(uuid.uuid4())
    order = {
        "id": order_id,
        "owner": principal["email"],
        "item_id": item_id,
        "qty": qty,
        "status": "created"
    }
    ORDERS[order_id] = order
    time.sleep(0.15)
    return jsonify(order), 201

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)