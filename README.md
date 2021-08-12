# ReviewAPI

ETL Process
- First I'm going to figure out if I'm able to use PGAdmin to connect to a repo or if I will need to load the database in the repo through the command line.

- I loaded the data in PGAdmin to see if my original idea for column datatypes would be correct. For example the summary column in the business doc said the summary would have max chars of 60, however when setting a varchar(60) when loading the data in PG Admin it flagged an error as the field was actually longer than 60 chars. I want to minimize space taken up by unnecessary columns sizes so PG Admin was helpful in flagging this.

Schema Design
  - My Schemas are setup to match the CSVs as I will use my querying to get the relevant data sent back to the client.

- Extraction
  - This is the data in the CSV files.

- Validation
  - No unnecessary repeated columns were noticed.
  - Foreign-Keys will have a NOT NULL property to ensure transactional integrity when there are edits to the table.
  - Boolean data types for columns that only accept true/false
  - Int column types for numbers , bigINT for date
  - varchar for text columns

- Loading
  - To load the data I will be using the COPY statement.
  - I currently have it loaded in PGAdmin to test schema data types

ex: COPY reviews(id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness)
   FROM 'filepath'
   DELIMINTER ','
   CSV HEADER;


Still being determined
  - Combine the characteristic_reviews and characteristic CSV
    - The characteristic_reviews is an associate table with characteristic_id and review_id , but we are only giving back
      the total metaData