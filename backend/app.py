from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Example: Sentiment analysis pipeline
nlp = pipeline("sentiment-analysis")


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text", "")
    result = nlp(text)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
