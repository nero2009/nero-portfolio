---
path: /sharing-database-connections-in-golang
date: 2024-05-15
title: Sharing Database connections in golang 
author: Oghenero Adaware
description: Sometimes we need to share database connections across our application, in this article we will be looking at how to share database connections in golang.
---

A common scenario when building web servers where you need to share connection to your database across your application. 

Databases are usually initialized in the entry point of the application `main.go` and how can we go about sharing the database pointer to repositories, services and packages that need the connection pointer?

We can define a package that can be shared with an part of the application that needs a connection pointer.

```go
// database.go
package database

import "database/sql"

var Conn *sql.DB

```


On start of the web server we can initialise the Conn pointer  to the database connection.

```go
//main.go
package main

import (

	"database/sql"
	"github.com/abc/pricecompare/internal/database"
)

func main() {
	
	var err error
	database.Conn, err = sql.Open("mysql", "test:test@(localhost:3306)/abcd")
       if err != nil {
		log.Error(err)
	}
	var r *chi.Mux = chi.NewRouter()
	
	handlers.Handler(r)

	
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Error(err)
	}
}

```

Now we can reuse the database connection in repositories, models or services by just importing the database package. Instead of having to manually past it around as arguments to functions that depend on it.

```go
//products.go
package models

import (
	"github.com/abc/pricecompare/internal/database"
)

func GetProducts() ([]Product, error) {
	db := database.Conn
	rows, err := db.Query("SELECT * FROM listings")
	--------
	return products, nil
}


```
