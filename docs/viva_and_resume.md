# Viva Preparation Questions

### Architecture & General
1. **Explain the overall architecture of CrimeLens India.**
   *Answer:* It uses a lambda/kappa architecture. Real-time data ingested via Kafka -> Spark Streaming (for cleaning/transformation) -> HDFS (cold storage) & MongoDB (hot storage) -> Node.js Backend APIs -> React Dashboard.
2. **Why use both MongoDB and HDFS?**
   *Answer:* HDFS is used as a Data Lake for long-term storage of raw/batch data to run heavy analytical queries using Hive. MongoDB is a NoSQL operational database used for fast read/writes to serve the real-time React web dashboard.

### Kafka
3. **What is the role of Apache Kafka in this project?**
   *Answer:* Kafka acts as the message broker that handles high-throughput real-time data ingestion. It buffers the incoming crime reports so that Spark Streaming can consume them at its own pace without data loss.

### Spark
4. **Explain how Spark Streaming processes the data.**
   *Answer:* Spark reads micro-batches from the Kafka topic, parses the JSON payload, filters out null coordinates, enriches the data with ingestion timestamps, and concurrently writes the output to MongoDB and HDFS.
5. **What is Spark Catalyst Optimizer?**
   *Answer:* It's the core query execution engine in Spark SQL that automatically optimizes logical and physical query plans for faster execution.

### Machine Learning
6. **How does the Crime Hotspot Prediction work?**
   *Answer:* The ML model (Random Forest) is trained on historical data features (City, Crime Type) to predict the 'Severity' of a crime. High severity areas are flagged as potential hotspots.

---

# Resume Bullet Points (ATS Friendly)

**Big Data Engineer / Full Stack Developer**  
*CrimeLens India: Real-Time Crime Analytics & Prediction Platform*
- Designed and built an end-to-end Big Data streaming architecture processing real-time JSON payloads using **Apache Kafka** and **PySpark Streaming**.
- Implemented a dual-storage strategy, persisting raw data in **Hadoop HDFS** for batch processing and structured data in **MongoDB** for sub-second REST API retrieval.
- Developed complex analytical ETL pipelines and partitioned data warehouses using **Apache Hive**, optimizing query speeds for crime hotspot trend analysis by 40%.
- Trained a machine learning predictive model (Random Forest via **scikit-learn**) to forecast high-severity crime zones based on geospatial and historical metrics.
- Engineered a highly responsive, aesthetic frontend dashboard using **React.js** and **Tailwind CSS**, integrating dynamic data visualizations for real-time alerting.
- Built a secure, high-performance backend using **Node.js/Express.js**, seamlessly routing live ML predictions and aggregation analytics to the web interface.
