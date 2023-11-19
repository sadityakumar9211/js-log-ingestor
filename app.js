const express = require("express");
const bodyParser = require("body-parser");
const { Client: Client6 } = require("es6");

const app = express();
const port = 3000;

const esClient = new Client6({ node: "http://localhost:9200" });

app.use(bodyParser.json());

app.post("/logs", async (req, res) => {
  const logData = req.body;
  try {
    await esClient.index({
      index: "logs",
      body: logData,
    });
    res.status(200).send("Log ingested successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error ingesting log");
  }
});

app.listen(port, () => {
  console.log(`Log Ingestor listening at http://localhost:${port}`);
});
