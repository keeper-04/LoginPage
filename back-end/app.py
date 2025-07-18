from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)
USER_FILE = 'users.json'

def load_users():
    if os.path.exists(USER_FILE):
        with open(USER_FILE, 'r') as f:
            return json.load(f)
    return []

def save_users(users):
    with open(USER_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    users = load_users()
    for user in users:
        if user['username'] == username and user['password'] == password:
            return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    users = load_users()
    for user in users:
        if user['username'] == username:
            return jsonify({'message': 'Username already exists'}), 400

    users.append({'username': username, 'password': password})
    save_users(users)

    return jsonify({'message': 'Signup successful'}), 201

if __name__ == '__main__':
    app.run(debug=True)
