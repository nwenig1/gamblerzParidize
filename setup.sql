

--add admin bool to this 
--always 0 for controller 
--hard code in an admin user?
CREATE TABLE users (
  userID SERIAL PRIMARY KEY,
  username VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE products (
  productID SERIAL PRIMARY KEY, 
  name VARCHAR(32) UNIQUE NOT NULL, 
  description VARCHAR(256) NOT NULL, 
  price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE carts (
  userID INTEGER NOT NULL,
  productID INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  engravingText VARCHAR(64),
  FOREIGN KEY (userID) REFERENCES users(userID),
  FOREIGN KEY (productID) REFERENCES products(productID)
);

CREATE TABLE tags (
  tagID SERIAL PRIMARY KEY,
  tagText VARCHAR(255) NOT NULl
);

CREATE TABLE productTags (
  productID INTEGER NOT NULL,
  tagID INTEGER NOT NULL,
  FOREIGN KEY (productID) REFERENCES products(productID),
  FOREIGN KEY (tagID) REFERENCES tags(tagID)
);

CREATE TABLE images (
  fileName VARCHAR(255) PRIMARY KEY,
  altDescription VARCHAR(255),
  productID INTEGER NOT NULL,
  FOREIGN KEY (productID) REFERENCES products(productID)
);



--assuming product table created like schema 

INSERT INTO products (name, description, price)
VALUES
  ('Poker Table', 'It is a poker table. For playing poker', 99.99), 
  ('Cards', 'They are cards. For playing cards', 7.32); 
   





