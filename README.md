# 📚 Serverless Book Management System

A serverless full-stack **Book Management System built with AWS**. The project demonstrates how AWS managed services can be combined to build a secure, scalable, and low-maintenance web application without managing traditional servers.

The application allows authenticated users to add, view, update, and delete their own books through a React frontend connected to an AWS serverless backend.

---

## 🏗️ AWS Architecture

```text
                         ┌─────────────────────┐
                         │   React + Tailwind  │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Amazon Cognito     │
                         │ Authentication      │
                         │ & User Management   │
                         └──────────┬──────────┘
                                    │
                              JWT Token
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  API Gateway        │
                         │    HTTP API         │
                         │                     │
                         │ JWT Authorization   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ AWS Lambda          │
                         │ BookApiHandler      │
                         │                     │
                         │ CRUD Business Logic │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Amazon DynamoDB     │
                         │                     │
                         │ Books Table         │
                         └─────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Amazon CloudWatch   │
                         │ Logs & Monitoring   │
                         └─────────────────────┘
```

---

# ☁️ AWS Services Used

| AWS Service            | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Amazon Cognito**     | User registration, login, authentication and JWT tokens |
| **Amazon API Gateway** | Provides HTTP API endpoints for the application         |
| **AWS Lambda**         | Runs backend CRUD business logic without servers        |
| **Amazon DynamoDB**    | Stores book information using a NoSQL database          |
| **Amazon CloudWatch**  | Stores Lambda logs and provides basic monitoring        |
| **AWS IAM**            | Controls permissions between Lambda and DynamoDB        |

---

# 🔐 Amazon Cognito

Amazon Cognito is used to handle user authentication.

Users can:

* Create an account
* Verify their email
* Sign in
* Sign out
* Reset their password

The application uses a **Cognito User Pool**.

### Authentication Flow

```text
User
  │
  ▼
Cognito Managed Login
  │
  ▼
User Authentication
  │
  ▼
JWT Tokens
  │
  ▼
React Application
```

The frontend stores the authentication tokens and sends the ID token with API requests.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🔑 JWT Authorization

Authentication and authorization are handled separately.

After a user signs in with Cognito, the JWT token is sent to API Gateway.

API Gateway validates the token using a **JWT authorizer**.

```text
React
  │
  │ Authorization: Bearer JWT
  ▼
API Gateway
  │
  │ Validate JWT
  ▼
Lambda
```

Unauthenticated requests are rejected before reaching Lambda.

Example:

```json
{
  "message": "Unauthorized"
}
```

This prevents unauthenticated users from accessing the book APIs.

---

# 👤 User-Specific Book Access

The application uses the Cognito user's `sub` claim as the `ownerId`.

Example DynamoDB item:

```json
{
  "id": "a670a141-874a-4765-98ec-8482ab0755b6",
  "ownerId": "41336d4a-b021-70d2-5dd9-037070714eca",
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "category": "Programming",
  "year": 2026,
  "status": "reading",
  "description": "A programming book",
  "createdAt": "2026-09-28T16:53:32.471Z",
  "updatedAt": "2026-09-28T16:53:32.471Z"
}
```

The `ownerId` is obtained from the authenticated user's JWT.

The client cannot choose another user's `ownerId`.

This provides application-level **user data isolation**.

---

# 🌐 Amazon API Gateway

The project uses **Amazon API Gateway HTTP API**.

API Gateway acts as the entry point to the serverless backend.

### API Endpoints

| Method   | Endpoint      | Purpose                            |
| -------- | ------------- | ---------------------------------- |
| `POST`   | `/books`      | Create a book                      |
| `GET`    | `/books`      | Get the authenticated user's books |
| `GET`    | `/books/{id}` | Get a specific book                |
| `PUT`    | `/books/{id}` | Update a book                      |
| `DELETE` | `/books/{id}` | Delete a book                      |

### Request Flow

```text
Client
   │
   ▼
API Gateway
   │
   ├── JWT validation
   │
   ▼
Lambda
   │
   ▼
DynamoDB
```

API Gateway is responsible for receiving HTTP requests and routing them to the Lambda function.

---

# ⚡ AWS Lambda

The backend is implemented using **AWS Lambda**.

Lambda function:

```text
BookApiHandler
```

Runtime:

```text
Node.js 22.x
```

The Lambda function handles the application's CRUD operations.

### Lambda Responsibilities

* Read the authenticated user's identity
* Validate the request
* Create books
* Retrieve books
* Retrieve individual books
* Update books
* Delete books
* Verify book ownership
* Communicate with DynamoDB
* Return HTTP responses

---

# 🗄️ Amazon DynamoDB

Amazon DynamoDB is used as the application's serverless NoSQL database.

### Table

```text
Books
```

### Primary Key

```text
id
```

Type:

```text
String
```

### Book Data Model

```text
Books
│
├── id
├── ownerId
├── title
├── author
├── category
├── year
├── status
├── description
├── createdAt
└── updatedAt
```

Example:

```json
{
  "id": "abc123",
  "ownerId": "user-sub",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "year": 2008,
  "status": "reading",
  "description": "A software development book",
  "createdAt": "2026-09-28T10:00:00.000Z",
  "updatedAt": "2026-09-28T10:00:00.000Z"
}
```

---

# 🔄 DynamoDB Operations

The Lambda function uses the following DynamoDB operations:

| API Operation        | DynamoDB Operation |
| -------------------- | ------------------ |
| `GET /books/{id}`    | `GetItem`          |
| `GET /books`         | `Scan`             |
| `POST /books`        | `PutItem`          |
| `PUT /books/{id}`    | `UpdateItem`       |
| `DELETE /books/{id}` | `DeleteItem`       |

