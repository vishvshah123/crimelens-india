# CrimeLens India - Real-Time Crime Analytics & Prediction System

A complete Big Data analytics mini-project that processes streaming crime data, predicts hotspots using Machine Learning, and visualizes trends in real-time.

## Features
- Real-time stream processing with Kafka and PySpark
- Batch and Cold storage with Hadoop HDFS and Hive
- Fast structured storage with MongoDB for API retrieval
- Hotspot prediction using scikit-learn / Spark ML
- Aesthetic React frontend dashboard (Vite + Tailwind CSS)

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Recharts
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Big Data:** Apache Kafka, Apache Spark (PySpark), Hadoop HDFS, Apache Hive
- **Machine Learning:** Python, scikit-learn

## Setup Instructions

### 1. Big Data Infrastructure (Kafka, Hadoop, Spark)
Ensure you have Zookeeper, Kafka, Hadoop, and Spark installed.
Start the services:
```bash
# Start Zookeeper and Kafka
zookeeper-server-start.sh config/zookeeper.properties
kafka-server-start.sh config/server.properties

# Start Hadoop DFS
start-dfs.sh
start-yarn.sh
```

### 2. Backend (Node.js)
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend (React.js)
```bash
cd frontend
npm install
npm run dev
```

### 4. Running the Pipelines
Run the Producer to stream data:
```bash
python kafka_streaming/producer.py
```

Run PySpark Job to consume and process data:
```bash
spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0 spark_processing/stream_processor.py
```
