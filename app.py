from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

# Load the model and the LabelEncoder
model = tf.keras.models.load_model('employee_performance_model.keras')

# Initialize Flask
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the data to get the output columns
data = pd.read_csv('data.csv', delimiter=';')
output_columns = data.columns[1:]

# Initialize the LabelEncoder and fit it on the job titles
label_encoder = LabelEncoder()
label_encoder.fit(data['Job'])

@app.route('/predict', methods=['POST'])
def predict():
    job_title = request.json['job']
    print(f"Job Title: {job_title}")  # Debug message
    job_encoded = label_encoder.transform([job_title])
    print(f"Encoded Job Title: {job_encoded}")  # Debug message
    
    prediction = model.predict(np.array([job_encoded]))
    print(f"Raw Prediction: {prediction}")  # Debug message

    predicted_performance = prediction[0]
    # Convert float32 values to float
    prediction_dict = {col: float(predicted_performance[i]) for i, col in enumerate(output_columns)}
    print(f"Prediction Dict: {prediction_dict}")  # Debug message

    return jsonify(prediction_dict)

if __name__ == '__main__':
    app.run(debug=True)
