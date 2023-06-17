# from flask import Flask, session, redirect, url_for, escape, request, render_template
# from werkzeug.security import generate_password_hash, check_password_hash
# import os, json, shutil
# from flask import jsonify  # import jsonify
# from flask import Flask, render_template, jsonify, request
# from flask_socketio import SocketIO, send, emit
#
# app = Flask(__name__)
# socketio = SocketIO(app, cors_allowed_origins="*")
#
# app.secret_key = os.urandom(24)
#
# chat_logs = {
#     'linkedin': '',
#     'ziprecruiter': '',
# }
# def load_users():
#     if os.path.exists('users.json'):
#         with open('users.json') as f:
#             return json.load(f)
#     return {}
#
# def save_users(users):
#     with open('users.json', 'w') as f:
#         json.dump(users, f)
#
# users = load_users()
#
# @app.route('/', methods=['GET', 'POST'])
# def index():
#     message = ''
#     chat_log = "Chat Log Dummy Text. This is where your chat logs will appear. User interaction logs and other relevant information will be displayed here."
#     if request.method == 'POST':
#         action = request.form.get('action')
#         if action == 'create':
#             username = request.form['new_username']
#             if not username.strip():
#                 message = 'Username cannot be blank'
#             elif username in users:
#                 message = 'Username already exists'
#             else:
#                 users[username] = generate_password_hash(username)
#                 save_users(users)
#                 os.makedirs(f'./{username}', exist_ok=True)
#
#                 # Creating 'r.txt' and 'c.txt' in the user's directory
#                 with open(f'./{username}/r.txt', 'w') as r_file, open(f'./{username}/c.txt', 'w') as c_file:
#                     pass  # You can write something to the files here if needed
#
#                 session['username'] = username
#                 message = f'User {username} created'
#         elif action == 'switch':
#             username = request.form['username']
#             if username in users:
#                 session['username'] = username
#                 message = f'Switched to user {username}'
#             else:
#                 message = 'User does not exist'
#         elif action == 'delete':
#             username = request.form['username']
#             if username in users:
#                 del users[username]
#                 save_users(users)
#                 shutil.rmtree(f'./{username}', ignore_errors=True)
#                 if session.get('username') == username:
#                     session.pop('username', None)
#                 message = f'User {username} deleted'
#             else:
#                 message = 'User does not exist'
#     return render_template('index.html', users=users, current_user=session.get('username'), message=message, chat_log=chat_log)
#
# @app.route('/linkedin', methods=['GET'])
# def linkedin():
#     chat_log = "This is the LinkedIn chat log."
#     return jsonify(chat_log=chat_log)  # return JSON data
#
# @app.route('/ziprecruiter', methods=['GET'])
# def ziprecruiter():
#     chat_log = "This is the ZipRecruiter chat log."
#     return jsonify(chat_log=chat_log)  # return JSON data
#
# # @app.route('/status', methods=['GET'])
# # def status():
# #     username = session.get('username')
# #     if username is None:
# #         return {'r': 'Invalid', 'c': 'Invalid'}
# #
# #     def check_file(filename):
# #         try:
# #             with open(f'./{username}/{filename}') as f:
# #                 return 'Valid'
# #         except IOError:
# #             return 'Invalid'
# #
# #     return {'r': check_file('r.txt'), 'c': check_file('c.txt')}
#
# # @app.route('/get_user_files', methods=['GET'])
# # def get_user_files():
# #     username = session.get('username')
# #     if username:
# #         try:
# #             with open(f'./{username}/r.txt', 'r') as r_file:
# #                 r_data = r_file.read()
# #             with open(f'./{username}/c.txt', 'r') as c_file:
# #                 c_data = c_file.read()
# #         except FileNotFoundError:
# #             return jsonify({'error': 'Files not found'}), 404
# #
# #         return jsonify({'r': r_data, 'c': c_data})
# #     else:
# #         return jsonify({'error': 'No user is currently logged in'}), 403
#
# # @app.route('/save_user_files', methods=['POST'])
# # def save_user_files():
# #     username = session.get('username')
# #     if username:
# #         data = request.get_json()
# #         try:
# #             with open(f'./{username}/r.txt', 'w') as r_file:
# #                 r_file.write(data.get('r', ''))
# #             with open(f'./{username}/c.txt', 'w') as c_file:
# #                 c_file.write(data.get('c', ''))
# #         except FileNotFoundError:
# #             return jsonify({'error': 'Files not found'}), 404
# #         return jsonify({'message': 'Files saved successfully'})
# #     else:
# #         return jsonify({'error': 'No user is currently logged in'}), 403
#
# def send_messages():
#     while True:
#         # Emit a new message for LinkedIn
#         socketio.emit('new_message', {'platform': 'linkedin', 'message': 'This is a new LinkedIn message.'})
#         # Emit a new message for ZipRecruiter
#         socketio.emit('new_message', {'platform': 'ziprecruiter', 'message': 'This is a new ZipRecruiter message.'})
#         socketio.sleep(5)
#         print("hello")
#
#
# socketio.start_background_task(send_messages)
#
#
# @socketio.on('connect')
# def handle_connect():
#     print('Client connected')
#
#
# if __name__ == '__main__':
#     socketio.run(app, debug=True, allow_unsafe_werkzeug=True)














from flask import Flask, session, redirect, url_for, escape, request, render_template
from werkzeug.security import generate_password_hash, check_password_hash
import os, json, shutil
from flask import jsonify  # import jsonify
from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

app.secret_key = os.urandom(24)

chat_logs = {
    'linkedin': [],
    'ziprecruiter': [],
}





@app.route('/', methods=['GET', 'POST'])
def index():
    message = ''
    chat_log = "Chat Log Dummy Text. This is where your chat logs will appear. User interaction logs and other relevant information will be displayed here."

    return render_template('index.html',  current_user=session.get('username'), message=message, chat_log=chat_log)

@app.route('/linkedin', methods=['GET'])
def linkedin():
    return jsonify(chat_log=chat_logs['linkedin'])  # return JSON data


@app.route('/ziprecruiter', methods=['GET'])
def ziprecruiter():
    return jsonify(chat_log=chat_logs['ziprecruiter'])  # return JSON data


@socketio.on('connect')
def handle_connect():
    print('Client connected')

def send_messages():
    while True:
        # Add a new message for LinkedIn
        chat_logs['linkedin'].append('This is a new LinkedIn message.')
        # Add a new message for ZipRecruiter
        chat_logs['ziprecruiter'].append('This is a new ZipRecruiter message.')

        # Emit a new message event for both platforms
        socketio.emit('new_message', {'platform': 'linkedin', 'message': chat_logs['linkedin'][-1]})
        print("linkedin message")
        socketio.emit('new_message', {'platform': 'ziprecruiter', 'message': chat_logs['ziprecruiter'][-1]})
        print("ziprecruiter message")

        socketio.sleep(5)


socketio.start_background_task(send_messages)





if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)