For this learning project, `Scan` with an owner filter is used to retrieve the authenticated user's books.

For a much larger production system, the data model could be redesigned to query books by `ownerId` instead of scanning the table.

---

# 🔐 AWS IAM

AWS IAM is used to follow the **least-privilege principle**.

The Lambda execution role is given permissions required to:

```text
DynamoDB
│
├── GetItem
├── PutItem
├── UpdateItem
├── DeleteItem
└── Scan
```

The permissions are restricted to the `Books` table rather than allowing unrestricted DynamoDB access.

Lambda also has the basic permissions required to write logs to CloudWatch.

---

# 📊 Amazon CloudWatch

AWS Lambda automatically integrates with Amazon CloudWatch Logs.

CloudWatch is used to:

* View Lambda execution logs
* Debug backend errors
* Monitor Lambda invocations
* Inspect execution information
* Troubleshoot API requests

Basic monitoring flow:

```text
API Gateway
     │
     ▼
Lambda
     │
     ▼
CloudWatch Logs
```

CloudWatch makes it possible to investigate backend problems without accessing a traditional server.

---

# 💻 Frontend

The frontend is built using:

* React
* Vite
* Tailwind CSS
* Axios
* React Router

The frontend communicates with API Gateway rather than directly accessing DynamoDB.

```text
React
  │
  │ HTTPS
  ▼
API Gateway
  │
  ▼
Lambda
  │
  ▼
DynamoDB
```

This keeps AWS database access inside the backend layer.

---

# 📖 Application Features

### Authentication

* User registration
* Email verification
* Login
* Logout
* Password reset
* Protected application routes

### Book Management

* Add a book
* View books
* View individual book details
* Edit books
* Delete books
* Book descriptions
* Book categories
* Reading status
* Book year
* Created/updated timestamps

### User Isolation

Each book is associated with the authenticated Cognito user.

Users can only access books belonging to their own account.

---

# 🔄 Complete Request Flow

For example, when a user creates a book:

```text
1. User enters book information
          │
          ▼
2. React frontend
          │
          ▼
3. Cognito JWT attached to request
          │
          ▼
4. API Gateway
          │
          ▼
5. JWT authorizer validates token
          │
          ▼
6. Lambda receives request
          │
          ▼
7. Lambda extracts Cognito user ID
          │
          ▼
8. Lambda creates ownerId
          │
          ▼
9. DynamoDB PutItem
          │
          ▼
10. Lambda returns response
          │
          ▼
11. React updates the UI
```

---

# 🛡️ Security Architecture

The application follows several basic security practices:

### Authentication

Amazon Cognito manages user authentication.

### Authorization

API Gateway validates JWT tokens before allowing requests to reach Lambda.

### User Isolation

Lambda verifies the `ownerId` before allowing access to individual books.

### Least Privilege

IAM permissions are limited to the required DynamoDB operations.

### No Direct Database Access

The React frontend does not communicate directly with DynamoDB.

```text
❌ React → DynamoDB

✅ React
     ↓
 API Gateway
     ↓
 Lambda
     ↓
 DynamoDB
```

---

# 💰 AWS Cost Considerations

This project was designed as a small learning project with low AWS usage.

The architecture uses managed/serverless services so that there is no EC2 server running continuously.

To keep costs controlled:

* DynamoDB uses low provisioned capacity
* No NAT Gateway
* No EC2 instances
* No RDS database
* No DAX
* No Global Tables
* No unnecessary paid integrations
* No SMS-based Cognito MFA
* No provisioned Lambda concurrency
* No unnecessary development resources

> AWS pricing and free-tier/Free Plan terms can change. Always check the current AWS pricing for your account and region before enabling additional services.

---

# 🛠️ Technology Stack

## AWS

```text
Amazon Cognito
Amazon API Gateway HTTP API
AWS Lambda
Amazon DynamoDB
Amazon CloudWatch
AWS IAM
```

## Frontend

```text
React
Vite
Tailwind CSS
Axios
React Router
```

## Backend

```text
Node.js
AWS SDK for JavaScript
```

---

# 📁 Project Structure

```text
book-management/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🚀 Future Improvements

Possible future improvements include:

* Infrastructure as Code with AWS SAM or CloudFormation
* CI/CD deployment pipeline
* Better DynamoDB data modeling using `Query` instead of `Scan`
* Pagination
* Search and filtering
* Book cover images using Amazon S3
* Analytics dashboard
* CloudWatch alarms
* Custom domain
* Production deployment
* More advanced monitoring

These features are intentionally outside the current core scope.

---

# 🎯 Learning Objectives

This project was built to gain practical experience with:

* Serverless architecture
* AWS Lambda
* API Gateway
* DynamoDB
* Amazon Cognito
* JWT authentication
* Authorization
* IAM least privilege
* CloudWatch
* RESTful/HTTP API design
* React-to-AWS integration
* NoSQL data modeling
* User-specific data isolation
* Building applications without managing servers

---

# 🏁 Project Status

**Status: Completed ✅**

The core application supports:

```text
✅ User Authentication
✅ JWT Authorization
✅ User-specific Book Data
✅ Create Books
✅ Read Books
✅ Update Books
✅ Delete Books
✅ React Frontend
✅ AWS Serverless Backend
✅ CloudWatch Logging
```

---

# 👩‍💻 Author

**Nusna Rabik**

BSc (Hons) Software Engineering
Sabaragamuwa University of Sri Lanka

**Focus:** AWS | Serverless | Full-Stack Development | Generative AI
