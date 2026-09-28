# Zenith Product API — SBA 13

RESTful product inventory API for Zenith e-commerce. Built with Node.js, Express, and Mongoose. This project is a reinforcement of previous lab concepts: modular structure, Mongoose schema validation, standard CRUD, and dynamic query building (filtering, sorting, pagination).

## Stack

Node.js (ESM) · Express · Mongoose · dotenv

## Project Structure

```text
server.js
config/connection.js
models/Product.js
routes/productRoutes.js
controllers/productController.js
```

## Setup

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=<your-mongodb-atlas-uri>
PORT=5000
```

Run:

```bash
npm start
```

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/products` | Create product → 201, 400 on validation error |
| GET | `/api/products` | List + filters, sort, pagination → 200 |
| GET | `/api/products/:id` | Get one → 200, 404 if not found, 400 on invalid id |
| PUT | `/api/products/:id` | Update (`{ new: true, runValidators: true }`) → 200, 404, 400 |
| DELETE | `/api/products/:id` | Delete → 200 + message, 404 if not found |

Query params for `GET /api/products`:

`category`, `minPrice`, `maxPrice`, `sortBy=price_asc|price_desc`, `page=1`, `limit=10`

Example:

```text
/api/products?category=electronics&minPrice=10&maxPrice=200&sortBy=price_asc&page=1&limit=5
```

## Example — Create

`POST /api/products`

```json
{
  "name": "Zenith Headphones",
  "description": "Noise cancelling",
  "price": 99.99,
  "category": "electronics",
  "tags": ["audio", "sale"]
}
```

## Testing

All endpoints tested with Postman: CRUD happy paths, 400 validation cases (missing name, price ≤ 0, invalid id), 404 not-found cases, and filter/sort/pagination combinations.

## Notes

- All routes use try...catch with JSON responses and correct status codes.
- `price` is validated as greater than 0.
- `.env` and `node_modules/` are excluded via `.gitignore`.
