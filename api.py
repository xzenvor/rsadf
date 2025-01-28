from flask import Flask, request, jsonify

app = Flask(__name__)

users_data = {}

@app.route('/update_user_data', methods=['POST'])
def update_user_data():
    data = request.json
    user_id = data.get("user_id")
    cheese = data.get("cheese")
    upgrade = data.get("upgrade")

    if user_id is None or cheese is None or upgrade is None:
        return jsonify({"error": "Missing data"}), 400

    if user_id not in users_data:
        users_data[user_id] = {"cheese": 0, "upgrade": 1}

    users_data[user_id]["cheese"] = cheese
    users_data[user_id]["upgrade"] = upgrade

    return jsonify({"status": "success"}), 200

@app.route('/get_user_data/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    if user_id in users_data:
        return jsonify(users_data[user_id]), 200
    else:
        # Создаем нового пользователя, если его нет
        users_data[user_id] = {"cheese": 0, "upgrade": 1}
        return jsonify(users_data[user_id]), 200

if __name__ == "__main__":
    app.run(debug=True)
