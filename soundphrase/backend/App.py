from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

model = whisper.load_model("base")
UPLOAD_FOLDER = "temp"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    audio = request.files["file"]
    path = os.path.join(UPLOAD_FOLDER, audio.filename)
    audio.save(path)
    result = model.transcribe(path)
    os.remove(path)
    return jsonify({"text": result["text"]})

@app.route("/api/test", methods=["GET"])
def test():
    return "API is running. Use POST with an audio file to transcribe."



if __name__ == "__main__":
    app.run(debug=True)