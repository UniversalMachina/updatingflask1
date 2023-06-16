from flask import Flask, session, redirect, url_for, escape, request, render_template
from werkzeug.security import generate_password_hash, check_password_hash
import os, json, shutil
from flask import jsonify  # import jsonify
app = Flask(__name__)

app.secret_key = os.urandom(24)

def load_users():
    if os.path.exists('users.json'):
        with open('users.json') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open('users.json', 'w') as f:
        json.dump(users, f)

users = load_users()

@app.route('/', methods=['GET', 'POST'])
def index():
    message = ''
    chat_log = "Chat Log Dummy Text. This is where your chat logs will appear. User interaction logs and other relevant information will be displayed here."
    if request.method == 'POST':
        action = request.form.get('action')
        if action == 'create':
            username = request.form['new_username']
            if username in users:
                message = 'Username already exists'
            else:
                users[username] = generate_password_hash(username)
                save_users(users)
                os.makedirs(f'./{username}', exist_ok=True)
                session['username'] = username
                message = f'User {username} created'
        elif action == 'switch':
            username = request.form['username']
            if username in users:
                session['username'] = username
                message = f'Switched to user {username}'
            else:
                message = 'User does not exist'
        elif action == 'delete':
            username = request.form['username']
            if username in users:
                del users[username]
                save_users(users)
                shutil.rmtree(f'./{username}', ignore_errors=True)
                if session.get('username') == username:
                    session.pop('username', None)
                message = f'User {username} deleted'
            else:
                message = 'User does not exist'
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            # Return a JSON response if the request was made via AJAX
            return jsonify(users=list(users.keys()), current_user=session.get('username'), message=message)

    return render_template('index.html', users=users, current_user=session.get('username'), message=message, chat_log=chat_log)

@app.route('/linkedin', methods=['GET'])
def linkedin():
    chat_log = "This is the LinkedIn chat log."
    return jsonify(chat_log=chat_log)  # return JSON data

@app.route('/ziprecruiter', methods=['GET'])
def ziprecruiter():
    chat_log = "This is the ZipRecruiter chat log."
    return jsonify(chat_log=chat_log)  # return JSON data

@app.route('/status', methods=['GET'])
def status():
    username = session.get('username')
    if username is None:
        return {'r': 'Invalid', 'c': 'Invalid'}

    def check_file(filename):
        try:
            with open(f'./{username}/{filename}') as f:
                return 'Valid'
        except IOError:
            return 'Invalid'

    return {'r': check_file('r.txt'), 'c': check_file('c.txt')}


if __name__ == '__main__':
    app.run(debug=True)
