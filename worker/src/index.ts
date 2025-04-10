import { createClient } from "redis";

const client = createClient();

const handleResponse = async (response: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("The Provied solution is TLE");
};

const startWorker = async () => {
  try {
    await client.connect();
    console.log("Worker Connected to Client");

    while (true) {
      const response = await client.BRPOP("Problems", 0);
      console.log("Response is::", response);
      handleResponse(response);
    }
  } catch (error) {
    console.error("Errro while connecting to client", error);
  }
};

startWorker();
