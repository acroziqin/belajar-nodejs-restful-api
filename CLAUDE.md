# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

```bash
# Run the application (ES modules with Babel transpilation)
node src/main.js

# Run tests
npm test
```

## Architecture

This is a NodeJS RESTful API learning project implementing a contact management system with user authentication.

### Layer Architecture

- **`src/application/`**: Core configurations and singletons
  - `database.js`: Prisma client with MariaDB adapter (MySQL-compatible)
  - `web.js`: Express app setup, JSON body parser, route mounting
  - `logging.js`: Winston logger (JSON format)
  - `prisma/`: Database schema and migrations

- **`src/route/`**: Route definitions
  - `public-api.js`: Unauthenticated routes (user registration, login)
  - `api.js`: Protected routes (users, contacts, addresses) - uses `authMiddleware`

- **`src/middleware/`**
  - `error-middleware.js`: Global error handler (catches `ResponseError` instances)
  - `auth-middleware.js`: Token-based authentication via Authorization header, sets `req.user`

- **`src/controller/`**: HTTP request/response handlers (delegate to services)

- **`src/service/`**: Business logic and Prisma queries

- **`src/validation/`**: Joi schemas with a `validate()` helper that throws `ResponseError` on validation failure

- **`src/error/`**: `ResponseError` class extends `Error` with HTTP status code

### Request Flow

1. Request → `web.js` (Express app)
2. Route handler → Controller
3. Controller → Service (with Joi validation)
4. Response or Error → `error-middleware.js` → formatted JSON response

### Database Models

- **User**: username (PK), password, name, token
- **Contact**: id (PK), first_name, last_name, email, phone, username (FK)
- **Address**: id (PK), street, city, province, country, postal_code, contact_id (FK)

### Authentication Pattern

Token-based auth using `Authorization` header. Token stored in `users.token`. Auth middleware validates token and attaches user to `req.user`.

### Validation Pattern

All controllers validate input using `validate(schema, request)` helper from `validation/validation.js`. Throws `ResponseError(400, message)` on failure.

### Error Handling

Throw `ResponseError(status, message)` in services/controllers. Global error middleware catches and formats as `{ errors: message }`.

### Password Hashing

Uses bcrypt with 10 salt rounds before storage in service layer.

### Transpilation

ES modules supported via `"type": "module"` in package.json. Babel config uses `@babel/preset-env`. Jest configured with `babel-jest` transformer.
