from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from config import upload_to_gemini , model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
 

ALLOWED_EXTENSIONS = {'pdf'}

# Configuration settings
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get the directory of app.py
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')  # Create uploads path relative to app.py
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the uploads directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400


    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(file.save(file_path))
        print(file_path)
        print(f"File saved to {file_path}")  # Debugging line to check where the file is saved
        sample_pdf=upload_to_gemini(file_path,r' application/pdf' )
        response = model.generate_content([sample_pdf])
        print(response.text)
        sample_pdf.delete()
        os.remove(file_path)
        return response.text  # Return the response from the Gemini API



    else:
        return jsonify({"error": "File type not allowed"}), 400

if __name__ == '__main__':
    app.run(debug=False)  # Run the app in debug mode
