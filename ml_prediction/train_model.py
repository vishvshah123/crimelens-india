import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Create dummy data if we don't have enough for ML
def generate_dummy_dataset():
    data = []
    cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
    types = ['Theft', 'Assault', 'Cybercrime', 'Vandalism', 'Robbery']
    severities = ['Low', 'Medium', 'High']
    
    import random
    for _ in range(1000):
        data.append({
            'city': random.choice(cities),
            'crime_type': random.choice(types),
            'severity': random.choice(severities)
        })
    return pd.DataFrame(data)

def train_model():
    print("Generating training data...")
    df = generate_dummy_dataset()
    
    print("Preprocessing data...")
    # Encode categorical features
    le_city = LabelEncoder()
    le_type = LabelEncoder()
    
    df['city_encoded'] = le_city.fit_transform(df['city'])
    df['type_encoded'] = le_type.fit_transform(df['crime_type'])
    
    X = df[['city_encoded', 'type_encoded']]
    y = df['severity'] # Predict severity (Proxy for hotspot danger level)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    score = model.score(X_test, y_test)
    print(f"Model trained successfully. Accuracy: {score:.2f}")
    
    # Save the model and encoders
    print("Saving model to model.pkl...")
    with open('model.pkl', 'wb') as f:
        pickle.dump({
            'model': model,
            'le_city': le_city,
            'le_type': le_type
        }, f)
    
    print("Done!")

if __name__ == "__main__":
    train_model()
