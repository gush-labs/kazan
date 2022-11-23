import express from "express";
import { WaniKani } from "./WaniKani";

const app = express();

app.get("/", (request, response) => {
  response.send("ONLINE");
});

app.get("/login", (request, response) => {
  const apiKey: string = request.body.key;
  WaniKani.auth(apiKey)
    .then((user) => {
      response.send("DONE!");
    })
    .catch((error) => {
      response.status(401).send("{}");
    });
});

app.listen(8080);
