from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS

PORT = 3000

# Home Assistant configuration
HOME_ASSISTANT_URL = "http://192.168.1.200:8123"
TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhYjQ3Y..."  # Truncated for safety

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Test route
@app.route("/", methods=["GET"])
def home():
    return "Servidor funcionando correctamente."

# Proxy route to Home Assistant
@app.route("/api/services/<domain>/<service>", methods=["POST"])
def call_service(domain, service):
    try:
        url = f"{HOME_ASSISTANT_URL}/api/services/{domain}/{service}"
        data = request.get_json()

        response = requests.post(url, headers=HEADERS, json=data)
        response.raise_for_status()

        return jsonify(response.json()), response.status_code

    except requests.RequestException as e:
        print(f"Error en la solicitud: {e}")
        return jsonify({"message": "Error en la solicitud"}), getattr(e.response, 'status_code', 500)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)