import json
from kafka import KafkaConsumer

# Configure Kafka Consumer
consumer = KafkaConsumer(
    'crime_data',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='crime_analytics_group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

print("Listening for crime data on topic: 'crime_data'...")

try:
    for message in consumer:
        record = message.value
        print(f"Received: {record}")
except KeyboardInterrupt:
    print("\nConsumer stopped.")
