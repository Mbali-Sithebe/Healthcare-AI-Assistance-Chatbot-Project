from flask import Flask, request, jsonify
from flask_cors import CORS
from src.pipeline import ask_question

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

@app.route("/api/search", methods=["POST"])
def chat_api():
    data = request.get_json()
    msg = data.get("msg", "")
    if not msg:
        return jsonify({"diagnosis": "No input provided.", "recommendations": ""})

    # Step 1: Get diagnosis from RAG
    diagnosis_query = f"My symptoms are: {msg}. What could be the possible cause or condition?"
    diagnosis_response = ask_question(diagnosis_query)

    # Step 2: Get treatment recommendations
    medicine_query = f"Given that the diagnosis is: {diagnosis_response}, what possible medications or treatments are recommended?"
    medicine_response = ask_question(medicine_query)

    return jsonify({
        "diagnosis": diagnosis_response,
        "recommendations": medicine_response
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)


