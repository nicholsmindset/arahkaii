-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_admin BOOLEAN DEFAULT FALSE,
    is_vendor BOOLEAN DEFAULT FALSE
);

-- Vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    rating DECIMAL(3,2) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Delivery table
CREATE TABLE IF NOT EXISTS deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    status VARCHAR(20) DEFAULT 'pending',
    delivery_date TIMESTAMP WITH TIME ZONE,
    expected_delivery_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
    ON users FOR SELECT
    USING (auth.role() = 'authenticated' AND is_admin = true);

-- Vendors policies
CREATE POLICY "Vendors can view their own data"
    ON vendors FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all vendors"
    ON vendors FOR SELECT
    USING (auth.role() = 'authenticated' AND is_admin = true);

-- Products policies
CREATE POLICY "Vendors can view their own products"
    ON products FOR SELECT
    USING (auth.uid() IN (
        SELECT user_id FROM vendors WHERE id = vendor_id
    ));

CREATE POLICY "Admins can view all products"
    ON products FOR SELECT
    USING (auth.role() = 'authenticated' AND is_admin = true);

-- Orders policies
CREATE POLICY "Users can view their own orders"
    ON orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Vendors can view their own orders"
    ON orders FOR SELECT
    USING (auth.uid() IN (
        SELECT user_id FROM vendors WHERE id = vendor_id
    ));

CREATE POLICY "Admins can view all orders"
    ON orders FOR SELECT
    USING (auth.role() = 'authenticated' AND is_admin = true);

-- Reviews policies
CREATE POLICY "Users can view their own reviews"
    ON reviews FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Vendors can view reviews for their products"
    ON reviews FOR SELECT
    USING (auth.uid() IN (
        SELECT user_id FROM vendors WHERE id = vendor_id
    ));

CREATE POLICY "Admins can view all reviews"
    ON reviews FOR SELECT
    USING (auth.role() = 'authenticated' AND is_admin = true);

-- Deliveries policies
CREATE POLICY "Users can view their own deliveries"
    ON deliveries FOR SELECT
    USING (auth.uid() IN (
        SELECT user_id FROM orders WHERE id = order_id
    ));

CREATE POLICY "Vendors can view deliveries for their orders"
    ON deliveries FOR SELECT
    USING (auth.uid() IN (
        SELECT user_id FROM vendors WHERE id IN (
            SELECT vendor_id FROM orders WHERE id = order_id
        )
    ));

CREATE POLICY "Admins can view all deliveries"
    ON deliveries FOR SELECT
    USING (auth.role() = 'authenticated' AND is_admin = true);
