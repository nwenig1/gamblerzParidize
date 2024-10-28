

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


--assuming product table created like schema 
/*
INSERT INTO products (name, description, price)
VALUES 
   



*/

