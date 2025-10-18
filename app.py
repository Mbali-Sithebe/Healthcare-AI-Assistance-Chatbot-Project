from flask import Flask, render_template, request
from src.pipeline import ask_question

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/get", methods=["POST"])
def chat():
    msg = request.form["msg"]
    answer = ask_question(msg)
    return answer

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
