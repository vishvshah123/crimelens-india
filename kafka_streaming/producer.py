import json
import time
import random
from kafka import KafkaProducer

# Configure Kafka Producer
# Make sure your Kafka server is running on localhost:9092
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

TOPIC_NAME = 'crime_data'

def generate_live_data():
    """Reads sample data and generates streaming data with updated timestamps."""
    try:
        with open('../dataset/sample_crime_data.json', 'r') as file:
            sample_data = json.load(file)
            
        print("Starting crime data stream... Press Ctrl+C to stop.")
        while True:
            # Pick a random record from the sample
            record = random.choice(sample_data)
            
            # Generate a new crime_id and timestamp to simulate real-time
            record['crime_id'] = f"FIR-{random.randint(100000, 999999)}"
            record['date'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
            
            # Send to Kafka
            producer.send(TOPIC_NAME, value=record)
            print(f"Sent: {record['crime_id']} - {record['crime_type']} at {record['city']}")
            
            # Sleep for random interval (1 to 3 seconds)
            time.sleep(random.uniform(1, 3))
            
    except Exception as e:
        print(f"Error reading or sending data: {e}")

if __name__ == "__main__":
    generate_live_data()
