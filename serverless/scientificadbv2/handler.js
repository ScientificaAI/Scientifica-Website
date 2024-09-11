const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const express = require("express");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = "scientificadb";
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.get("/items", async function (req, res) {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName: USERS_TABLE })
    );
    res.json(result.Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los items" });
  }
});

app.post("/items", async (req, res) => {
  const { id, name } = req.body;
  if (typeof id !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { id, name },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ id, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
