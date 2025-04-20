# Floosy API Documentation

This document outlines the API endpoints available for the Floosy application. These endpoints allow you to integrate with the banking system programmatically.

## Base URL

All API endpoints are relative to the base URL:

\`\`\`
https://your-domain.com/api
\`\`\`

## Authentication

Most API endpoints require authentication. Include a valid JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

You can obtain a JWT token by authenticating through the `/api/auth/login` endpoint.

## API Endpoints

### Authentication

#### Login

\`\`\`
POST /api/auth/login
\`\`\`

Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "your_password"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
\`\`\`

#### Register

\`\`\`
POST /api/auth/register
\`\`\`

Registers a new user.

**Request Body:**
\`\`\`json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "your_password"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
\`\`\`

### User Management

#### Get User Profile

\`\`\`
GET /api/users/profile
\`\`\`

Returns the profile of the authenticated user.

**Response:**
\`\`\`json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "accountNumber": "1234567890",
  "balance": 5000.00,
  "createdAt": "2023-01-01T00:00:00Z"
}
\`\`\`

#### Update User Profile

\`\`\`
PUT /api/users/profile
\`\`\`

Updates the profile of the authenticated user.

**Request Body:**
\`\`\`json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "email": "john.smith@example.com",
    "firstName": "John",
    "lastName": "Smith"
  }
}
\`\`\`

### Transactions

#### Get Transactions

\`\`\`
GET /api/transactions
\`\`\`

Returns a list of transactions for the authenticated user.

**Query Parameters:**
- `limit` (optional): Number of transactions to return (default: 10)
- `offset` (optional): Offset for pagination (default: 0)
- `type` (optional): Filter by transaction type (transfer, deposit, withdrawal)

**Response:**
\`\`\`json
{
  "transactions": [
    {
      "id": "transaction_id",
      "fromAccount": "1234567890",
      "toAccount": "0987654321",
      "amount": 100.00,
      "description": "Payment for services",
      "type": "transfer",
      "timestamp": "2023-01-01T00:00:00Z",
      "status": "completed"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
\`\`\`

#### Create Transaction

\`\`\`
POST /api/transactions
\`\`\`

Creates a new transaction.

**Request Body:**
\`\`\`json
{
  "toAccount": "0987654321",
  "amount": 100.00,
  "description": "Payment for services"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Transaction created successfully",
  "transaction": {
    "id": "transaction_id",
    "fromAccount": "1234567890",
    "toAccount": "0987654321",
    "amount": 100.00,
    "description": "Payment for services",
    "type": "transfer",
    "timestamp": "2023-01-01T00:00:00Z",
    "status": "completed"
  }
}
\`\`\`

### Loans

#### Get Loans

\`\`\`
GET /api/loans
\`\`\`

Returns a list of loans for the authenticated user.

**Response:**
\`\`\`json
{
  "loans": [
    {
      "id": "loan_id",
      "userId": "user_id",
      "amount": 5000.00,
      "term": 12,
      "interestRate": 5.5,
      "status": "pending",
      "requestDate": "2023-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

#### Apply for Loan

\`\`\`
POST /api/loans
\`\`\`

Applies for a new loan.

**Request Body:**
\`\`\`json
{
  "amount": 5000.00,
  "term": 12
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Loan application submitted successfully",
  "loan": {
    "id": "loan_id",
    "userId": "user_id",
    "amount": 5000.00,
    "term": 12,
    "interestRate": 5.5,
    "status": "pending",
    "requestDate": "2023-01-01T00:00:00Z"
  }
}
\`\`\`

### Admin Endpoints

#### Get All Users

\`\`\`
GET /api/admin/users
\`\`\`

Returns a list of all users (admin only).

**Query Parameters:**
- `limit` (optional): Number of users to return (default: 10)
- `offset` (optional): Offset for pagination (default: 0)

**Response:**
\`\`\`json
{
  "users": [
    {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "accountNumber": "1234567890",
      "balance": 5000.00,
      "createdAt": "2023-01-01T00:00:00Z",
      "role": "user"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
\`\`\`

#### Get All Transactions

\`\`\`
GET /api/admin/transactions
\`\`\`

Returns a list of all transactions (admin only).

**Query Parameters:**
- `limit` (optional): Number of transactions to return (default: 10)
- `offset` (optional): Offset for pagination (default: 0)
- `type` (optional): Filter by transaction type (transfer, deposit, withdrawal)

**Response:**
\`\`\`json
{
  "transactions": [
    {
      "id": "transaction_id",
      "fromAccount": "1234567890",
      "toAccount": "0987654321",
      "amount": 100.00,
      "description": "Payment for services",
      "type": "transfer",
      "timestamp": "2023-01-01T00:00:00Z",
      "status": "completed"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
\`\`\`

#### Get All Loans

\`\`\`
GET /api/admin/loans
\`\`\`

Returns a list of all loans (admin only).

**Query Parameters:**
- `limit` (optional): Number of loans to return (default: 10)
- `offset` (optional): Offset for pagination (default: 0)
- `status` (optional): Filter by loan status (pending, approved, rejected, paid)

**Response:**
\`\`\`json
{
  "loans": [
    {
      "id": "loan_id",
      "userId": "user_id",
      "amount": 5000.00,
      "term": 12,
      "interestRate": 5.5,
      "status": "pending",
      "requestDate": "2023-01-01T00:00:00Z"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
\`\`\`

#### Approve Loan

\`\`\`
PUT /api/admin/loans/:id/approve
\`\`\`

Approves a loan (admin only).

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Loan approved successfully",
  "loan": {
    "id": "loan_id",
    "userId": "user_id",
    "amount": 5000.00,
    "term": 12,
    "interestRate": 5.5,
    "status": "approved",
    "requestDate": "2023-01-01T00:00:00Z",
    "approvalDate": "2023-01-02T00:00:00Z",
    "dueDate": "2024-01-02T00:00:00Z"
  }
}
\`\`\`

#### Reject Loan

\`\`\`
PUT /api/admin/loans/:id/reject
\`\`\`

Rejects a loan (admin only).

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Loan rejected successfully",
  "loan": {
    "id": "loan_id",
    "userId": "user_id",
    "amount": 5000.00,
    "term": 12,
    "interestRate": 5.5,
    "status": "rejected",
    "requestDate": "2023-01-01T00:00:00Z"
  }
}
\`\`\`

## Error Handling

All API endpoints return appropriate HTTP status codes:

- `200 OK`: The request was successful
- `201 Created`: The resource was created successfully
- `400 Bad Request`: The request was invalid
- `401 Unauthorized`: Authentication is required
- `403 Forbidden`: The user does not have permission to access the resource
- `404 Not Found`: The resource was not found
- `500 Internal Server Error`: An error occurred on the server

Error responses have the following format:

\`\`\`json
{
  "success": false,
  "message": "Error message here"
}
\`\`\`

## Rate Limiting

API requests are rate limited to 100 requests per minute per IP address. If you exceed this limit, you will receive a `429 Too Many Requests` response.

## Integrating with the Backend

To integrate this API with your backend:

1. **Authentication**: Implement JWT authentication in your backend to secure API endpoints.
2. **Database**: Set up a database to store user accounts, transactions, and loans.
3. **Server**: Create API routes that correspond to the endpoints documented above.
4. **Validation**: Implement request validation to ensure data integrity.
5. **Error Handling**: Implement proper error handling and logging.

### Example Backend Implementation (Node.js/Express)

\`\`\`javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ success: false, message: 'Authentication required' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  
  try {
    // Find user in database
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return token and user info
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
