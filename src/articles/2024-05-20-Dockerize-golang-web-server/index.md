---
path: /dockerize-golang-web-server
date: 2024-05-21
title: Dockerize Golang Web Server
author: Oghenero Adaware
description: In this article we will be looking into how to dockerize a simple Golang web server
---

In this article we will be looking into how to dockerize a simple Golang web server. We will create a simple web server that returns a JSON response which we will then dockerize, generate docker image and run the container.

First we will create a simple golang web server that returns a JSON response.

```go
package main

import (
  "encoding/json"
  "net/http"
)

type Response struct {
  Message string `json:"message"`
}

func handler(w http.ResponseWriter, r *http.Request) {
  response := Response{Message: "Hello World"}
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(response)
}

func main() {
  http.HandleFunc("/", handler)
  http.ListenAndServe(":8080", nil)
}


```

The above code is a simple golang web server that listens on port 8080 and returns a JSON response with the message `Hello World`.

Next we will create a Dockerfile that will be used to build a docker image for our web server.

```Dockerfile

// Use golang:1.23 as base image
FROM golang:1.23


// Create and set the working directory
WORKDIR /app

// Copy the go.mod and go.sum files
COPY go.mod go.sum ./

// Download all dependencies
RUN go mod download

// Copy the source code
COPY . .

// Build the application and name the output binary as main
RUN go build -o main .

// Expose port 8080
EXPOSE 8080

// Run the application
CMD ["./main"]

```

The above Dockerfile builds a docker image for our simple web server.

To build the docker image, run the following command in the terminal:

```bash

docker build -t golang-web-server .

```

The above command builds a docker image with the tag `golang-web-server`.

Finally, to run the docker container, run the following command in the terminal:

```bash

docker run -p 8080:8080 golang-web-server

```

This command runs the docker image we built and maps the port 8080 of the host machine(your computer or server) to the port 8080 of the container.

You can now access the web server by visiting `http://localhost:8080` in your browser.

In our next article we will look into how we can store the docker image in a docker registry(GitHub Container Registry).

While it's accurate to say that JavaScript is single-threaded in the sense that it can execute only one piece of code at a time, this doesn't fully capture its capabilities. JavaScript's single-threaded nature means that it executes code sequentially, handling one operation at a time until completion. However, depending on the environment—whether in a browser or in Node.js—JavaScript can leverage browser APIs or Node.js’s libuv library to handle asynchronous operations using separate threads.

In this article, we explored how the JavaScript runtime manages asynchronous operations within a single-threaded environment. Unlike other programming languages that often use multi-threading to handle asynchronous tasks—a method that can be complex and prone to errors—JavaScript opts for a model that makes asynchronous code appear more synchronous and easier to reason about. Key mechanisms such as the event loop, task queue, callback functions, and promises enable JavaScript to manage asynchronous operations efficiently.

Understanding these concepts is crucial for writing better JavaScript code and building more robust applications.