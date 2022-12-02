# Server

This directory contains source code for the server-side of Kazan app. It's Node.js app that uses Express framework (though wrapped as a Google Cloud Function).

## Infrastructure

This is a flowchart that somewhat describes the general idea of Kazan infrastructure:

```mermaid
flowchart LR
  kazan-lb(HTTP Load Balancer\nserver.kazan.vadimgush.com)
  kazan-function(Backend Cloud Functions)
  kazan-client(Kazan Web-app\nkazan.vadimgush.com)
  browser{{User Browser}}
  
  browser -->|Web-page Request| kazan-client
  browser -->|Backend Requests| kazan-lb
  
  subgraph Google Cloud
  direction LR
  kazan-lb -->|HTTP req. events| kazan-function
  end
  
  subgraph Github Pages
  kazan-client
  end
```
