#!/bin/bash

echo "Setting up HDFS directories for CrimeLens India..."

# Create raw data directory for Spark Streaming Sink
hdfs dfs -mkdir -p /crimelens/raw_data
hdfs dfs -mkdir -p /crimelens/checkpoints

# Create Hive Warehouse directory for Batch Processing
hdfs dfs -mkdir -p /user/hive/warehouse/crimelens.db/processed_crimes

# Set permissions
hdfs dfs -chmod -R 777 /crimelens
hdfs dfs -chmod -R 777 /user/hive/warehouse/crimelens.db

echo "HDFS setup complete. Directories created."
