# 📚 Serverless Book Management System

A full-stack **Book Management System** built with React and AWS serverless services.

## 🚀 Technologies

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Amazon API Gateway
* AWS Lambda
* Amazon DynamoDB

### Architecture

```text
React
  ↓
API Gateway
  ↓
AWS Lambda
  ↓
DynamoDB
```

## 📌 Features

* Add new books
* View all books
* View book details
* Update book information
* Delete books
* Serverless REST API
* DynamoDB-based data storage

## 🔧 API Operations

| Method | Endpoint      | Function            |
| ------ | ------------- | ------------------- |
| GET    | `/books`      | Get all books       |
| GET    | `/books/{id}` | Get a specific book |
| POST   | `/books`      | Add a new book      |
| PUT    | `/books/{id}` | Update a book       |
| DELETE | `/books/{id}` | Delete a book       |

## ☁️ AWS Services

* **API Gateway** – Handles API requests
* **AWS Lambda** – Runs backend logic
* **DynamoDB** – Stores book data
* **IAM** – Controls permissions
* **CloudWatch** – Monitors Lambda and application logs

## 🛠️ Project Status

🚧 Currently under development.

More features and AWS services will be added as the project evolves.
