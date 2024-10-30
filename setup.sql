

--add admin bool to this 
--always 0 for controller 
--hard code in an admin user?
CREATE TABLE users (
  userID SERIAL PRIMARY KEY,
  username VARCHAR(32) UNIQUE NOT NULL,
  password VARCHAR(32) NOT NULL,
  email VARCHAR(64) UNIQUE NOT NULL,
  is_admin BOOLEAN 
);

CREATE TABLE products (
  productID SERIAL PRIMARY KEY, 
  name VARCHAR(32) UNIQUE NOT NULL, 
  description VARCHAR(256) NOT NULL, 
  price NUMERIC(10, 2) NOT NULL
);
--assuming product table created like schema 

INSERT INTO products (name, description, price)
VALUES
  ('Poker Table', 'It is a poker table. For playing poker', 99.99), 
  ('Cards', 'They are cards. For playing cards', 7.32); 
   





