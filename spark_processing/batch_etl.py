from pyspark.sql import SparkSession
from pyspark.sql.functions import col, year, month

def run_batch_etl():
    spark = SparkSession.builder \
        .appName("CrimeLensBatchETL") \
        .getOrCreate()
        
    print("Starting Batch ETL Process...")

    # Load raw data from HDFS
    try:
        raw_df = spark.read.parquet("hdfs://localhost:9000/crimelens/raw_data")
        
        # Transformation: Extract Year and Month for Analytics Partitioning
        processed_df = raw_df.withColumn("year", year(col("date"))) \
                             .withColumn("month", month(col("date")))
                             
        # Clean: Fill missing severity with 'Unknown'
        cleaned_df = processed_df.fillna({"severity": "Unknown"})
        
        # Save processed data to Hive Warehouse directory
        cleaned_df.write.partitionBy("year", "month") \
            .mode("overwrite") \
            .parquet("hdfs://localhost:9000/user/hive/warehouse/crimelens.db/processed_crimes")
            
        print("Batch ETL Completed Successfully. Data written to Hive Warehouse.")
        
    except Exception as e:
        print(f"Error during Batch ETL: {e}")
        
if __name__ == "__main__":
    run_batch_etl()
