# Server

This directory contains source code for the server-side of Kazan app. It's Node.js app that uses Express framework (though wrapped as a Google Cloud Function).

## Infrastructure

This is a flowchart that somewhat describes the general idea of Kazan infrastructure:

```mermaid
flowchart LR
  kazan-lb(HTTP Load Balancer\nserver.kazan.vadimgush.com)
  kazan-function(Backend Cloud Functions)
  kazan-client(Kazan Web-app\nkazan.vadimgush.com)
  kazan-db(Serverless Database)
  browser{{User Browser}}
  
  browser -->|Web-page Request| kazan-client
  browser -->|Backend Requests| kazan-lb
  kazan-function --> kazan-db
  
  subgraph Google Cloud
  direction LR
  kazan-lb --> kazan-function
  
    subgraph MongoDB Atlas
    kazan-db
    end
  end
  
  subgraph Github Pages
  kazan-client
  end
```
