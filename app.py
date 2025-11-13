from flask import Flask, request, jsonify
from flask_cors import CORS
from src.pipeline import ask_question

app = Flask(__name__)
CORS(app)

@app.route("/get", methods=["POST"])
def chat():
    data = request.get_json()
    msg = data.get("msg", "")
    if not msg:
        return jsonify({"diagnosis": "", "medicine": ""})

    # Step 1: Ask diagnosis
    diagnosis_query = f"My symptoms are: {msg}. What could be the possible cause or condition?"
    diagnosis_response = ask_question(diagnosis_query)
    if isinstance(diagnosis_response, dict):
        diagnosis = diagnosis_response.get("answer") or diagnosis_response.get("output") or diagnosis_response.get("text")
    else:
        diagnosis = str(diagnosis_response)

    # Step 2: Ask medicine recommendation
    medicine_query = f"Given that the diagnosis is: {diagnosis}, what possible medications or treatments are recommended?"
    medicine_response = ask_question(medicine_query)
    if isinstance(medicine_response, dict):
        medicine = medicine_response.get("answer") or medicine_response.get("output") or medicine_response.get("text")
    else:
        medicine = str(medicine_response)

    # Return both in JSON
    return jsonify({"diagnosis": diagnosis, "medicine": medicine})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)

