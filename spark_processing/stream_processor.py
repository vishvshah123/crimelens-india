from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, current_timestamp
from pyspark.sql.types import StructType, StructField, StringType, BooleanType

# Define Schema for Crime Data
crime_schema = StructType([
    StructField("crime_id", StringType(), True),
    StructField("crime_type", StringType(), True),
    StructField("state", StringType(), True),
    StructField("city", StringType(), True),
    StructField("date", StringType(), True),
    StructField("severity", StringType(), True),
    StructField("latitude", StringType(), True),
    StructField("longitude", StringType(), True),
    StructField("resolved", BooleanType(), True)
])

def start_streaming():
    spark = SparkSession.builder \
        .appName("CrimeLensStreaming") \
        .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/crimelens.crimes") \
        .getOrCreate()

    # Set log level
    spark.sparkContext.setLogLevel("WARN")

    # Read stream from Kafka
    df = spark.readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", "localhost:9092") \
        .option("subscribe", "crime_data") \
        .load()

    # Parse JSON
    parsed_df = df.selectExpr("CAST(value AS STRING)") \
        .select(from_json(col("value"), crime_schema).alias("data")) \
        .select("data.*")

    # Transformation & Cleaning (e.g., dropping null coordinates)
    cleaned_df = parsed_df.filter(col("latitude").isNotNull() & col("longitude").isNotNull())
    
    # Add ingestion timestamp
    enriched_df = cleaned_df.withColumn("ingested_at", current_timestamp())

    # Write to MongoDB (Micro-batch)
    def write_to_mongo(batch_df, batch_id):
        batch_df.write \
            .format("mongo") \
            .mode("append") \
            .save()
        print(f"Batch {batch_id} saved to MongoDB. Count: {batch_df.count()}")

    query_mongo = enriched_df.writeStream \
        .foreachBatch(write_to_mongo) \
        .outputMode("append") \
        .start()

    # Write to HDFS (Parquet format)
    query_hdfs = enriched_df.writeStream \
        .format("parquet") \
        .option("path", "hdfs://localhost:9000/crimelens/raw_data") \
        .option("checkpointLocation", "hdfs://localhost:9000/crimelens/checkpoints") \
        .outputMode("append") \
        .start()

    query_mongo.awaitTermination()
    query_hdfs.awaitTermination()

if __name__ == "__main__":
    start_streaming()
