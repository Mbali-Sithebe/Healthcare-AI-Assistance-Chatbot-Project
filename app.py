from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS
from src.pipeline import ask_question

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend (port 5500) to connect to backend (port 8080)

# Route for home page (can stay even if frontend runs separately)
@app.route("/")
def index():
    return "<p>Hello, World!</p>"

# Route for receiving chat messages from frontend
@app.route("/get", methods=["POST"])
def chat(jsdata):
    msg = request.form["msg"]
    print(f"Received from frontend: {msg}")  # Debugging line to confirm connection

    answer = ask_question(msg)
    print(f"Response sent back: {answer}")  # Debugging line to confirm response

    return answer

# Route for receiving chat messages from frontend
@app.route("/api/search", methods=["GET", "POST"])
def chatt():
    print(request.json)
    # if request.method == 'POST':
        
        # text = request.get_json().get("Message")
        # back = {"answer": text+"hi"}
    # msg = request.form["msg"]
    # print(f"Received from frontend: {msg}")  # Debugging line to confirm connection

    # answer = ask_question(msg)
    # print(f"Response sent back: {answer}")  # Debugging line to confirm response

    return 'jsonify(backk)'

# Run the Flask server
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)

