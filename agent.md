# Agent - SBA13 Zenith Product API

## Goal
Build a modular RESTful Product API with Node.js + Express + Mongoose that scores 100/100 on the rubric. No secrets in repo.

## Stack / Constraints
- ESM (`"type": "module"`, use `import` / `export`)
- Dependencies: express, mongoose, dotenv
- Entry point: `server.js`
- Required structure:
  - `server.js`
  - `config/connection.js`
  - `models/Product.js`
  - `routes/productRoutes.js`
- `.env`: `MONGO_URI`, `PORT` — never commit
- `.gitignore` must list `node_modules/` and `.env`
- All endpoints use `try...catch` + JSON responses + correct status codes

## Checklist (Rubric 100 pts)

### 1. Foundation (20 pts) [pending]
- [ ] `config/connection.js`: `mongoose.connect(MONGO_URI)`, log success + error
- [ ] `server.js`: `dotenv.config()`, `express.json()`, run DB connect, mount `app.use('/api/products', productRoutes)`, `app.listen(PORT)`
- [ ] Verify `.env` has `MONGO_URI` + `PORT`, `.gitignore` is correct

### 2. Schema & Model (15 pts) [pending]
- [ ] `models/Product.js` exact schema:
  - `name: { type: String, required: true }`
  - `description: { type: String, required: true }`
  - `price: { type: Number, required: true, min > 0 }`
  - `category: { type: String, required: true }`
  - `inStock: { type: Boolean, default: true }`
  - `tags: [String]`
  - `createdAt: { type: Date, default: Date.now }`
- [ ] `export default mongoose.model('Product', productSchema)`

### 3. Standard CRUD (40 pts) [pending]
- [ ] `POST /api/products` -> 201 + created doc, 400 on validation failure
- [ ] `GET /api/products/:id` -> 200, 404 if not found, 400 on invalid id
- [ ] `PUT /api/products/:id` -> `{ new: true, runValidators: true }`, 404 if not found
- [ ] `DELETE /api/products/:id` -> success message, 404 if not found
- [ ] Router via `express.Router()`, logic inside `routes/productRoutes.js`

### 4. Advanced Query GET /api/products (25 pts) [pending]
- [ ] `category` -> exact filter
- [ ] `minPrice` / `maxPrice` -> `{ price: { $gte, $lte } }`
- [ ] `sortBy`: `price_asc` / `price_desc`
- [ ] `page` (default 1) & `limit` (default 10) -> `skip` / `limit`
- [ ] Query built dynamically, all params combinable
- [ ] Respond with array of products

### 5. Verify & Submit [pending]
- [ ] `node server.js` starts clean, connection log visible
- [ ] Manual test: POST, GET all, GET :id, PUT, DELETE, filters + sort + pagination combos
- [ ] `git status` clean of `.env` / `node_modules/`

## Endpoint Contract (do not change without reason)
- POST `/api/products`
- GET `/api/products?category=&minPrice=&maxPrice=&sortBy=price_asc|price_desc&page=1&limit=10`
- GET `/api/products/:id`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

## Agent Rules
- Update this file: `[pending]` -> `[in_progress]` -> `[done]` per section
- One task `in_progress` at a time
- If something fails, stop: record blocker here
- No hardcoded secrets, no files outside required structure
