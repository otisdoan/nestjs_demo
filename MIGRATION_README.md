# Express.js to NestJS Migration

This project has been successfully migrated from Express.js to NestJS with TypeORM and PostgreSQL.

## ✅ Migration Completed

### Architecture Changes

- **Framework**: Express.js → NestJS
- **ORM**: Sequelize → TypeORM
- **Database**: PostgreSQL (maintained)
- **Authentication**: Custom JWT → NestJS JWT + Passport
- **Validation**: Yup → class-validator
- **File Upload**: Multer + Cloudinary → NestJS Multer + Cloudinary

### Migrated APIs

All original Express.js APIs have been converted to NestJS:

#### Authentication (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login with phone/password
- `POST /google` - Google OAuth login
- `POST /refresh-token` - JWT token refresh
- `POST /logout` - User logout

#### Users (`/api/users`)

- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `GET /:id/detail` - Get detailed user info
- `POST /` - Create user
- `PATCH /:id` - Update user
- `DELETE /:id` - Delete user

#### Products (`/api/products`)

- `GET /` - Get all products
- `GET /name` - Get product names only
- `GET /:id/detail` - Get product detail by ID
- `GET /:slug` - Get product by slug
- `POST /` - Create product
- `PATCH /:id` - Update product
- `DELETE /:id` - Delete product

#### Categories (`/api/category`)

- `GET /` - Get all categories
- `GET /:id` - Get category by ID
- `POST /` - Create category
- `PATCH /:id` - Update category
- `DELETE /:id` - Delete category

#### Brands (`/api/brand`)

- `GET /` - Get all brands
- `GET /:id` - Get brand by ID
- `POST /` - Create brand
- `PATCH /:id` - Update brand
- `DELETE /:id` - Delete brand

#### Orders (`/api/orders`)

- `GET /` - Get all orders
- `GET /:id` - Get order by ID
- `POST /` - Create order
- `PATCH /:id` - Update order
- `DELETE /:id` - Delete order

#### Cart Items (`/api/cart-items`)

- `GET /` - Get all cart items
- `GET /:id` - Get cart item by ID
- `POST /` - Create cart item
- `PATCH /:id` - Update cart item
- `DELETE /:id` - Delete cart item

#### File Upload (`/api/upload`)

- `POST /` - Upload file to Cloudinary

### Database Entities

All Sequelize models have been converted to TypeORM entities:

- `User` - User accounts
- `Product` - Product catalog
- `Category` - Product categories (hierarchical)
- `Brand` - Product brands
- `Order` - Customer orders
- `OrderItem` - Order line items
- `CartItem` - Shopping cart items
- `ProductImage` - Product images
- `ProductVariant` - Product variants (storage, color, etc.)
- `ProductAttribute` - Product attributes
- `ProductReview` - Product reviews
- `UserAddress` - User delivery addresses
- `Coupon` - Discount coupons
- `Warehouse` - Inventory warehouses
- `Inventory` - Stock management
- `Token` - JWT token storage

### Features Implemented

1. **JWT Authentication** with access/refresh tokens
2. **Google OAuth** integration
3. **Role-based Authorization** (User/Admin)
4. **File Upload** with Cloudinary
5. **Request Validation** with class-validator
6. **Error Handling** with proper HTTP status codes
7. **CORS Configuration** for frontend integration
8. **Cookie-based Authentication** support
9. **Database Relations** with TypeORM
10. **Slug Generation** for SEO-friendly URLs

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_TOKEN=your_refresh_secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NODE_ENV=development
PORT=3000
```

### Getting Started

1. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

2. Set up environment variables (copy `.env.example` to `.env`)

3. Run database migrations (if needed)

4. Start development server:

   ```bash
   npm run start:dev
   ```

5. API is available at `http://localhost:3000/api`

### Notes

- All APIs maintain the same request/response structure as the original Express.js version
- Database schema is compatible with existing PostgreSQL database
- Authentication flow remains the same (phone/password login + Google OAuth)
- File upload functionality preserved with Cloudinary integration
- All validation rules maintained with class-validator

The migration is complete and the NestJS application provides the same functionality as the original Express.js application with improved structure, type safety, and maintainability.
