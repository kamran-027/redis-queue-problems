import express from "express";
import { createClient } from "redis";

const app = express();
const client = createClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is UP & running!",
  });
});

app.post("/submit", async (req, res) => {
  const { problemId, solution, language } = req.body;

  try {
    await client.lPush("Problems", JSON.stringify({ problemId, solution, language }));
    res.json({
      message: "Submission recieved & stored!",
    });
  } catch (error) {
    console.error("Redis Error::", error);
    res.status(500).json({
      message: "Error occured while storing response",
    });
  }
});

const startServer = async () => {
  try {
    await client.connect();
    console.log("Redis Client Connected");

    app.listen(3000, () => console.log(`Listening on port 3000`));
  } catch (error) {
    console.error("Error while connecting::", error);
  }
};

startServer();
