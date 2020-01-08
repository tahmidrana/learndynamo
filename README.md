
# learndynamo
  

## Steps to follow to run assignment-5 

1. Run local dynamodb
   * Make sure you have java installed on your computer
   * Go to `dynamodb` directory
   * Run the following command from command prompt
     * `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar`
     * On windows: `java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar`
2. Run the project
   * Go to `assignment-5` directory
   * Run following commands from command prompt
     * `npm install`
     * `npm start`
    * From a browser go to `localhost:3000/db/create-table` to create database table
    * To browse the application go to `localhost:3000`
