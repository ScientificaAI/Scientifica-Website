const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const USERS_TABLE = "scientificadb";

const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.options("*", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.status(204).send();
});

app.get("/items", async function (req, res) {
  try {
    const result = await dynamoDbClient.send(
      new ScanCommand({ TableName: USERS_TABLE })
    );
    res.json(result.Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los items" });
  }
});

app.put("/items", async function (req, res) {
  const requestJSON = req.body;

  const params = {
    TableName: USERS_TABLE,
    Item: {
      id: requestJSON.id,
      first_name: requestJSON.first_name,
      last_name: requestJSON.last_name,
      email: requestJSON.email,
      country: requestJSON.country,
      studies: requestJSON.studies,
      social: requestJSON.social,
      experiences: requestJSON.experiences,
      lookingfor: requestJSON.lookingfor,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.json({ message: `Item ${params.Item.id} creado o actualizado` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear o actualizar el item" });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "No encontrado",
  });
});

module.exports.handler = serverless(app);
