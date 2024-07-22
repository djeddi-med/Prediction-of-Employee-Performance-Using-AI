import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Load data
data = pd.read_csv('data.csv', delimiter=';')

# Display the first few rows of the data for debugging
print("Original data:")
print(data.head())

# Preprocess the data
# Encode the 'Job' column
label_encoder = LabelEncoder()
data['Job'] = label_encoder.fit_transform(data['Job'])

# Convert all other columns to float
for column in data.columns[1:]:
    data[column] = pd.to_numeric(data[column].str.replace(',', '.'), errors='coerce')

# Check for NaN values after conversion
if data.isnull().values.any():
    print("Invalid data found after conversion to float.")
    print(data.isnull().sum())
    data = data.dropna()  # Remove rows with NaN values

# Display the data after cleaning for debugging
print("Data after cleaning:")
print(data.head())

# Check the size of the data after cleaning
print(f"Data size: {data.shape}")

# Separate features and labels
X = data[['Job']].values  # Ensure X is an array of numerical values
y = data.drop(columns=['Job']).values  # Ensure y is an array of numerical values

# Check the sizes of X and y
print(f"Size of X: {X.shape}")
print(f"Size of y: {y.shape}")

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Check the sizes of the training and test sets
print(f"Size of X_train: {X_train.shape}")
print(f"Size of X_test: {X_test.shape}")
print(f"Size of y_train: {y_train.shape}")
print(f"Size of y_test: {y_test.shape}")

# Define the neural network model
model = Sequential()
model.add(Dense(128, input_dim=1, activation='relu'))
model.add(Dense(256, activation='relu'))
model.add(Dense(128, activation='relu'))
model.add(Dense(64, activation='relu'))
model.add(Dense(y_train.shape[1], activation='linear'))

# Compile the model
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train the model
model.fit(X_train, y_train, epochs=200, batch_size=10, validation_split=0.2)

# Evaluate the model
loss, mae = model.evaluate(X_test, y_test)
print(f"Mean Absolute Error: {mae}")

# Save the model using the native Keras format
model.save('employee_performance_model.keras')

# Load the model and make a prediction
def predict_performance(job_title):
    model = tf.keras.models.load_model('employee_performance_model.keras')
    job_encoded = label_encoder.transform([job_title])
    prediction = model.predict(np.array([job_encoded]))
    return prediction[0]

# Example of a prediction
job_title = 'IT Manager'
predicted_performance = predict_performance(job_title)

# Display the prediction
output_columns = data.columns[1:]  # Get the names of the output columns
prediction_dict = {col: predicted_performance[i] for i, col in enumerate(output_columns)}

print(f"IN = {job_title}")
print("OUT = " + "; ".join([f"{key}={value:.2f}" for key, value in prediction_dict.items()]))
