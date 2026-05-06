-- Create Database
CREATE DATABASE IF NOT EXISTS crimelens;
USE crimelens;

-- Create External Table pointing to the Parquet files processed by Spark Batch Job
CREATE EXTERNAL TABLE IF NOT EXISTS processed_crimes (
    crime_id STRING,
    crime_type STRING,
    state STRING,
    city STRING,
    date STRING,
    severity STRING,
    latitude STRING,
    longitude STRING,
    resolved BOOLEAN
)
PARTITIONED BY (year INT, month INT)
STORED AS PARQUET
LOCATION 'hdfs://localhost:9000/user/hive/warehouse/crimelens.db/processed_crimes';

-- Repair table to load partitions
MSCK REPAIR TABLE processed_crimes;

-- ANALYTICS QUERIES

-- 1. Find the most common crime types in a specific state
SELECT crime_type, COUNT(*) as total_occurrences
FROM processed_crimes
WHERE state = 'Maharashtra'
GROUP BY crime_type
ORDER BY total_occurrences DESC
LIMIT 5;

-- 2. Identify the top 3 cities with highest "High" severity crimes
SELECT city, COUNT(*) as high_severity_crimes
FROM processed_crimes
WHERE severity = 'High'
GROUP BY city
ORDER BY high_severity_crimes DESC
LIMIT 3;

-- 3. Monthly crime trend for the year 2023
SELECT month, COUNT(*) as crime_count
FROM processed_crimes
WHERE year = 2023
GROUP BY month
ORDER BY month ASC;
